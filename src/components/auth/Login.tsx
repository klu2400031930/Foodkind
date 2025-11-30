import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Eye, EyeOff, Heart, Mail, Phone, Lock, RefreshCw } from 'lucide-react';
import { UserRole } from '../../App';

interface LoginProps {
  role: UserRole;
  onLoginSuccess: (user: any) => void;
  onSignupClick: () => void;
  onBack: () => void;
}

export function Login({ role, onLoginSuccess, onSignupClick, onBack }: LoginProps) {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const [useOTP, setUseOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // CAPTCHA State
  const [captchaCode, setCaptchaCode] = useState('');
  const [userCaptchaInput, setUserCaptchaInput] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaCode(code);
    setUserCaptchaInput(''); // Clear input on refresh
  };

  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Text
        ctx.font = 'bold 24px monospace';
        ctx.fillStyle = '#374151';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Add some noise/lines
        for (let i = 0; i < 5; i++) {
          ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.2})`;
          ctx.beginPath();
          ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
          ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
          ctx.stroke();
        }

        ctx.fillText(captchaCode, canvas.width / 2, canvas.height / 2);
      }
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    drawCaptcha();
  }, [captchaCode]);

  const getRoleInfo = () => {
    switch (role) {
      case 'donor':
        return { title: 'Donor', color: '#21A179', gradient: 'from-[#DFF5E6] to-[#21A179]/20' };
      case 'receiver':
        return { title: 'Receiver', color: '#3A6EA5', gradient: 'from-[#E6F2FF] to-[#3A6EA5]/20' };
      case 'volunteer':
        return { title: 'Volunteer', color: '#FFCF4A', gradient: 'from-[#FFF8E7] to-[#FFCF4A]/20' };
      case 'ngo':
        return { title: 'NGO Admin', color: '#555555', gradient: 'from-[#F2F2F2] to-[#555555]/20' };
      default:
        return { title: 'User', color: '#21A179', gradient: 'from-[#DFF5E6] to-[#21A179]/20' };
    }
  };

  const roleInfo = getRoleInfo();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!useOTP) {
      if (loginMethod === 'email' && !email) {
        newErrors.email = 'Email is required';
      } else if (loginMethod === 'email' && !/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Please enter a valid email';
      }

      if (loginMethod === 'phone' && !phone) {
        newErrors.phone = 'Phone number is required';
      } else if (loginMethod === 'phone' && !/^\d{10}$/.test(phone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }

      if (!password) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    } else {
      if (loginMethod === 'email' && !email) {
        newErrors.email = 'Email is required';
      }
      if (loginMethod === 'phone' && !phone) {
        newErrors.phone = 'Phone number is required';
      }
      if (otpSent && otp.some(digit => !digit)) {
        newErrors.otp = 'Please enter complete OTP';
      }
    }

    if (userCaptchaInput !== captchaCode) {
      newErrors.captcha = 'Incorrect CAPTCHA code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = () => {
    if (validateForm()) {
      setOtpSent(true);
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOtp(newOTP);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const loginData = {
          email: loginMethod === 'email' ? email : undefined,
          phone: loginMethod === 'phone' ? phone : undefined,
          password: password,
        };

        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });

        const data = await response.json();

        if (response.ok) {
          onLoginSuccess(data.user);
        } else {
          setErrors({ ...errors, submit: data.message || 'Login failed' });
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ ...errors, submit: 'Network error. Please try again.' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DFF5E6] via-[#FFF8E7] to-[#E6F2FF]">
      {/* Header */}
      <div className="bg-white border-b border-[#F2F2F2] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#555555] hover:text-[#21A179] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontWeight: '600' }}>Back to Role Selection</span>
          </button>
        </div>
      </div>

      {/* Login Form */}
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: roleInfo.color }}
              >
                <Heart className={`w-7 h-7 ${roleInfo.color === '#FFCF4A' ? 'text-[#1A1A1A]' : 'text-white'} fill-current`} />
              </div>
            </div>
            <h1 className="text-[#1A1A1A] mb-2" style={{ fontSize: '32px', fontWeight: '700' }}>
              Welcome Back!
            </h1>
            <p className="text-[#555555]" style={{ fontSize: '16px' }}>
              Login as <span style={{ color: roleInfo.color, fontWeight: '600' }}>{roleInfo.title}</span>
            </p>
          </div>

          {/* Login Method Toggle */}
          <div className="flex gap-2 mb-6 p-1 bg-[#F2F2F2] rounded-xl">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-3 rounded-lg transition-all ${loginMethod === 'email'
                ? 'bg-white text-[#21A179] shadow-sm'
                : 'text-[#555555]'
                }`}
              style={{ fontWeight: '600' }}
            >
              Email
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-3 rounded-lg transition-all ${loginMethod === 'phone'
                ? 'bg-white text-[#21A179] shadow-sm'
                : 'text-[#555555]'
                }`}
              style={{ fontWeight: '600' }}
            >
              Phone
            </button>
          </div>

          {/* OTP Toggle */}
          <div className="flex items-center justify-between mb-6 p-4 bg-[#FFF8E7] rounded-xl">
            <span className="text-[#555555]" style={{ fontSize: '14px' }}>
              Use OTP instead of password
            </span>
            <button
              onClick={() => {
                setUseOTP(!useOTP);
                setOtpSent(false);
                setOtp(['', '', '', '', '', '']);
              }}
              className={`w-12 h-6 rounded-full transition-all ${useOTP ? 'bg-[#21A179]' : 'bg-[#B3B3B3]'
                }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-all ${useOTP ? 'ml-6' : 'ml-0.5'
                  }`}
              />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email/Phone Input */}
            {loginMethod === 'email' ? (
              <div>
                <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.email
                      ? 'border-[#FF4A4A] bg-[#FFF5F5]'
                      : 'border-[#F2F2F2] focus:border-[#21A179]'
                      }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[#FF4A4A] mt-1" style={{ fontSize: '12px' }}>
                    {errors.email}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="1234567890"
                    maxLength={10}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.phone
                      ? 'border-[#FF4A4A] bg-[#FFF5F5]'
                      : 'border-[#F2F2F2] focus:border-[#21A179]'
                      }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-[#FF4A4A] mt-1" style={{ fontSize: '12px' }}>
                    {errors.phone}
                  </p>
                )}
              </div>
            )}

            {/* Password or OTP */}
            {!useOTP ? (
              <div>
                <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.password
                      ? 'border-[#FF4A4A] bg-[#FFF5F5]'
                      : 'border-[#F2F2F2] focus:border-[#21A179]'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B3B3B3] hover:text-[#555555]"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[#FF4A4A] mt-1" style={{ fontSize: '12px' }}>
                    {errors.password}
                  </p>
                )}
                <div className="text-right mt-2">
                  <button type="button" className="text-[#21A179]" style={{ fontSize: '14px', fontWeight: '600' }}>
                    Forgot Password?
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    className="w-full bg-[#21A179] text-white py-3 rounded-xl hover:bg-[#1e8f6b] transition-all"
                    style={{ fontWeight: '600' }}
                  >
                    Send OTP
                  </button>
                ) : (
                  <div>
                    <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                      Enter 6-Digit OTP
                    </label>
                    <div className="flex gap-2 mb-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          value={digit}
                          onChange={(e) => handleOTPChange(index, e.target.value)}
                          maxLength={1}
                          className={`w-12 h-12 text-center border-2 rounded-xl focus:outline-none transition-all ${errors.otp
                            ? 'border-[#FF4A4A] bg-[#FFF5F5]'
                            : 'border-[#F2F2F2] focus:border-[#21A179]'
                            }`}
                          style={{ fontSize: '20px', fontWeight: '700' }}
                        />
                      ))}
                    </div>
                    {errors.otp && (
                      <p className="text-[#FF4A4A] mb-2" style={{ fontSize: '12px' }}>
                        {errors.otp}
                      </p>
                    )}
                    <div className="text-center">
                      {countdown > 0 ? (
                        <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                          Resend OTP in {countdown}s
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOTP}
                          className="text-[#21A179]"
                          style={{ fontSize: '14px', fontWeight: '600' }}
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CAPTCHA Section */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                Verify you are human
              </label>
              <div className="flex items-center gap-4 mb-3">
                <canvas
                  ref={canvasRef}
                  width="160"
                  height="50"
                  className="border border-gray-300 rounded-lg bg-white"
                />
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="p-2 text-[#555555] hover:text-[#21A179] transition-colors"
                  title="Refresh CAPTCHA"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
              <input
                type="text"
                value={userCaptchaInput}
                onChange={(e) => setUserCaptchaInput(e.target.value)}
                placeholder="Enter characters above"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.captcha
                    ? 'border-[#FF4A4A] bg-[#FFF5F5]'
                    : 'border-[#F2F2F2] focus:border-[#21A179]'
                  }`}
              />
              {errors.captcha && (
                <p className="text-[#FF4A4A] mt-1" style={{ fontSize: '12px' }}>
                  {errors.captcha}
                </p>
              )}
            </div>

            {/* Submit Button */}
            {(!useOTP || otpSent) && (
              <button
                type="submit"
                className="w-full text-white py-4 rounded-xl transition-all hover:shadow-lg"
                style={{ backgroundColor: roleInfo.color, fontWeight: '600', fontSize: '16px' }}
              >
                Login as {roleInfo.title}
              </button>
            )}
          </form>

          {/* Signup Link */}
          <div className="text-center mt-6">
            <p className="text-[#555555]">
              Don't have an account?{' '}
              <button
                onClick={onSignupClick}
                className="text-[#21A179]"
                style={{ fontWeight: '600' }}
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

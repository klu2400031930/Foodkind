import { ArrowLeft, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
  role: 'donor' | 'receiver' | 'volunteer' | 'ngo';
  onLoginSuccess: (userData: any) => void;
  onBack: () => void;
}

export function Login({ role, onLoginSuccess, onBack }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [usePhone, setUsePhone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    name: '',
    organizationName: '',
  });

  const roleDetails = {
    donor: { title: 'Donor', icon: '❤', color: '#21A179' },
    receiver: { title: 'Receiver', icon: '🏠', color: '#3A6EA5' },
    volunteer: { title: 'Volunteer', icon: '🚚', color: '#FFCF4A' },
    ngo: { title: 'NGO Admin', icon: '🛡', color: '#555555' },
  };

  const currentRole = roleDetails[role];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (usePhone && !showOTP) {
      setShowOTP(true);
      return;
    }

    // Mock login success
    onLoginSuccess({
      name: formData.name || 'User',
      role,
      email: formData.email,
      phone: formData.phone,
    });
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DFF5E6] via-[#FFF8E7] to-[#E6F2FF] py-12 px-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#555555] hover:text-[#21A179] mb-8 transition-colors"
          style={{ fontSize: '16px', fontWeight: '600' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Role Header */}
          <div className="text-center mb-8">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: currentRole.color }}
            >
              <span style={{ fontSize: '40px' }}>{currentRole.icon}</span>
            </div>
            <h2 className="text-[#1A1A1A] mb-2" style={{ fontSize: '32px', fontWeight: '700' }}>
              {isLogin ? 'Welcome Back' : 'Join as'} {currentRole.title}
            </h2>
            <p className="text-[#555555]" style={{ fontSize: '16px' }}>
              {isLogin ? 'Login to continue' : 'Create your account'}
            </p>
          </div>

          {/* Login/Signup Toggle */}
          <div className="flex gap-2 mb-6 p-1 bg-[#F2F2F2] rounded-xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-lg transition-all ${
                isLogin ? 'bg-white shadow-md' : 'text-[#555555]'
              }`}
              style={{ fontSize: '16px', fontWeight: '600' }}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-lg transition-all ${
                !isLogin ? 'bg-white shadow-md' : 'text-[#555555]'
              }`}
              style={{ fontSize: '16px', fontWeight: '600' }}
            >
              Sign Up
            </button>
          </div>

          {/* Email/Phone Toggle */}
          <div className="flex gap-2 mb-6 p-1 bg-[#F2F2F2] rounded-xl">
            <button
              onClick={() => {
                setUsePhone(false);
                setShowOTP(false);
              }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                !usePhone ? 'bg-white shadow-md' : 'text-[#555555]'
              }`}
              style={{ fontSize: '14px', fontWeight: '600' }}
            >
              Email
            </button>
            <button
              onClick={() => setUsePhone(true)}
              className={`flex-1 py-2 rounded-lg transition-all ${
                usePhone ? 'bg-white shadow-md' : 'text-[#555555]'
              }`}
              style={{ fontSize: '14px', fontWeight: '600' }}
            >
              Phone
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Signup Fields */}
            {!isLogin && (
              <>
                <div>
                  <label className="block text-[#555555] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                    {role === 'receiver' || role === 'ngo' ? 'Organization Name' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={role === 'receiver' || role === 'ngo' ? formData.organizationName : formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [role === 'receiver' || role === 'ngo' ? 'organizationName' : 'name']: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-[#F2F2F2] rounded-xl focus:border-[#21A179] outline-none transition-colors"
                    placeholder={role === 'receiver' || role === 'ngo' ? 'Enter organization name' : 'Enter your name'}
                  />
                </div>
              </>
            )}

            {/* Email/Phone Input */}
            {!showOTP && (
              <div>
                <label className="block text-[#555555] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                  {usePhone ? 'Phone Number' : 'Email Address'}
                </label>
                <div className="relative">
                  {usePhone ? (
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555555]" />
                  ) : (
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555555]" />
                  )}
                  <input
                    type={usePhone ? 'tel' : 'email'}
                    required
                    value={usePhone ? formData.phone : formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, [usePhone ? 'phone' : 'email']: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3 border-2 border-[#F2F2F2] rounded-xl focus:border-[#21A179] outline-none transition-colors"
                    placeholder={usePhone ? '+91 98765 43210' : 'you@example.com'}
                  />
                </div>
              </div>
            )}

            {/* OTP Input */}
            {usePhone && showOTP && (
              <div>
                <label className="block text-[#555555] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                  Enter OTP
                </label>
                <p className="text-[#7A7A7A] mb-4" style={{ fontSize: '12px' }}>
                  We sent a 6-digit code to {formData.phone}
                </p>
                <div className="flex gap-2 justify-between">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 text-center border-2 border-[#F2F2F2] rounded-xl focus:border-[#21A179] outline-none transition-colors"
                      style={{ fontSize: '20px', fontWeight: '700' }}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="text-[#3A6EA5] mt-3"
                  style={{ fontSize: '14px', fontWeight: '600' }}
                >
                  Resend OTP in 60s
                </button>
              </div>
            )}

            {/* Password Input */}
            {!usePhone && (
              <div>
                <label className="block text-[#555555] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555555]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3 border-2 border-[#F2F2F2] rounded-xl focus:border-[#21A179] outline-none transition-colors"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555555]"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {isLogin && (
                  <button
                    type="button"
                    className="text-[#3A6EA5] mt-2"
                    style={{ fontSize: '14px', fontWeight: '600' }}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-white shadow-lg hover:shadow-xl transition-all"
              style={{
                background: `linear-gradient(to right, ${currentRole.color}, #21A179)`,
                fontSize: '16px',
                fontWeight: '700',
              }}
            >
              {usePhone && !showOTP ? 'Send OTP' : isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          {/* Switch Login/Signup */}
          <p className="text-center text-[#555555] mt-6" style={{ fontSize: '14px' }}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#21A179]"
              style={{ fontWeight: '600' }}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

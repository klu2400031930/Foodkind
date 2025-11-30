import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Heart, Mail, Phone, Lock, User, MapPin, Upload, CheckCircle } from 'lucide-react';
import { UserRole } from '../../App';

interface SignupProps {
  role: UserRole;
  onSignupSuccess: (user: any) => void;
  onBackToLogin: () => void;
}

export function Signup({ role, onSignupSuccess, onBackToLogin }: SignupProps) {
  const [signupMethod, setSignupMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    bio: '',
    location: '',
    profilePhoto: null as File | null
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false
  });

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

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password });
    setPasswordStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password)
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, profilePhoto: file });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (signupMethod === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    } else {
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.location) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const userData = {
          name: formData.name,
          role: role,
          email: signupMethod === 'email' ? formData.email : undefined,
          phone: signupMethod === 'phone' ? formData.phone : undefined,
          password: formData.password,
          location: formData.location,
          bio: formData.bio,
          // Note: profilePhoto upload to server is not implemented yet, sending null for now
          // In a real app, you'd upload the file to a storage service or convert to base64
        };

        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
          onSignupSuccess(data.user);
        } else {
          setErrors({ ...errors, submit: data.message || 'Registration failed' });
        }
      } catch (error) {
        console.error('Signup error:', error);
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
            onClick={onBackToLogin}
            className="flex items-center gap-2 text-[#555555] hover:text-[#21A179] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontWeight: '600' }}>Back to Login</span>
          </button>
        </div>
      </div>

      {/* Signup Form */}
      <div className="max-w-2xl mx-auto px-4 py-16">
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
              Join FOOD KIND
            </h1>
            <p className="text-[#555555]" style={{ fontSize: '16px' }}>
              Create your <span style={{ color: roleInfo.color, fontWeight: '600' }}>{roleInfo.title}</span> account
            </p>
          </div>

          {/* Signup Method Toggle */}
          <div className="flex gap-2 mb-6 p-1 bg-[#F2F2F2] rounded-xl">
            <button
              onClick={() => setSignupMethod('email')}
              className={`flex-1 py-3 rounded-lg transition-all ${signupMethod === 'email'
                  ? 'bg-white text-[#21A179] shadow-sm'
                  : 'text-[#555555]'
                }`}
              style={{ fontWeight: '600' }}
            >
              Sign up with Email
            </button>
            <button
              onClick={() => setSignupMethod('phone')}
              className={`flex-1 py-3 rounded-lg transition-all ${signupMethod === 'phone'
                  ? 'bg-white text-[#21A179] shadow-sm'
                  : 'text-[#555555]'
                }`}
              style={{ fontWeight: '600' }}
            >
              Sign up with Phone
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Profile Photo Upload */}
            <div>
              <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                Profile Photo (Optional)
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-[#F2F2F2] flex items-center justify-center overflow-hidden">
                  {formData.profilePhoto ? (
                    <img
                      src={URL.createObjectURL(formData.profilePhoto)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-[#B3B3B3]" />
                  )}
                </div>
                <label className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 border-2 border-[#21A179] text-[#21A179] rounded-xl hover:bg-[#DFF5E6] transition-all">
                    <Upload className="w-4 h-4" />
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>Upload Photo</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                Full Name / Organization Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.name
                      ? 'border-[#FF4A4A] bg-[#FFF5F5]'
                      : 'border-[#F2F2F2] focus:border-[#21A179]'
                    }`}
                />
              </div>
              {errors.name && (
                <p className="text-[#FF4A4A] mt-1" style={{ fontSize: '12px' }}>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email or Phone */}
            {signupMethod === 'email' ? (
              <div>
                <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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

            {/* Password */}
            <div>
              <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Create a strong password"
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

              {/* Password Strength Checklist */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordStrength.length ? 'bg-[#22C55E]' : 'bg-[#F2F2F2]'
                      }`}>
                      {passwordStrength.length && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`${passwordStrength.length ? 'text-[#22C55E]' : 'text-[#B3B3B3]'}`} style={{ fontSize: '12px' }}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordStrength.uppercase ? 'bg-[#22C55E]' : 'bg-[#F2F2F2]'
                      }`}>
                      {passwordStrength.uppercase && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`${passwordStrength.uppercase ? 'text-[#22C55E]' : 'text-[#B3B3B3]'}`} style={{ fontSize: '12px' }}>
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordStrength.lowercase ? 'bg-[#22C55E]' : 'bg-[#F2F2F2]'
                      }`}>
                      {passwordStrength.lowercase && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`${passwordStrength.lowercase ? 'text-[#22C55E]' : 'text-[#B3B3B3]'}`} style={{ fontSize: '12px' }}>
                      One lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordStrength.number ? 'bg-[#22C55E]' : 'bg-[#F2F2F2]'
                      }`}>
                      {passwordStrength.number && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`${passwordStrength.number ? 'text-[#22C55E]' : 'text-[#B3B3B3]'}`} style={{ fontSize: '12px' }}>
                      One number
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Re-enter your password"
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.confirmPassword
                      ? 'border-[#FF4A4A] bg-[#FFF5F5]'
                      : 'border-[#F2F2F2] focus:border-[#21A179]'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B3B3B3] hover:text-[#555555]"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[#FF4A4A] mt-1" style={{ fontSize: '12px' }}>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, State"
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.location
                      ? 'border-[#FF4A4A] bg-[#FFF5F5]'
                      : 'border-[#F2F2F2] focus:border-[#21A179]'
                    }`}
                />
              </div>
              {errors.location && (
                <p className="text-[#FF4A4A] mt-1" style={{ fontSize: '12px' }}>
                  {errors.location}
                </p>
              )}
            </div>

            {/* Bio (Optional) */}
            <div>
              <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                Bio (Optional)
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us a bit about yourself..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-[#F2F2F2] rounded-xl focus:outline-none focus:border-[#21A179] transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white py-4 rounded-xl transition-all hover:shadow-lg"
              style={{ backgroundColor: roleInfo.color, fontWeight: '600', fontSize: '16px' }}
            >
              Create {roleInfo.title} Account
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-[#555555]">
              Already have an account?{' '}
              <button
                onClick={onBackToLogin}
                className="text-[#21A179]"
                style={{ fontWeight: '600' }}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

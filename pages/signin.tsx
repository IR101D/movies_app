import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/commons/Button';
import Loading from '@/components/commons/Loading';
import {  Facebook, Twitter, Instagram, Apple } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';
const SignInPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful login
      console.log('Login successful:', formData);
      
      // Redirect to movies page
      router.push('/movies');
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ email: 'Invalid credentials' });
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogins = [
    {
      name: 'Google',
      icon: <FontAwesomeIcon icon={faGoogle} size="lg" />,
      color: 'hover:bg-red-500 hover:border-red-500',
      action: () => console.log('Google login')
    },
    {
      name: 'Facebook',
      icon: <Facebook/>,
      color: 'hover:bg-blue-600 hover:border-blue-600',
      action: () => console.log('Facebook login')
    },
    {
      name: 'Instagram',
      icon: <FontAwesomeIcon icon={faInstagram} size="lg" />,
      color: 'hover:bg-black hover:border-black',
      action: () => console.log('Apple login')
    },
    {
      name: 'Twitter',
      icon: <Twitter/>,
      color: 'hover:bg-blue-400 hover:border-blue-400',
      action: () => console.log('Twitter login')
    }
  ];

  const features = [
    { icon: '🎬', text: 'Access 10,000+ movies' },
    { icon: '⭐', text: 'Personal recommendations' },
    { icon: '💾', text: 'Save your watchlist' },
    { icon: '📱', text: 'Sync across devices' }
  ];

  return (
    <div className="min-h-screen bg-[#0F0B15] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Branding & Features */}
        <div className="space-y-8">
          {/* Logo/Brand */}
          <div className="text-center lg:text-left">
            <button 
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-3 text-3xl font-bold hover:scale-105 transition-transform duration-300"
            >
              <span className="text-4xl">🎬</span>
              <span className="bg-gradient-to-r from-[#E2D609] to-[#FFD700] bg-clip-text text-transparent">
                CineSeek
              </span>
            </button>
            <p className="text-gray-400 mt-2 text-lg">Your gateway to cinematic adventures</p>
          </div>

          {/* Features List */}
          <div className="space-y-6">
            <h2 className="text-2xl lg:text-3xl font-bold">
              Welcome Back, <span className="text-[#E2D609]">Movie Lover!</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Sign in to continue your cinematic journey and discover your next favorite movie.
            </p>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg bg-[#171D22] bg-opacity-50 border border-gray-800 hover:border-[#E2D609] transition-all duration-300"
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#E2D609]">500K+</div>
              <div className="text-sm text-gray-400">Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#E2D609]">10K+</div>
              <div className="text-sm text-gray-400">Movies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#E2D609]">99%</div>
              <div className="text-sm text-gray-400">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-[#171D22] p-8 rounded-2xl border border-gray-800 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Sign In</h1>
            <p className="text-gray-400">Enter your credentials to continue</p>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {socialLogins.map((social, index) => (
              <button
                key={index}
                onClick={social.action}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-700 bg-[#0F0B15] hover:text-white transition-all duration-300 ${social.color} group`}
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                  {social.icon}
                </span>
                <span className="font-medium text-sm">{social.name}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#0F0B15] border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors duration-300 ${
                  errors.email ? 'border-red-500' : 'border-gray-700 focus:border-[#E2D609]'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                  <span>⚠️</span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#0F0B15] border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors duration-300 pr-12 ${
                    errors.password ? 'border-red-500' : 'border-gray-700 focus:border-[#E2D609]'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#E2D609] transition-colors duration-300"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                  <span>⚠️</span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#E2D609] bg-[#0F0B15] border-gray-700 rounded focus:ring-[#E2D609] focus:ring-2"
                />
                <span className="text-sm text-gray-300">Remember me</span>
              </label>
              
              <button
                type="button"
                onClick={() => router.push('/forgot-password')}
                className="text-sm text-[#E2D609] hover:text-[#c9c208] transition-colors duration-300"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              title={isLoading ? "Signing In..." : "Sign In"}
              action={() => {}}
              //type="submit"
            //  disabled={isLoading}
              //className="w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300"
            />

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-gray-800">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => router.push('/signup')}
                  className="text-[#E2D609] hover:text-[#c9c208] font-semibold transition-colors duration-300"
                >
                  Sign up now
                </button>
              </p>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-[#0F0B15] rounded-lg border border-gray-800">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <p className="text-sm font-semibold text-[#E2D609]">Secure Login</p>
                <p className="text-xs text-gray-400">Your data is protected with encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && <Loading />}

      {/* Background Animation */}
      <div className="fixed inset-0 -z-10 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${20 + i * 3}s`
            }}
          >
            {['🎬', '🎥', '🌟', '📽️', '🎭', '✨', '🏆', '🎪'][i % 8]}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SignInPage;
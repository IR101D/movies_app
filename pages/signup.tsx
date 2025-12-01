import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/commons/Button';
import Loading from '@/components/commons/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    newsletter: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength >= 75) return 'bg-green-500';
    if (passwordStrength >= 50) return 'bg-yellow-500';
    if (passwordStrength >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength >= 75) return 'Strong';
    if (passwordStrength >= 50) return 'Medium';
    if (passwordStrength >= 25) return 'Weak';
    return 'Very Weak';
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength < 50) {
      newErrors.password = 'Please choose a stronger password';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
      
      // Simulate successful registration
      console.log('Registration successful:', formData);
      
      // Redirect to movies page or verification page
      router.push('/movies');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ email: 'This email is already registered' });
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: '🎬', title: 'Unlimited Access', description: '10,000+ movies at your fingertips' },
    { icon: '⭐', title: 'Personalized Picks', description: 'AI-powered recommendations just for you' },
    { icon: '💾', title: 'Watchlist', description: 'Save and organize your favorite movies' },
    { icon: '📱', title: 'Multi-Device Sync', description: 'Continue watching on any device' },
    { icon: '🚀', title: 'Early Access', description: 'Be the first to see new releases' },
    { icon: '🎭', title: 'All Genres', description: 'From classics to latest blockbusters' }
  ];

  const socialSignUps = [
    {
      name: 'Google',
      icon: <FontAwesomeIcon icon={faGoogle} size="lg" />,
      color: 'hover:bg-red-500 hover:border-red-500',
      action: () => console.log('Google sign up')
    },
    {
      name: 'Facebook',
      icon: <FontAwesomeIcon icon={faFacebook} size="lg" />,
      color: 'hover:bg-blue-600 hover:border-blue-600',
      action: () => console.log('Facebook sign up')
    },
    {
      name: 'Instagram',
      icon: <FontAwesomeIcon icon={faInstagram} size="lg" />,
      color: 'hover:bg-pink-600 hover:border-pink-600',
      action: () => console.log('Apple sign up')
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0B15] text-white flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Side - Benefits & Features */}
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
            <p className="text-gray-400 mt-2 text-lg">Start your cinematic journey today</p>
          </div>

          {/* Benefits Grid */}
          <div className="space-y-6">
            <h2 className="text-2xl lg:text-3xl font-bold">
              Join <span className="text-[#E2D609]">500K+</span> Movie Lovers
            </h2>
            <p className="text-gray-300 text-lg">
              Create your free account and unlock a world of cinematic adventures.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-[#171D22] bg-opacity-50 border border-gray-800 hover:border-[#E2D609] transition-all duration-300 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#E2D609]">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-gradient-to-r from-[#1A1326] to-[#2D1B45] p-6 rounded-2xl border border-[#E2D609] border-opacity-30">
            <div className="flex items-start gap-4">
              <span className="text-3xl">💫</span>
              <div>
                <p className="text-lg font-semibold mb-2">"CineSeek changed how I discover movies!"</p>
                <p className="text-gray-300 text-sm">
                  The personalized recommendations are spot-on. I've discovered so many hidden gems I would have never found otherwise.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[#E2D609]">⭐️⭐️⭐️⭐️⭐️</span>
                  <span className="text-sm text-gray-400">- Sarah M.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="bg-[#171D22] p-8 rounded-2xl border border-gray-800 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-gray-400">Join the CineSeek community in seconds</p>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {socialSignUps.map((social, index) => (
              <button
                key={index}
                onClick={social.action}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-700 bg-[#0F0B15] hover:text-white transition-all duration-300 ${social.color} group`}
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                  {social.icon}
                </span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-gray-500 text-sm">Or with email</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#0F0B15] border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors duration-300 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-700 focus:border-[#E2D609]'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                  <span>⚠️</span>
                  {errors.fullName}
                </p>
              )}
            </div>

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
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#E2D609] transition-colors duration-300"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              
              {/* Password Strength Meter */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Password strength:</span>
                    <span className={`font-semibold ${
                      passwordStrength >= 75 ? 'text-green-400' :
                      passwordStrength >= 50 ? 'text-yellow-400' :
                      passwordStrength >= 25 ? 'text-orange-400' : 'text-red-400'
                    }`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                  <span>⚠️</span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#0F0B15] border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors duration-300 pr-12 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-700 focus:border-[#E2D609]'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#E2D609] transition-colors duration-300"
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                  <span>⚠️</span>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#E2D609] bg-[#0F0B15] border-gray-700 rounded focus:ring-[#E2D609] focus:ring-2 mt-1"
                />
                <span className="text-sm text-gray-300">
                  I agree to the{' '}
                  <button type="button" className="text-[#E2D609] hover:underline">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button type="button" className="text-[#E2D609] hover:underline">
                    Privacy Policy
                  </button>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-sm text-red-400 flex items-center gap-2">
                  <span>⚠️</span>
                  {errors.agreeToTerms}
                </p>
              )}

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#E2D609] bg-[#0F0B15] border-gray-700 rounded focus:ring-[#E2D609] focus:ring-2 mt-1"
                />
                <span className="text-sm text-gray-300">
                  Send me movie recommendations and platform updates
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              title={isLoading ? "Creating Account..." : "Create Account"}
              action={() => {}}
              //type="submit"
             // disabled={isLoading}
             // className="w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-[#E2D609] to-[#FFD700] text-black"
            />

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t border-gray-800">
              <p className="text-gray-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => router.push('/signin')}
                  className="text-[#E2D609] hover:text-[#c9c208] font-semibold transition-colors duration-300"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-[#0F0B15] rounded-lg border border-gray-800">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <p className="text-sm font-semibold text-[#E2D609]">Your data is safe with us</p>
                <p className="text-xs text-gray-400">We use encryption to protect your personal information</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && <Loading />}

      {/* Background Animation */}
      <div className="fixed inset-0 -z-10 opacity-10">
        {[...Array(25)].map((_, i) => (
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
            {['🎬', '🎥', '🌟', '📽️', '🎭', '✨', '🏆', '🎪', '📺', '🎞️'][i % 10]}
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

export default SignUpPage;
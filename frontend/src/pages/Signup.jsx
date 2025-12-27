import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup attempt:', formData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 p-4">
      <div className="w-full max-w-7xl flex flex-col md:flex-row bg-slate-800/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50 relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
           <div className="w-64 h-64 bg-purple-500 rounded-full blur-[100px]"></div>
        </div>
         <div className="absolute bottom-0 left-0 p-8 opacity-20 pointer-events-none">
           <div className="w-64 h-64 bg-blue-500 rounded-full blur-[100px]"></div>
        </div>


        {/* Visual Side (Left) - Kept consistent with Login but maybe different text/image */}
        <div className="hidden md:flex md:w-1/2 relative bg-slate-900 items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 z-10"></div>
          
          <div className="relative z-20 p-12 text-center select-none">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Join Us
            </h2>
            <p className="text-slate-400 text-lg">
              Start your journey with us and experience the future of management.
            </p>
          </div>

          <div className="absolute inset-0 z-0">
             {/* Abstract grid or pattern */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=2532&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          </div>
        </div>

        {/* Form Side (Right) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative bg-slate-800/30 overflow-y-auto max-h-screen">
          
          <div className="mb-8 text-center md:text-left">
            <Link to="/login" className="inline-flex items-center text-sm text-slate-400 hover:text-blue-400 transition-colors mb-4">
               <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
            </Link>
            <h1 className="text-3xl font-bold mb-2 text-white">Create Account</h1>
            <p className="text-slate-400">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-300">First Name</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
                           <User className="h-5 w-5" />
                        </div>
                        <input id="firstName" type="text" required placeholder="John" className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-slate-100 placeholder-slate-500 transition-all outline-none" value={formData.firstName} onChange={handleChange} />
                    </div>
                </div>
                <div className="space-y-2">
                    <label htmlFor="middleName" className="block text-sm font-medium text-slate-300">Middle Name</label>
                    <input id="middleName" type="text" placeholder="D" className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-slate-100 placeholder-slate-500 transition-all outline-none" value={formData.middleName} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-300">Last Name</label>
                     <input id="lastName" type="text" required placeholder="Doe" className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-slate-100 placeholder-slate-500 transition-all outline-none" value={formData.lastName} onChange={handleChange} />
                </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-slate-100 placeholder-slate-500 transition-all outline-none"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create a password"
                  className="w-full pl-10 pr-10 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-slate-100 placeholder-slate-500 transition-all outline-none"
                  value={formData.password}
                  onChange={handleChange}
                />
                 <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">
                Re-enter Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-10 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-slate-100 placeholder-slate-500 transition-all outline-none"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                 <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-purple-500/20 active:scale-[0.98] transition-all duration-200 mt-4"
            >
              Sign Up
            </button>
          </form>

           <div className="mt-8 text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Adani Group. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

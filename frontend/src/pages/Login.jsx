import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, UserPlus, ArrowRight } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 p-4">
      <div className="w-full max-w-7xl flex flex-col md:flex-row bg-slate-800/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50 relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
           <div className="w-64 h-64 bg-blue-500 rounded-full blur-[100px]"></div>
        </div>
         <div className="absolute bottom-0 left-0 p-8 opacity-20 pointer-events-none">
           <div className="w-64 h-64 bg-purple-500 rounded-full blur-[100px]"></div>
        </div>


        {/* Visual Side (Left) */}
        <div className="hidden md:flex md:w-1/2 relative bg-slate-900 items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10"></div>
          
          <div className="relative z-20 p-12 text-center select-none">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Welcome Back
            </h2>
            <p className="text-slate-400 text-lg">
              Empowering your workflow with advanced analytics and seamless integration.
            </p>
          </div>

          <div className="absolute inset-0 z-0">
             {/* Abstract grid or pattern can go here */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          </div>
        </div>

        {/* Form Side (Right) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative bg-slate-800/30">
          
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2 text-white">Sign In</h1>
            <p className="text-slate-400">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-slate-100 placeholder-slate-500 transition-all outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-slate-100 placeholder-slate-500 transition-all outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex items-center justify-end space-x-4 text-sm">
                <a href="/forgot-password" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot Password?
                </a>
                <span className="text-slate-600">|</span>
                <a href="/signup" className="group flex items-center font-medium text-purple-400 hover:text-purple-300 transition-colors">
                   Sign Up <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform"/>
                </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] transition-all duration-200"
            >
              Sign In
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

export default Login;

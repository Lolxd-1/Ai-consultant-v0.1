import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft } from 'lucide-react';

interface AuthFormProps {
  type: 'signin' | 'signup';
}

export function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (type === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (type === 'signup') {
      const existingUser = localStorage.getItem(email);
      if (existingUser) {
        setError('Email already exists');
        return;
      }
      localStorage.setItem(email, password);
    }

    localStorage.setItem('currentUser', email);
    window.location.href = '/profile';
  };

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-20">
      <div className="max-w-md mx-auto px-4">
        <a 
          href="/"
          className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </a>

        <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-xl 
          rounded-2xl border border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)]
          hover:shadow-[0_20px_40px_rgb(0,0,0,0.25)] transition-all duration-300">
          <div className="p-8">
            <h2 className="text-3xl font-semibold mb-2 text-white">
              {type === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-400 mb-8">
              {type === 'signin' 
                ? 'Sign in to continue to your account' 
                : 'Sign up to get started with AI Consultant'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl
                      text-white focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl
                      text-white focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {type === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl
                        text-white focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
              )}

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 
                  rounded-xl hover:from-blue-700 hover:to-blue-500 transition-all duration-300
                  transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {type === 'signin' ? 'Sign In' : 'Create Account'}
              </button>

              <p className="text-center text-white/50">
                {type === 'signin' ? (
                  <>
                    Don't have an account?{' '}
                    <a href="/signup" className="text-blue-400 hover:text-blue-300">
                      Sign Up
                    </a>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <a href="/signin" className="text-blue-400 hover:text-blue-300">
                      Sign In
                    </a>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
// src/app/auth/login/page.tsx
'use client';

import { FaUser, FaLock } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LoginFormPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get('role');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/dashboard/${data.role}`);
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div 
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center p-4 text-white"
      style={{ backgroundImage: 'url("/images/forest-bg.png")' }}
    >
      <div className="relative z-10 w-full max-w-sm rounded-xl border-4 border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-white">
            {role} Login
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <div className="relative flex items-center border-b-2 border-white/40 focus-within:border-white transition-colors">
              <FaUser className="absolute left-0 text-white/70" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-6 pr-2 py-2 bg-transparent text-white placeholder-white/70 focus:outline-none"
                required
              />
            </div>
          </div>
          {/* Password Input */}
          <div className="mb-6">
            <div className="relative flex items-center border-b-2 border-white/40 focus-within:border-white transition-colors">
              <FaLock className="absolute left-0 text-white/70" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-6 pr-2 py-2 bg-transparent text-white placeholder-white/70 focus:outline-none"
                required
              />
            </div>
          </div>

          {error && <p className="mb-4 text-center text-sm text-red-500 font-bold">{error}</p>}
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded border-2 border-gray-400 bg-transparent py-3 text-gray-400 font-bold transition-all duration-300 hover:bg-netflix-red hover:text-white hover:border-netflix-red"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
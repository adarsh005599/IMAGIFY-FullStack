import React, { useState, useContext } from 'react';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { AppContext } from '../Context/AppContext';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const { setShowLogin, backendUrl, setToken, setUser, loadCreditsData } = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log('📨 Form submitted:', { isSignup, email, password, name });

    if (!validateEmail(email)) {
      toast.warning('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      toast.warning('Password should be at least 6 characters long.');
      return;
    }

    try {
      if (!isSignup) {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          await loadCreditsData();
          toast.success(`Welcome back, ${data.user.name || 'User'}!`);
          setShowLogin(false);
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        if (name.trim() === '') {
          toast.warning('Please enter your name.');
          return;
        }

        const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          await loadCreditsData();
          toast.success(`Account created! Welcome, ${data.user.name}!`);
          setShowLogin(false);
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative bg-white/10 backdrop-blur-xl text-white rounded-3xl shadow-2xl p-8 w-full max-w-sm border border-white/20"
      >
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-white/70 hover:text-white text-xl"
        >
          ×
        </button>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-2xl font-semibold"
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
          className="text-sm text-white/70 mt-1 mb-6"
        >
          {isSignup ? 'Join us! It takes only a minute.' : 'Welcome back! Please sign in.'}
        </motion.p>

        {/* ✅ Regular form for reliability */}
        <form onSubmit={onSubmitHandler} className="space-y-4">
          {isSignup && (
            <div className="relative">
              <label htmlFor="name" className="sr-only">Full Name</label>
              <FiUser className="absolute left-4 top-3.5 text-white/70" />
              <input
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/20 placeholder-white/60 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white transition-all"
              />
            </div>
          )}

          <div className="relative">
            <label htmlFor="email" className="sr-only">Email</label>
            <FiMail className="absolute left-4 top-3.5 text-white/70" />
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              autoComplete="off"
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/20 placeholder-white/60 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white transition-all"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <FiLock className="absolute left-4 top-3.5 text-white/70" />
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/20 placeholder-white/60 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white transition-all"
            />
          </div>

          {!isSignup && (
            <div className="text-right text-sm text-white/70 hover:underline cursor-pointer">
              Forgot password?
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-white text-black font-medium py-2.5 mt-2 rounded-full transition-all transform hover:scale-95 active:scale-90 hover:bg-slate-100"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
          className="text-sm mt-6 text-white/70 text-center"
        >
          {isSignup ? 'Already have an account?' : 'Don’t have an account?'}{' '}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-white underline font-medium cursor-pointer"
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useContext } from 'react';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { AppContext } from '../Context/AppContext';
import { motion } from 'framer-motion';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const{setShowLogin, backendUrl, setToken, setUser,loadCreditsData} = useContext(AppContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

const onSubmitHandler = async(e) => {
  e.preventDefault(); // fix typo

  try {
    if (!isSignup) {
  // Login (existing user)
  const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });

  if (data.success) {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('token', data.token);
    await loadCreditsData();
    setShowLogin(false);
    navigate('/');
  } else {
    toast.error(data.message);
  }
} else {
  // Register (new user)
  const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });

  if (data.success) {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('token', data.token);
    await loadCreditsData();
    setShowLogin(false);
    navigate('/');
  } else {
    toast.error(data.message);
  }
}

  } catch (error) {
    toast.error(error.message);
  }
}


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
      <div className="relative bg-white/10 backdrop-blur-xl text-white rounded-3xl shadow-2xl p-8 w-full max-w-sm border border-white/20">
        {/* Close */}
        <button
          onClick={()=> setShowLogin(false)}
          className="absolute top-4 right-4 text-white/70 hover:text-white text-xl"
        >
          ×
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-semibold">{isSignup ? 'Sign Up' : 'Login'}</h2>
        <p className="text-sm text-white/70 mt-1 mb-6">
          {isSignup ? 'Join us! It takes only a minute.' : 'Welcome back! Please sign in.'}
        </p>

        <motion.form onSubmit={onSubmitHandler}
        className="space-y-4">
          {/* Name (Sign Up only) */}
          {isSignup && (
            <div className="relative">
              <FiUser className="absolute left-4 top-3.5 text-white/70" />
              <input onChange={e => setName(e.target.value)} value={name}
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/20 placeholder-white/60 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white transition-all"
              />
            </div>
          )}

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-4 top-3.5 text-white/70" />
            <input onChange={e => setEmail(e.target.value)} value={email}
              type="email"
              placeholder="Email"
               autoComplete="off"
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/20 placeholder-white/60 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-4 top-3.5 text-white/70" />
            <input onChange={e => setPassword(e.target.value)} value={password}
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/20 placeholder-white/60 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white transition-all"
            />
          </div>

          {/* Forgot Password (Login only) */}
          {!isSignup && (
            <div className="text-right text-sm text-white/70 hover:underline cursor-pointer">
              Forgot password?
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-white text-black font-medium py-2.5 mt-2 rounded-full transition-all transform hover:scale-95 active:scale-90 hover:bg-slate-100"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </motion.form>

        {/* Toggle Auth */}
        <p className="text-sm mt-6 text-white/70 text-center">
          {isSignup ? 'Already have an account?' : 'Don’t have an account?'}{' '}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-white underline font-medium cursor-pointer"
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  // Handle confetti and navigation
  const handleClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    if (user) {
      navigate('/result');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="pb-16 text-center flex flex-col items-center justify-center relative">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-900 md:py-10"
      >
        See the magic. Try now
      </motion.h1>

      {/* Generate Button */}
      <motion.button
        onClick={handleClick}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="relative overflow-hidden text-white bg-black mt-4 px-12 py-3 flex items-center gap-2 rounded-full backdrop-blur-md bg-opacity-80 shadow-xl border border-white/10 transition-all duration-300"
      >
        <span className="relative z-10 flex items-center gap-2">
          Generate Image 
          <img src={assets.star_group} className="h-6" alt="✨" />
        </span>

        {/* Shimmer */}
        <span className="absolute top-0 left-[-50%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer z-0"></span>
      </motion.button>

      {/* Optional BG Glow */}
      <div className="absolute -z-10 top-[70%] w-60 h-60 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
    </div>
  );
};

export default GenerateBtn;

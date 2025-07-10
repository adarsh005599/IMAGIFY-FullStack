import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const Fotter = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex items-center justify-between gap-4 py-4 mt-20 px-6 rounded-xl bg-white/10 backdrop-blur-lg shadow-md border border-white/10"
    >
      <img src={assets.logo} width={150} alt="Logo" />
      
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        Copyright © Adarsh | All rights reserved
      </p>

      <div className="flex gap-2.5">
        <motion.img whileHover={{ scale: 1.2 }} src={assets.facebook_icon} width={35} />
        <motion.img whileHover={{ scale: 1.2 }} src={assets.twitter_icon} width={35} />
        <motion.img whileHover={{ scale: 1.2 }} src={assets.instagram_icon} width={35} />
      </div>
    </motion.div>
  );
};

export default Fotter;

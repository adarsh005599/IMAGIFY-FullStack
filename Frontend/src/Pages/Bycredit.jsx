import React, { useContext } from 'react';
import { assets, plans } from '../assets/assets';
import logo from '../assets/logo.svg'; // or your preferred icon
import { AppContext } from '../Context/AppContext';
import { motion } from 'framer-motion';

const Bycredit = () => {
  const { user } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-black/50 backdrop-blur-sm px-4 py-16">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-200">
          Choose the plan
        </h1>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              whileHover={{ scale: 1.03 }}
              className="relative bg-white rounded-2xl shadow-lg p-8 text-left transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 z-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent animate-pulse rounded-2xl pointer-events-none" />

              {/* Logo */}
              <div className="relative z-10 mb-6">
                <img
                  src={assets.logo_icon}
                  alt="Plan Icon"
                  className="w-10 h-10"
                />
              </div>

              {/* Plan Info */}
              <h2 className="relative z-10 text-xl font-semibold text-gray-800 mb-1">
                {plan.id}
              </h2>
              <p className="relative z-10 text-gray-500 text-sm mb-3">
                {plan.desc}
              </p>
              <p className="relative z-10 text-3xl font-bold text-gray-900 mb-1">
                {plan.price}
              </p>
              <span className="relative z-10 text-base font-medium text-gray-500">
                {plan.credits} credits
              </span>

              {/* Purchase Button */}
              <button className="relative z-10 mt-6 w-full bg-zinc-900 text-white px-6 py-2.5 rounded-full transform transition-all duration-300 hover:bg-zinc-800 hover:scale-95 active:scale-90">
                {user ? 'Purchase' : 'Get started'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bycredit;

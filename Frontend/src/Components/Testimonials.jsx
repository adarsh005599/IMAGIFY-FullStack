import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { assets, testimonialsData } from '../assets/assets';

const Testimonials = () => {
  return (
    <div className='flex flex-col items-center justify-center my-20 py-12'>
      <h1 className='text-3xl sm:text-4xl font-semibold'>Customer Testimonials</h1>
      <p className='text-gray-500 mb-12'>What Our Users Are Saying</p>

      <div className='flex flex-wrap gap-6 justify-center'>
        {testimonialsData.map((testimonial, index) => (
          <AnimatedCard key={index} testimonial={testimonial} index={index} />
        ))}
      </div>
    </div>
  );
};

// Separate component with animation
const AnimatedCard = ({ testimonial, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: false, // animate every time it comes into view
    threshold: 0.2,     // percentage of component visible before trigger
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
      className='bg-white/20 p-12 rounded-lg border border-b-blue-600 shadow-md w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all'
    >
      <div className='flex flex-col items-center'>
        <img src={testimonial.image} className='rounded-full w-14' />
        <h2 className='text-xl font-semibold mt-3'>{testimonial.name}</h2>
        <p className='text-gray-500 mb-4'>{testimonial.role}</p>
        <div className='flex mb-4'>
          {Array(testimonial.stars).fill().map((_, i) => (
            <img key={i} src={assets.rating_star} />
          ))}
        </div>
        <p className='text-center text-sm text-gray-600'>{testimonial.text}</p>
      </div>
    </motion.div>
  );
};

export default Testimonials;

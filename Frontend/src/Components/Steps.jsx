import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}

const Steps = () => {
  return (
    <motion.div
      className='flex flex-col items-center justify-center my-32'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h1
        className='text-3xl sm:text-4xl font-semibold mb-2'
        variants={fadeInUp}
        custom={0}
      >
        How it works
      </motion.h1>

      <motion.p
        className='text-lg text-gray-600 mb-8'
        variants={fadeInUp}
        custom={0.2}
      >
        Transform Words Into Stunning Images
      </motion.p>

      <div className='space-y-4 w-full max-w-3xl text-sm'>
        {stepsData.map((items, index) => (
          <motion.div
            key={index}
            className='flex items-center p-5 px-8 bg-white/20 shadow-md border cursor-pointer hover:scale-[1.02] gap-4 border-b-blue-600 transition-all duration-300 rounded-lg'
            variants={fadeInUp}
            custom={index * 0.25 + 0.3}
          >
            <img width={40} src={items.icon} />
            <div>
              <h2 className='text-xl font-medium'>{items.title}</h2>
              <p className='text-gray-500'>{items.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Steps

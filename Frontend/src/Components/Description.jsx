import React from 'react'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
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

const Description = () => {
  return (
    <motion.div
      className='flex flex-col items-center justify-center my-24 p-6 md:px-28'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h1
        className='text-3xl sm:text-4xl font-semibold mb-2'
        variants={fadeInUp}
        custom={0}
      >
        Create AI Image
      </motion.h1>

      <motion.p
        className='text-gray-500 mb-8'
        variants={fadeInUp}
        custom={0.2}
      >
        Turn your imagination into visuals
      </motion.p>

      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <motion.img
          width={800}
          className='xl:w-96 rounded-lg'
          src={assets.sample_img_1}
          alt="AI Sample"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className='max-w-lg'
        >
          <motion.h2
            className='text-3xl font-medium mb-4'
            variants={fadeInUp}
            custom={0}
          >
            Introducing the AI-Powered Text to Image Generator
          </motion.h2>

          <motion.p
            className='text-gray-600 mb-4'
            variants={fadeInUp}
            custom={0.3}
          >
            Easily bring your ideas to life with the free AI image generator.
            Whether you need stunning visuals or unique imagery, our tool
            transforms your text into eye-catching images with just a few clicks.
            Imagine it, describe it, and watch it come to life instantly.
          </motion.p>

          <motion.p
            className='text-gray-600'
            variants={fadeInUp}
            custom={0.5}
          >
            Simply type in a text prompt, and our cutting-edge AI will generate
            high-quality images in seconds. From product visuals to character
            designs and portraits—even concepts that don't yet exist—everything
            can be visualized effortlessly. Powered by advanced AI, the creative
            possibilities are limitless.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Description

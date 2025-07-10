import React from "react"
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from "../Context/AppContext"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"

const Hedder = () => {
    const {user, setShowLogin} = useContext(AppContext)
    const navigate = useNavigate()
    const onClickHandler= ()=>{
        if(user){
            navigate('./result')
        } else{
            setShowLogin(true)
        }
    }
  return (
    <motion.div
      className="flex-col justify-center items-center text-center my-20 px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
    >
      {/* Badge */}
      <motion.div
        className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border-b border-blue-600 shadow-sm"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <p>🔥 Best text to image generator</p>
        <img src={assets.star_icon} alt="star" />
      </motion.div>

      {/* Headline */}
      <motion.h1
        className="text-4xl md:text-7xl max-w-[90%] md:max-w-[900px] mx-auto text-center font-extrabold leading-tight mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Turn text to <span className="text-blue-600">visual magic</span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="text-center text-md md:text-lg text-gray-600 max-w-xl mx-auto mt-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Powered by AI. Turn your imagination into visual arts in seconds — just type, and watch the magic happen.
      </motion.p>
 
     <motion.button onClick={onClickHandler}
  whileHover={{ scale: 1.06 }}
  whileTap={{ scale: 0.95 }}
  animate={{ y: [0, -5, 0] }}
  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
  className="relative mx-auto overflow-hidden text-white bg-black mt-8 px-12 py-3 flex items-center gap-2 rounded-full backdrop-blur-md bg-opacity-80 shadow-xl border border-white/10 transition-all duration-300"
>
        <span className="relative z-10 flex items-center gap-2">
          Generate Images
          <img src={assets.star_group} className="h-6" />
        </span>

        {/* Shimmer Layer */}
        <span className="absolute top-0 left-[-50%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer z-0"></span>
      </motion.button>

      {/* Generated Samples */}
      <motion.div
        className="flex flex-wrap justify-center mt-16 gap-3"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {Array(6).fill().map((_, index) => (
          <motion.img
            key={index}
            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
            alt="sample"
            width={70}
            className="rounded hover:scale-105 transition-all duration-300 cursor-pointer w-max-sm-10"
            whileHover={{ scale: 1.1 }}
          />
        ))}
      </motion.div>

      <p className="mt-2 text-neutral-600">Generated images from imgify</p>
    </motion.div>
  );
};

export default Hedder;

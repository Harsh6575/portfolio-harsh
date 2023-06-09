"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineArrowUp } from 'react-icons/ai';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.pageYOffset;
      const screenHeightThreshold = 500; // Set the screen height threshold in pixels

      setIsVisible(scrollHeight > screenHeightThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center ${isVisible ? '' : 'hidden'}`}>
      <a href="#" onClick={handleGoToTop}>
        <div className="w-[50px] h-[50px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
          <motion.div
            animate={{
              y: [-5, 5, -5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            <AiOutlineArrowUp className="w-7 h-7 mb-1"/>
          </motion.div>
        </div>
      </a>
    </div>
  );
};

export default GoToTopButton;
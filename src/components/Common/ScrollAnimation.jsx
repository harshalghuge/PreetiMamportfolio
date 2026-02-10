import React from 'react';

const ScrollAnimation = () => {
  return (
     <motion.a
          href="#who-i-am"
          // initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: [1, 1.08, 1] }}
          transition={{
            delay: 1.2,
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center text-white/90 hover:text-white transition-colors"
          aria-label="Scroll down to Who I am section"
        >
          <span className="text-[13px] tracking-[0.35em] uppercase mb-3">
            Scroll Down
          </span>
          <span className="relative w-14 h-14 rounded-full border-2 border-white/80 flex items-center justify-center">
            <motion.span
              // animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 1.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-2xl leading-none"
            >
              ↓
            </motion.span>
            <motion.span
              // animate={{ scale: [1, 1.45], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border-2 border-white/60"
            />
          </span>
        </motion.a> 
  );
}

export default ScrollAnimation;

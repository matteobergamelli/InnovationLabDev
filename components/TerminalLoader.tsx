import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const TerminalLoader: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  
  const sequence = [
    "> DETECTING NFC SIGNAL...",
    "> MATERIAL: VELVET_OMNICHANNEL",
    "> DECODING CANDIDATE DATA...",
    "> SYNCING NEURAL MESH...",
    "> ACCESS GRANTED."
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < sequence.length) {
        setLines(prev => [...prev, sequence[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="w-full max-w-md p-6 font-mono text-sm md:text-base">
        {lines.map((line, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-2 text-[#00ff41] drop-shadow-[0_0_5px_rgba(0,255,65,0.8)]"
          >
            {line}
          </motion.div>
        ))}
        <motion.span 
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-3 h-5 bg-[#00ff41] ml-1 align-middle"
        />
      </div>
    </motion.div>
  );
};
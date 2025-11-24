import React from 'react';
import { motion } from 'framer-motion';

export const CodeBlock: React.FC = () => {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-lg overflow-hidden bg-[#0d0d0d] border border-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.15)] max-w-xl mx-auto"
    >
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-[#333]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <span className="text-[10px] text-[#00ff41] font-mono opacity-70">// middleware.js</span>
      </div>
      
      <div className="p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
        <div className="text-gray-400">
          <span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">checkCompatibility</span> = (<span className="text-[#d19a66]">system</span>) ={'>'} {'{'}
        </div>
        <div className="pl-4">
          <span className="text-[#c678dd]">if</span> (
          <span className="text-[#e06c75]">Legacy_Systems</span> && 
          <span className="text-[#e06c75]">Future_AI</span>
          ) {'{'}
        </div>
        <div className="pl-8 text-[#98c379]">
          return <span className="text-[#e06c75]">"Matteo Bergamelli"</span>;
        </div>
        <div className="pl-4">
          {'}'} <span className="text-[#c678dd]">else</span> {'{'}
        </div>
        <div className="pl-8 text-[#98c379]">
          return <span className="text-red-400">"Gap Tecnologico"</span>;
        </div>
        <div className="pl-4">{'}'}</div>
        <div>{'}'};</div>
      </div>
      
      {/* Animated Cursor */}
      <div className="absolute bottom-6 right-6 w-2 h-4 bg-[#00ff41] animate-pulse" />
    </motion.div>
  );
};
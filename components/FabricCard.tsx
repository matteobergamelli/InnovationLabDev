import React from 'react';
import { motion } from 'framer-motion';

interface FabricCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  quote: string;
  items: string[];
  footer: string;
  highlight?: boolean;
  delay?: number;
}

export const FabricCard: React.FC<FabricCardProps> = ({ 
  icon, title, subtitle, quote, items, footer, highlight = false, delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className={`relative p-8 rounded-xl overflow-hidden group transition-all duration-300 backdrop-blur-md ${
        highlight 
          ? 'bg-gradient-to-br from-[#1a1a1a]/90 to-[#0a0a0a]/90 border border-[#00ff41]' 
          : 'bg-[#0f0f0f]/80 border border-[#333] hover:border-[#00ff41]/50'
      }`}
    >
      {/* Dynamic Background Shine on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff41]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-6 relative z-10">
        <div className="shrink-0 pt-1">
          <div className="p-3 bg-black/50 rounded-lg border border-[#333] group-hover:border-[#00ff41] transition-colors">
            {icon}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className={`font-serif text-2xl font-bold mb-2 ${highlight ? 'text-[#00ff41]' : 'text-white'}`}>
            {title}
          </h3>
          <p className="text-xs text-[#00ff41] mb-4 font-mono tracking-widest">{subtitle}</p>
          
          <p className="text-sm italic opacity-80 mb-6 font-serif border-l-2 border-[#333] pl-4 group-hover:border-[#00ff41] transition-colors">
            "{quote}"
          </p>
          
          <ul className="space-y-3 mb-6">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm font-mono opacity-90">
                <span className="text-[#00ff41] mt-[2px]">→</span>
                <span>
                  {item.split(' ').map((word, wIdx) => {
                    // Simple highlighting logic for tech terms
                    const isHighlight = ['13','Zucchetti','SAP','SQL','Python','AI','OpenAI','Gemini','RAG','PDF-to-JSON','Spark','Meta','Magazziniere','CTO','Physical','Digital'].some(k => word.includes(k));
                    return isHighlight ? <span key={wIdx} className="text-[#00ff41] font-bold">{word} </span> : word + ' ';
                  })}
                </span>
              </li>
            ))}
          </ul>
          
          <p className={`text-xs mt-4 italic ${highlight ? 'text-[#00ff41] font-bold' : 'opacity-60'}`}>
            "{footer}"
          </p>
        </div>
      </div>
    </motion.div>
  );
};
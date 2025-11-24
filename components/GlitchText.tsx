import React from 'react';
import './GlitchText.css'; // We'll inject styles via style tag in component for simplicity in this format

export const GlitchText: React.FC<{ text: string, className?: string }> = ({ text, className }) => {
  return (
    <div className={`glitch-wrapper ${className}`}>
      <span className="glitch" data-text={text}>
        {text}
      </span>
      <style>{`
        .glitch-wrapper {
          position: relative;
          display: inline-block;
        }
        .glitch {
          position: relative;
          color: inherit;
        }
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #050505;
        }
        .glitch::before {
          left: 2px;
          text-shadow: -1px 0 #00ff41;
          clip: rect(24px, 550px, 90px, 0);
          animation: glitch-anim 3s infinite linear alternate-reverse;
        }
        .glitch::after {
          left: -2px;
          text-shadow: -1px 0 #ff00ff;
          clip: rect(85px, 550px, 140px, 0);
          animation: glitch-anim 2.5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
          0% { clip: rect(10px, 9999px, 30px, 0); }
          20% { clip: rect(80px, 9999px, 100px, 0); }
          40% { clip: rect(40px, 9999px, 60px, 0); }
          60% { clip: rect(20px, 9999px, 100px, 0); }
          80% { clip: rect(90px, 9999px, 5px, 0); }
          100% { clip: rect(10px, 9999px, 60px, 0); }
        }
      `}</style>
    </div>
  );
};
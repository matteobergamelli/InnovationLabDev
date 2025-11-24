import React from 'react';
import { motion } from 'framer-motion';
import { FabricCard } from './FabricCard';
import { GlitchText } from './GlitchText';
import { CodeBlock } from './CodeBlock';
import { UnlockSlider } from './UnlockSlider';
import { 
  Cpu, 
  Brain, 
  Smartphone, 
  Github, 
  Linkedin, 
  Mail, 
  Phone 
} from 'lucide-react';

interface ContentOverlayProps {
  onEnterAr?: () => void;
}

export const ContentOverlay: React.FC<ContentOverlayProps> = ({ onEnterAr }) => {
  return (
    <main className="w-full relative">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
        <div className="max-w-4xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlitchText 
              text="Physical Touch," 
              className="font-serif text-5xl md:text-7xl font-bold mb-2 text-white" 
            />
            <GlitchText 
              text="Digital Mind." 
              className="font-serif text-5xl md:text-7xl font-bold mb-8 text-[#00ff41]" 
            />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-base md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto font-mono"
          >
            Ciao Innovation Lab. Hai appena trasformato un pezzo di stoffa in un flusso dati. 
            Questo è il mio concetto di <span className="text-[#00ff41] font-bold">Omnichannel</span>.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-[#00ff41] flex items-center justify-center bg-black/50 backdrop-blur-sm mb-4 shadow-[0_0_20px_rgba(0,255,65,0.3)]">
              <span className="text-3xl font-bold text-[#00ff41]">MB</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-1">Matteo Bergamelli</h2>
            <p className="text-[#00ff41] text-xs md:text-sm font-mono tracking-wider mb-2">INNOVATION / AI DEVELOPER</p>
            <span className="px-3 py-1 border border-[#00ff41]/50 rounded-full text-[10px] text-[#00ff41] bg-[#00ff41]/10">
              📍 Km0 - Padenghe s/G
            </span>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono tracking-[0.2em] text-[#00ff41]">SCROLL TO DECODE</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#00ff41] to-transparent"></div>
        </motion.div>
      </section>

      {/* Fabric Decoder Section */}
      <section className="px-6 py-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              The Fabric <span className="text-[#00ff41]">Decoder</span>
            </h2>
            <p className="font-mono text-sm opacity-60">
              // Tre tessuti. Tre layer tecnologici. Una sola persona.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <FabricCard 
              icon={<Cpu className="w-8 h-8 text-[#00ff41]" />}
              title="LEGACY STRUCTURE"
              subtitle="JEANS / RAW"
              quote="Solido. Resistente. Il ferro del Retail."
              items={[
                "13 anni di esperienza sul campo",
                "ERP Zucchetti AdHoc & SAP Business One",
                "Integrazione Hardware: PLC & Bilance",
                "SQL Server Expert"
              ]}
              footer="So far funzionare le cose 'vecchie' e pesanti."
            />
            
            <FabricCard 
              icon={<Brain className="w-8 h-8 text-[#00ff41]" />}
              title="GENERATIVE MESH"
              subtitle="NYLON / TECH"
              quote="Flessibile. Sintetico. Il futuro."
              items={[
                "Python per AI & Automazione",
                "AI Agents: OpenAI, Gemini, Claude",
                "RAG su documenti aziendali",
                "Middleware PDF-to-JSON"
              ]}
              footer="Creo intelligenza che automatizza il lavoro sporco."
              delay={0.2}
            />
            
            <FabricCard 
              icon={<Smartphone className="w-8 h-8 text-[#00ff41]" />}
              title="THE OMNICHANNEL BLEND"
              subtitle="VELLUTO / NFC"
              quote="L'integrazione perfetta."
              items={[
                "Il 'Missing Middleware' SAP-AI",
                "Graphic Design & AR (Spark AR)",
                "Bridge tra Magazzino e CTO",
                "Phygital Experiences"
              ]}
              footer="Questo NFC che stai toccando? È solo l'inizio."
              highlight
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* The Hidden AR Layer */}
      <section className="px-6 py-24 relative z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0d0d0d] to-black opacity-90"></div>
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        
        <div className="max-w-3xl mx-auto relative text-center">
          <div className="mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-white">
              The Hidden <span className="text-[#00ff41] animate-pulse">Layer</span>
            </h2>
            <p className="font-mono text-xs md:text-sm opacity-70 max-w-lg mx-auto">
              C'è un quarto livello di realtà nascosto in questo tessuto. 
              Sblocca il protocollo AR per visualizzare i dati nascosti.
            </p>
          </div>

          <div className="py-8">
             {onEnterAr && <UnlockSlider onUnlock={onEnterAr} />}
          </div>
          
          <p className="mt-8 text-[10px] text-[#00ff41]/60 font-mono">
            // REQUIRES CAMERA PERMISSION
          </p>
        </div>
      </section>

      {/* The Missing Link Section */}
      <section className="px-6 py-24 relative z-10 bg-black/60 backdrop-blur-md border-y border-[#333]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
            The <span className="text-[#00ff41]">"Missing Link"</span>
          </h2>
          
          <CodeBlock />

          <p className="text-center text-sm md:text-base leading-relaxed opacity-90 mt-8 font-mono">
            La vostra Job Description <span className="text-[#00ff41] font-bold">(ID 247442889)</span> cerca qualcuno che unisca questi mondi.
            <br />
            <span className="font-serif text-xl md:text-2xl font-bold mt-6 block text-white">
              Io sono quel connettore.
            </span>
          </p>

          <div className="mt-12 p-6 bg-[#0a0a0a]/80 rounded-lg border border-[#333] backdrop-blur-sm">
            <p className="text-xs font-mono opacity-60 mb-4 text-[#00ff41]">// CURRENT STACK</p>
            <div className="flex flex-wrap gap-2">
              {['Python', 'SAP B1', 'SQL Server', 'LLM Orchestration', 'OPCUA', 'Spark AR', 'React'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-[#151515] border border-[#00ff41]/40 rounded text-xs font-mono text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="px-6 py-20 bg-black relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12">
            Iniziamo a <span className="text-[#00ff41]">connettere</span>?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            <a href="#" className="group flex items-center justify-center gap-2 px-6 py-4 bg-[#00ff41] text-black font-mono text-sm font-bold rounded hover:bg-transparent hover:text-[#00ff41] border border-[#00ff41] transition-all">
              <span className="group-hover:translate-x-1 transition-transform">📄 SCARICA CV TECNICO</span>
            </a>
            <a href="tel:+393428194066" className="flex items-center justify-center gap-2 px-6 py-4 bg-transparent text-[#f5f5f5] font-mono text-sm border border-[#333] rounded hover:border-[#00ff41] hover:text-[#00ff41] transition-all">
              <Phone size={16} /> Chiama Matteo
            </a>
            <a href="mailto:matteo.bergamelli1989@gmail.com" className="flex items-center justify-center gap-2 px-6 py-4 bg-transparent text-[#f5f5f5] font-mono text-sm border border-[#333] rounded hover:border-[#00ff41] hover:text-[#00ff41] transition-all">
              <Mail size={16} /> Email
            </a>
            <a href="https://linkedin.com/in/matteobergamelli" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-4 bg-transparent text-[#f5f5f5] font-mono text-sm border border-[#333] rounded hover:border-[#00ff41] hover:text-[#00ff41] transition-all">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>

          <div className="pt-8 border-t border-[#333] text-left md:text-center">
            <p className="font-mono text-[10px] md:text-xs opacity-40 leading-relaxed uppercase tracking-widest">
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br/>
              ONIVERSE PHYGITAL EXPERIENCE<br/>
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br/><br/>
              Printed at: Padenghe s/G<br/>
              Cost: 0€<br/>
              Value: <span className="text-[#00ff41]">Infinite</span><br/><br/>
              Promotica S.p.A | Freelance AI Dev<br/>
              Made with ❤️ and <span className="text-[#00ff41]">Code</span><br/><br/>
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
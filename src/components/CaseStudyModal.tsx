import React, { useEffect } from 'react';
import { X, Target, Cpu, TrendingUp, Layers, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { CaseStudy } from '../types';
import { personalInfo } from '../data';

interface CaseStudyModalProps {
  campaign: CaseStudy;
  onClose: () => void;
}

export default function CaseStudyModal({ campaign, onClose }: CaseStudyModalProps) {
  
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Split results if available
  const resultMetrics = campaign.resultSummary.split(' | ');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      {/* Dark frosted overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/95 backdrop-blur-[20px]"
        onClick={onClose}
      />

      {/* Slide-up Container */}
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.23, 1, 0.32, 1] // smooth cubic-bezier
        }}
        className="relative w-full max-w-[800px] bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header Hero Image (400px height) */}
        <div className="relative h-[280px] md:h-[400px] overflow-hidden flex-shrink-0">
          <img
            src={campaign.thumbnailUrl}
            alt={campaign.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {/* Bottom dark gradient transition */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-black/40" />

          {/* Close button with rotate on hover */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 rounded-full bg-black/70 border border-white/10 text-white hover:text-[#e63946] hover:border-[#e63946]/50 transition-all duration-300 hover:rotate-90 z-30"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Overlay Title */}
          <div className="absolute bottom-6 left-6 right-6 md:left-8 md:right-8">
            <span className="font-mono text-[10px] font-bold text-[#e63946] bg-[#e63946]/10 border border-[#e63946]/30 px-3 py-1 rounded-full uppercase tracking-[2px]">
              {campaign.category}
            </span>
            <h2 className="font-display font-black text-3xl md:text-[40px] leading-[1.1] tracking-tight text-white mt-4">
              {campaign.title}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8 flex-1 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
          
          {/* Editorial 2x2 Grid of Goal, Platform, Strategy, Result */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* GOAL */}
            <div className="p-5 rounded-xl bg-neutral-900/40 border border-white/5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#e63946]/10 text-[#e63946] rounded-lg">
                  <Target size={18} />
                </div>
                <span className="font-mono text-[11px] font-bold text-white/50 uppercase tracking-[2px]">
                  OBJECTIVE GOAL
                </span>
              </div>
              <p className="font-sans text-[14px] text-white/85 leading-relaxed">
                {campaign.goal}
              </p>
            </div>

            {/* PLATFORM */}
            <div className="p-5 rounded-xl bg-neutral-900/40 border border-white/5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#e63946]/10 text-[#e63946] rounded-lg">
                  <Layers size={18} />
                </div>
                <span className="font-mono text-[11px] font-bold text-white/50 uppercase tracking-[2px]">
                  CHANNELS & PLATFORMS
                </span>
              </div>
              <p className="font-sans text-[14px] text-white/85 leading-relaxed">
                {campaign.platform} — Client: {campaign.clientName}
              </p>
            </div>

            {/* STRATEGY */}
            <div className="p-5 rounded-xl bg-neutral-900/40 border border-white/5 flex flex-col gap-3 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#e63946]/10 text-[#e63946] rounded-lg">
                  <Cpu size={18} />
                </div>
                <span className="font-mono text-[11px] font-bold text-white/50 uppercase tracking-[2px]">
                  STRATEGIC ACTION PLAN
                </span>
              </div>
              <ul className="space-y-3">
                {campaign.strategy.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-[#e63946]/10 text-[#e63946] font-mono text-[11px] font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="font-sans text-[14px] text-white/70 leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Results: Big Bold Red Numbers with Labels */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-[14px] tracking-[4px] text-white uppercase border-b border-white/5 pb-2">
              📈 MEASURED BUSINESS IMPACT
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resultMetrics.map((met, idx) => (
                <div key={idx} className="p-5 bg-gradient-to-br from-[#a4161a]/10 to-[#e63946]/5 rounded-xl border border-[#e63946]/20 flex flex-col justify-center">
                  <span className="font-display font-black text-3xl md:text-[36px] text-[#e63946] leading-none mb-1">
                    {met.split(' ')[0]}
                  </span>
                  <span className="font-mono text-[11px] text-white/60 uppercase tracking-[2px] mt-1">
                    {met.split(' ').slice(1).join(' ')}
                  </span>
                </div>
              ))}
            </div>

            {/* List results detail */}
            <div className="space-y-3 pt-2">
              {campaign.results.map((res, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-neutral-900/20 rounded border border-white/5">
                  <CheckCircle size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="font-sans text-[14px] text-white/80">
                    {res}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Proof Area Below (Grid for screenshots with descriptions) */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-[14px] tracking-[4px] text-white uppercase border-b border-white/5 pb-2">
              🛡️ AUDITED PROOF & ATTRIBUTION
            </h3>
            <div className="p-4 rounded-xl border border-dashed border-white/10 bg-black/40 space-y-3">
              <span className="font-mono text-[9px] text-[#e63946] font-bold uppercase tracking-[2px]">
                PROOF STATEMENT:
              </span>
              <p className="font-sans text-[13px] text-white/70 italic leading-relaxed">
                &ldquo;{campaign.visualProofDescription}&rdquo;
              </p>
              
              {/* Screenshot placeholder grid with red theme lines */}
              <div className="grid grid-cols-3 gap-3 h-20 pt-2 relative">
                <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-white/5 pointer-events-none" />
                <div className="rounded border border-white/5 bg-neutral-950/60 flex items-center justify-center font-mono text-[9px] text-white/30 uppercase tracking-widest">
                  DATA AUDIT
                </div>
                <div className="rounded border border-[#e63946]/10 bg-[#e63946]/5 flex items-center justify-center font-mono text-[9px] text-[#e63946]/50 uppercase tracking-widest">
                  VERIFIED
                </div>
                <div className="rounded border border-white/5 bg-neutral-950/60 flex items-center justify-center font-mono text-[9px] text-white/30 uppercase tracking-widest">
                  ROAS STABLE
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer CTA & Replicate numbers */}
        <div className="p-6 md:px-8 border-t border-white/10 bg-[#070707] flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
          <p className="font-sans text-[13px] text-white/60 text-center sm:text-left">
            Want to replicate these performance metrics for your business?
          </p>
          <a
            href={`https://wa.me/91${personalInfo.whatsappNumber}?text=Hi%20Chandan,%20I'd%20love%20to%20discuss%20a%20campaign%20similar%20to%20the%20${encodeURIComponent(campaign.title)}!`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-[#e63946] hover:bg-red-700 text-white font-display text-xs tracking-widest font-bold rounded uppercase text-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(230,57,70,0.45)]"
          >
            DISCUSS THIS PROJECT
          </a>
        </div>
      </motion.div>
    </div>
  );
}

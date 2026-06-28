import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { personalInfo } from '../data';

export default function WhatsAppButton() {
  const message = encodeURIComponent("Hi Chandan, I visited your portfolio and would love to discuss scaling our digital marketing campaigns!");
  const waUrl = `https://wa.me/91${personalInfo.whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 pointer-events-auto">
      {/* Pulse rings */}
      <div className="absolute inset-0 bg-emerald-500 rounded-full blur-[8px] animate-ping opacity-25" />
      <div className="absolute -inset-1 bg-emerald-500 rounded-full opacity-10 animate-pulse" />

      <motion.a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.6)] border border-emerald-400/20 transition-all duration-300"
        whileHover={{ scale: 1.12, rotate: 8 }}
        whileTap={{ scale: 0.92 }}
      >
        <MessageCircle size={28} className="fill-white stroke-emerald-500" />
        
        {/* Floating Tooltip Label */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#121212] text-white border border-emerald-500/20 px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden sm:inline-block">
          CHAT ON WHATSAPP
        </span>
      </motion.a>
    </div>
  );
}

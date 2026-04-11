import { motion } from "motion/react";
import { BotanicalCornerTL, BotanicalCornerTR, BotanicalCornerBL, BotanicalCornerBR } from "./BotanicalElements";

const HERO_BG = "https://images.unsplash.com/photo-1758080158594-5464893bd03e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBib3RhbmljYWwlMjB3ZWRkaW5nJTIwYmFja2dyb3VuZCUyMGVsZWdhbnR8ZW58MXx8fHwxNzc1MjE2MjUwfDA&ixlib=rb-4.1.0&q=80&w=1080";

export function HeroSection() {
  const scrollToRSVP = () => {
    const el = document.getElementById("rsvp");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      {/* Sage green overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#9CAF88]/60 via-[#87A878]/40 to-[#FAF6F0]/80" />
      {/* Ivory vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(250,246,240,0.5)_100%)]" />

      {/* Corner Botanicals */}
      <div className="absolute top-0 left-0 w-40 h-40 md:w-56 md:h-56 pointer-events-none">
        <BotanicalCornerTL className="w-full h-full" />
      </div>
      <div className="absolute top-0 right-0 w-40 h-40 md:w-56 md:h-56 pointer-events-none">
        <BotanicalCornerTR className="w-full h-full" />
      </div>
      <div className="absolute bottom-0 left-0 w-40 h-40 md:w-56 md:h-56 pointer-events-none">
        <BotanicalCornerBL className="w-full h-full" />
      </div>
      <div className="absolute bottom-0 right-0 w-40 h-40 md:w-56 md:h-56 pointer-events-none">
        <BotanicalCornerBR className="w-full h-full" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        {/* Script tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-['Great_Vibes'] text-2xl md:text-3xl text-[#2D2D2D] mb-2 opacity-80"
        >
          We're getting married
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-16 h-[1px] bg-[#D4AF6A]/70" />
          <div className="w-2 h-2 bg-[#D4AF6A] rotate-45" />
          <div className="w-16 h-[1px] bg-[#D4AF6A]/70" />
        </motion.div>

        {/* Couple Names */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="font-['Great_Vibes'] text-6xl md:text-8xl lg:text-9xl text-[#2D2D2D] leading-none mb-6"
          style={{ textShadow: "0 2px 20px rgba(250,246,240,0.6)" }}
        >
          <p>Onifeloluwa</p>
          <p>&</p>
          <p>Oluwaseun</p>
        </motion.h1>

        {/* Date & Venue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center mb-2"
        >
          <p className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-[#2D2D2D] tracking-[0.2em] font-light">
            JUNE 6, 2026
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mb-10"
        >
          <p className="font-['DM_Sans'] text-sm md:text-base text-[#2D2D2D]/70 tracking-[0.3em] uppercase">
            Imperial Hall, Alausa · Ikeja, Lagos
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={scrollToRSVP}
          className="relative overflow-hidden px-10 py-4 bg-[#C9A84C] text-white font-['DM_Sans'] text-sm tracking-[0.25em] uppercase rounded-full shadow-lg hover:bg-[#D4AF6A] transition-colors duration-300 group"
        >
          <span className="relative z-10">RSVP Now</span>
          {/* Shimmer */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        </motion.button>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="font-['DM_Sans'] text-xs tracking-[0.25em] uppercase text-[#2D2D2D]/50">Scroll</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-[#9CAF88] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

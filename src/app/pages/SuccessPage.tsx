import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import canvasConfetti from "canvas-confetti";
import { BotanicalFooter, BotanicalCornerTL, BotanicalCornerTR } from "../components/BotanicalElements";

export function SuccessPage() {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Confetti burst
    const duration = 3500;
    const animationEnd = Date.now() + duration;

    const colors = ["#9CAF88", "#87A878", "#D4AF6A", "#C9A84C", "#FAF6F0", "#b5c9a8"];

    const frame = () => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return;

      const particleCount = 3;

      canvasConfetti({
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.3 },
        colors,
        shapes: ["circle", "square"],
        scalar: 1.2,
      });
      canvasConfetti({
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.3 },
        colors,
        shapes: ["circle", "square"],
        scalar: 1.2,
      });

      requestAnimationFrame(frame);
    };

    // Initial burst
    canvasConfetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.3 },
      colors,
      shapes: ["circle", "square"],
      scalar: 1.3,
    });

    frame();

    return () => {
      canvasConfetti.reset();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Corner botanicals */}
      <div className="absolute top-0 left-0 w-40 h-40 md:w-52 md:h-52 pointer-events-none opacity-60">
        <BotanicalCornerTL className="w-full h-full" />
      </div>
      <div className="absolute top-0 right-0 w-40 h-40 md:w-52 md:h-52 pointer-events-none opacity-60">
        <BotanicalCornerTR className="w-full h-full" />
      </div>

      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#9CAF8818_0%,_transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Check icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-[#9CAF88]/20 border-2 border-[#9CAF88]/50 flex items-center justify-center mb-8 shadow-lg"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M6 16L12 22L26 10" stroke="#87A878" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        {/* Main message */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.35 }}
          className="font-['Great_Vibes'] text-5xl md:text-7xl text-[#2D2D2D] mb-5 leading-tight"
        >
          You're on the list!
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex items-center gap-3 mb-7"
        >
          <div className="w-14 h-[1px] bg-[#D4AF6A]/60" />
          <div className="w-2.5 h-2.5 bg-[#D4AF6A] rotate-45" />
          <div className="w-14 h-[1px] bg-[#D4AF6A]/60" />
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-[#2D2D2D]/80 font-light leading-relaxed mb-3"
        >
          We can't wait to celebrate with you.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="font-['Cormorant_Garamond'] text-lg md:text-xl text-[#2D2D2D]/65 font-light mb-10"
        >
          See you on June 6, 2026! 🥂
        </motion.p>

        {/* Botanical illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="w-full max-w-xs mb-10"
        >
          <BotanicalFooter className="w-full" />
        </motion.div>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          <Link
            to="/"
            className="font-['DM_Sans'] text-sm tracking-widest uppercase text-[#C9A84C] hover:text-[#D4AF6A] transition-colors duration-300 underline underline-offset-4 decoration-[#D4AF6A]/50 hover:decoration-[#D4AF6A]"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

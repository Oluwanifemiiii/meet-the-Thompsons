import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { BotanicalFooter, BotanicalDivider } from "./BotanicalElements";

export function FooterSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer className="relative py-20 px-6 bg-[#FAF6F0] overflow-hidden">
      <div ref={ref} className="max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Top divider */}
        <BotanicalDivider className="w-full max-w-md mb-14" />

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="font-['Great_Vibes'] text-4xl md:text-5xl text-[#2D2D2D] mb-8 leading-relaxed"
        >
          And they lived happily ever after
        </motion.p>

        {/* Gold divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-16 h-[1px] bg-[#D4AF6A]/60" />
          <div className="w-2 h-2 bg-[#D4AF6A] rotate-45" />
          <div className="w-16 h-[1px] bg-[#D4AF6A]/60" />
        </motion.div>

        {/* Names */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-['Cormorant_Garamond'] text-2xl text-[#2D2D2D] font-light tracking-widest mb-2"
        >
          Onifeloluwa & Oluwaseun
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-['DM_Sans'] text-sm text-[#2D2D2D]/55 tracking-[0.25em] mb-12"
        >
          JUNE 6, 2026 · IKEJA, LAGOS
        </motion.p>

        {/* Botanical illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="w-full max-w-xs"
        >
          <BotanicalFooter className="w-full" />
        </motion.div>

        {/* Admin link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-10 flex items-center gap-4"
        >
          <div className="w-12 h-[1px] bg-[#9CAF88]/40" />
          <a
            href="/admin"
            className="font-['DM_Sans'] text-xs tracking-widest uppercase text-[#2D2D2D]/30 hover:text-[#C9A84C] transition-colors duration-300"
          >
            Admin
          </a>
          <div className="w-12 h-[1px] bg-[#9CAF88]/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-4 font-['DM_Sans'] text-xs text-[#2D2D2D]/25 tracking-wide"
        >
          Made by Oluwanifemi
        </motion.p>
      </div>
    </footer>
  );
}

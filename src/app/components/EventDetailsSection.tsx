import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { BotanicalDivider } from "./BotanicalElements";

function RingsIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="13" cy="18" r="8" stroke="#D4AF6A" strokeWidth="1.8" fill="none"/>
      <circle cx="23" cy="18" r="8" stroke="#D4AF6A" strokeWidth="1.8" fill="none"/>
      <path d="M17 14 Q18 11 20 14" stroke="#D4AF6A" strokeWidth="1" fill="none" opacity="0.5"/>
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M18 4C13.6 4 10 7.6 10 12C10 19 18 32 18 32C18 32 26 19 26 12C26 7.6 22.4 4 18 4Z" stroke="#D4AF6A" strokeWidth="1.8" fill="none"/>
      <circle cx="18" cy="12" r="3.5" stroke="#D4AF6A" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="12" stroke="#D4AF6A" strokeWidth="1.8" fill="none"/>
      <path d="M18 10 L18 18 L24 21" stroke="#D4AF6A" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function EventCard({
  delay,
  icon,
  title,
  subtitle,
  date,
  time,
  venue,
  address,
  inView,
}: {
  delay: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="relative bg-[#FAF6F0] rounded-2xl shadow-md p-8 md:p-10 flex flex-col items-center text-center group hover:shadow-xl transition-shadow duration-300"
      style={{ border: "1.5px solid #D4AF6A66" }}
    >
      {/* Gold corner accent */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF6A]/40 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF6A]/40 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF6A]/40 rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF6A]/40 rounded-br-2xl" />

      {/* Icon */}
      <div className="mb-5 p-3 rounded-full bg-[#9CAF88]/15 group-hover:bg-[#9CAF88]/25 transition-colors duration-300">
        {icon}
      </div>

      {/* Title */}
      <p className="font-['DM_Sans'] text-xs tracking-[0.3em] uppercase text-[#9CAF88] mb-2">{subtitle}</p>
      <h3 className="font-['Cormorant_Garamond'] text-3xl text-[#2D2D2D] font-light mb-5">{title}</h3>

      {/* Divider */}
      <div className="w-12 h-[1px] bg-[#D4AF6A]/60 mb-5" />

      {/* Details */}
      <div className="space-y-3 w-full">
        <div className="flex items-center justify-center gap-3">
          <div className="w-4 h-[1px] bg-[#9CAF88]/50" />
          <p className="font-['Cormorant_Garamond'] text-lg text-[#2D2D2D] italic">{date}</p>
          <div className="w-4 h-[1px] bg-[#9CAF88]/50" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <ClockIcon />
          <p className="font-['DM_Sans'] text-sm text-[#2D2D2D]/70">{time}</p>
        </div>
        <div className="flex items-start justify-center gap-2">
          <div className="mt-0.5"><PinIcon /></div>
          <div className="text-left">
            <p className="font-['DM_Sans'] text-sm text-[#2D2D2D] font-medium">{venue}</p>
            <p className="font-['DM_Sans'] text-xs text-[#2D2D2D]/55">{address}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function EventDetailsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mapRef = useRef(null);
  const mapInView = useInView(mapRef, { once: true, margin: "-60px" });

  return (
    <section id="details" className="relative py-24 px-6 bg-[#9CAF88]/10">
      {/* Section Header */}
      <div className="text-center mb-16">
        <p className="font-['Great_Vibes'] text-3xl text-[#9CAF88] mb-2">Join us</p>
        <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-[#2D2D2D] tracking-wide font-light">
          Event Details
        </h2>
      </div>

      {/* Cards */}
      <div ref={ref} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        <EventCard
          delay={0}
          icon={<RingsIcon />}
          title="Church Wedding"
          subtitle="The Exchange of Vows"
          date="Saturday, June 6, 2026"
          time="9:00 AM"
          venue="Imperial Hall"
          address="Alausa · Ikeja, Lagos"
          inView={inView}
        />
        <EventCard
          delay={0.2}
          icon={<PinIcon />}
          title="Engagement Ceremony"
          subtitle="Dinner & Celebration"
          date="Saturday, June 6, 2026"
          time="12:00 Noon"
          venue="Imperial Hall"
          address="Alausa · Ikeja, Lagos"
          inView={inView}
        />
      </div>

      {/* Map Placeholder */}
      <motion.div
        ref={mapRef}
        initial={{ opacity: 0, y: 30 }}
        animate={mapInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-md"
        style={{ border: "1.5px solid #D4AF6A44" }}
      >
        <a
          href="https://www.google.com/maps/search/?api=1&query=Imperial+Hall+Alausa+Ikeja+Lagos+Nigeria"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          aria-label="Open Imperial Hall in Google Maps"
        >
        <div className="relative bg-[#9CAF88]/15 h-64 md:h-80 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-[#9CAF88]/22 transition-colors duration-300">
          {/* Faux map grid lines */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute w-full h-[1px] bg-[#9CAF88]" style={{ top: `${(i + 1) * 12}%` }} />
            ))}
            {[...Array(10)].map((_, i) => (
              <div key={i} className="absolute h-full w-[1px] bg-[#9CAF88]" style={{ left: `${(i + 1) * 10}%` }} />
            ))}
          </div>
          {/* Pin */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#D4AF6A] flex items-center justify-center shadow-lg">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C7.2 2 5 4.2 5 7C5 11.5 10 18 10 18C10 18 15 11.5 15 7C15 4.2 12.8 2 10 2Z" fill="white"/>
                <circle cx="10" cy="7" r="2" fill="#D4AF6A"/>
              </svg>
            </div>
            <div className="text-center bg-[#FAF6F0]/90 px-6 py-3 rounded-xl shadow-sm">
              <p className="font-['Cormorant_Garamond'] text-xl text-[#2D2D2D]">Imperial Hall</p>
              <p className="font-['DM_Sans'] text-xs text-[#2D2D2D]/60 tracking-wide mt-1">Alausa · Ikeja, Lagos</p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Imperial+Hall+Alausa+Ikeja+Lagos+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="font-['DM_Sans'] text-xs tracking-widest uppercase text-[#C9A84C] hover:text-[#D4AF6A] underline underline-offset-2 transition-colors"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
        </a>
      </motion.div>

      {/* Bottom Divider */}
      <div className="max-w-3xl mx-auto mt-16">
        <BotanicalDivider className="w-full" />
      </div>
    </section>
  );
}

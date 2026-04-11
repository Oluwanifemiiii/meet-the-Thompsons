import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { BotanicalDivider } from "./BotanicalElements";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const GROOM_IMG = "/danthom.jpeg?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMHBvcnRyYWl0JTIwZ29sZGVuJTIwaG91cnxlbnwxfHx8fDE3NzUyMTYyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const BRIDE_IMG = "/mrsthom.jpeg?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMHBvcnRyYWl0JTIwZ29sZGVuJTIwaG91cnxlbnwxfHx8fDE3NzUyMTYyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080";

const slides = [
  {
    id: "groom",
    label: "His Story",
    name: "Oluwaseun",
    tagline: "\"I knew from the moment I saw her\"",
    paragraphs: [
    "I've heard of lavish birthday gifts, houses, cars, jets, designer wristwatches, and the like, but in 2023, I received the most lavish birthday gift of all time.",
    "The gift started with 'hey', a response to my birthday post I had tweeted (Elon Musk had not yet destroyed Twitter at this time) earlier that day. This wasn't surprising, I was very active on Twitter at the time, and I had received lots of comments on my post, so I assumed it was one of those people who didn't like leaving public comments and would rather send a private dm.",
    "I didn't think much of it, and I responded with a simple 'Thank you so much'. But unlike other random chats, this one didn't end there. The chat moved to whatapp a few days later, and there was no turning back from then on.",
    "In the months that followed, the conversation continued. We went from texts that were few and far between to literally texting almost 24/7. In my mind, I had made a new friend, and I would have liked to keep it that way, but it was too late; the flame of love had been kindled, and it was fast becoming a ravaging wildfire.",
    "I remember we used to call this phase of our 'talking stage' firefighting, and I laugh now when I think about it because I was just delaying the inevitable.",
    "I eventually asked her out on the 23rd of July 2023 and proposed in July 2025. it's surreal how two people can go from absolute strangers to spending the rest of our lives together, but I guess that's what happens when God writes your love story.",
    ],
    img: GROOM_IMG,
    imgAlt: "Oluwaseun",
  },
  {
    id: "bride",
    label: "Her Story",
    name: "Onifeloluwa",
    tagline: "\"So, it started with a Twitter glitch. \"",
    paragraphs:["In 2023, while celebrating my cousin’s birthday, I got bored and started scrolling through Twitter (now X).",
      "A tweet from someone I wasn’t following appeared, Daniel Thompson. I remember thinking, “This is the kind of last name that suits me sha.” It was his birthday, and he joked about Twitter not giving him balloons. I commented “Don’t worry, I’ll send you balloons.” That light banter in the comments turned into MANY conversations.",
      "He invited me to his church, The New, and later apologized for “losing his cool”. In his words, I looked better than he anticipated, so he didn’t know what to say to me until I had left.",
      "In 2022, I’d written a list of over 80 things I prophetically desired in a partner. The day I met Daniel in person, my soul leapt with instant recognition. Even though we were “friends,” I knew that he was the man I would marry.",
      "From the beginning, Daniel has been most intentional and proactive with my heart. When he entered my life, he brought order and stability.",
      "Daniel loves me in a way is rare in this generation, and his love has only grown in real time. He has always made the effort to understand how I want to be loved and treated.",
      "I may come off as a strong and unemotional hard girl, but Daniel brings out my softest parts. He loves me completely and covers me at all times! I may not know it all, but I know if all else fails, he’d still be my friend.",
      "My soul would still recognize him in a million different worlds."
    ],
    img: BRIDE_IMG,
    imgAlt: "Onifeloluwa",
  },
];

export function OurStorySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  const slide = slides[active];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
  };

  return (
    <section id="story" className="relative py-24 px-6 bg-[#FAF6F0]">
      {/* Top Divider */}
      <div className="max-w-3xl mx-auto mb-16">
        <BotanicalDivider className="w-full" />
      </div>

      {/* Section Header */}
      <div className="text-center mb-12">
        <p className="font-['Great_Vibes'] text-3xl text-[#9CAF88] mb-2">How it began</p>
        <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-[#2D2D2D] tracking-wide font-light">
          Our Story
        </h2>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-full p-1 gap-1" style={{ background: "#9CAF8818", border: "1.5px solid #9CAF8830" }}>
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`relative px-7 py-2.5 rounded-full font-['DM_Sans'] text-xs tracking-widest uppercase transition-all duration-300 ${
                active === i
                  ? "text-white shadow-md"
                  : "text-[#2D2D2D]/60 hover:text-[#2D2D2D]/80"
              }`}
            >
              {active === i && (
                <motion.span
                  layoutId="story-pill"
                  className="absolute inset-0 rounded-full bg-[#C9A84C]"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Slide Content */}
      <div ref={ref} className="max-w-5xl mx-auto overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
          >
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5]">
                <ImageWithFallback
                  src={slide.img}
                  alt={slide.imgAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-[3px] border-[#D4AF6A]/30 rounded-2xl pointer-events-none" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-[1.5px] border-[#9CAF88]/40 rounded-2xl -z-10" />
              <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#D4AF6A]/50" />
            </motion.div>

            {/* Story Text */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[1px] bg-[#9CAF88]" />
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1 Q14 5 17 9 Q14 13 9 17 Q4 13 1 9 Q4 5 9 1Z" fill="#9CAF88" opacity="0.5"/>
                </svg>
                <div className="w-10 h-[1px] bg-[#9CAF88]" />
              </div>

              <h3 className="font-['Cormorant_Garamond'] text-3xl text-[#2D2D2D] font-light italic mb-6">
                {slide.tagline}
              </h3>

              {slide.paragraphs.map((p, i) => (
                <p key={i} className="font-['DM_Sans'] text-[#2D2D2D]/75 leading-relaxed mb-5 text-[15px]">
                  {p}
                </p>
              ))}

              <div className="flex items-center gap-4 mt-3">
                <div className="w-14 h-[1px] bg-[#D4AF6A]" />
                <p className="font-['Great_Vibes'] text-xl text-[#C9A84C]">{slide.name}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300"
              aria-label={`Go to slide ${i + 1}`}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  active === i
                    ? "w-6 h-2 bg-[#C9A84C]"
                    : "w-2 h-2 bg-[#9CAF88]/40 hover:bg-[#9CAF88]/70"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="max-w-3xl mx-auto mt-16">
        <BotanicalDivider className="w-full" />
      </div>
    </section>
  );
}
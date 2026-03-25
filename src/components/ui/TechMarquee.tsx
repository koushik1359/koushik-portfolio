"use client";

import { useScroll, useVelocity, useTransform, motion } from "framer-motion";

export const TechMarquee = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  // Slant the marquee based on scroll speed for a sense of momentum (max 10 degrees skew)
  const skewX = useTransform(scrollVelocity, [-2000, 2000], [-8, 8], { clamp: false });

  const techs = [
    { name: "Python", color: "hover:text-amber-300" },
    { name: "React", color: "hover:text-blue-500" },
    { name: "PyTorch", color: "hover:text-red-500" },
    { name: "FastAPI", color: "hover:text-teal-400" },
    { name: "Next.js", color: "hover:text-white" },
    { name: "Azure", color: "hover:text-blue-400" },
    { name: "LangGraph", color: "hover:text-violet-500" },
    { name: "TailwindCSS", color: "hover:text-cyan-400" },
    { name: "Neon DB", color: "hover:text-emerald-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ skewX }}
      className="mt-8 overflow-hidden relative glass-panel rounded-3xl py-6 flex items-center shadow-2xl transition-all duration-300"
    >
      <div className="absolute left-0 w-24 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
      <div className="absolute right-0 w-24 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

      <div className="flex w-max animate-marquee gap-8 md:gap-16 px-8 items-center">
        {/* Duplicated list for seamless infinite loop */}
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex gap-8 md:gap-16 items-center text-gray-500 font-mono text-sm tracking-widest uppercase font-semibold"
          >
            {techs.map((tech) => (
              <span
                key={tech.name}
                className={`${tech.color} transition-colors duration-300 cursor-default select-none`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

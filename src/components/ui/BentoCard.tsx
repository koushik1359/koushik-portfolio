"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { ChevronRight, ExternalLink } from "lucide-react";
import React from "react";

interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  technologies?: string[];
  badge?: string;
  className?: string;
  gradientClass?: string;
  delay?: number;
  onClick?: () => void;
  href?: string;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
} as const;

export const BentoCard = ({
  title,
  description,
  icon,
  technologies = [],
  badge,
  className = "",
  gradientClass = "from-white/5",
  delay = 0,
  onClick,
  href,
}: BentoCardProps) => {
  const CardContent = (
    <Tilt
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      glareEnable={true}
      glareMaxOpacity={0.15}
      glareColor="#ffffff"
      glarePosition="all"
      scale={1.02}
      transitionSpeed={2000}
      className={`relative h-full w-full min-h-[400px] md:min-h-[300px] glass-panel rounded-3xl flex flex-col p-6 md:p-7 ${className}`}
    >
      {/* Background Ambient Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${gradientClass} to-transparent z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700`} />
      
      {/* Content */}
      <motion.div 
        className="relative z-10 flex-1 flex flex-col h-full text-left"
        whileHover={{ y: -30 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-white/5 rounded-xl text-white/80">
            {icon}
          </div>
          {badge && (
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-semibold border border-emerald-500/20">
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
          {description}
        </p>

        <div className="flex gap-2 flex-wrap mt-2 mb-6">
          {technologies.map((t) => (
            <span
              key={t}
              className="text-[9px] md:text-xs bg-black/40 text-gray-300 px-3 py-1 rounded-full border border-white/5"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Hover Action Link - Managed via absolute positioning and motion */}
      <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between text-white text-sm font-medium z-20 pointer-events-auto md:pointer-events-none md:group-hover:pointer-events-auto transition-opacity">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, color: "#fff" }}
          animate={{ 
            opacity: 1,
            y: 0 
          }}
          className="flex items-center text-white/50 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
        >
           View Details <ChevronRight className="w-4 h-4 ml-1" />
        </motion.div>
        {href && (
          <motion.a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-full border border-white/10 transition-all text-xs font-bold tracking-widest uppercase opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            Visit Site
            <ExternalLink className="w-3.5 h-3.5 text-white/50" />
          </motion.a>
        )}
      </div>
    </Tilt>
  );

  return (
    <motion.div 
      variants={itemVariants} 
      className="relative group w-full h-full cursor-pointer"
      onClick={onClick}
    >
      {CardContent}
    </motion.div>
  );
};

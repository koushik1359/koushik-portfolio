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
      className={`h-full w-full min-h-[400px] md:min-h-0 glass-panel rounded-3xl overflow-hidden flex flex-col p-6 md:p-8 ${className}`}
    >
      {/* Background Ambient Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${gradientClass} to-transparent z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700`} />
      
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col h-full text-left">
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
        <p className="text-gray-400 text-sm leading-relaxed mb-10 flex-1">
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
      </div>

      {/* Hover Action Link */}
      <div className="relative bottom-0 right-0 w-full mt-auto pt-4 flex items-center justify-between text-white transition-colors duration-300 text-sm font-medium opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center text-white/50 group-hover:text-white/80 transition-colors">
           View Details <ChevronRight className="w-4 h-4 ml-1" />
        </div>
        {href && (
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full border border-white/10 transition-all text-xs font-bold tracking-widest uppercase group/btn"
          >
            Visit Site
            <ExternalLink className="w-3.5 h-3.5 text-white/50 group-hover/btn:text-white transition-colors" />
          </a>
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

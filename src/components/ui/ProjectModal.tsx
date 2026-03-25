"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Cpu, Layers, Globe, Code2 } from "lucide-react";
import React, { useEffect } from "react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    href: string;
    badge?: string;
    icon: React.ReactNode;
  } | null;
}

export const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-zoom-out"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-[95vw] md:w-[90vw] max-w-6xl max-h-[95vh] bg-[#1a1a1a] border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header / Close Button */}
            <div className="absolute top-6 right-6 z-10">
              <button
                onClick={onClose}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all border border-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-8 md:p-12 lg:p-16 flex flex-col min-h-full justify-center">
                {/* Icon & Badge */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 border border-indigo-500/20">
                    {project.icon}
                  </div>
                  {project.badge && (
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
                      {project.badge}
                    </span>
                  )}
                </div>

                {/* Title & Short Description */}
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter mb-6">
                  {project.title}
                </h2>
                <p className="text-gray-400 text-lg md:text-xl lg:text-2xl font-light leading-relaxed mb-12 max-w-3xl">
                  {project.description}
                </p>

                {/* Grid Content */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-6">
                  <div className="flex-1 space-y-10 lg:space-y-12">
                    <section>
                      <h4 className="text-white font-semibold flex items-center gap-2 mb-4 text-sm tracking-widest uppercase">
                        <Layers className="w-4 h-4 text-indigo-400" />
                        Technical Architecture
                      </h4>
                      <p className="text-gray-500 leading-relaxed text-base font-light">
                        {project.longDescription}
                      </p>
                    </section>

                    <section>
                      <h4 className="text-white font-semibold flex items-center gap-2 mb-4 text-sm tracking-widest uppercase">
                        <Cpu className="w-4 h-4 text-indigo-400" />
                        Key Engineering Patterns
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.technologies.map((tech) => (
                          <li key={tech} className="flex items-center gap-3 text-gray-400 text-sm md:text-base">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  {/* Sidebar Info */}
                  <div className="space-y-8 bg-white/5 p-8 md:p-10 rounded-[1.5rem] border border-white/5 h-fit w-full lg:w-[400px] shrink-0">
                     <div>
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-2">Category</span>
                        <span className="text-white font-medium text-base">Artificial Intelligence</span>
                     </div>
                     <div>
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-2">Deployment</span>
                        <span className="text-white font-medium text-base">Production Environment</span>
                     </div>
                     <div className="pt-6">
                        <a 
                           href={project.href}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="w-full bg-white text-black py-5 px-6 rounded-xl font-bold flex flex-wrap items-center justify-center gap-3 text-center hover:bg-gray-200 transition-all text-sm uppercase tracking-widest shadow-lg shadow-white/10"
                        >
                           <span>Launch Workspace</span>
                           <ExternalLink className="w-5 h-5 shrink-0" />
                        </a>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

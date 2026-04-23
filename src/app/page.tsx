"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Database, LayoutTemplate, Activity, Globe, Code2, ChevronRight, Mail, X as CloseIcon, Menu } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

import { BentoCard } from "../components/ui/BentoCard";
import { TechMarquee } from "../components/ui/TechMarquee";
import { ChatbotWidget } from "../components/ui/ChatbotWidget";
import { ProjectModal } from "../components/ui/ProjectModal";
import Magnetic from "../components/ui/Magnetic";

// 3D Background removed for minimalist look

const PROJECTS_DATA = [
  {
    id: "nexus",
    title: "Nexus AI Engine",
    description: "Multi-tenant GenAI Data Platform using PostgreSQL Schema Isolation.",
    longDescription: "An Enterprise-Grade, Multi-Tenant GenAI Data Platform providing a Chat-to-SQL interface. Contributing to AI-driven analytics workflows and building components of natural-language-to-SQL pipelines, enabling users to query relational datasets through conversational interfaces and accelerating access to operational insights.",
    technologies: ["Next.js", "FastAPI", "LangGraph", "Neon DB", "Azure"],
    badge: undefined,
    href: "https://purple-field-07910e20f.6.azurestaticapps.net/",
    icon: <Database className="w-6 h-6" />,
    className: "col-span-1 md:col-span-2 row-span-2 border border-white/5",
    gradientClass: "from-violet-500/10"
  },
  {
    id: "rag",
    title: "Enterprise RAG",
    description: "Scalable RAG ecosystem for enterprise document uploads.",
    longDescription: "Scalable enterprise conversational AI platform using a decoupled FastAPI + React architecture. Engineered a multi-stage retrieval pipeline combining Pinecone vector search with HuggingFace cross-encoder re-ranking, substantially improving context precision. Enabled real-time conversational responsiveness through Server-Sent Events (SSE) token streaming.",
    technologies: ["FastAPI", "OpenAI", "Pinecone", "Vite", "Azure"],
    badge: undefined,
    href: "https://icy-beach-03d802d10.6.azurestaticapps.net",
    icon: <Database className="w-6 h-6 text-blue-400" />,
    className: "col-span-1 md:col-span-2 row-span-1 border border-white/5",
    gradientClass: "from-blue-500/10"
  },
  {
    id: "medical",
    title: "LungNet: Clinical AI",
    description: "Vision Transformer-based Lung CT diagnostic platform.",
    longDescription: "Production-grade medical imaging diagnostic platform using PyTorch and Vision Transformers (ViT-B/16), achieving 99.5% classification accuracy across Benign, Malignant, and Normal tissue classes. Integrated Grad-CAM explainability into the pipeline for real-time ROI activation heatmaps. Architected for Azure via Single-Unit Container scaling.",
    technologies: ["PyTorch", "ViT-B/16", "FastAPI", "Grad-CAM", "MLflow"],
    badge: undefined,
    href: "https://lungnet-app.delightfulmushroom-9dec91d8.eastus.azurecontainerapps.io/",
    icon: <Activity className="w-6 h-6 text-emerald-400" />,
    className: "col-span-1 md:col-span-1 row-span-1 border border-white/5",
    gradientClass: "from-emerald-500/10"
  },
  {
    id: "churn",
    title: "CLV Churn Engine",
    description: "ML engine estimating Lifetime Value and churn probability.",
    longDescription: "Predictive analytics engine combining XGBoost classifications with Bayesian BG/NBD & Gamma-Gamma models to estimate Customer Lifetime Value. Engineered an end-to-end customer intelligence pipeline across 540K+ transaction records, training an XGBoost churn classifier that achieved 0.72 ROC-AUC and 76% recall.",
    technologies: ["Scikit-learn", "Lifetimes", "Streamlit", "XGBoost"],
    badge: undefined,
    href: "https://clvchurnengine-1359.streamlit.app/",
    icon: <Sparkles className="w-6 h-6 text-amber-400" />,
    className: "col-span-1 md:col-span-1 row-span-1 border border-white/5",
    gradientClass: "from-amber-500/10"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
} as const;

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
} as const;

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS_DATA[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openProject = (project: typeof PROJECTS_DATA[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen selection:bg-white/90 selection:text-black bg-[#161616]">
      <section id="home" className="relative w-full min-h-screen md:h-screen flex flex-col md:flex-row overflow-visible md:overflow-clip">
          <nav className="absolute top-0 w-full flex justify-between items-center px-10 py-8 md:px-14 md:py-10 z-[110] mix-blend-difference text-white">
            <span className="font-bold tracking-[0.3em] text-sm uppercase">Koushik</span>
            <div className="hidden md:flex flex-1 justify-end gap-16 lg:gap-24 text-sm font-semibold tracking-widest uppercase text-white/80 pr-12">
               <Magnetic><a href="#home" className="hover:text-white transition-all transform hover:scale-110 interactive-target">Home</a></Magnetic>
               <Magnetic><a href="#projects" className="hover:text-white transition-all transform hover:scale-110 interactive-target">Projects</a></Magnetic>
               <Magnetic><a href="#skills" className="hover:text-white transition-all transform hover:scale-110 interactive-target">Skills</a></Magnetic>
               <Magnetic><a href="#about" className="hover:text-white transition-all transform hover:scale-110 interactive-target">Experience</a></Magnetic>
               <Magnetic><a href="#education" className="hover:text-white transition-all transform hover:scale-110 interactive-target">Education</a></Magnetic>
               <Magnetic><a href="#contact" className="hover:text-white transition-all transform hover:scale-110 interactive-target">Contact</a></Magnetic>
            </div>
            
            <button 
               onClick={() => setIsMenuOpen(true)}
               className="md:hidden p-2 -mr-2 text-white hover:opacity-70 transition-opacity relative z-[120]"
            >
               <Menu className="w-8 h-8" />
            </button>
         </nav>

         <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                className="fixed inset-0 bg-[#161616] z-[500] flex flex-col p-10 overflow-hidden"
              >
                <div className="flex justify-between items-center mb-20 pointer-events-auto">
                  <span className="font-bold tracking-[0.3em] text-sm uppercase font-sans text-gray-500">Navigation</span>
                  <button onClick={() => setIsMenuOpen(false)} className="text-white hover:text-indigo-400 p-2">
                    <CloseIcon className="w-10 h-10" />
                  </button>
                </div>
                <div className="flex flex-col gap-6 text-5xl md:text-7xl font-bold tracking-tighter">
                  {["Home", "Projects", "Skills", "Experience", "Education", "Contact"].map((item, idx) => (
                    <motion.a 
                      key={item} 
                      href={`#${item === 'Experience' ? 'about' : item.toLowerCase()}`} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      onClick={() => setIsMenuOpen(false)} 
                      className="text-white hover:text-indigo-500 transition-colors w-full"
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
         </AnimatePresence>

         <div className="w-full h-[55vh] shrink-0 md:h-full md:w-[45%] lg:w-[40%] bg-[#161616] relative overflow-hidden group bg-black z-0">
             <Image 
                src="/profile.jpg" 
                alt="Koushik Profile" 
                fill
                priority
                className="object-cover object-top md:object-center transition-all duration-700 scale-105 group-hover:scale-100"
             />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-black/10 transition-all duration-1000 z-10 pointer-events-none"></div>
         </div>

         <div className="w-full flex-1 md:h-full md:w-[55%] lg:w-[60%] bg-[#1a1a1a] flex flex-col justify-start pt-12 pb-20 px-8 md:pt-40 md:px-20 lg:px-32 relative isolate z-10 overflow-hidden">
             {/* Minimalist Professional Background */}
             <div className="absolute inset-0 bg-[#161616] z-0 opacity-50"></div>
             <div className="max-w-2xl w-fit relative z-20">
                  <motion.h1 
                     initial={{ y: 30, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                     className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-6 pointer-events-none"
                  >
                     Koushik<br />
                     Manjunathan<br />
                     Sreevatsa
                  </motion.h1>
                 
                 <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-gray-400 leading-relaxed text-sm md:text-base max-w-md mb-8 font-light pointer-events-none"
                 >
                    AI Engineer specializing in LLM-powered applications, predictive analytics platforms, and production-oriented machine learning systems across Azure and Databricks cloud environments.
                 </motion.p>
                 
                 <div className="flex flex-col md:flex-row md:items-center gap-y-5 md:gap-x-6 mt-12 relative z-30 w-full md:w-fit justify-start">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="w-full md:w-auto"
                    >
                        <Magnetic>
                          <a 
                             href="#projects" 
                             className="flex items-center justify-center w-full md:w-auto bg-white text-black px-8 py-5 text-[11px] md:text-sm font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-all antialiased shadow-lg interactive-target"
                          >
                             Explore Projects
                          </a>
                        </Magnetic>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="w-full md:w-auto"
                    >
                        <a 
                           href="/resume.pdf" 
                           download 
                           className="flex items-center justify-center w-full md:w-auto border-2 border-white/20 bg-white/10 text-white px-8 py-5 text-[11px] md:text-sm font-bold tracking-[0.2em] uppercase hover:bg-white/20 transition-all font-sans antialiased"
                        >
                           Resume
                        </a>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="w-full md:w-auto"
                    >
                        <a 
                           href="https://github.com/koushik1359" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex items-center justify-center w-full md:w-auto gap-3 border-2 border-white/20 bg-white/10 text-white px-8 py-5 text-[11px] md:text-sm font-bold tracking-[0.2em] uppercase hover:bg-white/20 transition-all group antialiased"
                        >
                           <Code2 className="w-4 h-4 text-white" />
                           <span>GitHub</span>
                        </a>
                    </motion.div>
                 </div>
             </div>
             
             <div className="absolute bottom-10 right-10 text-white/30 font-medium text-xs tracking-[0.3em] uppercase hidden md:block z-0 pointer-events-none">
                Page | 01
             </div>
         </div>
      </section>

      <section id="projects" className="py-20 pb-32 md:py-32 bg-[#161616] relative">
         <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="w-full flex flex-col items-center justify-center text-center mb-16 pb-12 border-b border-white/5 gap-8"
         >
            <div className="flex flex-col items-center gap-4">
              <span className="text-white font-bold tracking-[0.3em] uppercase text-2xl md:text-3xl block">Machine Learning Workspaces</span>
              <div className="flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full border border-white/10 shadow-2xl">
                 <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.8)]"></span>
                 <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-gray-400">Live on Azure</span>
              </div>
            </div>
         </motion.div>

         <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-min md:auto-rows-[300px]"
         >
            <motion.div
                variants={itemVariants}
                className="col-span-1 md:col-span-2 row-span-1 glass-panel rounded-3xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group border border-white/5 pointer-events-none min-h-[200px]"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="flex items-center justify-center gap-3 mb-6 relative z-10">
                    <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.8)]"></span>
                    <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Available Now</span>
                </div>
                <h3 className="font-semibold text-white tracking-wider text-xl mb-1 relative z-10">Looking for AI/ML roles.</h3>
                <p className="text-gray-500 text-sm relative z-10">Open to work.</p>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="col-span-1 md:col-span-2 row-span-1 glass-panel rounded-3xl flex flex-col items-center justify-center p-8 transition-all duration-500 text-gray-400 hover:text-white border border-white/5 group relative h-full w-full min-h-[200px]"
            >
                <a 
                   href="https://github.com/koushik1359" 
                   target="_blank" 
                   className="absolute inset-0 z-10 flex flex-col items-center justify-center"
                >
                   <Code2 className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-500" />
                   <span className="font-semibold tracking-widest uppercase text-sm">View GitHub</span>
                </a>
            </motion.div>

            {PROJECTS_DATA.map((project) => (
              <BentoCard
                key={project.id}
                title={project.title}
                description={project.description}
                icon={project.icon}
                technologies={project.technologies}
                badge={project.badge}
                className={project.className}
                gradientClass={project.gradientClass}
                onClick={() => openProject(project)}
                href={project.href}
              />
            ))}
         </motion.div>
      </section>

      <section id="skills" className="py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
         <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="mb-16"
         >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">Technical <span className="text-indigo-400">Skills</span></h2>
            <div className="h-[1px] w-24 bg-indigo-500/50"></div>
         </motion.div>

         <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
         >
            <div className="glass-panel p-8 rounded-3xl border border-white/5">
               <h3 className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-6">Languages</h3>
               <ul className="space-y-4 text-white/80 text-sm">
                  <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> Python (SOTA Proficient)</li>
                  <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> SQL (PostgreSQL / T-SQL)</li>
                  <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> JavaScript / TypeScript</li>
               </ul>
            </div>
            <div className="glass-panel p-8 rounded-3xl border border-white/5">
               <h3 className="text-blue-400 font-bold tracking-widest uppercase text-xs mb-6">AI / Machine Learning</h3>
               <ul className="space-y-4 text-white/80 text-sm">
                  <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-blue-500" /> PyTorch & Vision Transformers</li>
                  <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Scikit-learn & XGBoost</li>
                  <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-blue-500" /> LangGraph & RAG Architectures</li>
               </ul>
            </div>
            <div className="glass-panel p-8 rounded-3xl border border-white/5">
               <h3 className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-6">Data & Vector Tools</h3>
               <ul className="space-y-4 text-white/80 text-sm">
                  <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Pinecone / Vector Search</li>
                  <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Pandas, NumPy, PySpark</li>
                  <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Plotly & Streamlit Dashboards</li>
               </ul>
            </div>
            <div className="glass-panel p-8 rounded-3xl border border-white/5">
               <h3 className="text-amber-400 font-bold tracking-widest uppercase text-xs mb-6">Cloud & MLOps</h3>
               <ul className="space-y-4 text-white/80 text-sm">
                  <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Azure (Container Apps / AKS)</li>
                  <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Databricks & MLflow</li>
                  <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Docker & GitHub Actions</li>
               </ul>
            </div>
         </motion.div>
      </section>

      <section id="about" className="py-24 px-4 md:px-8 lg:px-12 max-w-5xl mx-auto">
         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-16 md:text-center">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">Professional <span className="text-indigo-400">Experience</span></h2>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base md:mx-auto max-w-2xl font-light">
               AI/ML Engineer with extensive experience in building scalable RAG architectures, NL2SQL interfaces, and cloud-native GenAI products.
            </p>
         </motion.div>
         <div className="relative border-l border-white/10 ml-4 md:ml-[10%] flex flex-col gap-12 pb-12 mt-16">
             <div className="relative pl-8 md:pl-12">
                <div className="absolute left-[-6px] top-2 w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
                <span className="text-xs font-bold tracking-[0.2em] text-indigo-400 uppercase mb-3 block">01/2024 — 02/2026</span>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">AI/ML Engineer @ General Motors</h3>
                <ul className="text-gray-500 text-sm space-y-2 mt-4 max-w-2xl font-light">
                   <li className="flex items-start gap-2">• Built AI-driven analytics workflows integrating structured data processing, LLMs, and RAG architectures for comprehensive business analysis.</li>
                   <li className="flex items-start gap-2">• Built Natural Language-to-SQL (NL2SQL) conversational interfaces, empowering stakeholders to perform real-time operational analytics and enterprise queries via LLMs.</li>
                   <li className="flex items-start gap-2">• Designed scalable data ingestion, transformation, and inference workflows on cloud infrastructure, collaborating closely with cross-functional teams to drive end-to-end GenAI product delivery.</li>
                   <li className="flex items-start gap-2">• Architected RAG and Agentic AI workflows using LangChain, LangGraph, Vertex AI, and Vector Databases (Pinecone, FAISS, Chroma) for custom semantic scoring and hydrologic verification.</li>
                   <li className="flex items-start gap-2">• Developed Multi-Agent evaluation platforms leveraging CrewAI and MCP Server for autonomous document analysis, scaling extraction accuracy and delivering structured insights.</li>
                </ul>
             </div>
             <div className="relative pl-8 md:pl-12">
                <div className="absolute left-[-6px] top-2 w-3 h-3 rounded-full bg-white/20" />
                <span className="text-xs font-bold tracking-[0.2em] text-white/50 mb-3 block">01/2022 — 06/2023</span>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Data Analyst / Data Engineer @ RK Info Systems</h3>
                <ul className="text-gray-500 text-sm space-y-2 mt-4 max-w-2xl font-light">
                   <li className="flex items-start gap-2">• Architected AWS Enterprise Data Lake infrastructure combining S3, Redshift, and RDS for high-volume data storage and distributed analytical workloads.</li>
                   <li className="flex items-start gap-2">• Built automated ETL/ELT data pipelines using AWS Glue, PySpark, and AWS Athena, effectively transforming and integrating massive Parquet and CSV datasets.</li>
                   <li className="flex items-start gap-2">• Executed on-premises application migrations to distributed cloud architectures across AWS EC2 and S3, maintaining and optimizing Hadoop clusters within AWS EMR.</li>
                   <li className="flex items-start gap-2">• Managed real-time streaming architectures utilizing AWS Kinesis (Streams, Firehose, Analytics), routing streaming data outputs directly into DynamoDB and Redshift.</li>
                   <li className="flex items-start gap-2">• Orchestrated robust and automated data workflows via Apache Airflow DAGs, maintaining production workloads across resilient multi-cluster Kubernetes environments.</li>
                </ul>
             </div>
          </div>
      </section>

      <section id="education" className="py-24 px-4 md:px-8 lg:px-12 max-w-5xl mx-auto">
         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">Education</h2>
            <div className="h-[1px] w-24 bg-indigo-500/50"></div>
         </motion.div>
         <div className="glass-panel p-8 rounded-3xl border border-white/5 max-w-2xl">
            <span className="text-xs font-bold tracking-[0.2em] text-indigo-400 uppercase mb-3 block">Graduated May 2025</span>
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">MS in Data Science & Analytics</h3>
            <p className="text-gray-400 text-lg font-light">Georgia State University | <span className="text-indigo-400/80 font-medium">GPA: 4.13/4.30</span></p>
         </div>
      </section>

      <section id="contact" className="py-32 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/5">
         <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
         >
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-12">Get in <span className="text-indigo-400 font-serif italic">Touch.</span></h2>
            <p className="text-gray-400 text-lg mb-16 max-w-2xl font-light">
               I'm currently looking for new opportunities in AI/ML engineering. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="flex flex-col md:flex-row gap-12 items-center justify-center w-full">
               <a 
                  href="mailto:koushiksreevatsa100@gmail.com" 
                  className="group flex flex-col items-center gap-4 p-10 glass-panel rounded-3xl border border-white/5 hover:border-red-500/50 transition-all duration-500 w-full md:w-auto min-w-[300px]"
               >
                  <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500 transition-colors duration-500">
                     <Mail className="w-8 h-8 text-red-400 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <span className="text-sm font-bold tracking-widest uppercase text-white/50 group-hover:text-white transition-colors">Gmail</span>
                  <span className="text-xl font-bold text-white lowercase">koushiksreevatsa100@gmail.com</span>
               </a>

               <a 
                  href="https://www.linkedin.com/in/koushiksreevatsa/" 
                  target="_blank"
                  className="group flex flex-col items-center gap-4 p-10 glass-panel rounded-3xl border border-white/5 hover:border-blue-500/50 transition-all duration-500 w-full md:w-auto min-w-[300px]"
               >
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-500">
                     <svg 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors duration-500"
                     >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                     </svg>
                  </div>
                  <span className="text-sm font-bold tracking-widest uppercase text-white/50 group-hover:text-white transition-colors">LinkedIn</span>
                  <span className="text-xl font-bold text-white">Koushik Sreevatsa</span>
               </a>
            </div>
         </motion.div>
      </section>

      <div className="pb-24 border-t border-white/5 pt-24 bg-[#111]">
        <TechMarquee />
      </div>
      <ChatbotWidget />
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} project={selectedProject} />
    </main>
  );
}

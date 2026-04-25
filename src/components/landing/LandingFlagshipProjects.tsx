import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Zap, Brain, ScrollText, Bot, BarChart3, Shield, ChevronLeft, ChevronRight, ChevronDown, Video, MousePointer2, Camera, Film, Apple, Monitor, Download } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useIsMobile } from "@/hooks/use-mobile";
interface ProjectFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ProjectImage {
  src: string;
  alt: string;
}

interface FlagshipProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  status: string;
  year: string;
  features: ProjectFeature[];
  gallery: ProjectImage[];
  technologies: string[];
  stats: { label: string; value: string }[];
}

// Flagship projects data
const projects: FlagshipProject[] = [
  {
    id: "energizzo",
    name: "Energizzo",
    tagline: "AI Platform for Energy Resellers",
    description: "The AI-native platform for electricity and gas resellers in Italy. Automates billing, onboarding, regulatory compliance and CRM.",
    heroImage: "/images/energizzo-hero.jpg",
    status: "Active",
    year: "2026",
    features: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: "AI-Powered ARERA Billing",
        description: "Automatic calculation of all regulatory components. Invoices generated in full ARERA compliance with zero manual intervention.",
      },
      {
        icon: <Bot className="w-6 h-6" />,
        title: "OCR Onboarding in 60 Seconds",
        description: "The customer photographs their bill and the system extracts all data, generates the contract and activates digital OTP signature.",
      },
      {
        icon: <Brain className="w-6 h-6" />,
        title: "AI Phone System 24/7",
        description: "Inbound and outbound call management powered by AI. Sales, support and customer care always active.",
      },
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: "Churn & Default Prediction",
        description: "Predictive algorithms that identify at-risk customers before the problem occurs.",
      },
      {
        icon: <ScrollText className="w-6 h-6" />,
        title: "Automatic ARERA Compliance",
        description: "The system self-updates with new regulations and deliberations. Compliance evolves alongside the rules.",
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "White Label App iOS/Android",
        description: "Fully customizable app with the reseller's brand. Integrated digital OTP signature for digital contracts.",
      },
    ],
    gallery: [
      { src: "/images/energizzo-dashboard.png", alt: "Dashboard Energizzo" },
      { src: "/images/energizzo-clienti.png", alt: "Energizzo Active Clients" },
      { src: "/images/energizzo-livecall.png", alt: "AI Live Call Energizzo" },
    ],
    technologies: ["Laravel", "React", "Claude AI", "OCR", "VoIP AI", "iOS/Android"],
    stats: [
      { label: "Onboarding", value: "60s" },
      { label: "Automation", value: "100%" },
      { label: "Availability", value: "24/7" },
    ],
  },
];

function ProjectCard({ project }: { project: FlagshipProject }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  
  // Gallery carousel state
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
  
  // Features scroll state
  const featuresScrollRef = useRef<HTMLDivElement>(null);
  const [activeFeaturesIndex, setActiveFeaturesIndex] = useState(0);
  
  // Agents scroll state
  const agentsScrollRef = useRef<HTMLDivElement>(null);
  const [activeAgentsIndex, setActiveAgentsIndex] = useState(0);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  
  // Gallery carousel sync
  const onGallerySelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedGalleryIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  
  useEffect(() => {
    if (!emblaApi) return;
    onGallerySelect();
    emblaApi.on("select", onGallerySelect);
    return () => {
      emblaApi.off("select", onGallerySelect);
    };
  }, [emblaApi, onGallerySelect]);
  
  // Features scroll handler
  const handleFeaturesScroll = useCallback(() => {
    if (!featuresScrollRef.current) return;
    const container = featuresScrollRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = 288 + 16; // w-72 (288px) + gap-4 (16px)
    const index = Math.round(scrollLeft / itemWidth);
    setActiveFeaturesIndex(Math.min(index, project.features.length - 1));
  }, [project.features.length]);
  
  // Agents scroll handler  
  const handleAgentsScroll = useCallback(() => {
    if (!agentsScrollRef.current) return;
    const container = agentsScrollRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = 256 + 16; // w-64 (256px) + gap-4 (16px)
    const index = Math.round(scrollLeft / itemWidth);
    // 10 agents total
    setActiveAgentsIndex(Math.min(index, 9));
  }, []);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      <div className="liquid-glass-card rounded-3xl overflow-hidden max-w-5xl mx-auto relative">
        {/* Italian Flag */}
        <div 
          className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full overflow-hidden"
          style={{
            backdropFilter: "blur(20px) saturate(1.3)",
            WebkitBackdropFilter: "blur(20px) saturate(1.3)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.4)",
          }}
        >
          <div className="flex h-full">
            <div className="w-1/3 bg-green-500/80" />
            <div className="w-1/3 bg-white/90" />
            <div className="w-1/3 bg-red-500/80" />
          </div>
        </div>
        
        {/* MODULO 1: HERO */}
        <div className="grid md:grid-cols-2 gap-0">
          {/* Hero Content */}
          <div className="p-8 md:p-12 bg-black/40 flex flex-col justify-center">
            <h4 
              className="text-lg md:text-xl font-bold text-lime-400 mb-6"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              AI Platform for Energy Resellers
            </h4>
            <div className="space-y-4 text-white/70 text-sm md:text-base leading-relaxed">
              <p>
                <span className="text-white font-semibold">Energizzo</span> is the AI-native platform for electricity and gas resellers in Italy.
                It enables managing thousands of clients without increasing headcount, automating billing, onboarding, regulatory compliance and CRM.
              </p>
              <p>
                A customer photographs their bill and in 60 seconds the system extracts the data, generates the contract and activates digital OTP signature.
                The AI phone system handles inbound and outbound calls 24/7 for sales, support and customer care.
              </p>
              <p>
                At the core of the system operates <span className="text-lime-400 font-semibold">Max Power</span>, Energizzo's AI CEO:
                it coordinates autonomous agents specialized in sales, operations, compliance and administration.
                The system self-updates with every new ARERA regulation.
              </p>
              <p className="text-white/90 italic mt-4">
                Not a management tool.<br />
                The AI that runs your energy business.
              </p>
            </div>
          </div>

          {/* Hero Info */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span 
                className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                {project.status}
              </span>
              <span 
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/60 border border-white/20"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                {project.year}
              </span>
            </div>
            
            <h3 
              className="text-4xl md:text-5xl font-bold text-white mb-2"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {project.name}
            </h3>
            <p 
              className="text-lg text-lime-300 mb-4"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {project.tagline}
            </p>
            <p className="text-white/70 mb-6 leading-relaxed">
              {project.description}
            </p>
            
            <motion.a
              href="https://wa.me/35799235536"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-fit px-6 py-3 rounded-full text-sm font-medium transition-all inline-block"
              style={{
                fontFamily: "Orbitron, sans-serif",
                background: "linear-gradient(135deg, rgba(132, 204, 22, 0.4), rgba(34, 197, 94, 0.4))",
                border: "1px solid rgba(132, 204, 22, 0.5)",
              }}
            >
              Request a Demo
            </motion.a>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <div className="border-t border-white/10 p-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 py-3 text-white/60 hover:text-white transition-colors"
          >
            <span 
              className="text-sm tracking-[0.1em]"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {isExpanded ? "HIDE DETAILS" : "LEARN MORE"}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </button>
        </div>

        {/* Collapsible Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* MODULO 2: KEY FEATURES - Horizontal Scroll */}
              <div className="border-t border-white/10 p-8 md:p-12">
                <h4 
                  className="text-sm tracking-[0.2em] text-white/50 mb-6"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  KEY FEATURES
                </h4>
                <div 
                  ref={featuresScrollRef}
                  onScroll={handleFeaturesScroll}
                  className="overflow-x-auto pb-4 -mx-2 scrollbar-hide" 
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <div className="flex gap-4 px-2" style={{ minWidth: "max-content" }}>
                    {project.features.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-72 flex-shrink-0"
                      >
                        <div className="text-lime-400 mb-3">{feature.icon}</div>
                        <h5 
                          className="text-white font-medium mb-2 text-base"
                          style={{ fontFamily: "Orbitron, sans-serif" }}
                        >
                          {feature.title}
                        </h5>
                        <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {/* Mobile pagination dots for Features */}
                {isMobile && (
                  <div className="flex justify-center gap-2 mt-4">
                    {project.features.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeFeaturesIndex 
                            ? "bg-lime-400 w-4" 
                            : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* MODULO 3: IMAGE GALLERY - Horizontal Scroll */}
              <div className="border-t border-white/10 p-8 md:p-12">
                <h4 
                  className="text-sm tracking-[0.2em] text-white/50 mb-6"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  GALLERY
                </h4>
                <div 
                  ref={emblaRef}
                  className="overflow-x-auto pb-4 -mx-2 scrollbar-hide" 
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <div className="flex gap-4 px-2" style={{ minWidth: "max-content" }}>
                    {project.gallery.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="w-80 md:w-96 flex-shrink-0"
                      >
                        <div 
                          className="aspect-video rounded-xl bg-gradient-to-br from-lime-500/20 to-green-500/20 overflow-hidden border border-white/10"
                          style={{
                            backgroundImage: `url(${image.src})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
                {/* Mobile pagination dots for Gallery */}
                {isMobile && (
                  <div className="flex justify-center gap-2 mt-4">
                    {project.gallery.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === selectedGalleryIndex 
                            ? "bg-lime-400 w-4" 
                            : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* MODULO 4: AI AGENTS - Horizontal Scroll */}
              <div className="border-t border-white/10 p-8 md:p-12">
                <h4 
                  className="text-sm tracking-[0.2em] text-white/50 mb-6"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  AI AGENTS
                </h4>
                <div 
                  ref={agentsScrollRef}
                  onScroll={handleAgentsScroll}
                  className="overflow-x-auto pb-4 -mx-2 scrollbar-hide" 
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <div className="flex gap-4 px-2" style={{ minWidth: "max-content" }}>
                    {/* Max Power - Central Agent */}
                    <div className="p-6 rounded-xl bg-lime-500/10 border border-lime-500/30 w-64 flex-shrink-0">
                      <span className="text-3xl mb-3 block">🧠</span>
                      <h5 
                        className="text-lg font-bold text-lime-400 mb-1"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                      >
                        Max Power
                      </h5>
                      <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Central Intelligence Core</p>
                      <p className="text-white/70 text-sm">The brain that orchestrates everything.</p>
                    </div>

                    {/* Ignition */}
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-64 flex-shrink-0">
                      <span className="text-2xl mb-3 block">🚀</span>
                      <h5 
                        className="text-base font-bold text-white mb-1"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                      >
                        Ignition
                      </h5>
                      <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Onboarding Agent</p>
                      <p className="text-white/60 text-sm leading-relaxed">Activates the client, starts the flow, powers up the system.</p>
                    </div>

                    {/* Switchboard */}
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-64 flex-shrink-0">
                      <span className="text-2xl mb-3 block">☎️</span>
                      <h5 
                        className="text-base font-bold text-white mb-1"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                      >
                        Switchboard
                      </h5>
                      <p className="text-white/50 text-xs uppercase tracking-widest mb-2">AI Switchboard / Voice Agent</p>
                      <p className="text-white/60 text-sm leading-relaxed">Manages calls, routes requests, talks to clients and operators.</p>
                    </div>

                    {/* Halo */}
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-64 flex-shrink-0">
                      <span className="text-2xl mb-3 block">👤</span>
                      <h5 
                        className="text-base font-bold text-white mb-1"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                      >
                        Halo
                      </h5>
                      <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Personal AI Agent (HLO)</p>
                      <p className="text-white/60 text-sm leading-relaxed">Each client's personal AI agent. Knows their data, contracts, history.</p>
                    </div>

                    {/* Ledger */}
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-64 flex-shrink-0">
                      <span className="text-2xl mb-3 block">💳</span>
                      <h5 
                        className="text-base font-bold text-white mb-1"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                      >
                        Ledger
                      </h5>
                      <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Billing & Invoicing Agent</p>
                      <p className="text-white/60 text-sm leading-relaxed">Invoices, credit notes, overdue payments, reconciliations.</p>
                    </div>

                    {/* Gridmind */}
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-64 flex-shrink-0">
                      <span className="text-2xl mb-3 block">⚡</span>
                      <h5 
                        className="text-base font-bold text-white mb-1"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                      >
                        Gridmind
                      </h5>
                      <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Dispatching Agent</p>
                      <p className="text-white/60 text-sm leading-relaxed">Dedicated intelligence for energy dispatching.</p>
                    </div>

                    {/* Oracle */}
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-64 flex-shrink-0">
                      <span className="text-2xl mb-3 block">📜</span>
                      <h5 
                        className="text-base font-bold text-white mb-1"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                      >
                        Oracle
                      </h5>
                      <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Regulatory & Compliance Agent</p>
                      <p className="text-white/60 text-sm leading-relaxed">Receives, interprets and translates regulations and deliberations.</p>
                    </div>
                  </div>
                </div>
                {/* Mobile pagination dots for Agents */}
                {isMobile && (
                  <div className="flex justify-center gap-2 mt-4">
                    {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeAgentsIndex 
                            ? "bg-lime-400 w-4" 
                            : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* MODULO 5: TECHNOLOGIES & STATS */}
              <div className="border-t border-white/10 p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Tech Stack */}
                  <div>
                    <h4 
                      className="text-sm tracking-[0.2em] text-white/50 mb-4"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                      TECH STACK
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 rounded-full text-xs font-medium bg-white/5 border border-white/20 text-white/70"
                          style={{ fontFamily: "Orbitron, sans-serif" }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div>
                    <h4 
                      className="text-sm tracking-[0.2em] text-white/50 mb-4"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                      STATS
                    </h4>
                    <div className="flex gap-8">
                      {project.stats.map((stat) => (
                        <div key={stat.label}>
                          <div 
                            className="text-2xl font-bold text-white"
                            style={{ fontFamily: "Orbitron, sans-serif" }}
                          >
                            {stat.value}
                          </div>
                          <div className="text-xs text-white/50">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function GoItalIACard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const featuresScrollRef = useRef<HTMLDivElement>(null);
  const [activeFeaturesIndex, setActiveFeaturesIndex] = useState(0);

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI CEO Orchestrator",
      description: "Every company gets its own AI CEO that coordinates agents, delegates tasks, manages clients and makes operational decisions in full autonomy.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "A2A Network (Agent-to-Agent)",
      description: "AI CEOs communicate through the Agent-to-Agent network. They exchange orders, quotes, payments and close transactions without human intervention.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Automatic Transactions",
      description: "AI CEOs can send and receive payments, generate invoices and manage the complete B2B sales cycle between companies fully autonomously.",
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "Unlimited Autonomous Agents",
      description: "Sales, support, accounting, marketing. Every company automatically generates its own specialized AI agents based on active connectors.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Instant Setup with VAT Number",
      description: "Enter the VAT number and the system retrieves all company data, calculates the risk score and configures the business automatically. Zero bureaucracy.",
    },
    {
      icon: <ScrollText className="w-6 h-6" />,
      title: "Native Connectors",
      description: "WhatsApp, Google, HubSpot, Salesforce, Stripe natively integrated. The AI company operates on real business channels from day one.",
    },
  ];

  const handleFeaturesScroll = useCallback(() => {
    if (!featuresScrollRef.current) return;
    const container = featuresScrollRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = 288 + 16;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveFeaturesIndex(Math.min(index, features.length - 1));
  }, [features.length]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      <div className="liquid-glass-card rounded-3xl overflow-hidden max-w-5xl mx-auto relative">
        {/* Italian Flag */}
        <div
          className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full overflow-hidden"
          style={{
            backdropFilter: "blur(20px) saturate(1.3)",
            WebkitBackdropFilter: "blur(20px) saturate(1.3)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.4)",
          }}
        >
          <div className="flex h-full">
            <div className="w-1/3 bg-green-500/80" />
            <div className="w-1/3 bg-white/90" />
            <div className="w-1/3 bg-red-500/80" />
          </div>
        </div>

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-8 md:p-12 bg-black/40 flex flex-col justify-center">
            <h4
              className="text-lg md:text-xl font-bold text-cyan-400 mb-6"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              AI Company Platform
            </h4>
            <div className="space-y-4 text-white/70 text-sm md:text-base leading-relaxed">
              <p>
                <span className="text-white font-semibold">Go Ital IA</span> creates your fully AI-powered and automated company.
                An AI CEO takes control of operations: manages clients, sells, responds, invoices and coordinates a team of specialized AI agents.
              </p>
              <p>
                The real breakthrough is the <span className="text-cyan-400 font-semibold">A2A (Agent-to-Agent) network</span>.
                AI CEOs of different companies talk to each other, exchange orders, quotes and payments.
                An economic ecosystem where transactions happen autonomously, without human intervention.
              </p>
              <p>
                Enter your VAT number and in minutes you have an operational AI company, connected to WhatsApp, Google, CRM and payment systems.
                Ready to sell, buy and collaborate with other businesses on the network.
              </p>
              <p className="text-white/90 italic mt-4">
                Not a management tool.<br />
                An AI economy that works for you.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                Active
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/60 border border-white/20"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                2026
              </span>
            </div>

            <h3
              className="text-4xl md:text-5xl font-bold text-white mb-2"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Go Ital IA
            </h3>
            <p
              className="text-lg text-cyan-300 mb-4"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              AI Company Platform
            </p>
            <p className="text-white/70 mb-6 leading-relaxed">
              Your fully AI-powered company. An AI CEO, autonomous agents and a network where AI CEOs talk, exchange orders and close payments.
            </p>

            <motion.a
              href="https://www.goitalia.eu"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-fit px-6 py-3 rounded-full text-sm font-medium transition-all inline-block"
              style={{
                fontFamily: "Orbitron, sans-serif",
                background: "linear-gradient(135deg, rgba(34, 211, 238, 0.4), rgba(59, 130, 246, 0.4))",
                border: "1px solid rgba(34, 211, 238, 0.5)",
              }}
            >
              Discover Go Ital IA
            </motion.a>
          </div>
        </div>

        {/* Expand/Collapse */}
        <div className="border-t border-white/10 p-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 py-3 text-white/60 hover:text-white transition-colors"
          >
            <span
              className="text-sm tracking-[0.1em]"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {isExpanded ? "HIDE DETAILS" : "LEARN MORE"}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </button>
        </div>

        {/* Collapsible Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* KEY FEATURES */}
              <div className="border-t border-white/10 p-8 md:p-12">
                <h4
                  className="text-sm tracking-[0.2em] text-white/50 mb-6"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  KEY FEATURES
                </h4>
                <div
                  ref={featuresScrollRef}
                  onScroll={handleFeaturesScroll}
                  className="overflow-x-auto pb-4 -mx-2 scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <div className="flex gap-4 px-2" style={{ minWidth: "max-content" }}>
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-72 flex-shrink-0"
                      >
                        <div className="text-cyan-400 mb-3">{feature.icon}</div>
                        <h5
                          className="text-white font-medium mb-2 text-base"
                          style={{ fontFamily: "Orbitron, sans-serif" }}
                        >
                          {feature.title}
                        </h5>
                        <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {isMobile && (
                  <div className="flex justify-center gap-2 mt-4">
                    {features.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeFeaturesIndex
                            ? "bg-cyan-400 w-4"
                            : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* TECH & STATS */}
              <div className="border-t border-white/10 p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4
                      className="text-sm tracking-[0.2em] text-white/50 mb-4"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                      TECH STACK
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Node.js", "Drizzle ORM", "PostgreSQL", "Claude AI", "WhatsApp API", "OAuth 2.0", "A2A Protocol"].map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 rounded-full text-xs font-medium bg-white/5 border border-white/20 text-white/70"
                          style={{ fontFamily: "Orbitron, sans-serif" }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4
                      className="text-sm tracking-[0.2em] text-white/50 mb-4"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                      STATS
                    </h4>
                    <div className="flex gap-8">
                      {[
                        { label: "Connectors", value: "8+" },
                        { label: "AI Agents", value: "∞" },
                        { label: "Automation", value: "100%" },
                      ].map((stat) => (
                        <div key={stat.label}>
                          <div
                            className="text-2xl font-bold text-white"
                            style={{ fontFamily: "Orbitron, sans-serif" }}
                          >
                            {stat.value}
                          </div>
                          <div className="text-xs text-white/50">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function UnvrsCaptureCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const featuresScrollRef = useRef<HTMLDivElement>(null);
  const [activeFeaturesIndex, setActiveFeaturesIndex] = useState(0);

  const features = [
    {
      icon: <Video className="w-6 h-6" />,
      title: "Auto-Zoom Intelligence",
      description: "Smart zoom suggestions based on cursor activity. Recordings stay focused on what matters without manual editing.",
    },
    {
      icon: <MousePointer2 className="w-6 h-6" />,
      title: "Cursor Polish",
      description: "Smoothing, motion blur, click bounce and sway. Every cursor movement looks intentional and professional.",
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Webcam Bubble",
      description: "Floating webcam overlay with positioning presets, mirror, shadow controls and optional zoom-reactive scaling.",
    },
    {
      icon: <Film className="w-6 h-6" />,
      title: "Timeline Editor",
      description: "Drag-and-drop timeline with trims, speed regions, annotations and extra audio tracks. Save projects and resume later.",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Styled Backgrounds",
      description: "Wallpapers, gradients, blur, padding, rounded corners and drop shadows. Frame your demos like a brand.",
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Export MP4 & GIF",
      description: "One-click export to MP4 (quality selector) or GIF (FPS, loop, size presets). Aspect ratio and dimensions fully controllable.",
    },
  ];

  const downloads = [
    {
      label: "macOS",
      sublabel: "Apple Silicon",
      icon: <Apple className="w-5 h-5" />,
      href: "https://github.com/unvrslabs/unvrs-capture/releases/latest",
    },
    {
      label: "macOS",
      sublabel: "Intel",
      icon: <Apple className="w-5 h-5" />,
      href: "https://github.com/unvrslabs/unvrs-capture/releases/latest",
    },
    {
      label: "Windows",
      sublabel: "x64",
      icon: <Monitor className="w-5 h-5" />,
      href: "https://github.com/unvrslabs/unvrs-capture/releases/latest",
    },
    {
      label: "Linux",
      sublabel: "AppImage",
      icon: <Monitor className="w-5 h-5" />,
      href: "https://github.com/unvrslabs/unvrs-capture/releases/latest",
    },
  ];

  const handleFeaturesScroll = useCallback(() => {
    if (!featuresScrollRef.current) return;
    const container = featuresScrollRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = 288 + 16;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveFeaturesIndex(Math.min(index, features.length - 1));
  }, [features.length]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      <div className="liquid-glass-card rounded-3xl overflow-hidden max-w-5xl mx-auto relative">
        {/* UNVRS Logo Badge */}
        <div
          className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full overflow-hidden bg-black"
          style={{
            backdropFilter: "blur(20px) saturate(1.3)",
            WebkitBackdropFilter: "blur(20px) saturate(1.3)",
            border: "1px solid rgba(168, 85, 247, 0.4)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
          }}
        >
          <img
            src="/images/unvrs-capture/logo.png"
            alt="UNVRS Labs"
            className="w-full h-full object-contain"
          />
        </div>

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-8 md:p-12 bg-black/40 flex flex-col justify-center">
            <h4
              className="text-lg md:text-xl font-bold text-violet-400 mb-6"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Open-Source Screen Recorder
            </h4>
            <div className="space-y-4 text-white/70 text-sm md:text-base leading-relaxed">
              <p>
                <span className="text-white font-semibold">UNVRS Capture</span> is the desktop app for polished screen recordings.
                Auto-zoom on cursor activity, smooth motion, webcam bubble overlays, styled backgrounds and a full timeline editor — all in one place, all free.
              </p>
              <p>
                Built for product demos, walkthroughs, tutorials and launch videos.
                What used to require a motion designer to add zooms, cursor polish or styled frames now happens in a couple of clicks.
              </p>
              <p>
                <span className="text-violet-400 font-semibold">Native capture engines</span> on every OS:
                ScreenCaptureKit on macOS, Windows Graphics Capture on Windows, native helpers on Linux.
                Export to MP4 or GIF with full control over quality, FPS and aspect ratio.
              </p>
              <p className="text-white/90 italic mt-4">
                Free forever. Open source.<br />
                Built by UNVRS Labs.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                Active
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/60 border border-white/20"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                2026
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/20 text-violet-300 border border-violet-500/30"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                Free
              </span>
            </div>

            <h3
              className="text-4xl md:text-5xl font-bold text-white mb-2"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              UNVRS Capture
            </h3>
            <p
              className="text-lg text-violet-300 mb-4"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Polished Screen Recordings, Free
            </p>
            <p className="text-white/70 mb-6 leading-relaxed">
              Auto-zoom, cursor polish, webcam bubble and timeline editor for macOS, Windows and Linux. One click from recording to export.
            </p>

            {/* Download Buttons Grid */}
            <div className="grid grid-cols-2 gap-2">
              {downloads.map((dl) => (
                <motion.a
                  key={`${dl.label}-${dl.sublabel}`}
                  href={dl.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    background: "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(124, 58, 237, 0.3))",
                    border: "1px solid rgba(168, 85, 247, 0.4)",
                  }}
                >
                  <span className="text-white/80">{dl.icon}</span>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-white text-xs font-bold">{dl.label}</span>
                    <span className="text-white/60 text-[10px]">{dl.sublabel}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Expand/Collapse */}
        <div className="border-t border-white/10 p-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 py-3 text-white/60 hover:text-white transition-colors"
          >
            <span
              className="text-sm tracking-[0.1em]"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {isExpanded ? "HIDE DETAILS" : "LEARN MORE"}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </button>
        </div>

        {/* Collapsible Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* KEY FEATURES */}
              <div className="border-t border-white/10 p-8 md:p-12">
                <h4
                  className="text-sm tracking-[0.2em] text-white/50 mb-6"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  KEY FEATURES
                </h4>
                <div
                  ref={featuresScrollRef}
                  onScroll={handleFeaturesScroll}
                  className="overflow-x-auto pb-4 -mx-2 scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <div className="flex gap-4 px-2" style={{ minWidth: "max-content" }}>
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-72 flex-shrink-0"
                      >
                        <div className="text-violet-400 mb-3">{feature.icon}</div>
                        <h5
                          className="text-white font-medium mb-2 text-base"
                          style={{ fontFamily: "Orbitron, sans-serif" }}
                        >
                          {feature.title}
                        </h5>
                        <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {isMobile && (
                  <div className="flex justify-center gap-2 mt-4">
                    {features.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeFeaturesIndex
                            ? "bg-violet-400 w-4"
                            : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* TECH & STATS */}
              <div className="border-t border-white/10 p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4
                      className="text-sm tracking-[0.2em] text-white/50 mb-4"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                      TECH STACK
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Electron", "React", "TypeScript", "Swift", "C++", "FFmpeg", "Pixi.js"].map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 rounded-full text-xs font-medium bg-white/5 border border-white/20 text-white/70"
                          style={{ fontFamily: "Orbitron, sans-serif" }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4
                      className="text-sm tracking-[0.2em] text-white/50 mb-4"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                      STATS
                    </h4>
                    <div className="flex gap-8">
                      {[
                        { label: "Platforms", value: "3" },
                        { label: "Price", value: "Free" },
                        { label: "License", value: "AGPL" },
                      ].map((stat) => (
                        <div key={stat.label}>
                          <div
                            className="text-2xl font-bold text-white"
                            style={{ fontFamily: "Orbitron, sans-serif" }}
                          >
                            {stat.value}
                          </div>
                          <div className="text-xs text-white/50">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* AGPL CREDIT FOOTER */}
              <div className="border-t border-white/10 px-8 md:px-12 py-4">
                <p className="text-[10px] text-white/30 text-center leading-relaxed">
                  Open source under AGPL 3.0 ·{" "}
                  <a
                    href="https://github.com/unvrslabs/unvrs-capture"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-violet-300 transition-colors underline"
                  >
                    View source on GitHub
                  </a>
                  {" "}· Independent fork of the{" "}
                  <a
                    href="https://github.com/webadderall/Recordly"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-violet-300 transition-colors underline"
                  >
                    Recordly
                  </a>
                  {" "}project by webadderall, used in compliance with AGPLv3.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function LandingFlagshipProjects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="foundations" 
      ref={sectionRef}
      className="relative py-32 px-4 md:px-8 bg-black overflow-hidden"
    >
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[150px] opacity-20"
          style={{ background: "linear-gradient(135deg, #a855f7, #06b6d4)" }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[150px] opacity-15"
          style={{ background: "linear-gradient(135deg, #06b6d4, #a855f7)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            THE FOUNDATIONS
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Our proprietary projects shaping the future of technology
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-16">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <GoItalIACard />
          <UnvrsCaptureCard />
        </div>
      </div>
    </section>
  );
}

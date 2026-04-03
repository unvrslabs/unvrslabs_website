import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const insights = [
  {
    type: "CASE STUDY",
    title: "Energizzo: AI-Powered Energy Reselling",
    description: "How we built an AI-native platform that automates billing, onboarding, and compliance for energy resellers in Italy.",
    href: "/insights/energizzo",
    color: "cyan",
  },
  {
    type: "CASE STUDY",
    title: "Go Ital IA: An Autonomous AI Economy",
    description: "A platform where every SME gets an AI CEO and businesses trade autonomously through the Agent-to-Agent network.",
    href: "/insights/goitalia",
    color: "cyan",
  },
  {
    type: "ARTICLE",
    title: "The A2A Protocol Explained",
    description: "How AI agents discover, negotiate, and complete transactions between companies without human intervention.",
    href: "/insights/a2a-protocol",
    color: "purple",
  },
  {
    type: "ARTICLE",
    title: "AI CEO: Multi-Agent Orchestration",
    description: "How we architected an AI system that runs entire businesses by orchestrating specialized agents.",
    href: "/insights/ai-ceo-orchestration",
    color: "purple",
  },
  {
    type: "ARTICLE",
    title: "From SaaS to AI Autonomy",
    description: "Why AI-first business automation is replacing traditional software and what full operational autonomy looks like.",
    href: "/insights/ai-business-automation",
    color: "purple",
  },
];

const colorMap: Record<string, { badge: string; arrow: string }> = {
  lime: { badge: "bg-lime-500/20 text-lime-400 border-lime-500/30", arrow: "text-lime-400" },
  cyan: { badge: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30", arrow: "text-cyan-400" },
  purple: { badge: "bg-purple-500/20 text-purple-400 border-purple-500/30", arrow: "text-purple-400" },
};

export function LandingInsights() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="insights" ref={sectionRef} className="relative py-32 px-4 md:px-8 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
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
            INSIGHTS
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Case studies and technical articles on AI-first business automation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {insights.map((item, index) => {
            const colors = colorMap[item.color];
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className="block p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 h-full group"
                >
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-4 ${colors.badge}`}
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
                    {item.type}
                  </span>
                  <h3
                    className="text-lg font-bold text-white mb-3"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <span className={`inline-flex items-center gap-1 text-sm font-medium ${colors.arrow} group-hover:gap-2 transition-all`}>
                    Read more <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

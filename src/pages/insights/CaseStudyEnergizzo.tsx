import { Helmet } from "react-helmet-async";
import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooterNew } from "@/components/landing/LandingFooterNew";

const CaseStudyEnergizzo = () => {
  return (
    <>
      <Helmet>
        <title>Case Study: Energizzo — AI Platform for Energy Resellers | UNVRS LABS</title>
        <meta name="description" content="How UNVRS LABS built Energizzo, an AI-native platform that automates billing, onboarding, compliance and customer care for energy resellers in Italy." />
        <link rel="canonical" href="https://www.unvrslabs.dev/insights/energizzo" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Case Study: Energizzo — AI Platform for Energy Resellers",
          "description": "How UNVRS LABS built an AI-native platform that automates the entire energy reselling business in Italy.",
          "author": { "@type": "Organization", "name": "UNVRS LABS" },
          "publisher": { "@type": "Organization", "name": "UNVRS LABS", "url": "https://www.unvrslabs.dev" },
          "datePublished": "2026-04-03",
          "url": "https://www.unvrslabs.dev/insights/energizzo"
        })}</script>
      </Helmet>
      <main className="bg-black min-h-screen">
        <LandingNav showBack backTo="/" />
        <article className="max-w-3xl mx-auto px-6 pt-32 pb-24">
          <header className="mb-12">
            <p className="text-lime-400 text-sm tracking-widest mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>CASE STUDY</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Energizzo: How AI Transformed Energy Reselling in Italy
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              An AI-native platform that enables energy resellers to manage thousands of clients without increasing headcount. From OCR onboarding to ARERA-compliant billing, everything is automated.
            </p>
          </header>

          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Orbitron, sans-serif" }}>The Challenge</h2>
              <p className="text-white/70 leading-relaxed">
                Energy reselling in Italy is one of the most regulation-heavy industries in Europe. Resellers must comply with ARERA (the Italian Regulatory Authority for Energy, Networks and Environment) rules that change frequently. Every invoice must include dozens of regulatory components calculated precisely. Client onboarding requires extensive documentation. Customer support demands are constant.
              </p>
              <p className="text-white/70 leading-relaxed">
                Most resellers operate with small teams and legacy software that requires manual intervention at every step. The result: high operational costs, slow onboarding, billing errors, and an inability to scale beyond a few hundred clients without hiring proportionally.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Orbitron, sans-serif" }}>The Solution</h2>
              <p className="text-white/70 leading-relaxed">
                UNVRS LABS designed Energizzo as an AI-native platform from the ground up. Instead of adding AI features to existing energy software, we built the entire system around artificial intelligence as the core decision-making and operational layer.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8">OCR Onboarding in 60 Seconds</h3>
              <p className="text-white/70 leading-relaxed">
                A new client photographs their current energy bill. The OCR system extracts all relevant data: supply point code (POD/PDR), current provider, consumption history, pricing tier, and personal information. The system generates a switching contract and activates digital OTP signature. The entire process takes 60 seconds, compared to the industry average of 3-5 business days.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8">AI-Powered ARERA Billing</h3>
              <p className="text-white/70 leading-relaxed">
                Energizzo calculates all ARERA regulatory components automatically: transport costs, system charges, excise duties, VAT variations by usage tier, and provider-specific margins. When ARERA publishes new deliberations, the system ingests them automatically and adjusts its calculation models. No manual intervention needed.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8">AI Phone System (24/7)</h3>
              <p className="text-white/70 leading-relaxed">
                The VoIP AI system handles inbound and outbound calls around the clock. It manages customer support inquiries, payment reminders, contract renewals, and even outbound sales calls. The system understands Italian regional accents and can handle complex queries about billing components, switching timelines, and regulatory requirements.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8">Max Power: The AI Orchestrator</h3>
              <p className="text-white/70 leading-relaxed">
                At the center of Energizzo operates Max Power, the AI CEO. Max Power coordinates a network of specialized autonomous agents: sales agents that handle lead qualification and conversion, operations agents that manage the supply chain and dispatching, compliance agents that monitor regulatory changes, and customer care agents that resolve issues proactively.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8">Predictive Analytics</h3>
              <p className="text-white/70 leading-relaxed">
                AI algorithms continuously analyze customer behavior to predict churn risk and payment default probability. Resellers receive early warnings and automated retention campaigns are triggered before customers decide to switch providers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Orbitron, sans-serif" }}>Tech Stack</h2>
              <p className="text-white/70 leading-relaxed">
                Energizzo is built with Laravel (backend), React (frontend), Claude AI by Anthropic (LLM orchestration), custom OCR pipeline, VoIP AI integration, and native iOS/Android apps via Capacitor. The white-label architecture allows each reseller to deploy their own branded version of the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Orbitron, sans-serif" }}>Results</h2>
              <div className="grid grid-cols-3 gap-6 my-8">
                <div className="text-center p-6 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-3xl font-bold text-lime-400" style={{ fontFamily: "Orbitron, sans-serif" }}>60s</p>
                  <p className="text-white/50 text-sm mt-2">Client onboarding time</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-3xl font-bold text-lime-400" style={{ fontFamily: "Orbitron, sans-serif" }}>100%</p>
                  <p className="text-white/50 text-sm mt-2">Billing automation</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-3xl font-bold text-lime-400" style={{ fontFamily: "Orbitron, sans-serif" }}>24/7</p>
                  <p className="text-white/50 text-sm mt-2">AI phone coverage</p>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed">
                Energy resellers using Energizzo can manage thousands of clients with minimal staff. The platform eliminates manual billing errors, reduces onboarding friction to near-zero, and ensures continuous regulatory compliance without dedicated legal teams.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Orbitron, sans-serif" }}>Learn More</h2>
              <p className="text-white/70 leading-relaxed">
                Visit <a href="https://www.energizzo.it" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:text-lime-300 underline">energizzo.it</a> to explore the platform, or <a href="https://wa.me/35799235536" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:text-lime-300 underline">contact us</a> to discuss how AI can transform your energy business.
              </p>
            </section>
          </div>
        </article>
        <LandingFooterNew />
      </main>
    </>
  );
};

export default CaseStudyEnergizzo;

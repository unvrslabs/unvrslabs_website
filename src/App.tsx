import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ThemeProvider from "./components/theme-provider";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CaseStudyEnergizzo from "./pages/insights/CaseStudyEnergizzo";
import CaseStudyGoItalIA from "./pages/insights/CaseStudyGoItalIA";
import ArticleA2AProtocol from "./pages/insights/ArticleA2AProtocol";
import ArticleAICEO from "./pages/insights/ArticleAICEO";
import ArticleAIBusinessAutomation from "./pages/insights/ArticleAIBusinessAutomation";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            {/* Insights: Case Studies & Articles */}
            <Route path="/insights/energizzo" element={<CaseStudyEnergizzo />} />
            <Route path="/insights/goitalia" element={<CaseStudyGoItalIA />} />
            <Route path="/insights/a2a-protocol" element={<ArticleA2AProtocol />} />
            <Route path="/insights/ai-ceo-orchestration" element={<ArticleAICEO />} />
            <Route path="/insights/ai-business-automation" element={<ArticleAIBusinessAutomation />} />
            {/* All old routes redirect to home */}
            <Route path="/auth" element={<Navigate to="/" replace />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/admin/*" element={<Navigate to="/" replace />} />
            <Route path="/ai-social/*" element={<Navigate to="/" replace />} />
            <Route path="/ai-art/*" element={<Navigate to="/" replace />} />
            <Route path="/ai-agents/*" element={<Navigate to="/" replace />} />
            <Route path="/openclaw" element={<Navigate to="/" replace />} />
            <Route path="/labs" element={<Navigate to="/" replace />} />
            <Route path="/settings" element={<Navigate to="/" replace />} />
            <Route path="/marketplace" element={<Navigate to="/" replace />} />
            <Route path="/wallet" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

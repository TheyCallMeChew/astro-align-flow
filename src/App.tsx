import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useStore } from "@/store";

// Onboarding
import Welcome from "./pages/onboarding/Welcome";
import ChoosePath from "./pages/onboarding/ChoosePath";
import BirthInfo from "./pages/onboarding/BirthInfo";
import Quiz from "./pages/onboarding/Quiz";
import Privacy from "./pages/onboarding/Privacy";

// Main App
import Home from "./pages/Home";
import MorningAlignmentNew from "./pages/MorningAlignmentNew";
import Midday from "./pages/Midday";
import EveningReflectionNew from "./pages/EveningReflectionNew";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { BottomTabBar } from "./components/BottomTabBar";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { profile } = useStore();
  
  if (!profile.onboardingDone) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { profile } = useStore();

  return (
    <Routes>
      {/* Onboarding */}
      <Route path="/onboarding" element={profile.onboardingDone ? <Navigate to="/home" replace /> : <Welcome />} />
      <Route path="/onboarding/choose-path" element={<ChoosePath />} />
      <Route path="/onboarding/birth-info" element={<BirthInfo />} />
      <Route path="/onboarding/quiz" element={<Quiz />} />
      <Route path="/onboarding/privacy" element={<Privacy />} />

      {/* Main App */}
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/morning" element={<ProtectedRoute><MorningAlignmentNew /></ProtectedRoute>} />
      <Route path="/midday" element={<ProtectedRoute><Midday /></ProtectedRoute>} />
      <Route path="/evening" element={<ProtectedRoute><EveningReflectionNew /></ProtectedRoute>} />
      <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

      {/* Redirects */}
      <Route path="/" element={<Navigate to={profile.onboardingDone ? "/home" : "/onboarding"} replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => {
  const { profile } = useStore();

  useEffect(() => {
    if (profile.lowEnergyMode) {
      document.documentElement.classList.add('low-energy-mode');
    }
  }, [profile.lowEnergyMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
          {profile.onboardingDone && <BottomTabBar />}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
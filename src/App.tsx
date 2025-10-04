import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileHome from "./pages/mobile/MobileHome";
import MorningAlignment from "./pages/MorningAlignment";
import EveningReflection from "./pages/EveningReflection";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { BottomNav } from "./components/mobile/BottomNav";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MobileHome />} />
          <Route path="/morning" element={<MorningAlignment />} />
          <Route path="/evening" element={<EveningReflection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PetsPage from "./pages/PetsPage";
import PetDetailPage from "./pages/PetDetailPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import VaccinesPage from "./pages/VaccinesPage";
import DewormingPage from "./pages/DewormingPage";
import AllergiesPage from "./pages/AllergiesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/pets/:id" element={<PetDetailPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/vaccines" element={<VaccinesPage />} />
          <Route path="/deworming" element={<DewormingPage />} />
          <Route path="/allergies" element={<AllergiesPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

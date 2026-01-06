import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PetsPage from "./pages/PetsPage";
import AddPetPage from "./pages/AddPetPage";
import PetDetailPage from "./pages/PetDetailPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import AddAppointmentPage from "./pages/AddAppointmentPage";
import VaccinesPage from "./pages/VaccinesPage";
import AddVaccinePage from "./pages/AddVaccinePage";
import DewormingPage from "./pages/DewormingPage";
import AddDewormingPage from "./pages/AddDewormingPage";
import AllergiesPage from "./pages/AllergiesPage";
import AddAllergyPage from "./pages/AddAllergyPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/pets/add" element={<AddPetPage />} />
          <Route path="/pets/:id" element={<PetDetailPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/appointments/add" element={<AddAppointmentPage />} />
          <Route path="/vaccines" element={<VaccinesPage />} />
          <Route path="/vaccines/add" element={<AddVaccinePage />} />
          <Route path="/deworming" element={<DewormingPage />} />
          <Route path="/deworming/add" element={<AddDewormingPage />} />
          <Route path="/allergies" element={<AllergiesPage />} />
          <Route path="/allergies/add" element={<AddAllergyPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

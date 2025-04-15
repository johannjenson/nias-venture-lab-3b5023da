
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import People from "./pages/People";
import RiyadhForum from "./pages/RiyadhEvent";
import LeapDinner from "./pages/LeapDinner";
import SuhoorDinner from "./pages/SuhoorDinner";
import FiresideChats from "./pages/FiresideChats";
import GithubFounderEvent from "./pages/GithubFounderEvent";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import CRM from "./pages/CRM";
import InboundContacts from "./pages/InboundContacts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider delayDuration={0}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/people" element={<People />} />
          <Route path="/events/nias-business-forum" element={<RiyadhForum />} />
          <Route path="/events/leap-dinner" element={<LeapDinner />} />
          <Route path="/events/suhoor-dinner" element={<SuhoorDinner />} />
          <Route path="/events/fireside-chats" element={<FiresideChats />} />
          <Route path="/events/an-evening-with-github-cofounder-tom-preston-werner" element={<GithubFounderEvent />} />
          <Route path="/github-founder" element={<GithubFounderEvent />} />
          <Route path="/events/github-founder" element={<GithubFounderEvent />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/resources/inbound-contacts" element={<InboundContacts />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

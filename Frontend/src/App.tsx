
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./Pages/WelcomePage";
import SignUp from "./Pages/Signup";
import SignIn from "./Pages/Signin";
import PatientHome from "./Pages/PatientHome";
import TherapistHomepage from "./Pages/TherapistHome";
import JoinVC from "./components/vc/JoinVC";
import RoomVC from "./components/vc/RoomVC"
import { VCProvider } from "./components/contexts/VCContext";
import { HMSRoomProvider } from '@100mslive/react-sdk';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HMSRoomProvider>
      <VCProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/patientHome" element={<PatientHome />} />
              <Route path="/therapistHome" element={<TherapistHomepage />} />
              <Route path="/joinVC" element={<JoinVC onJoinSuccess={() => {}} />} />
              <Route path="/roomVC" element={<RoomVC onLeaveRoom={() => {}} />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </VCProvider>
    </HMSRoomProvider>
  </QueryClientProvider>
);

export default App;
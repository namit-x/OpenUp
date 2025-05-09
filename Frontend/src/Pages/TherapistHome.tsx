import { useState } from "react";
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";
import TherapistSidebar from "../components/therapist/therapistSidebar";
import AppointmentCalendar from "../components/therapist/appointmentCalendar";
import TodayAppointments from "../components/therapist/todayAppointments";
import { useIsMobile } from "../hooks/use-mobile";
import Footer from "../components/Footer";

const TherapistHomepage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const isMobile = useIsMobile();

  return (
    <>
      <SidebarProvider defaultOpen={!isMobile}>
        <div className="flex min-h-screen w-screen bg-[#111827] text-gray-100">

          <TherapistSidebar />

          <SidebarInset className="flex-1 p-3 sm:p-4 md:p-6">
            <div className="mx-auto space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Calendar Component */}
                <div className="lg:col-span-1">
                  <AppointmentCalendar
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                </div>

                {/* Today's Appointments Component */}
                <div className="lg:col-span-1">
                  <TodayAppointments />
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
      <footer className="border">
        <Footer />
      </footer>
    </>
  );
};

export default TherapistHomepage;
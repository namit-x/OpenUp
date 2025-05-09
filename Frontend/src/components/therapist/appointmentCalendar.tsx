import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import { useIsMobile } from "../../hooks/use-mobile";

// Mock data for all upcoming appointments (for calendar)
const upcomingAppointments = [
  { id: 1, patient: "Amit Kumar", date: "2025-05-08", time: "05:00 PM", type: "Video" },
  { id: 2, patient: "Priya Verma", date: "2025-05-08", time: "07:30 PM", type: "Voice" },
  { id: 3, patient: "Rahul Singh", date: "2025-05-09", time: "11:00 AM", type: "Video" },
  { id: 4, patient: "Neha Gupta", date: "2025-05-11", time: "03:30 PM", type: "Voice" },
  { id: 5, patient: "Vikram Mehta", date: "2025-05-15", time: "06:00 PM", type: "Video" },
];

interface AppointmentCalendarProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

const AppointmentCalendar = ({ selectedDate, setSelectedDate }: AppointmentCalendarProps) => {
  const isMobile = useIsMobile();

  // Filter appointments for the selected date
  const appointmentsForSelectedDate = selectedDate
    ? upcomingAppointments.filter(
      appointment => new Date(appointment.date).toDateString() === selectedDate.toDateString()
    )
    : [];

  // Function to highlight dates with appointments
  const isDayWithAppointment = (date: Date) => {
    return upcomingAppointments.some(
      appointment => new Date(appointment.date).toDateString() === date.toDateString()
    );
  };

  return (
    <Card className="bg-[#1e293b] border-gray-700 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-xl flex items-center gap-2 bg-gradient-to-r from-teal-400 to-sky-400 bg-clip-text text-transparent">
          <CalendarIcon className="h-5 w-5 text-teal-400" />
          Calendar View
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-[#283548] rounded-md p-2 sm:p-4">
          <Calendar
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="mx-auto pointer-events-auto"
            modifiers={{
              hasAppointment: isDayWithAppointment,
            }}
            modifiersClassNames={{
              hasAppointment: "text-emerald-400 font-bold",
            }}
          />
        </div>

        {appointmentsForSelectedDate.length > 0 && (
          <div className="mt-4 md:mt-6 bg-[#283548] rounded-md p-3 md:p-4">
            <h3 className="text-sm md:text-md font-medium text-teal-400 mb-2 md:mb-3">
              {selectedDate?.toLocaleDateString('en-US', {
                weekday: isMobile ? 'short' : 'long',
                year: 'numeric',
                month: isMobile ? 'short' : 'long',
                day: 'numeric'
              })}
            </h3>
            <ul className="space-y-2">
              {appointmentsForSelectedDate.map(appointment => (
                <li key={appointment.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-700 pb-2">
                  <span className="font-medium text-sm md:text-base">{appointment.patient}</span>
                  <span className="flex items-center gap-2 mt-1 sm:mt-0">
                    <span className="text-teal-400 text-sm">{appointment.time}</span>
                    <span className="text-xs bg-teal-400/20 text-teal-300 px-2 py-1 rounded">
                      {appointment.type}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentCalendar;
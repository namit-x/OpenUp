import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow
} from "../ui/table";
import { Clock } from "lucide-react";
import { useIsMobile } from "../../hooks/use-mobile";

// Mock data for today's appointments
const todayAppointments = [
  { id: 1, patient: "Amit Kumar", time: "05:00 PM", type: "Video" },
  { id: 2, patient: "Priya Verma", time: "07:30 PM", type: "Voice" },
];

const TodayAppointments = () => {
  const isMobile = useIsMobile();

  return (
    <Card className="bg-[#1e293b] border-gray-700 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-xl flex items-center gap-2 bg-gradient-to-r from-teal-400 to-sky-400 bg-clip-text text-transparent">
          <Clock className="h-5 w-5 text-teal-400" />
          Today's Sessions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isMobile ? (
          // Mobile view - card style list
          <div className="space-y-3">
            {todayAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-3 bg-[#283548] rounded-lg border border-gray-700 flex flex-col space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-300">{appointment.patient}</span>
                  <span className="text-xs bg-teal-400/20 text-teal-300 px-2 py-1 rounded">
                    {appointment.type}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{appointment.time}</span>
                  <button
                    className="bg-teal-400 text-gray-900 px-3 py-1 rounded-md text-sm hover:bg-teal-500"
                    onClick={()=> {console.log("Namit");}}
                  >
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop view - table with more space
          <div className="bg-[#283548] rounded-md p-4">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-400">Patient</TableHead>
                  <TableHead className="text-gray-400">Time</TableHead>
                  <TableHead className="text-gray-400">Type</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayAppointments.map((appointment) => (
                  <TableRow key={appointment.id} className="border-gray-700">
                    <TableCell className="font-medium text-gray-300">
                      {appointment.patient}
                    </TableCell>
                    <TableCell className="text-gray-300">{appointment.time}</TableCell>
                    <TableCell className="text-gray-300">{appointment.type}</TableCell>
                    <TableCell>
                      <button
                      className="bg-teal-400 text-gray-900 px-3 py-1 rounded-md text-sm hover:bg-teal-500"
                        onClick={()=>{console.log("Namit")}}
                      >
                        Join
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodayAppointments;
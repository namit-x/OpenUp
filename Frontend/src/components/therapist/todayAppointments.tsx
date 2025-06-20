import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow
} from "../ui/table";
import { Clock, Coffee } from "lucide-react";
import { useIsMobile } from "../../hooks/use-mobile";
import { fetchDetails } from '../../lib/utils';
// import { useNavigate } from 'react-router'
// import { useVC } from '../contexts/VCContext';

// const skeletonArray = Array.from({ length: 3 });

type Appointment = {
  name: string;
  time: string;
  type: string;
  patientID: string;
};

const appointments = () => {
  const isMobile = useIsMobile();
  // const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>();
  // const { joinRoom, state } = useVC();

  useEffect(() => {
    const fetchSession = async () => {
      const details = await fetchDetails();
      let res = await fetch('http://localhost:5000/fetchTodaysSessions', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ details }),
        credentials: 'include',
      });
      let response = await res.json();
      // console.log(response.todaySessionsObj);
      setAppointments(response.todaySessionsObj);
    };
    fetchSession();
  }, []);

  const handleJoin = async (pid: string)=> {
    console.log("Appointments: ", appointments);

    try {
      const res = await fetch('http://localhost:5000/generate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pid }),
        credentials: 'include',
      });
      let data1 = await res.json();

      if (!res.ok) {
        console.log("Message: ", data1.error);
        throw new Error(`Server responded with status ${res.status}`);
      }

      const response = await fetch('http://localhost:5000/get-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      let token = await response.json();
      sessionStorage.setItem('vc_token', token.token);
    } catch (error) {
      console.error('Internal server error:', error);
    }
  }

  // Show empty state when no appointments are scheduled
  if (appointments?.length === 0) {
    return (
      <Card className="bg-[#1e293b] border-gray-700 h-full">
        <CardContent className="p-8 text-center flex flex-col justify-center h-full">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-teal-400/20 rounded-full flex items-center justify-center">
              <Coffee className="h-8 w-8 text-teal-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-300">
              Phew, nothing today!
            </h3>
            <p className="text-gray-400 max-w-md">
              No sessions scheduled for today. Time to take a break or catch up on your notes.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
            {appointments?.map((appointment) => (
              <div
                key={appointment.patientID}
                className="p-3 bg-[#283548] rounded-lg border border-gray-700 flex flex-col space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-300">{appointment.name}</span>
                  <span className="text-xs bg-teal-400/20 text-teal-300 px-2 py-1 rounded">
                    {appointment.type}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{appointment.time}</span>
                  <button
                    onClick={() => handleJoin(appointment.patientID)}
                    className="bg-teal-400 text-gray-900 px-3 py-1 rounded-md text-sm hover:bg-teal-500"
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
                {appointments?.map((appointment) => (
                  <TableRow key={appointment.patientID} className="border-gray-700">
                    <TableCell className="font-medium text-gray-300">
                      {appointment.name}
                    </TableCell>
                    <TableCell className="text-gray-300">{appointment.time}</TableCell>
                    <TableCell className="text-gray-300">{appointment.type}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleJoin(appointment.patientID)}
                        className="bg-teal-400 text-gray-900 px-3 py-1 rounded-md text-sm hover:bg-teal-500"
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

export default appointments;
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
import { Clock } from "lucide-react";
import { useIsMobile } from "../../hooks/use-mobile";
import { fetchDetails } from '../../lib/utils';
import { useVC } from '../contexts/VCContext';

const skeletonArray = Array.from({ length: 3 });

type Appointment = {
  name: string;
  time: string;
  type: string;
};


const TodayAppointments = () => {
  const isMobile = useIsMobile();
  const [appointments, setAppointments] = useState<Appointment[]>();
  const [loading, setLoading] = useState(true);
  // const { joinRoom, state } = useVC();

  const handleJoin = async ()=> {

    let res = await fetch('http://localhost:5000/generate-token', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
    })
  }

  useEffect(() => {
    const fetchSession = async () => {
      const details = await fetchDetails();
      let res = await fetch('http://localhost:5000/fetchTodaysSessions', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ details }),
      });
      let response = await res.json();
      console.log(response);
      setAppointments(response.todaySessionsObj);
      setLoading(false);
    };
    fetchSession();
  }, []);

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
          <div className="space-y-3">
            {loading ? (
              skeletonArray.map((_, i) => (
                <div key={i} className="p-3 bg-[#283548] rounded-lg border border-gray-700 animate-pulse space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-600 rounded w-1/2" />
                    <div className="h-4 bg-gray-600 rounded w-1/4" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-600 rounded w-1/3" />
                    <div className="h-6 bg-gray-500 rounded w-16" />
                  </div>
                </div>
              ))
            ) : (
              appointments?.map((appointment, index) => (
                <div
                  key={index}
                  className="p-3 bg-[#283548] rounded-lg border border-gray-700 flex flex-col space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-300">{appointment?.name}</span>
                    <span className="text-xs bg-teal-400/20 text-teal-300 px-2 py-1 rounded">
                      {appointment?.type}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{appointment.time}</span>
                    <button
                      className="bg-teal-400 text-gray-900 px-3 py-1 rounded-md text-sm hover:bg-teal-500"
                      onClick={() => { console.log("Join clicked"); }}
                    >
                      Join
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="bg-[#283548] rounded-md p-4">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Time</TableHead>
                  <TableHead className="text-gray-400">Type</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  skeletonArray.map((_, i) => (
                    <TableRow key={i} className="border-gray-700 animate-pulse">
                      <TableCell><div className="h-4 bg-gray-600 rounded w-24" /></TableCell>
                      <TableCell><div className="h-4 bg-gray-600 rounded w-16" /></TableCell>
                      <TableCell><div className="h-4 bg-gray-600 rounded w-12" /></TableCell>
                      <TableCell><div className="h-6 bg-gray-500 rounded w-20" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  appointments?.map((appointment, index) => (
                    <TableRow key={index} className="border-gray-700">
                      <TableCell className="font-medium text-gray-300">{appointment.name}</TableCell>
                      <TableCell className="text-gray-300">{appointment.time}</TableCell>
                      <TableCell className="text-gray-300">{appointment.type}</TableCell>
                      <TableCell>
                        <button
                          className="bg-teal-400 text-gray-900 px-3 py-1 rounded-md text-sm hover:bg-teal-500"
                          onClick={() => { console.log("Join clicked"); }}
                        >
                          Join
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodayAppointments;

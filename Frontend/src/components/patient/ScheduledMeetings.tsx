import React, { useEffect } from 'react';
import { Card, CardContent} from "../../components/ui/card";
import { Button } from "../../components/ui/Button";
import { Calendar, Clock, Video, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Meeting {
  id: string;
  therapistName: string;
  therapistImage: string;
  date: string;
  time: string;
  type: 'Video' | 'Voice';
}

// Mock data for scheduled meetings
const mockMeetings: Meeting[] = [
  {
    id: '1',
    therapistName: 'Dr. Sarah Johnson',
    therapistImage: '/placeholder.svg',
    date: '2024-01-15',
    time: '10:00 AM',
    type: 'Video',
  },
  {
    id: '2',
    therapistName: 'Dr. Michael Chen',
    therapistImage: '/placeholder.svg',
    date: '2024-01-18',
    time: '2:30 PM',
    type: 'Voice',
  },
  {
    id: '3',
    therapistName: 'Dr. Emily Rodriguez',
    therapistImage: '/placeholder.svg',
    date: '2024-01-12',
    time: '11:00 AM',
    type: 'Video',
  }
];

interface ScheduledMeetingsProps {
  patientPhone: string;
}

const ScheduledMeetings: React.FC<ScheduledMeetingsProps> = ({ patientPhone }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetings = async () => {
      let res = await fetch('http://localhost:5000/fetchScheduledMeetings', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
      });
    }
    fetchMeetings();
  }, []);

  const handleJoinMeeting = (meeting: Meeting) => {
    console.log('Joining meeting with:', meeting.therapistName);
    navigate('/video-call');
  };

  const upcomingMeetings = mockMeetings;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold bg-gradient-to-r from-teal-400 via-green-300 to-sky-400 bg-clip-text text-transparent">
        Your Meetings
      </h1>

      {/* Upcoming Meetings */}
      <div>
        <h2 className="text-xl font-medium text-gray-300 mb-4">Upcoming Sessions</h2>
        {upcomingMeetings.length === 0 ? (
          <Card className="bg-[#1e293b] border-gray-700">
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No upcoming meetings scheduled</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingMeetings.map((meeting) => (
              <Card key={meeting.id} className="bg-[#1e293b] border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-teal-900 to-teal-700 flex items-center justify-center">
                      <User className="h-8 w-8 text-teal-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-300 mb-2">{meeting.therapistName}</h3>
                      <div className="space-y-2 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(meeting.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{meeting.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          <span>{meeting.type} Session</span>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button
                          onClick={() => handleJoinMeeting(meeting)}
                          className="bg-teal-400 hover:bg-teal-500 text-gray-900 font-medium"
                        >
                          Join Session
                        </Button>
                        <Button
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduledMeetings;
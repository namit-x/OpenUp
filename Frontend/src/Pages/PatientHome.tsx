import { useState, useEffect } from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TherapistListing from "../components/patient/TherapistListing";
import { Button } from "../components/ui/Button";
import { Filter } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_THERAPISTS } from "../graphql/queries";
import TherapistSkeleton from "../components/ui/therapistSkeltonCards";
import ScheduledMeetings from "../components/patient/ScheduledMeetings";

interface Therapist {
  id: string;
  name: string;
  profilePic: string;
  experience: string;
  price: string;
  specializations: string[];
  languages: string[];
  availableVia: string[];
  nextSlot: string;
}

const PatientHome = () => {
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [dateList, setDateList] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'therapists' | 'meetings'>('therapists');
  
  const { data, loading } = useQuery(GET_THERAPISTS, {
    variables: {
      role: "therapist",
    }
  });

  useEffect(() => {
    let dateList = [];
    for (let i = 2; i < 4; i++) {
      let today = new Date();
      today.setDate(today.getDate() + i);
      let formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'long',
      });
      dateList.push(formattedDate)
    }
    setDateList(["Today", "Tomorrow", ...dateList]);
  }, [])

  useEffect(() => {
    const fetchPatientPhone = async () => {
      let res = await fetch(`${import.meta.env.VITE_BACKEND}/details`, {
        method: 'POST',
        credentials: 'include',
      });
      let response = await res.json();
      setPatientPhone(response.phone);
    }
    fetchPatientPhone();
  }, [])

  return (
    <div className="bg-slate-900">
      <Navbar />
      <div className="min-h-screen bg-[#111827] py-6 px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-7xl mx-auto mt-8">
          {/* Top Navigation Bar */}
          <div className="mb-8">
            <div className="flex border-b border-gray-700">
              <button
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'therapists'
                    ? "text-teal-400 border-b-2 border-teal-400 bg-[#1e293b]"
                    : "text-gray-400 hover:text-gray-300"
                }`}
                onClick={() => setActiveTab('therapists')}
              >
                Therapists
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'meetings'
                    ? "text-teal-400 border-b-2 border-teal-400 bg-[#1e293b]"
                    : "text-gray-400 hover:text-gray-300"
                }`}
                onClick={() => setActiveTab('meetings')}
              >
                Meetings
              </button>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'therapists' ? (
            <>
              <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
                <h1 className="text-2xl font-semibold bg-gradient-to-r from-teal-400 via-green-300 to-sky-400 bg-clip-text text-transparent">
                  All Therapists
                </h1>

                <div className="flex space-x-3">
                  <div className="w-60">
                  </div>
                  <Button variant="outline" className="bg-[#1e293b] border-gray-700 text-gray-300">
                    <span className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Filters</span>
                    </span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                  Array.from({ length: 4 }).map((_, index: number) => (
                    <TherapistSkeleton key={index} />
                  ))
                ) : (
                  data?.getTherapists?.map((therapist: Therapist) => (
                    <TherapistListing key={therapist.id} therapist={therapist} patientPhone={patientPhone} dateTabs={dateList} />
                  ))
                )}
              </div>
            </>
          ) : (
            <ScheduledMeetings patientPhone={patientPhone} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PatientHome;
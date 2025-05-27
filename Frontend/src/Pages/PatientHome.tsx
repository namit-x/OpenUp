import { useState, useEffect } from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TherapistListing from "../components/patient/TherapistListing";
import { Button } from "../components/ui/Button";
import { Filter } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_THERAPISTS } from "../graphql/queries";
import TherapistSkeleton from "../components/ui/therapistSkeltonCards";

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
};

const PatientHome = () => {
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [dateList, setDateList] = useState<string[]>([]);
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
    const fetchPatientID = async () => {
      let res = await fetch('http://localhost:5000/details', {
        method: 'POST',
        credentials: 'include',
      });
      let response = await res.json();
      setPatientPhone(response.phone);
    }
    fetchPatientID();

  }, [])

  return (
    <div className="bg-slate-900">
      <Navbar />
      <div className="min-h-screen bg-[#111827] py-6 px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-7xl mx-auto mt-24">
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PatientHome;
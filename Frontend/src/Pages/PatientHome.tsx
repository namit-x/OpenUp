import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TherapistListing from "../components/TherapistListing";
import { Button } from "../components/ui/Button";
import { Filter } from "lucide-react";

interface Therapist {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  password: string;
  gender: string;
  isVerified: boolean;
  experienceYears: number;
  licenseNumber: string;
  profilePicUrl: string;
  role: string;
  price: string;
  nextSlot: string;
  specializations: string[];
  availableVia: string[];
  languages: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}


const PatientHome = () => {
  const [therapistData, setTherapistData] = useState<Therapist[]>([]);

  useEffect(() => {

    const fetchTherapists = async () => {
      let res = await fetch('http://localhost:5000/therapistData', {method: 'POST'});
      let response = await res.json();
      let arr = Object.values(response.fetchedData) as Therapist[];
      console.log(arr);
      setTherapistData(arr);
    }

    fetchTherapists();
  }, [])
  

  const therapists = [
    {
      id: 1,
      name: "Anamika",
      image: "/Doc1.png",
      experience: "2+ years of experience",
      price: "₹1500 for 50 mins",
      expertise: ["Anxiety disorders", "Depressive disorders"],
      languages: ["English", "Hindi"],
      availableVia: ["Video", "Voice"],
      nextSlot: "Today, 05:00 PM"
    },
    {
      id: 2,
      name: "Aman",
      image: "/Doc2.png",
      experience: "3+ years of experience",
      price: "₹1700 for 50 mins",
      expertise: ["Anxiety disorders", "Depressive disorders"],
      languages: ["English", "Hindi"],
      availableVia: ["Video", "Voice"],
      nextSlot: "Today, 04:30 PM"
    },
    {
      id: 3,
      name: "Ananya",
      image: "/Doc3.png",
      experience: "3+ years of experience",
      price: "₹1600 for 50 mins",
      expertise: ["Family therapy", "Relationship counseling"],
      languages: ["English", "Hindi", "Bengali"],
      availableVia: ["Video", "Voice"],
      nextSlot: "Today, 06:15 PM"
    },
    {
      id: 4,
      name: "Namit",
      image: "/Doc4.png",
      experience: "7+ years of experience",
      price: "₹2200 for 50 mins",
      expertise: ["Trauma", "PTSD", "Anxiety disorders"],
      languages: ["English", "Hindi", "Bengali"],
      availableVia: ["Video", "Voice"],
      nextSlot: "Tomorrow, 10:30 AM"
    }
  ];

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
            {/* {therapistData?} */}
            {therapistData.map((therapist: Therapist) => (
              <TherapistListing key={therapist.phone} therapist={therapistData} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PatientHome;
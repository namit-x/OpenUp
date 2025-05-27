import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Calendar, Mic, Video } from "lucide-react";
import BookingModal from "./BookingModal";

interface TherapistProps {
  therapist: {
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
  patientPhone: string;
  dateTabs: string[];
}

const TherapistListing: React.FC<TherapistProps> = ({ therapist, patientPhone, dateTabs}) => {
  const [activeTab, setActiveTab] = useState("Online");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);


  const handleBook = async (id: string) => {
    //a booking modal will be opened and data from it will be recorded here
    // Open the booking modal instead of immediately booking
    setIsBookingModalOpen(true);

    // Preload user data in the background
    try {
      let res = await fetch('http://localhost:5000/details', {
        method: 'POST',
        credentials: 'include',
      });
      let response = await res.json();
      console.log("User data loaded for ID:", id);
      // We'll use this data when they actually confirm booking
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }

  return (
    <>
      <div className="bg-[#1e293b] rounded-lg shadow-lg border border-gray-700 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Profile Image with Background */}
            <div className="relative">
              <div className="w-32 h-32 rounded-lg overflow-hidden bg-gradient-to-br from-teal-900 to-teal-700 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-sky-400 opacity-30 rounded-b-[100%] h-1/2 -bottom-4 -mx-4"></div>
                <img
                  src={therapist.profilePic}
                  alt={therapist.name}
                  className="w-full h-full object-cover object-center relative z-10"
                />
              </div>
              <Button
                size="sm"
                className="absolute bottom-0 left-0 right-0 mx-auto w-full max-w-[90%] bg-teal-500 hover:bg-teal-600 text-white text-xs"
              >
                VIEW PROFILE
              </Button>
            </div>

            {/* Therapist Info */}
            <div className="flex-1">
              <h2 className="text-xl font-medium bg-gradient-to-r from-teal-400 via-green-300 to-sky-400 bg-clip-text text-transparent">
                {therapist.name}
              </h2>
              <p className="text-gray-400 text-sm mt-1">{therapist.experience}</p>
              <p className="text-gray-300 font-medium mt-2">Starts @ {therapist.price}</p>

              {/* Expertise */}
              <div className="mt-4">
                <div className="text-gray-400 text-sm mb-1">Expertise:</div>
                <div className="flex flex-wrap gap-2">
                  {therapist.specializations.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1 bg-[#283548] text-gray-300 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="mt-3">
                <div className="text-gray-400 text-sm mb-1">Speaks:</div>
                <div className="text-sm text-gray-300">
                  {therapist.languages.join(", ")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Consultation Options */}
        <div className="border-t border-gray-700">
          <div className="flex border-b border-gray-700">
            <button
              className={`flex-1 py-3 px-4 text-center ${activeTab === "Online"
                ? "text-teal-400 border-b-2 border-teal-400"
                : "text-gray-400"
                }`}
              onClick={() => setActiveTab("Online")}
            >
              Online
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center ${activeTab === "In-person"
                ? "text-teal-400 border-b-2 border-teal-400"
                : "text-gray-400"
                }`}
              onClick={() => setActiveTab("In-person")}
            >
              In-person
            </button>
          </div>

          <div className="p-6 flex flex-wrap justify-between items-center gap-4">
            {/* Available via */}
            <div>
              <div className="text-gray-400 text-sm mb-1">Available via:</div>
              <div className="flex items-center gap-2">
                {therapist.availableVia.includes("Video") && (
                  <div className="flex items-center gap-1">
                    <Video className="h-4 w-4 text-gray-300" />
                    <span className="text-sm text-gray-300">Video</span>
                  </div>
                )}
                {therapist.availableVia.length > 1 && <span className="text-gray-500">,</span>}
                {therapist.availableVia.includes("Voice") && (
                  <div className="flex items-center gap-1">
                    <Mic className="h-4 w-4 text-gray-300" />
                    <span className="text-sm text-gray-300">Voice</span>
                  </div>
                )}
              </div>
            </div>

            {/* Next Slot */}
            <div>
              <div className="text-gray-400 text-sm mb-1">Next online slot:</div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-300" />
                <span className="text-sm text-gray-300">{therapist.nextSlot}</span>
              </div>
            </div>

            {/* Book Button */}
            <Button
              className="bg-teal-400 hover:bg-teal-500 text-gray-900 font-medium px-8 ml-auto"
              onClick={() => handleBook(therapist.id)}
            >
              BOOK
            </Button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        therapistId={therapist.id}
        patientPhone={patientPhone}
        therapistName={therapist.name}
        setIsBookingModalOpen = {setIsBookingModalOpen}
        dateTabs = {dateTabs}
      />
    </>
  );
};

export default TherapistListing;
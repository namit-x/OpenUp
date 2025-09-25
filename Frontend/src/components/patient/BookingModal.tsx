import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "../ui/dialog";
import { X, Check, Clock } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";
import { useToast } from "../../hooks/use-toast";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  therapistId: string;
  patientPhone: string;
  therapistName: string;
  setIsBookingModalOpen: any;
  dateTabs: string[];
}

const BACKEND_URL = import.meta.env.VITE_BACKEND;

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  therapistId,
  patientPhone,
  therapistName,
  setIsBookingModalOpen,
  dateTabs,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('00:00 AM');
  const [selectedDate, setSelectedDate] = useState<string>("Today");
  const { toast } = useToast();

  // const convertISOTo12Hour = (isoTime: string): string => {
  //   const [hoursStr, minutesStr] = isoTime.split(":");
  //   let hours = parseInt(hoursStr, 10);
  //   const minutes = parseInt(minutesStr, 10);

  //   const modifier = hours >= 12 ? "PM" : "AM";
  //   hours = hours % 12 || 12;

  //   return `${hours}:${minutes.toString().padStart(2, "0")} ${modifier}`;
  // };

  // const convert12HourToISO = (time12h: string): string => {
  //   const [time, modifier] = time12h.trim().split(" ");
  //   let [hours, minutes] = time.split(":").map(Number);

  //   if (modifier.toLowerCase() === "pm" && hours !== 12) hours += 12;
  //   if (modifier.toLowerCase() === "am" && hours === 12) hours = 0;

  //   const isoHours = hours.toString().padStart(2, "0");
  //   const isoMinutes = minutes.toString().padStart(2, "0");

  //   return `${isoHours}:${isoMinutes}`;
  // };

  // Sample time slots - I need to fetch these from an API in a real app
  const timeSlots = [
    "09:00 AM", "02:00 PM", "05:00 PM"
  ];

  const bookSession = async () => {
    let res = await fetch(`${BACKEND_URL}/bookSession`, {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({therapistId, patientPhone, selectedDate, selectedSlot}),
      credentials: 'include',
    });
    let response = await res.text();
    console.log(response);
    setIsBookingModalOpen(false);
    if (res.ok) {
      toast({
        title: "Booked!",
        description: response,
        className: "bg-white text-black",
      });
    }
    else {
      toast({
        title: "Booked!",
        description: "Unexpected error ocurred",
        className: "bg-red-500 text-white",
      });
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-[#1e293b] rounded-xl shadow-xl border border-gray-700 w-full max-w-md mx-4"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-5 border-b border-gray-700 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-medium bg-gradient-to-r from-teal-400 via-green-300 to-sky-400 bg-clip-text text-transparent">
                    Choose your slot
                  </h2>
                  <p className="text-gray-400 text-sm">with {therapistName}</p>
                </div>
                <button
                  onClick={onClose}
                  className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <X size={18} className="text-gray-400" />
                </button>
              </div>

              {/* Date selection tabs */}
              <div className="flex overflow-x-auto py-3 px-4 gap-2 border-b border-gray-700">
                {dateTabs.map((date) => (
                  <button
                    key={date}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all",
                      selectedDate === date
                        ? "bg-teal-500/20 text-teal-400 font-medium"
                        : "text-gray-400 hover:bg-gray-700/40"
                    )}
                    onClick={() => setSelectedDate(date)}
                  >
                    {date}
                  </button>
                ))}
              </div>

              {/* Time slots */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4 text-gray-300">
                  <Clock size={16} />
                  <span className="text-sm">Select a time slot</span>
                </div>
                <motion.div
                  className="grid grid-cols-3 gap-3"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                      }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {timeSlots.map((time) => (
                    <motion.button
                      key={time}
                      className={cn(
                        "relative h-14 rounded-lg flex items-center justify-center transition-all overflow-hidden",
                        selectedSlot === time
                          ? "bg-gradient-to-br from-teal-400 to-sky-400 text-gray-900 font-medium"
                          : "bg-[#283548] hover:bg-[#2e3e54] text-gray-300"
                      )}
                      onClick={() => {
                        console.log("Slot selected: ", time);
                        setSelectedSlot(time);
                      }}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                    >
                      {selectedSlot === time && (
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          layoutId="selectedSlot"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        {selectedSlot === time && (
                          <Check size={14} className="text-gray-900" />
                        )}
                        {time}
                      </span>
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              {/* Footer actions */}
              <div className="p-5 border-t border-gray-700 flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-gray-700 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  className="bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white"
                  onClick={bookSession}
                  disabled={!selectedSlot}
                >
                  Book Session
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
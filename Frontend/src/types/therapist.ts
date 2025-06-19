export interface Therapist {
  id: string;
  name: string;
  profilePic: string;
  experience: string;
  price: string;
  specializations: string[];
  languages: string[];
  availableVia: string[];
  nextSlot: string;
  scheduledMeetings?: {
    id: string;
    patientName: string;
    date: string;
    time: string;
    status: 'upcoming' | 'completed' | 'cancelled';
    type: 'video' | 'audio' | 'chat';
  }[];
}

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { CalendarIcon, ArrowLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router';
import { useToast } from "../../hooks/use-toast";

interface PatientSignUpFormProps {
  onBack: () => void;
}

interface PatientData {
  role: 'patient';
  fullName: string;
  email: string;
  phone: string;
  password: string;
  dateOfBirth: string | null;
}

export const PatientSignUpForm: React.FC<PatientSignUpFormProps> = ({ onBack }) => {
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const createAccount = async (data: PatientData) => {
    let res = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
    })
    let response = await res.json();
    return response;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const fullName = form.get("fullName")?.toString().trim() || "";
    const email = form.get("email")?.toString().trim() || "";
    const phone = form.get("phone")?.toString().trim() || "";
    const password = form.get("password")?.toString() || "";
    const confirmPassword = form.get("confirmPassword")?.toString() || "";

    const newErrors: Record<string, string> = {};

    if (!fullName) newErrors.fullName = 'Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!date) {
      newErrors.dob = 'Date of birth is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    const patientData: PatientData = {
      role: 'patient',
      fullName,
      email,
      phone,
      password,
      dateOfBirth: date ? format(date, "yyyy-MM-dd") : null,
    };

    const created = await createAccount(patientData);

    if (created.message === "Operation Successful") {
      setLoading(false);
      toast({
        title: "Account created!",
        description: "Your patient account has been successfully created.",
        className: "bg-white text-black",
      });
      navigate('/patientHome');
    }
    else {
      console.log("Something unexpected happened.");
      setLoading(false);
      toast({
        title: "Account already exist.",
        description: "Try sign up with another phone number",
        className: "bg-red-500 text-white",
      })
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 form-transition">
      <div className="flex items-center mb-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-gray-400 hover:text-gray-300 p-0 mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold text-gray-200">Step 2 of 3</h2>
      </div>

      <h3 className="text-lg font-medium text-center text-gray-300">Patient Registration</h3>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            className="bg-gray-800 border-gray-700 text-gray-200"
            placeholder="Karan Singh"
          />
          {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-300">Email Address <span className="text-gray-500">(optional)</span></Label>
          <Input
            id="email"
            name="email"
            type="email"
            className="bg-gray-800 border-gray-700 text-gray-200"
            placeholder="mail@example.com"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            className="bg-gray-800 border-gray-700 text-gray-200"
            placeholder="XXXXX XXXXX"
          />
          {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <Label htmlFor="dob" className="text-gray-300">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="dob"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-gray-200",
                  !date && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
              <Calendar
                selected={date}
                onSelect={setDate}
                className="pointer-events-auto"
                disabled={(date: Date) => date > new Date()}
              />
            </PopoverContent>
          </Popover>
          {errors.dob && <p className="text-red-400 text-sm mt-1">{errors.dob}</p>}
        </div>

        <div>
          <Label htmlFor="password" className="text-gray-300">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            className="bg-gray-800 border-gray-700 text-gray-200"
          />
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="bg-gray-800 border-gray-700 text-gray-200"
          />
          {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-teal-400 hover:bg-teal-500 text-gray-900 font-medium flex items-center justify-center"
        disabled={loading}
      >
        {loading ? "Creating Account..." : "Next"}
        {!loading && <ChevronRight className="ml-1 h-4 w-4" />}
      </Button>
    </form>
  );
};

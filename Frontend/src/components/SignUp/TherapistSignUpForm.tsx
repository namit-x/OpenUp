
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";
import { z } from "zod";

interface TherapistSignUpFormProps {
  onBack: () => void;
}

// Define the therapist signup schema
const therapistSignupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(10, "Mobile number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  licenseNumber: z.string().min(1, "License number is required"),
  specializations: z.array(z.string()).min(1, "At least one specialization is required"),
  experienceYears: z.number().min(0, "Experience must be a positive number"),
  languages: z.array(z.string()).min(1, "At least one language is required"),
  email: z.string().email("Invalid email").optional(),
  profilePicUrl: z.string().url("Invalid URL").optional(),
  gender: z.string().optional(),
  role: z.literal("therapist"),
});

export const TherapistSignUpForm: React.FC<TherapistSignUpFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    specializations: ['CBT'], // Default value
    experienceYears: 0,
    languages: ['English'], // Default value
    gender: '',
    profilePicUrl: '',
    role: 'therapist' as const,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Password confirmation check (not in schema)
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }
    
    try {
      // Validate the form data against the schema
      const validatedData = therapistSignupSchema.parse(formData);

      console.log(formData);
      // Clear any previous errors
      setErrors({});
      setLoading(true);

      // Create the final user object with all details
      const therapistData = {
        ...validatedData,
      };

      // Log the user data to the console
      console.log("Therapist Sign Up Data:", therapistData);

      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        toast({
          title: "Account created!",
          description: "Your therapist account has been created and is pending verification.",
        });
        // In a real app, you would redirect to a verification page
      }, 1500);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a format our form can use
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
      } else {
        // Handle unexpected errors
        console.error("Form validation error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive"
        });
      }
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

      <h3 className="text-lg font-medium text-center text-gray-300">Therapist Registration</h3>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="bg-gray-800 border-gray-700 text-gray-200"
            placeholder="Dr. Jane Doe"
          />
          {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-300">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-800 border-gray-700 text-gray-200"
            placeholder="dr.jane@example.com"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="bg-gray-800 border-gray-700 text-gray-200"
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <Label htmlFor="licenseNumber" className="text-gray-300">
            License Number / Certification ID
          </Label>
          <Input
            id="licenseNumber"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            className="bg-gray-800 border-gray-700 text-gray-200"
            placeholder="LIC-12345678"
          />
          {errors.licenseNumber && <p className="text-red-400 text-sm mt-1">{errors.licenseNumber}</p>}
        </div>

        <div>
          <Label htmlFor="password" className="text-gray-300">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
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
            value={formData.confirmPassword}
            onChange={handleChange}
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

import React, { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';

// Component props interface
interface TherapistSignUpFormProps {
  onBack: () => void;
}

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
    role: 'therapist',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Submit form data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Basic validation
    const newErrors: Record<string, string> = {};

    // Implementation zod validation will be done here...
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = 'Mobile number must be at least 10 digits';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      let res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        },
      })
      let response = await res.json();
      console.log("Response: ", response);
      setLoading(false);
    } catch (error) {
      console.error("Form submission error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center mb-4">
        <button
          type="button"
          onClick={onBack}
          className="text-gray-400 hover:text-gray-300 p-0 mr-2 bg-transparent border-none"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h2 className="text-xl font-semibold text-gray-200">Step 2 of 3</h2>
      </div>

      <h3 className="text-lg font-medium text-center text-gray-300">Therapist Registration</h3>

      <div className="space-y-4">
        {/* Personal Information */}
        <div className="space-y-3">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
              Full Name*
            </label>
            <input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="Dr. Aiesha Verma"
            />
            {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="dr.jane@example.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
              Phone Number*
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-300">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Professional Information */}
        <div className="space-y-3 pt-2 border-t border-gray-700">
          <div>
            <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-300">
              License Number / Certification ID*
            </label>
            <input
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="LIC-12345678"
            />
            {errors.licenseNumber && <p className="text-red-400 text-sm mt-1">{errors.licenseNumber}</p>}
          </div>

          <div>
            <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-300">
              Years of Experience*
            </label>
            <input
              id="experienceYears"
              name="experienceYears"
              type="number"
              min="0"
              value={formData.experienceYears}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            {errors.experienceYears && <p className="text-red-400 text-sm mt-1">{errors.experienceYears}</p>}
          </div>
        </div>

        {/* Account Security */}
        <div className="space-y-3 pt-2 border-t border-gray-700">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password*
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
              Confirm Password*
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-teal-500 hover:bg-teal-600 text-gray-900 font-medium py-2 px-4 rounded-md flex items-center justify-center transition-colors duration-200"
        disabled={loading}
      >
        {loading ? "Creating Account..." : "Next"}
        {!loading && <ChevronRight className="ml-1 h-4 w-4" />}
      </button>
    </form>
  );
};
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Eye, EyeOff, ArrowLeft, Mail, Lock, Phone } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import { useNavigate } from 'react-router';

interface TherapistSignInFormProps {
  onBack: () => void;
}

interface loginData {
  role: string,
  password: string,
  phone: string,
  licenseId: string,
}

const verifyDetails = async (data: loginData) => {
  let res = await fetch('http://localhost:5000/signin', {
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
  })

  let response = await res.json();
  return response;
}

export const TherapistSignInForm: React.FC<TherapistSignInFormProps> = ({ onBack }) => {
  const [phone, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [licenseId, setLicenseId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!phone.trim() || !password.trim() || !licenseId.trim()) {
      setError('Please fill in all fields');
      return;
    }

    // Set loading state
    setLoading(true);

    // Create the sign in data object for logging
    const signInData = {
      role: 'therapist',
      phone,
      password,
      licenseId,
    };

    let res = await verifyDetails(signInData);

    if (res.message == "Verified") {
      setLoading(false);
      toast({
        title: "Welcome!",
        description: "Therapist Logged in successfully.",
        className: "bg-white text-black",
      });
      navigate('/therapistHome');
    }

    setLoading(false);

  };

  return (
    <motion.div
      className="mt-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center">
        <Button
          type="button"
          variant="ghost"
          className="p-0 mr-2 text-gray-400 hover:text-white"
          onClick={onBack}
        >
          <ArrowLeft size={18} />
        </Button>
        <h2 className="p-0 text-xl font-semibold text-white">Therapist Sign In</h2>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-md bg-red-500/20 border border-red-500/50 text-red-200 text-sm"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSignIn} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="patient-mobile" className="text-sm text-gray-300">
            Mobile Number
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <Input
              id="patient-mobile"
              type="tel"
              value={phone}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter your mobile number"
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="therapist-password" className="text-sm text-gray-300">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <Input
              id="therapist-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="license-id" className="text-sm text-gray-300">
            License ID
          </Label>
          <Input
            id="license-id"
            type="text"
            value={licenseId}
            onChange={(e) => setLicenseId(e.target.value)}
            placeholder="Your professional license ID"
            className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
            required
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            variant="link"
            className="text-sm text-teal-400 hover:text-teal-300 p-0 h-auto"
          >
            Forgot password?
          </Button>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-sky-400 to-teal-500 hover:from-sky-500 hover:to-teal-600 text-gray-900 font-medium py-2 h-12 flex items-center justify-center"
        >
          {loading ? (
            <div className="h-5 w-5 rounded-full border-2 border-gray-900 border-r-transparent animate-spin" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </motion.div>
  );
};
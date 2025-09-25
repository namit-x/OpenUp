import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Eye, EyeOff, ArrowLeft, Phone, Lock } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";
import { useNavigate } from 'react-router';

const BACKEND_URL = import.meta.env.VITE_BACKEND;

interface PatientSignInFormProps {
  onBack: () => void;
}

interface loginData {
  role: string,
  password: string,
  phone: string,
}

export const PatientSignInForm: React.FC<PatientSignInFormProps> = ({ onBack }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const verifyDetails = async (data: loginData) => {
      try {
    
        let res = await fetch(`${BACKEND_URL}/signin`, {
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
    catch (error) {
      setLoading(false);
      console.log('Error ocurred: ', error);
    }
    }

    // Basic validation
    if (!mobileNumber.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);

    const signInData = {
      role: 'patient',
      phone: mobileNumber,
      password,
    };
    let res = await verifyDetails(signInData);

    if (res.message == "Verified") {
      setLoading(false);
      toast({
        title: "Welcome!",
        description: "Patient Logged in successfully.",
        className: "bg-white text-black",
      });
      navigate('/patientHome');
    }
  };

  const formAnimationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };

  const inputAnimationProps = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3 }
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
        <h2 className="text-xl font-semibold text-white">Patient Sign In</h2>
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

      <motion.form
        {...formAnimationProps}
        onSubmit={handleSignIn}
        className="space-y-4"
      >
        <motion.div
          className="space-y-2"
          {...inputAnimationProps}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Label htmlFor="patient-mobile" className="text-sm text-gray-300">
            Mobile Number
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <Input
              id="patient-mobile"
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter your mobile number"
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
              required
            />
          </div>
        </motion.div>

        <motion.div
          className="space-y-2"
          {...inputAnimationProps}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Label htmlFor="patient-password" className="text-sm text-gray-300">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <Input
              id="patient-password"
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
        </motion.div>

        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            type="button"
            variant="link"
            className="text-sm text-teal-400 hover:text-teal-300 p-0 h-auto"
          >
            Forgot password?
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-gray-900 font-medium py-2 h-12 flex items-center justify-center"
          >
            {loading ? (
              <div className="h-5 w-5 rounded-full border-2 border-gray-900 border-r-transparent animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};
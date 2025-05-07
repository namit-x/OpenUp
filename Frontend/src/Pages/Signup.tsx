import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RoleSelector } from '../components/SignUp/RoleSelector';
import { PatientSignUpForm } from '../components/SignUp/PatientSignUpForm';
import { TherapistSignUpForm } from '../components/SignUp/TherapistSignUpForm';
import { motion, AnimatePresence } from 'framer-motion';

type UserRole = 'patient' | 'therapist' | null;

const SignUp = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Simulating loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex bg-[#111827] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-teal-900/20 blur-[100px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-sky-900/20 blur-[120px]"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Form container - centered on full width */}
      <motion.div
        className="w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          {!loadingComplete ? (
            <motion.div
              key="loading"
              className="absolute inset-0 flex items-center justify-center bg-[#111827]"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-16 h-16 border-4 border-t-teal-400 border-r-transparent border-b-sky-400 border-l-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              className="w-[800px] space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="backdrop-blur-xl bg-gray-900/60 border border-gray-800/50 rounded-2xl p-8 shadow-xl">
                <motion.div
                  className="text-center flex flex-col items-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-3xl font-bold text-color-gradient p-2 w-min mb-4">
                    OpenUp
                  </h1>
                  <div className="h-px w-1/2 mx-auto my-4 bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>
                  <p className="mt-3 text-gray-300">
                    Create an account to begin your mental wellness journey
                  </p>
                </motion.div>

                <AnimatePresence mode="wait">
                  {selectedRole === null ? (
                    <motion.div
                      key="role-selector"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <RoleSelector onSelect={setSelectedRole} />
                    </motion.div>
                  ) : selectedRole === 'patient' ? (
                    <motion.div
                      key="patient-form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PatientSignUpForm onBack={() => setSelectedRole(null)} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="therapist-form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TherapistSignUpForm onBack={() => setSelectedRole(null)} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  className="text-center mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-white">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-teal-400 hover:text-teal-300 font-medium relative group">
                      Sign in
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SignUp;

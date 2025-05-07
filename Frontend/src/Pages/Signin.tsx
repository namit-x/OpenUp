import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PatientSignInForm } from '../components/SignIn/PatientSignInForm';
import { TherapistSignInForm } from '../components/SignIn/TherapistSignInForm';

type UserRole = 'patient' | 'therapist' | null;

const SignIn = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Simulating loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex bg-[#111827] relative overflow-hidden ">
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
        className="w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative" //directly outside of signin box
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
              <div className="backdrop-blur-xl bg-gray-900/60 border border-gray-800/50 w-[800px] rounded-2xl p-8 shadow-xl">
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-3xl font-bold text-color-gradient w-[210px]">
                    Welcome Back
                  </h1>
                  <div className="h-px w-1/2 mx-auto my-4 bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>
                  <p className=" text-gray-300">
                    Sign in to continue your mental wellness journey
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
                      className="mt-8"
                    >
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-6 p-2">
                        {/* Patient Role Option */}
                        <motion.div
                          className="relative group"
                          whileHover={{ scale: 1.03 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <button
                            onClick={() => setSelectedRole('patient')}
                            className="w-full h-36 bg-gradient-to-br from-teal-900/30 to-sky-900/30 backdrop-blur-sm border border-teal-500/20 rounded-xl p-4 text-left group-hover:border-teal-400/50 transition-all duration-300"
                          >
                            <div className="flex flex-col h-full justify-between">
                              <div className="w-12 h-12 rounded-full bg-teal-400/20 flex items-center justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-white group-hover:text-teal-300 transition-colors">Patient</h3>
                                <p className="text-gray-400 text-sm">Access your therapy sessions</p>
                              </div>
                            </div>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400/0 via-teal-400/0 to-teal-400/0 group-hover:from-teal-400/0 group-hover:via-teal-400/10 group-hover:to-teal-400/0 transition-all duration-500"></div>
                          </button>
                        </motion.div>

                        {/* Therapist Role Option */}
                        <motion.div
                          className="relative group"
                          whileHover={{ scale: 1.03 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <button
                            onClick={() => setSelectedRole('therapist')}
                            className="w-full h-36 bg-gradient-to-br from-sky-900/30 to-teal-900/30 backdrop-blur-sm border border-sky-500/20 rounded-xl p-4 text-left group-hover:border-sky-400/50 transition-all duration-300"
                          >
                            <div className="flex flex-col h-full justify-between">
                              <div className="w-12 h-12 rounded-full bg-sky-400/20 flex items-center justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-white group-hover:text-sky-300 transition-colors">Therapist</h3>
                                <p className="text-gray-400 text-sm">Manage your patient sessions</p>
                              </div>
                            </div>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-400/0 via-sky-400/0 to-sky-400/0 group-hover:from-sky-400/0 group-hover:via-sky-400/10 group-hover:to-sky-400/0 transition-all duration-500"></div>
                          </button>
                        </motion.div>
                      </div>
                    </motion.div>
                  ) : selectedRole === 'patient' ? (
                    <motion.div
                      key="patient-form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PatientSignInForm onBack={() => setSelectedRole(null)} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="therapist-form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TherapistSignInForm onBack={() => setSelectedRole(null)} />
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
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-teal-400 hover:text-teal-300 font-medium relative group">
                      Sign up
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

export default SignIn;
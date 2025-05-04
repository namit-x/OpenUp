import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { User, IdCard } from 'lucide-react';
import { motion } from 'framer-motion';

interface RoleSelectorProps {
  onSelect: (role: 'patient' | 'therapist') => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelect }) => {
  const [hoveredRole, setHoveredRole] = useState<'patient' | 'therapist' | null>(null);

  return (
    <div className="space-y-6 py-4 relative z-10">
      <h2 className="text-xl font-medium text-center text-gray-200">Choose Your Path</h2>
      <h3 className="text-lg font-medium text-center text-gray-300 mb-8">I am seeking...</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        <motion.div
          className="absolute inset-0 bg-teal-400/10 rounded-2xl -z-10"
          animate={{
            x: hoveredRole === 'patient' ? '0%' : hoveredRole === 'therapist' ? '100%' : '50%',
            width: hoveredRole ? '50%' : '0%',
            opacity: hoveredRole ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        />

        <Button
          variant="ghost"
          className="group relative h-auto p-8 border-0 rounded-2xl overflow-hidden bg-transparent hover:bg-transparent"
          onClick={() => onSelect('patient')}
          onMouseEnter={() => setHoveredRole('patient')}
          onMouseLeave={() => setHoveredRole(null)}
        >
          <div className="relative z-10 flex flex-col items-center w-80">
            <motion.div
              className="mb-6 p-4 rounded-full bg-gray-800 border border-gray-700"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <User className="h-12 w-12 text-teal-400" />
            </motion.div>
            <motion.span
              className="text-2xl font-medium text-color-gradient"
              animate={{ y: hoveredRole === 'patient' ? 0 : 10, opacity: hoveredRole === 'patient' ? 1 : 0.8 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              Healing & Support
            </motion.span>
            <motion.p
              className="mt-4 text-gray-300 text-center"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: hoveredRole === 'patient' ? 1 : 0,
                height: hoveredRole === 'patient' ? 'auto' : 0
              }}
              transition={{ duration: 0.3 }}
            >
              Patient? Sign In here-&#62;
            </motion.p>
          </div>
        </Button>

        <Button
          variant="ghost"
          className="group relative h-auto p-8 border-0 rounded-2xl overflow-hidden bg-transparent hover:bg-transparent"
          onClick={() => onSelect('therapist')}
          onMouseEnter={() => setHoveredRole('therapist')}
          onMouseLeave={() => setHoveredRole(null)}
        >
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              className="mb-6 p-4 rounded-full bg-gray-800 border border-gray-700"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <IdCard className="h-12 w-12 text-teal-400" />
            </motion.div>
            <motion.span
              className="text-2xl font-medium text-color-gradient"
              animate={{ y: hoveredRole === 'therapist' ? 0 : 10, opacity: hoveredRole === 'therapist' ? 1 : 0.8 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              Provide Guidance
            </motion.span>
            <motion.p
              className="mt-4 text-gray-300 text-center max-w-xs"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: hoveredRole === 'therapist' ? 1 : 0,
                height: hoveredRole === 'therapist' ? 'auto' : 0
              }}
              transition={{ duration: 0.3 }}
            >
              Therapist? Sign In here-&#62;
            </motion.p>
          </div>
        </Button>
      </div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-gray-400 italic">Select your role to begin your journey</p>
      </motion.div>
    </div>
  );
};
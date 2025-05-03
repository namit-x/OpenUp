import React from 'react';

interface UserTypeButtonProps {
  type: 'PATIENT' | 'THERAPIST';
  onClick: () => void;
}

const UserTypeButton: React.FC<UserTypeButtonProps> = ({ type, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full md:w-60 py-4 px-6 border-2 border-blue-950 text-openup-navy font-medium rounded-full
                hover:bg-blue-950 hover:text-white transition-colors duration-300 text-center"
    >
      {type}
    </button>
  );
};

export default UserTypeButton;

import React from 'react';

interface CircularButtonProps {
  onPress: () => void;
  children: React.ReactNode;
}

const CircularButton = ({ onPress, children }: CircularButtonProps) => {
  return (
    <button
      className="grid place-items-center w-16 h-16 bg-gray-700 rounded-full shadow-md"
      onClick={() => onPress()}
    >
      {children}
    </button>
  );
};

export default CircularButton;

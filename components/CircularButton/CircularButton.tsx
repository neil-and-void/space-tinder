import React from 'react';

interface CircularButtonProps {
  onPress: () => void;
  children: React.ReactNode;
}

const CircularButton = ({ onPress, children }: CircularButtonProps) => {
  return (
    <button
      className="w-16 h-16 bg-white rounded-full shadow-md"
      onClick={() => onPress()}
    >
      {children}
    </button>
  );
};

export default CircularButton;

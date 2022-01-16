interface CircularButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled: boolean;
}

const CircularButton = ({
  onClick,
  children,
  disabled,
}: CircularButtonProps) => {
  return (
    <button
      className="grid place-items-center w-16 h-16 bg-gray-700 rounded-full shadow-md"
      onClick={() => onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CircularButton;

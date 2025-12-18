import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  styles?: string;
  type?: "submit" | "reset" | "button";
}

export default function Button({
  children,
  onClick,
  disabled = false,
  styles,
  type,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`
      rounded-lg
      p-2 px-5 
      bg-green-500
      text-white 
      hover:bg-green-800
      duration-200
       ${styles}
      `}
    >
      {children}
    </button>
  );
}

import React from 'react';

interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return (
    <button
      type="button"
      className="rounded-md bg-primary-500 sm:py-2 py-0 px-4 font-medium text-white hover:bg-primary-700 dark:hover:bg-primary-400
      focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black"
    >
      {text}
    </button>
  );
};

export default Button;

import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ to, className = '', children, ...rest }) => {
  const baseClasses =
    'px-6 py-3 rounded text-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 pointer-events-auto';

  if (to) {
    return (
      <Link href={to} className={`${baseClasses} ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <button className={`${baseClasses} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button; 
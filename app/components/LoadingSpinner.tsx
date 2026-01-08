'use client';

import Image from 'next/image';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ 
  message = 'Loading...', 
  size = 'md' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24'
  };

  const logoSizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-18 w-18'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        {/* Spinning circle around the logo */}
        <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-t-purple-500 border-r-purple-400 rounded-full animate-spin`}></div>
        
        {/* Logo in the center */}
        <div className={`${sizeClasses[size]} flex items-center justify-center`}>
          <Image
            src="/logos/logo-loading.png"
            alt="Loading"
            width={size === 'sm' ? 24 : size === 'md' ? 48 : 72}
            height={size === 'sm' ? 24 : size === 'md' ? 48 : 72}
            className={logoSizeClasses[size]}
          />
        </div>
      </div>
      
      {message && (
        <p className="text-gray-400 mt-4 text-center">{message}</p>
      )}
    </div>
  );
}

import React from 'react';

const LoadingAnimation = ({ message = "Connecting to room..." }) => {
  return (
    <div className="fixed inset-0 bg-zinc-950 flex items-center justify-center z-50">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
      
      {/* Loading content */}
      <div className="relative flex flex-col items-center space-y-8">
        {/* Logo with spinner */}
        <div className="relative">
          <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 
                          rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-xl font-bold text-white">SC</span>
          </div>
          
          {/* Spinner ring */}
          <div className="absolute -inset-3 border-2 border-transparent border-t-indigo-500 
                          rounded-full animate-spin" />
        </div>

        {/* Loading text */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-semibold text-zinc-100">
            SynCode
          </h2>
          <p className="text-zinc-500">{message}</p>
          
          {/* Dots animation */}
          <div className="flex justify-center space-x-1.5 pt-2">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;

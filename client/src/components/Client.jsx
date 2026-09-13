import React from 'react';

const Client = ({ username }) => {
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const getBackgroundColor = (name) => {
    const colors = [
      'from-indigo-500 to-purple-500',
      'from-emerald-500 to-teal-500',
      'from-amber-500 to-orange-500',
      'from-pink-500 to-rose-500',
      'from-cyan-500 to-blue-500',
      'from-violet-500 to-purple-500',
    ];
    
    if (!name) return colors[0];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="flex items-center p-3 bg-zinc-800/50 rounded-xl 
                    border border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-700
                    transition-all duration-200">
      <div className={`w-9 h-9 bg-gradient-to-br ${getBackgroundColor(username)} 
                       rounded-lg flex items-center justify-center text-white text-sm font-medium`}>
        {getInitial(username)}
      </div>
      <span className="ml-3 text-sm text-zinc-300 font-medium">
        {username}
      </span>
    </div>
  );
};

export default Client;

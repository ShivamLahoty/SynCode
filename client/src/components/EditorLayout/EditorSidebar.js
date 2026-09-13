import React from 'react';

const EditorSidebar = ({ 
  clients, 
  isConnected, 
  roomId, 
  currentUser, 
  onCopyRoomId, 
  onLeaveRoom 
}) => {
  const getAvatarGradient = (username) => {
    const gradients = [
      'from-indigo-500 to-purple-500',
      'from-emerald-500 to-teal-500',
      'from-amber-500 to-orange-500',
      'from-pink-500 to-rose-500',
      'from-cyan-500 to-blue-500',
      'from-violet-500 to-purple-500',
      'from-lime-500 to-green-500',
      'from-red-500 to-pink-500',
    ];
    
    if (!username) return gradients[0];
    const index = username.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  return (
    <aside className="w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col h-screen">
      {/* Header */}
      <div className="p-5 border-b border-zinc-800">
        <div className="flex items-center space-x-3 mb-5">
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 
                          rounded-xl flex items-center justify-center">
            <span className="text-base font-bold text-white">SC</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-zinc-100">SynCode</h1>
            <p className="text-xs text-zinc-500">Collaborative Editor</p>
          </div>
        </div>
        
        {/* Room Info */}
        <div className="bg-zinc-800/50 rounded-xl p-3 border border-zinc-700/50">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Room ID</p>
              <p className="text-sm font-mono text-zinc-300 truncate" title={roomId}>
                {roomId}
              </p>
            </div>
            <div className={`w-2 h-2 rounded-full ml-3 flex-shrink-0 
                             ${isConnected ? 'bg-emerald-500' : 'bg-red-500'}`} />
          </div>
        </div>
      </div>

      {/* Connected Users */}
      <div className="flex-1 p-5 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-zinc-400">
            Connected
          </h3>
          <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">
            {clients.length}
          </span>
        </div>
        
        <div className="space-y-2 overflow-y-auto custom-scrollbar" style={{maxHeight: 'calc(100vh - 340px)'}}>
          {clients.map((client, index) => (
            <div key={client.socketId} 
                 className="flex items-center p-3 bg-zinc-800/50 rounded-xl border border-zinc-700/50
                            hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200"
                 style={{ animationDelay: `${index * 50}ms` }}>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-medium
                              bg-gradient-to-br ${getAvatarGradient(client.username)}`}>
                {client.username?.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <span className="text-sm text-zinc-200 font-medium truncate block">
                  {client.username}
                  {client.username === currentUser && 
                    <span className="ml-2 text-[10px] text-indigo-400">(you)</span>
                  }
                </span>
              </div>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 border-t border-zinc-800 space-y-2">
        <button 
          onClick={onCopyRoomId}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5
                     bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-zinc-100
                     font-medium rounded-xl transition-all duration-200 border border-zinc-700"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy Room ID</span>
        </button>
        
        <button 
          onClick={onLeaveRoom}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5
                     bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white
                     font-medium rounded-xl transition-all duration-200 border border-red-500/20 hover:border-red-500"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Leave Room</span>
        </button>
      </div>
    </aside>
  );
};

export default EditorSidebar;

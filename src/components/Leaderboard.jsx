import React from 'react';
import { Volume2, ArrowLeft } from 'lucide-react';

// Komponen Leaderboard
function Leaderboard({ onBack }) {
  const leaderboardData = [
    { rank: 1, name: "Si A", avatar: "👦", correctAnswers: 85, wrongAnswers: 15 },
    { rank: 2, name: "Si B", avatar: "👩", correctAnswers: 78, wrongAnswers: 22 },
    { rank: 3, name: "Si C", avatar: "👦", correctAnswers: 72, wrongAnswers: 28 },
    { rank: 4, name: "Si D", avatar: "👩", correctAnswers: 65, wrongAnswers: 35 }
  ];

  return (
    <div className="min-h-screen bg-orange-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
      </div>
          
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Leaderboard</h1>

      {/* Leaderboard Container */}
      <div className="bg-blue-100 rounded-lg p-4 border-2 border-blue-300 mb-6">
        {leaderboardData.map((player, index) => (
          <div key={index} className="flex items-center space-x-4 mb-4 last:mb-0">
            {/* Rank */}
            <span className="text-lg font-semibold text-gray-700 w-6">
              {player.rank}.
            </span>
            
            {/* Avatar */}
            <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-2xl">
              {player.avatar}
            </div>
            
            {/* Name */}
            <span className="text-lg font-medium text-gray-800 min-w-[60px]">
              {player.name}
            </span>
            
            {/* Progress Bars */}
            <div className="flex-1 flex">
              <div className="flex-1 bg-green-500 h-6 rounded-l-md"></div>
              <div className="flex-1 bg-red-500 h-6 rounded-r-md"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Sound Button */}
      <div className="flex justify-start">
        <button className="w-16 h-16 bg-black rounded-lg flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors">
          <Volume2 className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;

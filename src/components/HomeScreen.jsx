import React from 'react';
import Header from './Header';
import PlayLogo from './PlayLogo';
import MathXplore from './mathXplore';


const HomeScreen = ({ startLearning, startQuiz, onLeaderboardClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-pink-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <Header />

        {/* Main Content */}
        <div className="p-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <MathXplore size="text-2xl" />
          </div>
          <p className="text-gray-600 mb-8">
            Belajar bangun ruang dengan menyenangkan
          </p>

          <div className="space-y-4">
            <button
              onClick={startLearning}
              className="w-full py-3 bg-teal-300 text-gray-800 rounded-full font-semibold hover:bg-teal-400 transition-colors"
            >
              Belajar
            </button>

            <button
              onClick={startQuiz}
              className="w-full py-3 bg-teal-300 text-gray-800 rounded-full font-semibold hover:bg-teal-400 transition-colors"
            >
              Quiz
            </button>

             <button 
          onClick={onLeaderboardClick}
          className="w-full py-3 bg-teal-300 text-gray-800 rounded-full font-semibold hover:bg-teal-400 transition-colors"
        >
          Leaderboard
        </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
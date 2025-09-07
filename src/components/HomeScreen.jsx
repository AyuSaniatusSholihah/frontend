import React from 'react';
import Header from './Header';
import PlayLogo from './PlayLogo';


const HomeScreen = ({ startLearning, startQuiz, onLeaderboardClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-pink-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <Header />

        {/* Main Content */}
        <div className="p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <PlayLogo className="w-10 h-10 mr-2 rounded" />
            <h1 className="text-2xl font-bold text-gray-800">MATHXPLORE</h1>
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
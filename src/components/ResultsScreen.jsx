import React from 'react';
import { Volume2, RotateCcw } from 'lucide-react';
import Header from './Header';

const ResultsScreen = ({ 
  score, 
  totalQuestions, 
  resetQuiz, 
  speak, 
  setCurrentScreen 
}) => {
  const percentage = Math.round((score / (totalQuestions || 1)) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-pink-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <Header 
          showBackButton={true}
          onBack={() => setCurrentScreen('home')}
          onSpeakClick={speak}
          speakText={`Skor akhir kamu adalah ${score} dari ${totalQuestions} soal, atau ${percentage} persen.`}
        />

        {/* Results Content */}
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Penguasaan</h2>
          <h3 className="text-lg text-gray-600 mb-6">Bangun Ruang</h3>

          {/* Pie Chart */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#fecaca"
                strokeWidth="20"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#10b981"
                strokeWidth="20"
                strokeDasharray={`${percentage * 2.51} 251.2`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
            </div>
          </div>

          {/* Score Details */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-800">
              <strong>Skor Akhir:</strong> {score} dari {totalQuestions} soal
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {percentage >= 80 ? 'Hebat! Penguasaan sangat baik!' :
                percentage >= 60 ? 'Bagus! Terus berlatih!' :
                'Semangat! Ayo coba lagi!'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={resetQuiz}
              className="w-full flex items-center justify-center py-3 bg-teal-500 text-white rounded-full font-semibold hover:bg-teal-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Coba Lagi
            </button>

            <button
              onClick={() => setCurrentScreen('home')}
              className="w-full py-3 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 transition-colors"
            >
              Kembali ke Menu
            </button>
          </div>

          {/* Audio Button */}
          <div className="mt-4">
            <Volume2
              className="w-8 h-8 mx-auto text-gray-600 cursor-pointer hover:text-gray-800"
              onClick={() => speak(`Skor akhir kamu adalah ${score} dari ${totalQuestions} soal, atau ${percentage} persen.`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
import React, { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';
import MathXplore from './mathXplore'; 
import Header from './Header';

const HomeScreen = ({
  startLearning,
  startQuiz,
  onLeaderboardClick,
  speak,
  stopSpeaking,
  isFirstVisit = true,
  setIsFirstVisit
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const welcomeMessage =
    "Selamat datang di MathXplore! Mari belajar bangun ruang dengan menyenangkan. Pilih menu Belajar untuk memahami konsep, atau Quiz untuk menguji kemampuan.";

  useEffect(() => {
    if (isFirstVisit && speak) {
      const timer = setTimeout(() => {
        handleSpeak(welcomeMessage);
        if (setIsFirstVisit) setIsFirstVisit(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isFirstVisit, setIsFirstVisit, speak]);

  const handleSpeak = (text) => {
    if (speak) {
      setIsSpeaking(true);
      speak(text, () => setIsSpeaking(false));
    }
  };

  const handleStopSpeak = () => {
    if (stopSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-pink-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Speaker Icon di pojok kanan atas */}
        <div className="flex justify-end p-4">
          {speak && (
            <Volume2
              className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800"
              onClick={() => handleSpeak(welcomeMessage)}
              title="Putar Sambutan"
            />
          )}
        </div>
        <div className="p-6 text-center">
              <button
                onClick={handleStopSpeak}
                className="px-14 py-2 text-xs bg-red-100 text-red-600 rounded"
              >
                kalian bisa stop disini, sambil dibantu oleh pendamping
              </button>
        

          <div className="flex items-center justify-center mb-5">
            <MathXplore size="text-4xl" />
          </div>

          <p className="text-gray-600 mb-8">
            Belajar bangun ruang dengan menyenangkan
          </p>

          <div className="space-y-5">
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

            {speak && (
              <button
                onClick={() => handleSpeak(welcomeMessage)}
                disabled={isSpeaking}
                className={`w-full py-2 border border-teal-400 text-teal-600 rounded-full font-medium transition-colors flex items-center justify-center ${
                  isSpeaking
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-teal-50'
                }`}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                <span>Putar Sambutan</span>
              </button>
            )}
          </div>

          {speak && (
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-xs">
                Tekan tombol speaker (🔊) di pojok kanan atas untuk mendengar sambutan
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

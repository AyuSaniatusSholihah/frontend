import React, { useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import Header from './Header';

function Leaderboard({ onBack, stopSpeaking, setCurrentScreen }) {
  const leaderboardData = [
    { rank: 1, name: "Si A", avatar: "👦", correctAnswers: 85, wrongAnswers: 15 },
    { rank: 2, name: "Si B", avatar: "👩", correctAnswers: 78, wrongAnswers: 22 },
    { rank: 3, name: "Si C", avatar: "👦", correctAnswers: 72, wrongAnswers: 28 },
    { rank: 4, name: "Si D", avatar: "👩", correctAnswers: 65, wrongAnswers: 35 }
  ];

  // ✅ Aktifkan suara otomatis saat halaman Leaderboard dibuka
  useEffect(() => {
    const text = "Anda sedang berada di halaman Leaderboard. "
      + "Di halaman ini anda bisa mendengar peringkat peserta berdasarkan jumlah jawaban benar dan salah.";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID"; 
    speechSynthesis.speak(utterance);

    return () => speechSynthesis.cancel(); // hentikan suara saat pindah halaman
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-pink-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <Header 
          showBackButton={true}
          onBack={() => {
            stopSpeaking && stopSpeaking();
            setCurrentScreen('home');
          }}
        />

        {/* Isi Leaderboard */}
        <div className="p-6">
          {leaderboardData.map((player, index) => (
            <div key={index} className="flex items-center space-x-4 mb-4 last:mb-0">
              {/* Rank */}
              <span className="text-lg font-semibold text-gray-700 w-6">
                {player.rank}.
              </span>
              
              {/* Avatar */}
              <div className="w-12 h-12 bg-teal-300 rounded-full flex items-center justify-center text-2xl">
                {player.avatar}
              </div>
              
              {/* Name */}
              <span className="text-lg font-medium text-gray-800 min-w-[60px]">
                {player.name}
              </span>
              
              {/* Progress Bars */}
              <div className="flex-1 flex">
                <div
                  className="bg-green-400 h-6 rounded-l-md"
                  style={{ width: `${player.correctAnswers}%` }}
                ></div>
                <div
                  className="bg-red-400 h-6 rounded-r-md"
                  style={{ width: `${player.wrongAnswers}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol suara ulang */}
        <div className="flex justify-center p-4">
          <button
            onClick={() => {
              const text = "Anda sedang berada di halaman Leaderboard. "
                + "Di halaman ini anda bisa mendengar peringkat peserta berdasarkan jumlah jawaban benar dan salah.";
              const utterance = new SpeechSynthesisUtterance(text);
              utterance.lang = "id-ID";
              speechSynthesis.speak(utterance);
            }}
            className="w-16 h-16 bg-black rounded-lg flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
          >
            <Volume2 className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;

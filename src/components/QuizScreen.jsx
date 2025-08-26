import React from 'react';
import { Mic, MicOff, ArrowLeft } from 'lucide-react';

// PERBAIKAN: Komponen Header dan ShapeRenderer diimpor di sini.
// Pastikan file Header.js dan ShapeRenderer.js ada di folder yang sama.
// Jika belum ada, Anda bisa gunakan kode dari jawaban saya sebelumnya.
import Header from './Header'; 
import ShapeRenderer from './ShapeRenderer';

const QuizScreen = ({
  currentQuiz,
  quizData,
  isListening,
  userAnswer,
  feedback,
  showFeedback,
  score,
  startListening,
  stopListening,
  nextQuestion,
  handleFinishQuiz,
  setCurrentScreen
}) => {
  const quiz = quizData[currentQuiz];
  const isLastQuestion = currentQuiz === quizData.length - 1;

  // PERBAIKAN: Menambahkan warna dinamis untuk feedback benar (hijau) atau salah (merah)
  const feedbackStyles = feedback.isCorrect 
    ? "bg-green-100 text-green-800" 
    : "bg-red-100 text-red-800";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-pink-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <Header 
          title={`Soal ${currentQuiz + 1}`}
          onSpeakClick={() => speak(quiz.question)}
        />

        {/* --- Konten Kuis --- */}
        <div className="p-6">
          <div className="mb-6 h-40 flex items-center justify-center">
            <ShapeRenderer type={quiz.image} />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-800 text-sm leading-relaxed">
              <strong>Soal {currentQuiz + 1}/{quizData.length}:</strong><br />
              {quiz.question}
            </p>
          </div>

          {userAnswer && (
            <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded-lg">
              <p className="text-sm">
                <strong>Jawaban Anda:</strong> {userAnswer}
              </p>
            </div>
          )}

          {/* PERBAIKAN: Menggunakan style dinamis untuk feedback */}
          {showFeedback && (
            <div className={`mb-4 p-3 rounded-lg ${feedbackStyles}`}>
              <p className="text-sm">{feedback.message}</p>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={showFeedback}
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto transition-all ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                  : 'bg-teal-500 hover:bg-teal-600'
              } ${showFeedback ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isListening ? <MicOff className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-white" />}
            </button>
            <p className="text-sm text-gray-600 h-5">
              {isListening
                ? 'Mendengarkan...'
                : showFeedback
                  ? 'Tekan tombol di bawah untuk melanjutkan'
                  : 'Tekan untuk menjawab'}
            </p>
          </div>

          {/* --- Navigasi --- */}
          {/* PERBAIKAN: Logika navigasi disatukan dan disederhanakan di sini */}
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => setCurrentScreen('home')}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Kembali
            </button>

            {/* PERBAIKAN: Tampilan skor lebih sederhana */}
            <div className="text-sm text-gray-500">
              Skor: {score}
            </div>

            <div className="w-24 text-right">
              {/* Tombol Lanjut: Muncul setelah ada feedback & BUKAN soal terakhir */}
              {showFeedback && !isLastQuestion && (
                <button
                  onClick={nextQuestion}
                  className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Lanjut
                  <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                </button>
              )}

              {/* Tombol Selesai: Muncul setelah ada feedback & PADA soal terakhir */}
              {showFeedback && isLastQuestion && (
                <button
                  onClick={handleFinishQuiz}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Selesai
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
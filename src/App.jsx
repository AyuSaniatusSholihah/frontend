import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Mic, MicOff, ArrowLeft, RotateCcw } from 'lucide-react';
import './index.css'
// Sample learning content
const learningContent = [
  {
    id: 1,
    title: "Mengenal Kubus",
    shape: "cube",
    content: "Hai kawan, sekarang kita belajar bangun ruang kubus, namun sebelumnya kawan bisa membuka e-mathblindnya pada hal 1 untuk mengetahui bentuk kubus sudah siap, selamat belajar... Kubus mempunyai 6 sisi sama panjang, memiliki 12 rusuk, memiliki 8 titik sudut. Contoh kubus yaitu dadu yang digunakan main ular tangga",
    buttonText: "Ucapkan lanjut untuk menuju hal berikutnya"
  },
  {
    id: 2,
    title: "Mengenal Balok",
    shape: "cube", // We'll modify this to look like a rectangular prism
    content: "Balok adalah bangun ruang yang memiliki 6 sisi berbentuk persegi panjang. Balok memiliki 12 rusuk dan 8 titik sudut, sama seperti kubus. Perbedaannya adalah sisi-sisi balok tidak semuanya sama besar. Contoh balok yaitu kotak sepatu atau lemari es.",
    buttonText: "Ucapkan lanjut untuk menuju hal berikutnya"
  },
  {
    id: 3,
    title: "Mengenal Bola",
    shape: "sphere",
    content: "Bola adalah bangun ruang yang memiliki permukaan melengkung. Semua titik pada permukaan bola memiliki jarak yang sama terhadap titik pusat. Bola tidak memiliki rusuk atau titik sudut. Contoh bola yaitu bola sepak, bola basket, atau kelereng.",
    buttonText: "Selesai belajar"
  }
];
const quizData = [
  {
    id: 1,
    level: "Level 1: Tebak Bangun Ruang",
    question: "Bangun ruang apa yang memiliki 6 sisi yang sama besar?",
    image: "cube",
    answers: ["kubus", "cube", "6 sisi"],
    correctAnswer: "kubus",
    explanation: "Kubus memiliki 6 sisi sama besar, 12 rusuk, dan 8 titik sudut."
  },
  {
    id: 2,
    level: "Level 1: Tebak Bangun Ruang",
    question: "Berapa jumlah rusuk kubus?",
    image: "cube",
    answers: ["12", "dua belas", "duabelas"],
    correctAnswer: "12",
    explanation: "Kubus memiliki 12 rusuk yang menghubungkan titik-titik sudutnya."
  },
  {
    id: 3,
    level: "Level 2: Tebak Bangun Ruang dari Kumpulan Objek",
    question: "Dari kumpulan objek berikut, manakah yang berbentuk bola?",
    image: "sphere",
    answers: ["bola", "sphere", "bulat"],
    correctAnswer: "bola",
    explanation: "Bola adalah bangun ruang yang semua titik pada permukaannya berjarak sama dari pusat."
  }
];

const EMathBlindApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);

  // Speech Recognition
  const recognitionRef = useRef(null);
  const speechSynthRef = useRef(null);

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechSynthRef.current = window.speechSynthesis;
    }
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'id-ID';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setUserAnswer(transcript);
        setIsListening(false);
        setTimeout(() => checkAnswer(transcript), 500);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Text-to-Speech function
  const speak = (text) => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.8;
      speechSynthRef.current.speak(utterance);
    }
  };

  // --- [KODE BARU] Fungsi untuk menghentikan suara ---
  const stopSpeaking = () => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
    }
  };

  // Start listening
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setUserAnswer('');
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Fuzzy matching function
  const fuzzyMatch = (userInput, correctAnswers) => {
    const normalizeText = (text) => {
      return text.toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
    };

    const normalizedInput = normalizeText(userInput);

    for (let answer of correctAnswers) {
      const normalizedAnswer = normalizeText(answer);

      // Exact match
      if (normalizedInput === normalizedAnswer) {
        return true;
      }

      // Contains match
      if (normalizedInput.includes(normalizedAnswer) || normalizedAnswer.includes(normalizedInput)) {
        return true;
      }

      // Simple Levenshtein distance for typos
      if (levenshteinDistance(normalizedInput, normalizedAnswer) <= 2) {
        return true;
      }
    }

    return false;
  };

  // Simple Levenshtein distance calculation
  const levenshteinDistance = (str1, str2) => {
    const matrix = Array.from({ length: str2.length + 1 }, (_, i) => [i]);
    matrix[0] = Array.from({ length: str1.length + 1 }, (_, i) => i);

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2[i - 1] === str1[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  };

  // Check answer using fuzzy matching
  const checkAnswer = (answer) => {
    const quiz = quizData[currentQuiz];
    const isCorrect = fuzzyMatch(answer, quiz.answers);

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setFeedback('Hebat! Jawabanmu benar! ' + quiz.explanation);
      speak('Hebat! Jawabanmu benar! ' + quiz.explanation);
    } else {
      setFeedback('Sayang sekali, jawabanmu salah. Jawaban yang benar adalah: ' + quiz.correctAnswer + '. ' + quiz.explanation);
      speak('Sayang sekali, jawabanmu salah. Jawaban yang benar adalah: ' + quiz.correctAnswer + '. ' + quiz.explanation);
    }

    setShowFeedback(true);
    setTotalQuestions(prevTotal => prevTotal + 1);

    setTimeout(() => {
      if (currentQuiz < quizData.length - 1) {
        // Don't auto-advance, let user click next button
      } else {
        showResults();
      }
    }, 3000);
  };

  // Next question
  const nextQuestion = () => {
    setCurrentQuiz(prevQuiz => prevQuiz + 1);
    setUserAnswer('');
    setFeedback('');
    setShowFeedback(false);

    // Auto-read next question
    setTimeout(() => {
      const nextQuizIndex = currentQuiz + 1;
      const quiz = quizData[nextQuizIndex];
      if (quiz) {
        speak(quiz.question);
      }
    }, 1000);
  };

  // Show results
  const showResults = () => {
    setCurrentScreen('results');
    const percentage = Math.round((score / (totalQuestions || 1)) * 100);
    speak(`Kuis selesai! Skor akhir kamu adalah ${score} dari ${totalQuestions} soal, atau ${percentage} persen.`);
  };

  // --- [KODE BARU] Handler untuk tombol selesai ---
  const handleFinishQuiz = () => {
    stopSpeaking();
    setCurrentScreen('results');
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuiz(0);
    setScore(0);
    setTotalQuestions(0);
    setUserAnswer('');
    setFeedback('');
    setShowFeedback(false);
    setCurrentScreen('home');
  };

  // Start learning
  const startLearning = () => {
    setCurrentScreen('learning');
    setCurrentLesson(0);
    setTimeout(() => {
      const lesson = learningContent[0];
      speak(lesson.content);
    }, 1000);
  };

  // Next lesson
  const nextLesson = () => {
    // Hentikan audio yang sedang berjalan
    stopSpeaking();
    
    if (currentLesson < learningContent.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setTimeout(() => {
        const lesson = learningContent[currentLesson + 1];
        speak(lesson.content);
      }, 1000);
    } else {
      setCurrentScreen('home');
      setCurrentLesson(0);
    }
  };

  // Start quiz
  const startQuiz = () => {
    setCurrentScreen('quiz');
    setTimeout(() => {
      const quiz = quizData[0];
      speak(quiz.question);
    }, 1000);
  };

  // Render geometric shapes
  const renderShape = (type, isLearning = false) => {
    switch(type) {
      case 'cube':
        return (
          <div className={`${isLearning ? 'w-40 h-40' : 'w-32 h-32'} bg-yellow-400 border-2 border-yellow-600 relative mx-auto`}>
            <div className="absolute top-0 left-0 w-full h-full bg-yellow-500 transform -translate-x-2 -translate-y-2 border-2 border-yellow-700"></div>
            <div className="absolute top-0 right-0 w-8 h-full bg-yellow-300 transform translate-x-2 -translate-y-2 skew-y-12 border-2 border-yellow-600"></div>
            <div className="absolute bottom-0 left-0 w-full h-8 bg-yellow-300 transform -translate-x-2 translate-y-2 skew-x-12 border-2 border-yellow-600"></div>
          </div>
        );
      case 'sphere':
        return (
          <div className={`${isLearning ? 'w-40 h-40' : 'w-32 h-32'} bg-gradient-to-br from-blue-300 to-blue-600 rounded-full border-2 border-blue-700 mx-auto shadow-lg`}>
            <div className="w-6 h-6 bg-white rounded-full mt-4 ml-6 opacity-60"></div>
          </div>
        );
      default:
        return <div className={`${isLearning ? 'w-40 h-40' : 'w-32 h-32'} bg-gray-300 rounded mx-auto`}></div>;
    }
  };

  // Home Screen
  if (currentScreen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-pink-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <div className="w-6 h-6"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-teal-400 rounded mr-2"></div>
              <span className="text-xl font-bold">E-MATHBLIND</span>
            </div>
            <Volume2 className="w-6 h-6" />
          </div>

          {/* Main Content */}
          <div className="p-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-8 h-8 bg-teal-400 rounded mr-2"></div>
              <h1 className="text-2xl font-bold text-gray-800">E-MATHBLIND</h1>
            </div>

            <p className="text-gray-600 mb-8">
              Belajar bangun ruang dengan menyenangkan
            </p>

            <div className="space-y-4">
              <button
                onClick={startLearning}
                className="w-full py-3 bg-teal-200 text-gray-800 rounded-full font-semibold hover:bg-teal-300 transition-colors"
              >
                Belajar
              </button>
              <button
                onClick={startQuiz}
                className="w-full py-3 bg-teal-300 text-gray-800 rounded-full font-semibold hover:bg-teal-400 transition-colors"
              >
                Quiz
              </button>
              <button className="w-full py-3 bg-teal-200 text-gray-800 rounded-full font-semibold">
                Tracking
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Learning Screen
  if (currentScreen === 'learning') {
    const lesson = learningContent[currentLesson];

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-pink-100 p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <ArrowLeft
              className="w-6 h-6 cursor-pointer hover:text-teal-300"
              onClick={() => setCurrentScreen('home')}
            />
            <div className="flex items-center">
              <div className="w-8 h-8 bg-teal-400 rounded mr-2"></div>
              <span className="text-xl font-bold">E-MATHBLIND</span>
            </div>
            <Volume2
              className="w-6 h-6 cursor-pointer hover:text-teal-300"
              onClick={() => speak(lesson.content)}
            />
          </div>

          {/* Learning Content */}
          <div className="p-6">
            {/* Shape Display with border */}
            <div className="mb-6 bg-teal-200 p-6 rounded-lg border-4 border-teal-300">
              {renderShape(lesson.shape, true)}
            </div>

            {/* Content Section */}
            <div className="flex items-start gap-4 mb-6">
              {/* Speaker Icon */}
              <Volume2
                className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 mt-1 flex-shrink-0"
                onClick={() => speak(lesson.content)}
              />

              {/* Text Content */}
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-800 mb-3">{lesson.title}</h2>
                <p className="text-gray-700 leading-relaxed text-justify">
                  {lesson.content}
                </p>
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-center">
              <button
                onClick={nextLesson}
                className="flex items-center gap-2 px-6 py-3 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors font-medium"
              >
                {lesson.buttonText}
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <ArrowLeft className="w-4 h-4 text-white rotate-180" />
                </div>
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="mt-6 text-center">
              <div className="text-sm text-gray-500">
                Halaman {currentLesson + 1} dari {learningContent.length}
              </div>
              <div className="flex justify-center gap-2 mt-2">
                {learningContent.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentLesson ? 'bg-teal-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  if (currentScreen === 'quiz') {
    const quiz = quizData[currentQuiz];

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-pink-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <div className="w-6 h-6"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-teal-400 rounded mr-2"></div>
              <span className="text-xl font-bold">E-MATHBLIND</span>
            </div>
            <Volume2
              className="w-6 h-6 cursor-pointer hover:text-teal-300"
              onClick={() => speak(quiz.question)}
            />
          </div>

          {/* Quiz Content */}
          <div className="p-6">
            {/* Shape Display */}
            <div className="mb-6">
              {renderShape(quiz.image)}
            </div>

            {/* Question */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-800 text-sm leading-relaxed">
                <strong>Soal {currentQuiz + 1}/{quizData.length}:</strong><br />
                {quiz.question}
              </p>
            </div>

            {/* User Answer Display */}
            {userAnswer && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Jawaban Anda:</strong> {userAnswer}
                </p>
              </div>
            )}

            {/* Feedback */}
            {showFeedback && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">{feedback}</p>
              </div>
            )}

            {/* Microphone Button */}
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
                {isListening ? (
                  <MicOff className="w-8 h-8 text-white" />
                ) : (
                  <Mic className="w-8 h-8 text-white" />
                )}
              </button>

              <p className="text-sm text-gray-600">
                {isListening
                  ? 'Mendengarkan...'
                  : showFeedback
                    ? 'Menunggu soal berikutnya...'
                    : 'Tekan tombol mikrofon untuk menjawab'
                }
              </p>
            </div>

            {/* Navigation */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => setCurrentScreen('home')}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Kembali
              </button>

              <div className="text-sm text-gray-500">
                Skor: {score}/{totalQuestions}
              </div>

              {/* Next Button - Always visible except on last question with feedback */}
              {!showFeedback && currentQuiz < quizData.length - 1 && (
                <button
                  onClick={() => {
                    // Skip question without answering
                    setTotalQuestions(prevTotal => prevTotal + 1);
                    nextQuestion();
                  }}
                  className="flex items-center px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Lewati
                  <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                </button>
              )}

              {/* Next Button after feedback */}
              {showFeedback && currentQuiz < quizData.length - 1 && (
                <button
                  onClick={nextQuestion}
                  className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Lanjut
                  <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                </button>
              )}

              {/* Selesai Button for last question without feedback */}
              {!showFeedback && currentQuiz === quizData.length - 1 && (
                <button
                  onClick={() => {
                    setTotalQuestions(prevTotal => prevTotal + 1);
                    handleFinishQuiz();
                  }}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Selesai
                  <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                </button>
              )}

              {/* Selesai Button after feedback on last question */}
              {showFeedback && currentQuiz === quizData.length - 1 && (
                <button
                  onClick={handleFinishQuiz}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Selesai
                  <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (currentScreen === 'results') {
    const percentage = Math.round((score / (totalQuestions || 1)) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-pink-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <ArrowLeft
              className="w-6 h-6 cursor-pointer hover:text-teal-300"
              onClick={() => setCurrentScreen('home')}
            />
            <div className="flex items-center">
              <div className="w-8 h-8 bg-teal-400 rounded mr-2"></div>
              <span className="text-xl font-bold">E-MATHBLIND</span>
            </div>
            <Volume2
              className="w-6 h-6 cursor-pointer hover:text-teal-300"
              onClick={() => speak(`Skor akhir kamu adalah ${score} dari ${totalQuestions} soal, atau ${percentage} persen.`)}
            />
          </div>

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
  }

  return null;
};

export default EMathBlindApp;
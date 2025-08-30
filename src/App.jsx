import React, { useState, useEffect, useRef } from 'react';
import './index.css';

// Import komponen
import HomeScreen from './components/HomeScreen';
import LearningScreen from './components/LearningScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';

// Import data
import { learningContent, quizData } from './data/contentData';

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

  // Fungsi untuk menghentikan suara
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

      if (normalizedInput === normalizedAnswer) {
        return true;
      }

      if (normalizedInput.includes(normalizedAnswer) || normalizedAnswer.includes(normalizedInput)) {
        return true;
      }

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
  const validAnswers = quiz.answers || [quiz.correctAnswer]; // fallback
  
  const isCorrect = fuzzyMatch(answer, validAnswers);

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
      // user klik Next saja
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

  // Handler untuk tombol selesai
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

  // Props yang akan dikirim ke komponen
  const commonProps = {
    speak,
    stopSpeaking,
    setCurrentScreen
  };

  // Render screen berdasarkan currentScreen
  const renderCurrentScreen = () => {
    switch(currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            {...commonProps}
            startLearning={startLearning}
            startQuiz={startQuiz}
          />
        );
      
      case 'learning':
        return (
          <LearningScreen 
            {...commonProps}
            currentLesson={currentLesson}
            learningContent={learningContent}
            nextLesson={nextLesson}
          />
        );
      
      case 'quiz':
        return (
          <QuizScreen 
            {...commonProps}
            currentQuiz={currentQuiz}
            quizData={quizData}
            isListening={isListening}
            userAnswer={userAnswer}
            feedback={feedback}
            showFeedback={showFeedback}
            score={score}
            totalQuestions={totalQuestions}
            startListening={startListening}
            stopListening={stopListening}
            nextQuestion={nextQuestion}
            handleFinishQuiz={handleFinishQuiz}
            setTotalQuestions={setTotalQuestions}
          />
        );
      
      case 'results':
        return (
          <ResultsScreen 
            {...commonProps}
            score={score}
            totalQuestions={totalQuestions}
            resetQuiz={resetQuiz}
          />
        );
      
      default:
        return <HomeScreen {...commonProps} startLearning={startLearning} startQuiz={startQuiz} />;
    }
  };

  return renderCurrentScreen();
};

export default EMathBlindApp;
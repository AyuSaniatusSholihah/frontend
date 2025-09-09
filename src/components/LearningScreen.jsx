import React from 'react';
import { Volume2, ArrowLeft } from 'lucide-react';
import Header from './Header';
import ShapeRenderer from './ShapeRenderer';

const LearningScreen = ({ 
  currentLesson, 
  learningContent, 
  nextLesson, 
  speak, 
  setCurrentScreen,
  stopSpeaking 
}) => {
  const lesson = learningContent[currentLesson];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-pink-100 p-4">
     <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <Header 
          showBackButton={true}
          onBack={() => {
            stopSpeaking();
            setCurrentScreen('home');
          }}
          onSpeakClick={speak}
          speakText={lesson.content}
        />

        {/* Learning Content */}
        <div className="p-6">
          {/* Shape Display with border */}
          <div className="mb-6 bg-teal-200 p-6 rounded-lg border-4 border-teal-300">
            <ShapeRenderer type={lesson.shape} isLearning={true} />
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
};

export default LearningScreen;
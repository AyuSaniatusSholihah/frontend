import React from 'react';
import { Volume2, ArrowLeft } from 'lucide-react';

const Header = ({ 
  showBackButton = false, 
  onBack, 
  onSpeakClick, 
  speakText = "" 
}) => {
  return (
    <div className="bg-black text-white p-4 flex justify-between items-center">
      {showBackButton ? (
        <ArrowLeft
          className="w-6 h-6 cursor-pointer hover:text-teal-300"
          onClick={onBack}
        />
      ) : (
        <div className="w-6 h-6"></div>
      )}
      
      <div className="flex items-center">
        <div className="w-8 h-8 bg-teal-400 rounded mr-2"></div>
        <span className="text-xl font-bold">E-MATHBLIND</span>
      </div>
      
      {onSpeakClick ? (
        <Volume2
          className="w-6 h-6 cursor-pointer hover:text-teal-300"
          onClick={() => onSpeakClick(speakText)}
        />
      ) : (
        <Volume2 className="w-6 h-6" />
      )}
    </div>
  );
};

export default Header;
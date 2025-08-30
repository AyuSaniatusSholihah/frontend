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
      <img src="/logo.png" alt="Logo E-MATHBLIND" className="w-10 h-10 mr-2 rounded" />
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
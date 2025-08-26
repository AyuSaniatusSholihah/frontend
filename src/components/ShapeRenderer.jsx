import React from 'react';

const ShapeRenderer = ({ type, isLearning = false }) => {
  const sizeClass = isLearning ? 'w-40 h-40' : 'w-32 h-32';

  switch(type) {
    case 'cube':
      return (
        <div className={`${sizeClass} bg-yellow-400 border-2 border-yellow-600 relative mx-auto`}>
          <div className="absolute top-0 left-0 w-full h-full bg-yellow-500 transform -translate-x-2 -translate-y-2 border-2 border-yellow-700"></div>
          <div className="absolute top-0 right-0 w-8 h-full bg-yellow-300 transform translate-x-2 -translate-y-2 skew-y-12 border-2 border-yellow-600"></div>
          <div className="absolute bottom-0 left-0 w-full h-8 bg-yellow-300 transform -translate-x-2 translate-y-2 skew-x-12 border-2 border-yellow-600"></div>
        </div>
      );
    
    case 'sphere':
      return (
        <div className={`${sizeClass} bg-gradient-to-br from-blue-300 to-blue-600 rounded-full border-2 border-blue-700 mx-auto shadow-lg`}>
          <div className="w-6 h-6 bg-white rounded-full mt-4 ml-6 opacity-60"></div>
        </div>
      );
    
    default:
      return <div className={`${sizeClass} bg-gray-300 rounded mx-auto`}></div>;
  }
};

export default ShapeRenderer;
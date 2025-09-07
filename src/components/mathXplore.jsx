import React from 'react';

const MathXplore = () => {
  return (
    <div className="flex items-center justify-center bg-white h-auto">
      <div className="relative">
        {/* Logo Container */}
        <div className="flex items-center">
          {/* "Math" text */}
          <span 
            className="text-4xl font-extrabold"
            style={{
              color: '#C4956C',
              fontFamily: 'Comic Sans MS, cursive, sans-serif',
               WebkitTextStroke: '1px rgba(255, 255, 255, 1)',
              textShadow: '2px 2px 4px #C4956C',
              marginRight: '-5px',
              zIndex: 10,
              position: 'relative'
            }}
          >
            Math
          </span>
          
          {/* 3D X */}
          <div className="relative" style={{ width: '66px', height: '70px', margin: '0 -8px' }}>
            {/* Back face of X (darker blue) */}
            <div 
              className="absolute"
              style={{
                width: '70px',
                height: '70px',
                transform: 'translate(1px, 6px)',
                zIndex: 1
              }}
            >
              {/* Back X strokes */}
              <div 
                className="absolute"
                style={{
                  width: '60px',
                  height: '12px',
                  backgroundColor: '#4A5BA6',
                  transform: 'rotate(45deg)',
                  transformOrigin: 'center',
                  top: '29px',
                  borderRadius: '2px'
                }}
              />
              <div 
                className="absolute"
                style={{
                  width: '60px',
                  height: '12px',
                  backgroundColor: '#4A5BA6',
                  transform: 'rotate(-45deg)',
                  transformOrigin: 'center',
                  top: '29px',
                  borderRadius: '2px'
                }}
              />
            </div>
            
            {/* Front face of X (yellow/orange) */}
            <div 
              className="absolute"
              style={{
                width: '60px',
                height: '60px',
                zIndex: 2,
              }}
            >
              {/* Front X strokes */}
              <div 
                className="absolute"
                style={{
                  width: '60px',
                  height: '12px',
                  background: 'linear-gradient(135deg, #F4C430 0%, #E6B800 100%)',
                  transform: 'rotate(45deg)',
                  transformOrigin: 'center',
                  top: '29px',
                  borderRadius: '2px',
                  boxShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                }}
              />
              <div 
                className="absolute"
                style={{
                  width: '60px',
                  height: '12px',
                  background: 'linear-gradient(135deg, #F4C430 0%, #E6B800 100%)',
                  transform: 'rotate(-45deg)',
                  transformOrigin: 'center',
                  top: '29px',
                  borderRadius: '2px',
                  boxShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                }}
              />
            </div>
          </div>
          
          {/* "plore" text */}
          <span 
            className="text-4xl font-extrabold relative"
            style={{
              color: '#C4956C',
              fontFamily: 'Comic Sans MS, cursive, sans-serif',
              WebkitTextStroke: '1px rgba(255, 255, 255, 1)',
              textShadow: '2px 2px 4px #C4956C',
              marginLeft: '-5px',
              zIndex: 1
            }}
          >
            plore
          </span>
        </div>
      </div>
    </div>
  );
};

export default MathXplore;
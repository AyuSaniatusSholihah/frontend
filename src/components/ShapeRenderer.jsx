import React from "react";

const ShapeRenderer = ({ type, isLearning = false }) => {
  const size = isLearning ? 120 : 90; // ukuran sisi kubus

  switch (type) {
    case "cube":
      return (
        <div className="w-full flex justify-center items-center perspective-[600px]">
          <div
            className="relative"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              transformStyle: "preserve-3d",
              transform: "rotateX(-30deg) rotateY(30deg)", // posisi kubus
            }}
          >
            {/* depan */}
            <div
              className="absolute bg-yellow-400 border border-yellow-700"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `translateZ(${size / 2}px)`,
              }}
            ></div>

            {/* belakang */}
            <div
              className="absolute bg-yellow-500 border border-yellow-700"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `rotateY(180deg) translateZ(${size / 2}px)`,
              }}
            ></div>

            {/* kanan */}
            <div
              className="absolute bg-yellow-300 border border-yellow-700"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `rotateY(90deg) translateZ(${size / 2}px)`,
              }}
            ></div>

            {/* kiri */}
            <div
              className="absolute bg-yellow-600 border border-yellow-700"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `rotateY(-90deg) translateZ(${size / 2}px)`,
              }}
            ></div>

            {/* atas */}
            <div
              className="absolute bg-yellow-200 border border-yellow-700"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `rotateX(90deg) translateZ(${size / 2}px)`,
              }}
            ></div>

            {/* bawah */}
            <div
              className="absolute bg-yellow-700 border border-yellow-900"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `rotateX(-90deg) translateZ(${size / 2}px)`,
              }}
            ></div>
          </div>
        </div>
      );

    case "cuboid":
     const width = isLearning ? 140 : 110;   // Sumbu X
  const height = isLearning ? 80 : 60;    // Sumbu Y
  const depth = isLearning ? 100 : 75;    // Sumbu Z

  // Gaya untuk setiap sisi balok, agar tidak berulang
  const faceStyle = {
    position: 'absolute',
    border: '1px solid #047857', // green-700
    backfaceVisibility: 'hidden', // Praktik terbaik untuk performa & tampilan
  };

  return (
    <div className="w-full flex justify-center items-center perspective-[800px]">
      <div
        className="relative"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transformStyle: "preserve-3d",
          transform: "rotateX(-20deg) rotateY(30deg)", // Posisi tampilan balok
        }}
      >
        {/* Sisi Depan */}
        <div
          style={{
            ...faceStyle,
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: '#4ade80', // green-400
            transform: `translateZ(${depth / 2}px)`,
          }}
        ></div>

        {/* Sisi Belakang */}
        <div
          style={{
            ...faceStyle,
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: '#22c55e', // green-500
            transform: `rotateY(180deg) translateZ(${depth / 2}px)`,
          }}
        ></div>

        {/* Sisi Kanan */}
        <div
          style={{
            ...faceStyle,
            width: `${depth}px`,
            height: `${height}px`,
            backgroundColor: '#86efac', // green-300
            // Posisikan origin di kiri, lalu putar dan geser
            left: `${(width - depth) / 2}px`,
            transform: `rotateY(90deg) translateZ(${width / 2}px)`,
          }}
        ></div>

        {/* Sisi Kiri */}
        <div
          style={{
            ...faceStyle,
            width: `${depth}px`,
            height: `${height}px`,
            backgroundColor: '#16a34a', // green-600
            // Posisikan origin di kiri, lalu putar dan geser
            left: `${(width - depth) / 2}px`,
            transform: `rotateY(-90deg) translateZ(${width / 2}px)`,
          }}
        ></div>

        {/* Sisi Atas */}
        <div
          style={{
            ...faceStyle,
            width: `${width}px`,
            height: `${depth}px`,
            backgroundColor: '#8ee3acff', // green-200
            // Posisikan origin di atas, lalu putar dan geser
            top: `${(height - depth) / 2}px`,
            transform: `rotateX(90deg) translateZ(${height / 2}px)`,
          }}
        ></div>

        {/* Sisi Bawah */}
        <div
          style={{
            ...faceStyle,
            width: `${width}px`,
            height: `${depth}px`,
            backgroundColor: '#14532d', // green-900
             // Posisikan origin di atas, lalu putar dan geser
            top: `${(height - depth) / 2}px`,
            transform: `rotateX(-90deg) translateZ(${height / 2}px)`,
          }}
        ></div>
      </div>
    </div>
  );
    case "sphere":
      return (
        <div
          className={`${
            isLearning ? "w-40 h-40" : "w-32 h-32"
          } bg-gradient-to-br from-blue-300 to-blue-600 rounded-full border-2 border-blue-700 mx-auto shadow-lg`}
        >
          <div className="w-6 h-6 bg-white rounded-full mt-4 ml-6 opacity-60"></div>
        </div>
      );

    default:
      return (
        <div
          className={`${
            isLearning ? "w-40 h-40" : "w-32 h-32"
          } bg-gray-300 rounded mx-auto`}
        ></div>
      );
  }
};

export default ShapeRenderer;
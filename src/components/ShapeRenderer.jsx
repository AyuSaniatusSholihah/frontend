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

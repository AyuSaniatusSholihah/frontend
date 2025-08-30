import React from "react";

const PlayLogo = ({ className = "w-10 h-10" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 20C28 20 25 22 25 25V75C25 78 28 80 30 80L75 55C78 53 78 47 75 45L30 20Z"
        stroke="#00C4B3"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlayLogo;

import React, { useState, useEffect } from "react";

export const Notification = ({ message, type, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, isVisible]);

  if (!isVisible) return null;

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 text-lg font-bold hover:opacity-80"
        >
          ×
        </button>
      </div>
    </div>
  );
};

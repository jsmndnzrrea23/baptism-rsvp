"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { EVENT_INFO } from "../constants/eventInfo";

export default function FloatingGiftBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const babyMessages = [
    "Gift ideas here! 🎁",
    "What should I get? 🤔",
    "Help me choose! 👶",
    "Gifts for me? 💕",
    "Look what I need! 👀",
    "Baby stuff please! 🍼",
  ];

  // Rotate messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % babyMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [babyMessages.length]);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        popupRef.current &&
        buttonRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Baby Message Bubble */}
      <div className="absolute bottom-20 right-0 mb-2 opacity-90 hover:opacity-100 transition-opacity duration-300">
        <div className="relative">
          {/* Speech bubble */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-md border border-pink-100 max-w-48">
            <p className="text-sm font-sans text-gray-600 text-center">
              {babyMessages[currentMessage]}
            </p>
          </div>
          {/* Speech bubble tail pointing to the button */}
          <div className="absolute bottom-0 right-4 transform translate-y-full">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/95"></div>
          </div>
        </div>
      </div>

      {/* Gift Ideas Popup */}
      {isOpen && (
        <div
          ref={popupRef}
          className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-6 w-80 border border-pink-200 animate-in slide-in-from-bottom-2 duration-300 z-10"
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            aria-label="Close gift ideas"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="text-center mb-4 pr-8">
            <h3 className="text-lg font-serif text-gray-800 font-semibold">
              Gift Ideas for {EVENT_INFO.baptism.childName.split(" ")[0]}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {EVENT_INFO.messages.giftAppreciation}
            </p>
          </div>

          <div className="space-y-3">
            {EVENT_INFO.giftIdeas.map((gift, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-pink-50 transition-colors"
              >
                <div className="w-2 h-2 bg-pink-400 rounded-full flex-shrink-0"></div>
                <span className="text-sm text-gray-700 font-sans">{gift}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              {EVENT_INFO.messages.celebrationThanks}
            </p>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label={`Gift ideas for ${
          EVENT_INFO.baptism.childName.split(" ")[0]
        }`}
      >
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
          <Image
            src="/gianna-logo.jpg"
            alt={EVENT_INFO.baptism.childName.split(" ")[0]}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gift icon indicator */}
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-xs">🎁</span>
        </div>
      </button>
    </div>
  );
}

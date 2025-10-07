"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import FloatingGiftBox from "../components/FloatingGiftBox";
import { EVENT_INFO } from "../constants/eventInfo";

export default function RSVPPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "yes",
    guestCount: 1,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        }
      );
    }, formRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          attending: "yes",
          guestCount: 1,
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-block text-gray-800 hover:text-pink-600 mb-4 transition-colors font-sans"
          >
            ← Back to Invitation
          </Link>
          <h1 className="text-3xl md:text-5xl font-serif text-gray-800 mb-4">
            RSVP
          </h1>
          <p className="text-base md:text-lg text-gray-700 font-sans mb-8">
            {EVENT_INFO.messages.rsvpSubtitle}
          </p>

          {/* Event Details Reminder */}
          <div className="mb-8">
            <h2 className="text-lg md:text-xl font-serif text-gray-800 mb-6 text-center">
              Event Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm md:text-base text-gray-700">
              <div className="text-center">
                <span className="font-medium text-gray-800 block mb-1">
                  🗓️ Date & Time
                </span>
                <p>{EVENT_INFO.baptism.date.formatted}</p>
                <p>{EVENT_INFO.baptism.time}</p>
              </div>
              <div className="text-center md:border-l md:border-r border-gray-400/60 md:px-4">
                <span className="font-medium text-gray-800 block mb-1">
                  {EVENT_INFO.baptism.church.icon} Church
                </span>
                <p>
                  {EVENT_INFO.baptism.church.name}
                  <br />
                  {EVENT_INFO.baptism.church.address}
                </p>
              </div>
              <div className="text-center">
                <span className="font-medium text-gray-800 block mb-1">
                  {EVENT_INFO.baptism.reception.icon} Reception
                </span>
                <p>{EVENT_INFO.baptism.reception.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div
          ref={formRef}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 paper-texture"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-800 mb-2 font-sans"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:outline-none transition-all text-gray-800 placeholder-gray-500 bg-white"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-800 mb-2 font-sans"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:outline-none transition-all text-gray-800 placeholder-gray-500 bg-white"
                placeholder="Enter your email address"
              />
            </div>

            {/* Attending */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-3 font-sans">
                Will you be attending? *
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === "yes"}
                    onChange={handleInputChange}
                    className="mr-3 text-pink-500 focus:ring-pink-500"
                  />
                  <span className="text-gray-700">Yes, I'll be there! 🎉</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === "no"}
                    onChange={handleInputChange}
                    className="mr-3 text-pink-500 focus:ring-pink-500"
                  />
                  <span className="text-gray-700">
                    Sorry, I can't make it 😢
                  </span>
                </label>
              </div>
            </div>

            {/* Guest Count */}
            {formData.attending === "yes" && (
              <div className="relative">
                <select
                  id="guestCount"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                  className="w-full appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:outline-none text-gray-800 bg-white"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>

                {/* Custom caret */}
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            )}

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-800 mb-2 font-sans"
              >
                Special Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:outline-none transition-all resize-none text-gray-800 placeholder-gray-500 bg-white"
                placeholder="Share a special message or note..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? "Submitting..." : "Submit RSVP"}
            </button>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                <p className="font-medium">
                  Thank you! Your RSVP has been submitted successfully. 🎉
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                <p className="font-medium">
                  Sorry, there was an error submitting your RSVP. Please try
                  again.
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>{EVENT_INFO.messages.footerMessage}</p>
        </div>
      </div>

      {/* Floating Gift Box */}
      <FloatingGiftBox />
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingGiftBox from "./components/FloatingGiftBox";
import { EVENT_INFO } from "./constants/eventInfo";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Initial animation
      gsap.fromTo(
        [
          titleRef.current,
          subtitleRef.current,
          imageRef.current,
          ctaRef.current,
        ],
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        }
      );

      // Scroll animations
      gsap.fromTo(
        imageRef.current,
        {
          scale: 1.1,
        },
        {
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative bg-[url('/bg-pattern.png')] bg-repeat bg-cover  bg-rose-50"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Baby Photo */}
          <div ref={imageRef} className="mb-8">
            <div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden shadow-2xl border-8 border-white/80 relative">
              <Image
                src="/gianna.jpeg"
                alt="Gianna Louise F. Nazarrea"
                width={256}
                height={256}
                className="w-full h-full object-cover object-top"
                priority
              />
              {/* Decorative frame */}
              <div className="absolute inset-0 rounded-full border-4 border-pink-300/30"></div>
            </div>
          </div>

          {/* Invitation Text */}
          <div ref={titleRef} className="mb-8">
            <p className="text-lg md:text-xl text-gray-700 font-sans mb-3 tracking-wide">
              Please Join us for the
            </p>
            <h1 className="text-2xl md:text-3xl font-serif text-pink-600 mb-3 font-light">
              Baptism of
            </h1>
            <h2 className="text-5xl md:text-8xl font-script text-gray-800 mb-6 leading-tight">
              {EVENT_INFO.baptism.childName}
            </h2>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} className="space-y-4 mb-12">
            <p className="text-lg md:text-2xl text-gray-700 font-light">
              {EVENT_INFO.messages.welcomeSubtitle}
            </p>
            <p className="text-base md:text-lg text-gray-600">
              {EVENT_INFO.messages.presenceMessage}
            </p>
          </div>

          {/* CTA Button */}
          <div ref={ctaRef}>
            <Link
              href="/rsvp"
              className="inline-block bg-gradient-to-r from-pink-400 to-blue-400 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              RSVP Now
            </Link>
          </div>
        </div>
      </div>

      {/* Event Details Section */}
      <div className="py-16 px-4 bg-rose-100 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-gray-800 mb-8">
            Event Details
          </h2>
          <div className="space-y-6 text-base md:text-lg text-gray-800">
            <div className="border-t border-b border-gray-400/30 py-4">
              <p className="text-xl md:text-2xl font-bold text-pink-600 mb-1">
                {EVENT_INFO.baptism.date.dayOfWeek.toUpperCase()}
              </p>
              <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                {EVENT_INFO.baptism.date.day}
              </p>
              <p className="text-lg md:text-xl text-gray-800">
                {EVENT_INFO.baptism.date.month.toUpperCase()}
              </p>
            </div>
            <div className="border-t border-b border-gray-400/30 py-4">
              <p className="text-xl md:text-2xl font-bold text-pink-600">
                {EVENT_INFO.baptism.time}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <h3 className="font-serif text-lg md:text-xl text-gray-800 mb-2">
                  {EVENT_INFO.baptism.church.icon} Church
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {EVENT_INFO.baptism.church.name}
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  {EVENT_INFO.baptism.church.address}
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-serif text-lg md:text-xl text-gray-800 mb-2">
                  {EVENT_INFO.baptism.reception.icon} Reception
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {EVENT_INFO.baptism.reception.name}
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-serif text-lg md:text-xl text-gray-800 mb-2">
                  🗓️ RSVP
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Please respond by
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  {EVENT_INFO.rsvp.deadline.formatted}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Gift Box */}
      <FloatingGiftBox />
    </div>
  );
}

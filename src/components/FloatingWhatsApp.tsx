"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

interface FloatingWhatsAppProps {
  threshold?: number;
}

export default function FloatingWhatsApp({ threshold = 300 }: FloatingWhatsAppProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [threshold]);

  return (
    <a
      href="https://whatsapp.com/channel/0029Vb6zCH20LKZKj1w4sB2j"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
      aria-label="Join our WhatsApp Channel"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
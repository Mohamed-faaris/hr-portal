"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "~/lib/utils";
import Image from "next/image";

import logo from "~/assets/dharvista-logo.jpg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Find Jobs" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function updateNavTop() {
      const h = headerRef.current?.offsetHeight ?? 96;
      const topValue = isHidden ? '0px' : `${h}px`;
      document.documentElement.style.setProperty('--nav-top', topValue);
    }
    updateNavTop();
    window.addEventListener('resize', updateNavTop);
    return () => window.removeEventListener('resize', updateNavTop);
  }, [isHidden, isOpen]);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY || window.pageYOffset;
      if (isOpen) {
        lastScrollY.current = y;
        setIsHidden(false);
        return;
      }
      if (y > lastScrollY.current && y > 100) {
        setIsHidden(true);
      } else if (y < lastScrollY.current) {
        setIsHidden(false);
      }
      lastScrollY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/100 backdrop-blur-sm border-b border-border transition-transform duration-500 ease-in-out h-24 md:h-28",
        isHidden && "-translate-y-full"
      )}
    >
      <nav className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center gap-4 group py-2">
            <div className="relative overflow-hidden h-16 w-16 md:h-20 md:w-20 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={logo}
                alt="Dharvista Logo"
                className="h-full w-full object-cover mix-blend-multiply"
                width={80}
                height={80}
              />
            </div>
            <span
              className="text-2xl md:text-3xl text-primary uppercase"
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 900,
                letterSpacing: '1.5px'
              }}
            >
              DHARVISTA
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "nav-link text-sm uppercase tracking-wider font-semibold text-gray-600 hover:text-primary transition-all duration-300 relative group py-2",
                  pathname === link.href && "text-primary"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-0 w-0 h-1 bg-accent transition-all duration-300 group-hover:w-full rounded-full",
                  pathname === link.href && "w-full"
                )}/>
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-6 border-t border-border animate-fade-in bg-background h-screen">
            <div className="flex flex-col gap-6 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium border-b border-gray-50 pb-2",
                    pathname === link.href ? "text-primary border-accent" : "text-gray-600"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
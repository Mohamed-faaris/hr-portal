"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "~/lib/utils";
import Image from "next/image";

const logo = "/assets/dharvista-logo.jpg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Find Jobs" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "bg-background/100 border-border sticky top-0 z-50 h-24 border-b backdrop-blur-sm md:h-28",
      )}
    >
      <nav className="container mx-auto h-full px-4">
        <div className="flex h-full items-center justify-between">
          <Link href="/" className="group flex items-center gap-4 py-2">
            <div className="relative h-16 w-16 overflow-hidden transition-transform duration-300 group-hover:scale-105 md:h-20 md:w-20">
              <Image
                src={logo}
                alt="Dharvista Logo"
                className="h-full w-full object-cover mix-blend-multiply"
                width={80}
                height={80}
              />
            </div>
            <span
              className="text-primary text-2xl md:text-3xl"
              style={{
                fontFamily: '"Product Sans", sans-serif',
                fontWeight: 700,
                letterSpacing: "1.5px",
              }}
            >
              Dharvista
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "nav-link hover:text-primary group relative py-2 text-sm font-semibold tracking-wider text-gray-600 uppercase transition-all duration-300",
                  pathname === link.href && "text-primary",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "bg-accent absolute bottom-0 left-0 h-1 w-0 rounded-full transition-all duration-300 group-hover:w-full",
                    pathname === link.href && "w-full",
                  )}
                />
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground rounded-md p-2 transition-colors hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>

        {isOpen && (
          <div className="border-border bg-background h-screen border-t py-6 md:hidden">
            <div className="flex flex-col gap-6 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "border-b border-gray-50 pb-2 text-lg font-medium",
                    pathname === link.href
                      ? "text-primary border-accent"
                      : "text-gray-600",
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
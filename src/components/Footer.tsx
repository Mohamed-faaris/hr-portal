"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Heart,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import logo from "~/assets/dharvista-logo.jpg";
import collabLogo from "~/assets/collabrate.jpg";
import { motion } from "framer-motion";
import { fadeInUp } from "~/lib/animations";

export default function Footer() {
  return (
    <footer className="from-primary text-primary-foreground w-full bg-gradient-to-b from-70% to-white print:hidden">
      <motion.div
        className="pt-16 pb-12"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container-wide grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-lg border border-white/10 bg-white/10 p-1 shadow-sm backdrop-blur-sm">
                <Image
                  src={logo}
                  alt="Dharvista Logo"
                  className="h-full w-full rounded-md object-cover"
                  width={48}
                  height={48}
                />
              </div>

              <span
                className="text-2xl text-white uppercase drop-shadow-sm"
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: 900,
                  letterSpacing: "1.5px",
                }}
              >
                DHARVISTA
              </span>
            </div>
            <p className="text-sm leading-relaxed font-light text-blue-50/90">
              Empowering talent and connecting opportunities. Your trusted
              partner for recruitment and placement solutions in South Tamil
              Nadu.
            </p>

            <div className="flex gap-4">
              <SocialLink
                href="https://instagram.com"
                icon={Instagram}
                label="Instagram"
              />
              <SocialLink
                href="https://twitter.com"
                icon={Twitter}
                label="Twitter"
              />
              <SocialLink
                href="https://linkedin.com"
                icon={Linkedin}
                label="LinkedIn"
              />
              <SocialLink
                href="https://facebook.com"
                icon={Facebook}
                label="Facebook"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold tracking-wide text-amber-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Home", "Jobs", "About", "Services"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="inline-flex items-center gap-3 text-[15px] text-blue-50/80 transition-all duration-300 hover:translate-x-2 hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold tracking-wide text-amber-400">
              Location
            </h3>
            <div className="group flex items-start gap-3 leading-relaxed text-blue-50/90">
              <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-amber-400 drop-shadow-sm transition-colors group-hover:text-amber-300" />
              <p className="text-[15px]">
                1/209/C4, Kural Vidhi,
                <br />
                Jeyaram Nagar, Main Road,
                <br />
                Aathipatti, Aruppukottai - 626 101,
                <br />
                Tamil Nadu, India.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold tracking-wide text-amber-400">
              Contact
            </h3>

            <div className="space-y-4">
              <div className="group flex items-center gap-3 text-blue-50/90">
                <Phone className="h-5 w-5 shrink-0 text-amber-400 drop-shadow-sm transition-colors group-hover:text-amber-300" />
                <div className="space-y-1 text-[15px]">
                  <p>+91 6381451289</p>
                  <p>+91 9345026323</p>
                </div>
              </div>

              <div className="group flex items-center gap-3 text-blue-50/90">
                <Mail className="h-5 w-5 shrink-0 text-amber-400 drop-shadow-sm transition-colors group-hover:text-amber-300" />
                <a
                  href="mailto:contact@dharvistahr.com"
                  className="text-[15px] decoration-amber-400/50 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  contact@dharvistahr.com
                </a>
              </div>
            </div>

            <Button
              asChild
              className="group relative mt-4 w-full overflow-hidden border-none bg-gradient-to-r from-amber-500 to-amber-600 py-6 text-base font-bold tracking-wide text-white shadow-lg shadow-amber-900/30 hover:from-amber-600 hover:to-amber-700"
            >
              <Link href="/contact">
                <span className="relative z-10 flex items-center justify-center">
                  Contact Us{" "}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0"></div>
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="border-t border-slate-100 bg-white py-6">
        <div className="container-wide flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="order-3 text-xs font-medium tracking-wide text-slate-500 md:order-1">
            © 2026 Dharvista. All rights reserved.
          </p>

          <div className="order-1 flex items-center gap-2 text-sm font-bold text-slate-600 md:order-2">
            Made in <span className="text-amber-600">தமிழ்நாடு</span>
            <Heart className="h-4 w-4 animate-pulse fill-red-500 text-red-500" />
          </div>

          <div className="order-2 flex items-center gap-3 md:order-3">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              Designed by
            </span>
            <a
              href="https://instagram.com/collab.rate"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              <Image
                src={collabLogo}
                alt="Collabrate Agency"
                className="h-8 w-auto object-contain md:h-6"
                width={100}
                height={32}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-blue-50 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-amber-500 hover:bg-amber-500 hover:text-white hover:shadow-amber-500/20"
    >
      <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
    </a>
  );
}

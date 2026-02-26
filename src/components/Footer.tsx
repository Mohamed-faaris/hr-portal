"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Heart,
} from "lucide-react";
import { Button } from "~/components/ui/button";
const logo = "/assets/dharvista-logo.jpg";
const collabLogo = "/assets/collabrate.jpg";
import { motion } from "framer-motion";
import { fadeInUp } from "~/lib/animations";

// Custom perfect WhatsApp Brand Icon
function WhatsappIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground w-full print:hidden">
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
                className="text-2xl text-white drop-shadow-sm"
                style={{
                  fontFamily: '"Product Sans", sans-serif',
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                }}
              >
                Dharvista
              </span>
            </div>
            <p className="text-sm leading-relaxed font-light text-blue-50/90">
              Empowering talent and connecting opportunities. Your trusted
              partner for recruitment and placement solutions in South Tamil
              Nadu.
            </p>

            <div className="flex gap-4">
              <SocialLink
                href="https://www.instagram.com/dharvistahr?igsh=eTQ2bXcyNGp5Zmp4&utm_source=ig_contact_invite"
                icon={Instagram}
                label="Instagram"
              />
              <SocialLink
                href="https://wa.me/916381451289"
                icon={WhatsappIcon}
                label="WhatsApp"
              />
              <SocialLink
                href="https://www.linkedin.com/company/109600486/"
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

      <div className="border-t border-white/10 py-6">
        <div className="container-wide flex justify-center text-center">
          <p className="text-xs font-medium tracking-wide text-blue-50/70">
            © 2026 Dharvista. All rights reserved. - Collabrate Digitals
          </p>
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
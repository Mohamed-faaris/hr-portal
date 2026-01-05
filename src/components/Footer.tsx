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
  Heart
} from "lucide-react";
import { Button } from "~/components/ui/button";
import logo from "~/assets/dharvista-logo.jpg";
import collabLogo from "~/assets/collabrate.jpg";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-primary from-70% to-white text-primary-foreground print:hidden">

      <div className="pt-16 pb-12">
        <div className="container-wide grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg overflow-hidden bg-white/10 p-1 backdrop-blur-sm border border-white/10 shadow-sm">
                <Image src={logo} alt="Dharvista Logo" className="h-full w-full object-cover rounded-md" width={48} height={48} />
              </div>

              <span
                className="text-2xl text-white drop-shadow-sm uppercase"
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: 900,
                  letterSpacing: '1.5px'
                }}
              >
                DHARVISTA
              </span>
            </div>
            <p className="text-blue-50/90 text-sm leading-relaxed font-light">
              Empowering talent and connecting opportunities. Your trusted partner for recruitment and placement solutions in South Tamil Nadu.
            </p>

            <div className="flex gap-4">
              <SocialLink href="https://instagram.com" icon={Instagram} label="Instagram" />
              <SocialLink href="https://twitter.com" icon={Twitter} label="Twitter" />
              <SocialLink href="https://linkedin.com" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="https://facebook.com" icon={Facebook} label="Facebook" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-amber-400 tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Jobs', 'About', 'Services'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-blue-50/80 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center gap-3 text-[15px]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-amber-400 tracking-wide">Location</h3>
            <div className="flex items-start gap-3 text-blue-50/90 group leading-relaxed">
              <MapPin className="h-6 w-6 text-amber-400 mt-0.5 shrink-0 group-hover:text-amber-300 transition-colors drop-shadow-sm" />
              <p className="text-[15px]">
                1/209/C4, Kural Vidhi,<br />
                Jeyaram Nagar, Main Road,<br />
                Aathipatti, Aruppukottai - 626 101,<br />
                Tamil Nadu, India.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-amber-400 tracking-wide">Contact</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-50/90 group">
                <Phone className="h-5 w-5 text-amber-400 shrink-0 group-hover:text-amber-300 transition-colors drop-shadow-sm" />
                <div className="text-[15px] space-y-1">
                  <p>+91 6381451289</p>
                  <p>+91 9345026323</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-blue-50/90 group">
                <Mail className="h-5 w-5 text-amber-400 shrink-0 group-hover:text-amber-300 transition-colors drop-shadow-sm" />
                <a href="mailto:contact@dharvistahr.com" className="text-[15px] hover:text-white transition-colors hover:underline decoration-amber-400/50 underline-offset-4">
                  contact@dharvistahr.com
                </a>
              </div>
            </div>

            <Button
              asChild
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold tracking-wide mt-4 border-none shadow-lg shadow-amber-900/30 py-6 text-base group relative overflow-hidden"
            >
              <Link href="/contact">
                <span className="relative z-10 flex items-center justify-center">
                  Contact Us <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>
            </Button>
          </div>

        </div>
      </div>

      <div className="bg-white border-t border-slate-100 py-6">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">

          <p className="text-slate-500 text-xs font-medium tracking-wide order-3 md:order-1">
            © 2026 Dharvista. All rights reserved.
          </p>

          <div className="order-1 md:order-2 flex items-center gap-2 text-sm font-bold text-slate-600">
             Made in <span className="text-amber-600">தமிழ்நாடு</span>
             <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
          </div>

          <div className="order-2 md:order-3 flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Designed by</span>
            <a
              href="https://instagram.com/collab.rate"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src={collabLogo}
                alt="Collabrate Agency"
                className="h-8 md:h-6 w-auto object-contain"
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

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="h-11 w-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-blue-50 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300 backdrop-blur-md shadow-sm hover:shadow-amber-500/20 group"
    >
      <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
    </a>
  );
}
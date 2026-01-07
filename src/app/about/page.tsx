"use client";
import Layout from "~/components/Layout";
import { Badge } from "~/components/ui/badge";
import {
  Target,
  Lightbulb,
  Heart,
  Handshake,
  ShieldCheck,
  TrendingUp,
  Users,
  Award,
  CheckCircle2,
  FileText,
  Clock,
  MapPin,
  UserCheck,
  Headphones,
  Network,
  GraduationCap,
} from "lucide-react";
import ClienteleSection from "~/components/sections/ClienteleSection";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer } from "~/lib/animations";

export const dynamic = "force-static";

const differentiators = [
  { text: "3 Years of local recruitment expertise", icon: Clock },
  { text: "Deep understanding of rural employment needs", icon: MapPin },
  { text: "Personalized candidate matching process", icon: UserCheck },
  { text: "Post-placement support and follow-up", icon: Headphones },
  { text: "Strong connections with Tamil Nadu industries", icon: Network },
  { text: "Free career counseling for candidates", icon: GraduationCap },
];

export default function About() {
  return (
    <Layout>
      {/* 🟢 HERO SECTION */}
      <section className="bg-primary text-primary-foreground relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden pt-20 pb-16">
        <div className="from-primary via-primary absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] to-[#051530]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="bg-secondary/10 pointer-events-none absolute right-1/4 bottom-0 h-96 w-96 rounded-full blur-[100px]" />

        <motion.div
          className="container-wide relative z-10 text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer()}
        >
          <motion.div variants={fadeInUp}>
            <h1 className="mx-auto mb-6 max-w-5xl text-4xl leading-tight font-bold tracking-tight drop-shadow-lg md:text-6xl">
              Your Vision, Our Direction
            </h1>
          </motion.div>

          <motion.div variants={fadeIn}>
            <p className="text-primary-foreground/90 mx-auto mb-10 max-w-4xl text-lg leading-relaxed font-light md:text-xl">
              Dharvista HR & Placement Solutions is a premier HR Consultancy
              dedicated to bridging the gap between untapped talent in rural and
              semi-urban areas and forward-thinking companies.
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            className="mx-auto grid max-w-5xl grid-cols-1 gap-6 border-t border-white/10 pt-10 md:grid-cols-3"
            variants={fadeInUp}
          >
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
              <div className="text-secondary mb-1 flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-lg font-bold">Est. 2025</span>
              </div>
              <div className="text-primary-foreground/60 text-xs tracking-wider uppercase">
                Nov 4, 2025
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
              <div className="text-secondary mb-1 flex items-center justify-center gap-2">
                <FileText className="h-5 w-5" />
                <span className="text-lg font-bold">GST Registered</span>
              </div>
              <div className="text-primary-foreground/60 text-xs tracking-wider uppercase">
                33FMLPD0102C1ZZ
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
              <div className="text-secondary mb-1 flex items-center justify-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-lg font-bold">UDYAM Registered</span>
              </div>
              <div className="text-primary-foreground/60 text-xs tracking-wider uppercase">
                TN-32-0092632
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 🟢 MISSION & VISION SECTION (White BG) */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid gap-8 md:grid-cols-2">
            {/* 🟢 UPDATED: bg-gray-50 -> bg-amber-50, border-gray-100 -> border-amber-100 */}
            <div className="h-full rounded-2xl border border-amber-100 bg-white p-10 shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-primary/10 text-primary mb-6 flex h-14 w-14 items-center justify-center rounded-xl">
                <Target className="h-7 w-7" />
              </div>
              <h2 className="text-foreground mb-4 text-2xl font-bold">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To empower rural and emerging city professionals by providing
                quality HR Consulting, training, and career development
                services—enabling sustainable employment and community growth.
              </p>
            </div>

            {/* 🟢 UPDATED: bg-gray-50 -> bg-amber-50, border-gray-100 -> border-amber-100 */}
            <div className="h-full rounded-2xl border border-amber-100 bg-white p-10 shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-secondary/10 text-secondary-foreground mb-6 flex h-14 w-14 items-center justify-center rounded-xl">
                <Lightbulb className="h-7 w-7" />
              </div>
              <h2 className="text-foreground mb-4 text-2xl font-bold">
                Our Vision
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To be the foremost HR consultancy in South Tamil Nadu, enabling
                over{" "}
                <span className="text-primary font-bold">
                  10,000 careers by 2030
                </span>
                , fostering inclusive, fair employment and contributing to
                socio-economic development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 CORE VALUES (Background Changed to Amber-50) */}
      <section className="section-padding border-t border-amber-100 bg-amber-50">
        <div className="container-wide">
          <div className="mb-16 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
              Our Core Values
            </h2>
            <div className="bg-primary mx-auto mb-6 h-1 w-20" />
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
              Our work is guided by the principles embedded in our name:
              <span className="text-primary font-bold"> DHARVISTA</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Dedication",
                desc: "We are deeply committed to the success of our candidates and clients. We go above and beyond to ensure every placement is a perfect match, dedicating our resources to your long-term growth.",
                icon: Heart,
              },
              {
                title: "Humanity",
                desc: "We treat every individual with dignity and respect. We believe in a people-first approach, ensuring that empathy and kindness remain at the heart of our professional interactions.",
                icon: Users,
              },
              {
                title: "Alignment",
                desc: "Matching the right talent with the right opportunity is our specialty. Our strategic screening process ensures that skills, culture, and aspirations align perfectly for mutual success.",
                icon: Target,
              },
              {
                title: "Reliability",
                desc: "We are a partner you can count on, every step of the way. We deliver on our promises with consistency, meeting deadlines and expectations to build a dependable partnership.",
                icon: ShieldCheck,
              },
              {
                title: "Value",
                desc: "We deliver tangible results that drive growth. We focus on creating real ROI for businesses and career progression for candidates, adding genuine worth to every connection we make.",
                icon: Award,
              },
              {
                title: "Integrity",
                desc: "We operate with honesty and transparency always. We uphold the highest ethical standards, ensuring clear communication and honest practices in every recruitment process.",
                icon: CheckCircle2,
              },
              {
                title: "Support",
                desc: "We provide guidance and coaching for career growth. From interview coaching to onboarding advice, we stand by our candidates and clients throughout the entire professional journey.",
                icon: Handshake,
              },
              {
                title: "Trust",
                desc: "Building long-term relationships based on confidence. We earn your confidence through transparent actions, protecting your data and interests with the utmost care and security.",
                icon: ShieldCheck,
              },
              {
                title: "Advancement",
                desc: "Constantly pushing for progress and development. We champion continuous learning and upskilling, driving the professional evolution of the workforce in South Tamil Nadu.",
                icon: TrendingUp,
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="h-full">
                  {/* 🟢 UPDATED: border-gray-100 -> border-amber-100 */}
                  <div className="flex h-full flex-col rounded-2xl border border-amber-100 bg-white p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="bg-primary/10 text-primary mb-8 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-gray-900">
                      {value.title}
                    </h3>
                    <p className="mt-auto text-base leading-relaxed text-gray-500">
                      {value.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🟢 NEW SECTION: WHY CHOOSE US (White BG, Updated Top Border) */}
      <section className="section-padding border-t border-amber-100 bg-white">
        <div className="container-wide">
          <div className="mb-16 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
              Why Partner with Dharvista?
            </h2>
            <div className="bg-primary mx-auto mb-6 h-1 w-20" />
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              We bring local expertise and global standards together.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  // 🟢 UPDATED: border-gray-100 -> border-amber-100
                  className="group flex items-center gap-6 rounded-2xl border border-amber-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="bg-primary/5 text-primary group-hover:bg-primary flex h-16 w-16 shrink-0 items-center justify-center rounded-full transition-colors group-hover:text-white">
                    <Icon className="h-8 w-8" />
                  </div>
                  <span className="text-lg leading-tight font-bold text-gray-800">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🟢 CLIENTELE (Already Updated to Amber-50) */}
      <ClienteleSection />
    </Layout>
  );
}

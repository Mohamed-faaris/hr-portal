"use client";

import {
  MapPin,
  Users,
  Briefcase,
  Handshake,
  Headset,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "~/lib/animations";

const reasons = [
  {
    title: "Strong Local Expertise",
    description:
      "Deep understanding of Tamil Nadu’s workforce, especially rural and semi-urban employment needs.",
    icon: MapPin,
  },
  {
    title: "Personalized Hiring Approach",
    description:
      "Every candidate and employer receives tailored recruitment solutions, not generic placements.",
    icon: Users,
  },
  {
    title: "Industry-Specific Knowledge",
    description:
      "Hands-on experience across fireworks, textile, agriculture, manufacturing, IT, and healthcare sectors.",
    icon: Briefcase,
  },
  {
    title: "Trusted Employer Partnerships",
    description:
      "Long-term relationships built on reliability, transparency, and consistent delivery.",
    icon: Handshake,
  },
  {
    title: "Post-Placement Support",
    description:
      "Continuous follow-up ensures smooth onboarding and long-term success for both parties.",
    icon: Headset,
  },
  {
    title: "Ethical & Transparent Process",
    description:
      "We prioritize fairness, compliance, and candidate welfare in every recruitment engagement.",
    icon: ShieldCheck,
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer()}
        >
          <motion.h2
            className="text-foreground mb-4 text-3xl font-bold md:text-4xl"
            variants={fadeInUp}
          >
            Why Partner with Dharvista?
          </motion.h2>
          <motion.p
            className="text-muted-foreground mx-auto max-w-3xl leading-relaxed"
            variants={fadeInUp}
          >
            Dharvista combines local insight with professional recruitment
            practices to deliver dependable workforce solutions that benefit
            both employers and job seekers.
          </motion.p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer()}
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group border-border bg-card hover:border-primary/30 relative rounded-2xl border p-10 text-center transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.04] hover:shadow-xl"
              >
                {/* Glow */}
                <div className="bg-primary/5 absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative z-10 mb-6 flex justify-center">
                  <div className="bg-primary/10 group-hover:bg-primary flex h-18 w-18 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
                    <Icon className="text-primary group-hover:text-primary-foreground h-9 w-9 transition-colors duration-300" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="relative z-10 mb-3 text-xl font-semibold">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground relative z-10 text-base leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

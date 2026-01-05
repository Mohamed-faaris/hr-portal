"use client";

import Layout from "~/components/Layout";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import {
  Briefcase,
  Shirt,
  Factory,
  Utensils,
  Wrench,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import ClienteleSection from "~/components/sections/ClienteleSection";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer } from "~/lib/animations";

const services = [
  {
    title: "Management & Administrative",
    description:
      "These positions demand skills in organization, communication and tech proficiency. Dharvista offers tailored placements, resume optimization, and training to match candidates perfectly, boosting careers in HR, IT and beyond.",
    features: [
      "End-to-End recruitment",
      "Expert training Programs",
      "Smart Staffing Solutions",
      "Reliable Placement Support",
    ],
    icon: Briefcase,
  },
  {
    title: "Textiles and Garment",
    description:
      "Production Managers optimize lines, Merchandisers source trends, Designers fuse weaves with global style. Free upskilling from rural talent to export pros!",
    features: [
      "Rural talent Sourcing",
      "Free Upskilling",
      "Quick Placements",
      "Flexible Shift",
    ],
    icon: Shirt,
  },
  {
    title: "Factory Staffing & Technical",
    description:
      "Dharvista HR Staffs South TN factories with Machine Operators for export standards, and Maintenance Engineers for zero downtime. Free training powers rural talent!",
    features: [
      "Smart Rural Sourcing",
      "Free Technical Training",
      "Rapid Low-Turnover Placements",
    ],
    icon: Factory,
  },
  {
    title: "Hotel & Hospitality Operations",
    description:
      "Dharvista HR staffs South TN hotels with skilled talent for seamless hospitality ops: Front Office Executives, Housekeeping Supervisors, Chefs, and F&B Managers.",
    features: [
      "Front Office Management",
      "Housekeeping Operations",
      "Food & Beverage Services",
      "Guest Services & Experience",
    ],
    icon: Utensils,
  },
  {
    title: "Manufacturing Industry Roles",
    description:
      "We place Production Supervisors, Quality Control Inspectors, CNC Machine Operators, Maintenance Technicians, Inventory Controllers, and Safety Officers for regulatory adherence.",
    features: [
      "Targeted Talent Acquisition",
      "Comprehensive Upskilling",
      "Retention-Focused Placements",
    ],
    icon: Wrench,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Requirement Analysis",
    desc: "We dive deep to understand the client’s specific role requirements, necessary skills, and cultural expectations.",
  },
  {
    step: "02",
    title: "Talent Sourcing",
    desc: "We identify and attract qualified candidates through our extensive database and reliable local channels.",
  },
  {
    step: "03",
    title: "Screening",
    desc: "Rigorous evaluation of candidates’ technical skills, experience, and suitability for the specific role.",
  },
  {
    step: "04",
    title: "Shortlisting",
    desc: "We present only the most relevant, high-potential profiles to the client for final review.",
  },
  {
    step: "05",
    title: "Interviews",
    desc: "We coordinate and schedule seamless interviews between clients and candidates to ensure a smooth process.",
  },
  {
    step: "06",
    title: "Selection",
    desc: "We assist in the final hiring decisions and help manage the offer process for a successful closure.",
  },
  {
    step: "07",
    title: "Onboarding",
    desc: "Ensuring smooth integration and orientation of new hires into the organization for long-term retention.",
  },
];

export default function Services() {
  return (
    <Layout>
      {/* 🟢 HERO SECTION */}
      <section className="bg-primary text-primary-foreground relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden pt-20 pb-16">
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
              Tailored Recruitment Solutions
            </h1>
          </motion.div>
          <motion.div variants={fadeIn}>
            <p className="text-primary-foreground/90 mx-auto mb-0 max-w-3xl text-lg leading-relaxed font-light md:text-xl">
              From rural talent sourcing to high-level management placements, we
              provide end-to-end staffing services across key industries.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 🟢 SERVICES GRID SECTION (Background Changed to Amber-50) */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="mb-16 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
              Industries We Power
            </h2>
            <div className="bg-primary mx-auto mb-6 h-1 w-20" />
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
              Comprehensive staffing solutions designed for the unique demands
              of South Tamil Nadu's growing sectors.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  // 🟢 UPDATED: border-gray-100 -> border-amber-100
                  className="<border-amber-100></border-amber-50> flex w-full flex-col rounded-2xl border bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]"
                >
                  <div className="bg-primary/10 text-primary mb-8 flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-2xl font-bold">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="mb-8 text-base leading-relaxed text-gray-500">
                    {service.description}
                  </p>

                  {/* 🟢 UPDATED: border-t border-amber-100 */}
                  <div className="mt-auto border-t border-amber-100 pt-8">
                    <h4 className="mb-4 text-sm font-semibold tracking-wide text-gray-900 uppercase">
                      Key Features
                    </h4>
                    <ul className="space-y-4">
                      {service.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-gray-600"
                        >
                          <CheckCircle2 className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🟢 RECRUITMENT PROCESS (White BG, Updated Top Border) */}
      <section className="section-padding border-t border-amber-100 bg-amber-50">
        <div className="container-wide">
          <div className="mb-16 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
              Efficient and Transparent Recruitment Process
            </h2>
            <div className="bg-primary mx-auto mb-6 h-1 w-20" />
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              For Clients and Candidates: Understanding our process & systems
              ensures a smooth journey from application to onboarding.
            </p>
          </div>

          <div className="grid grid-cols-1 justify-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {processSteps.map((item, index) => (
              <div
                key={index}
                // 🟢 UPDATED: border-amber-100 for consistency
                className="group hover:border-primary/30 rounded-2xl border border-amber-100 bg-white p-8 transition-all duration-300 hover:shadow-xl"
              >
                <div className="group-hover:text-primary mb-4 text-5xl font-bold text-blue-950 transition-colors duration-300">
                  {item.step}
                </div>
                <h3 className="text-foreground group-hover:text-primary mb-3 text-xl font-bold transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🟢 CTA Section (Background Changed to Amber-50) */}
      <section className="section-padding bg-amber-50">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
              Need Specialized Staffing?
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
              Contact us today to discuss how our tailored services can meet
              your specific workforce requirements.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">
                Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

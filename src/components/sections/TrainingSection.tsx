"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "~/lib/animations";
import { GraduationCap, Laptop, UserCheck, TrendingUp } from "lucide-react";

const MOCK_TRAINING_PROGRAMS = [
  {
    id: 1,
    title: "Campus to Corporate",
    description:
      "Bridging the gap for fresh graduates with soft skills and corporate etiquette.",
    icon: GraduationCap,
  },
  {
    id: 2,
    title: "Technical Skill Enhancement",
    description:
      "Specialized IT, Manufacturing, and Textile training based on current industry demands.",
    icon: Laptop,
  },
  {
    id: 3,
    title: "Interview Mastery",
    description:
      "Resume optimization, mock interviews, and confidence-building workshops.",
    icon: UserCheck,
  },
  {
    id: 4,
    title: "Leadership & Management",
    description:
      "Advanced upskilling and leadership training for mid-level professionals.",
    icon: TrendingUp,
  },
];

export default function TrainingSection() {
  return (
    <section className="section-padding border-t border-amber-100 bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer(0.08)}
        >
          <motion.h2
            className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl"
            variants={fadeInUp}
          >
            Placement & Training Programs
          </motion.h2>
          <motion.div
            className="bg-primary mx-auto mb-6 h-1 w-20 rounded-full"
            variants={fadeInUp}
          />
          <motion.p
            className="mx-auto max-w-2xl text-lg text-gray-600"
            variants={fadeInUp}
          >
            We don't just find talent, we build it. Discover our specialized
            programs designed to elevate your career.
          </motion.p>
        </motion.div>

        {/* Training Cards Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer()}
        >
          {MOCK_TRAINING_PROGRAMS.map((program) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.id}
                // Updated container classes to match the "Who We Are" section
                className="group hover:border-accent/30 relative flex flex-col rounded-2xl border border-amber-100 bg-white p-8 text-center shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
                variants={fadeInUp}
              >
                <div className="relative z-10 mb-6 flex justify-center">
                  {/* Updated icon container to match circle shape and scale animation */}
                  <div className="bg-primary/10 group-hover:bg-primary flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
                    <Icon className="text-primary group-hover:text-primary-foreground h-10 w-10 transition-colors duration-300" />
                  </div>
                </div>

                <h3 className="relative z-10 mb-3 text-xl font-bold text-gray-900">
                  {program.title}
                </h3>

                <p className="relative z-10 text-base leading-relaxed text-gray-600">
                  {program.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
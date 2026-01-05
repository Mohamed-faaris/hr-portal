"use client";

import {
  Stethoscope,
  Utensils,
  ShoppingBag,
  Car,
  HardHat,
  Headphones,
  TrendingUp,
  GraduationCap,
  Wrench,
  Factory,
  Shirt,
  Rocket,
  Building2,
  Store,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "~/lib/animations";

const industries = [
  { name: "Medical / Healthcare", icon: Stethoscope },
  { name: "Hotels / Restaurants", icon: Utensils },
  { name: "Retail / FMCG", icon: ShoppingBag },
  { name: "Automobile", icon: Car },
  { name: "Construction", icon: HardHat },
  { name: "BPO / Customer Services", icon: Headphones },
  { name: "Sales & Marketing", icon: TrendingUp },
  { name: "Education & Training", icon: GraduationCap },
  { name: "Engineering & Technical", icon: Wrench },
  { name: "Textile Manufacturing", icon: Factory },
  { name: "Small-scale Manufacturing", icon: Building2 },
  { name: "Textiles & Garments", icon: Shirt },
  { name: "MSME", icon: Store },
  { name: "Start-Ups", icon: Rocket },
];

export default function IndustriesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <motion.div
          className="mb-16 text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer(0.05)}
        >
          <motion.h2
            className="text-foreground mb-4 text-3xl font-bold md:text-4xl"
            variants={fadeInUp}
          >
            Industries We Serve
          </motion.h2>
          <motion.div
            className="bg-primary mx-auto mb-6 h-1 w-20"
            variants={fadeInUp}
          />
          <motion.p
            className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed"
            variants={fadeInUp}
          >
            Our placement solutions office demonstrates strong industry
            expertise by delivering structured, compliant, and results-driven
            recruitment services across multiple sectors.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer(0.05)}
        >
          {industries.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="group border-border flex min-h-[220px] flex-col items-center justify-center rounded-2xl border bg-white p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                variants={fadeInUp}
              >
                <div className="bg-primary/5 group-hover:bg-primary mb-6 flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
                  <Icon className="text-primary group-hover:text-primary-foreground h-8 w-8 transition-colors duration-300" />
                </div>
                <h3 className="text-foreground group-hover:text-primary text-center text-lg font-bold transition-colors">
                  {item.name}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { MOCK_CLIENTS } from "~/mock/clients";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "~/lib/animations";

export default function ClienteleSection() {
  return (
    <section className="section-padding border-t border-amber-100 bg-amber-50 py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-10 text-center md:mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer(0.08)}
        >
          <motion.h2
            className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl"
            variants={fadeInUp}
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.div
            className="bg-primary mx-auto mb-6 h-1 w-20 rounded-full"
            variants={fadeInUp}
          />
          <motion.p
            className="mx-auto max-w-2xl text-lg text-gray-600"
            variants={fadeInUp}
          >
            We are proud to partner with respected organizations.
          </motion.p>
        </motion.div>

        {/* Logos Grid */}
        <motion.div
          className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-8 lg:grid-cols-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {MOCK_CLIENTS.map((client, index) => (
            <motion.div
              key={client.id}
              className="group relative flex h-36 flex-col items-center justify-center rounded-2xl border border-amber-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:h-48 md:p-8"
              variants={fadeInUp}
            >
              <div className="mb-0 flex h-28 w-full items-center justify-center px-1 md:mb-4 md:h-20 md:px-4">
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="max-h-full max-w-full scale-110 object-contain mix-blend-multiply transition-all duration-300 md:scale-100"
                />
              </div>

              {/* Client Name (Visible only on desktop hover) */}
              <span className="absolute bottom-6 hidden text-center text-sm font-bold text-gray-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
                {client.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowRight, Users, Target, Award, Briefcase } from "lucide-react";
import IndustriesSection from "~/components/sections/IndustriesSection";
import LatestJobsSection from "~/components/sections/LatestJobsSection";
import ClienteleSection from "~/components/sections/ClienteleSection";
import Layout from "~/components/Layout";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer } from "~/lib/animations";

export default function HomePage() {
  return (
    <Layout>
      <section className="bg-primary text-primary-foreground relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden pt-20 pb-16">
        <div className="from-primary via-primary absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] to-[#051530]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="bg-accent/10 pointer-events-none absolute right-1/4 bottom-0 h-96 w-96 rounded-full blur-[100px]" />

        <motion.div
          className="container-wide relative z-10 text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer()}
        >
          <motion.div variants={fadeInUp} transition={{ delay: 0.1 }}>
            <h1 className="mx-auto mb-6 max-w-5xl text-4xl leading-tight font-bold tracking-tight drop-shadow-lg md:text-6xl lg:text-7xl">
              Building Bridges to Professional Dreams
            </h1>
          </motion.div>

          <motion.div variants={fadeIn} transition={{ delay: 0.2 }}>
            <p className="text-primary-foreground/90 mx-auto mb-6 max-w-3xl text-xl font-light md:text-2xl">
              Empowering Talent, Connecting Opportunities.{" "}
              <br className="hidden md:block" />
              Your Trusted HR Partner in South Tamil Nadu.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} transition={{ delay: 0.3 }}>
            <p className="text-primary-foreground/70 mx-auto mb-10 max-w-3xl text-base leading-relaxed md:text-lg">
              Premier recruitment experts delivering tailored placement
              services. Specializing in talent sourcing, skill enhancement
              training, resume optimization, and interview coaching.
            </p>
          </motion.div>

          <motion.div
            className="mb-20 flex flex-col justify-center gap-4 sm:flex-row"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              className="text-primary h-14 border-none bg-white px-8 text-lg font-bold shadow-xl transition-all hover:-translate-y-1 hover:bg-gray-100 hover:shadow-2xl"
            >
              <Link href="/jobs">Start Your Journey</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 border-2 border-white/20 bg-transparent px-8 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </motion.div>

          <motion.div
            className="mx-auto grid max-w-5xl grid-cols-1 gap-12 border-t border-white/10 pt-12 md:grid-cols-3"
            variants={fadeInUp}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold tracking-tighter drop-shadow-md md:text-6xl">
                100+
              </div>
              <div className="text-primary-foreground/60 text-xs font-semibold tracking-[0.2em] uppercase md:text-sm">
                Successful Placements
              </div>
            </div>

            <div className="text-center">
              <div className="mb-2 text-5xl font-bold tracking-tighter drop-shadow-md md:text-6xl">
                17
              </div>
              <div className="text-primary-foreground/60 text-xs font-semibold tracking-[0.2em] uppercase md:text-sm">
                Clients Served
              </div>
            </div>

            <div className="text-center">
              <div className="mb-2 text-5xl font-bold tracking-tighter drop-shadow-md md:text-6xl">
                2025
              </div>
              <div className="text-primary-foreground/60 text-xs font-semibold tracking-[0.2em] uppercase md:text-sm">
                Established
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <LatestJobsSection />

      <section className="section-padding bg-amber-50">
        <div className="container-wide">
          <motion.div
            className="mb-12 text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer()}
          >
            <motion.h2
              className="text-foreground mb-4 text-3xl font-bold md:text-4xl"
              variants={fadeInUp}
            >
              Who We Are
            </motion.h2>
            <motion.div
              className="bg-primary mx-auto h-1 w-20"
              variants={fadeInUp}
            />
          </motion.div>

          <motion.div
            className="mx-auto mb-16 max-w-3xl text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
              Dharvista is a recruitment agency headquartered in Aruppukottai,
              Virudhunagar District, Tamil Nadu. We specialize in bridging
              skilled talent from rural and semi-urban areas with opportunities
              across local and global industries.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer()}
          >
            {[
              {
                title: "Expert Team",
                desc: "Seasoned professionals with deep industry knowledge",
                icon: Users,
              },
              {
                title: "Precision Matching",
                desc: "Tailored solutions for perfect candidate-client fit",
                icon: Target,
              },
              {
                title: "Proven Results",
                desc: "Track record of successful placements across sectors",
                icon: Award,
              },
              {
                title: "Industry Reach",
                desc: "Serving Fireworks, Textile, IT, and Medical industries",
                icon: Briefcase,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="group hover:border-accent/30 relative rounded-2xl border border-amber-100 bg-white p-10 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
                  variants={fadeInUp}
                >
                  <div className="relative z-10 mb-6 flex justify-center">
                    <div className="bg-primary/10 group-hover:bg-primary flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
                      <Icon className="text-primary group-hover:text-primary-foreground h-10 w-10 transition-colors duration-300" />
                    </div>
                  </div>

                  <h3 className="relative z-10 mb-3 text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="relative z-10 text-base leading-relaxed text-gray-500">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <IndustriesSection />

      <div className="bg-amber-50">
        <ClienteleSection />
      </div>

      <section className="section-padding border-t border-amber-100 bg-amber-50">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
              Ready to Find Your Next Opportunity?
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
              Browse our current openings or get in touch with our team to
              discuss your career aspirations.
            </p>
            <Button asChild size="lg">
              <Link href="/jobs">
                Explore Careers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

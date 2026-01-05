"use client";

import Layout from "~/components/Layout";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { 
  Briefcase, Shirt, Factory, Utensils, Wrench, 
  CheckCircle2, ArrowRight 
} from "lucide-react";
import ClienteleSection from "~/components/sections/ClienteleSection";

const services = [
  {
    title: "Management & Administrative",
    description: "These positions demand skills in organization, communication and tech proficiency. Dharvista offers tailored placements, resume optimization, and training to match candidates perfectly, boosting careers in HR, IT and beyond.",
    features: ["End-to-End recruitment", "Expert training Programs", "Smart Staffing Solutions", "Reliable Placement Support"],
    icon: Briefcase
  },
  {
    title: "Textiles and Garment",
    description: "Production Managers optimize lines, Merchandisers source trends, Designers fuse weaves with global style. Free upskilling from rural talent to export pros!",
    features: ["Rural talent Sourcing", "Free Upskilling", "Quick Placements", "Flexible Shift"],
    icon: Shirt
  },
  {
    title: "Factory Staffing & Technical",
    description: "Dharvista HR Staffs South TN factories with Machine Operators for export standards, and Maintenance Engineers for zero downtime. Free training powers rural talent!",
    features: ["Smart Rural Sourcing", "Free Technical Training", "Rapid Low-Turnover Placements"],
    icon: Factory
  },
  {
    title: "Hotel & Hospitality Operations",
    description: "Dharvista HR staffs South TN hotels with skilled talent for seamless hospitality ops: Front Office Executives, Housekeeping Supervisors, Chefs, and F&B Managers.",
    features: ["Front Office Management", "Housekeeping Operations", "Food & Beverage Services", "Guest Services & Experience"],
    icon: Utensils
  },
  {
    title: "Manufacturing Industry Roles",
    description: "We place Production Supervisors, Quality Control Inspectors, CNC Machine Operators, Maintenance Technicians, Inventory Controllers, and Safety Officers for regulatory adherence.",
    features: ["Targeted Talent Acquisition", "Comprehensive Upskilling", "Retention-Focused Placements"],
    icon: Wrench
  }
];

const processSteps = [
  {
    step: "01",
    title: "Requirement Analysis",
    desc: "We dive deep to understand the client’s specific role requirements, necessary skills, and cultural expectations."
  },
  {
    step: "02",
    title: "Talent Sourcing",
    desc: "We identify and attract qualified candidates through our extensive database and reliable local channels."
  },
  {
    step: "03",
    title: "Screening",
    desc: "Rigorous evaluation of candidates’ technical skills, experience, and suitability for the specific role."
  },
  {
    step: "04",
    title: "Shortlisting",
    desc: "We present only the most relevant, high-potential profiles to the client for final review."
  },
  {
    step: "05",
    title: "Interviews",
    desc: "We coordinate and schedule seamless interviews between clients and candidates to ensure a smooth process."
  },
  {
    step: "06",
    title: "Selection",
    desc: "We assist in the final hiring decisions and help manage the offer process for a successful closure."
  },
  {
    step: "07",
    title: "Onboarding",
    desc: "Ensuring smooth integration and orientation of new hires into the organization for long-term retention."
  }
];

export default function Services() {
  return (
    <Layout>
      {/* 🟢 HERO SECTION */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center bg-primary text-primary-foreground overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-primary to-[#051530]" />
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 container-wide text-center">
          <div className="opacity-0 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-5xl mx-auto tracking-tight leading-tight drop-shadow-lg">
              Tailored Recruitment Solutions
            </h1>
          </div>
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <p className="text-lg md:text-xl text-primary-foreground/90 font-light mb-0 max-w-3xl mx-auto leading-relaxed">
              From rural talent sourcing to high-level management placements, we provide end-to-end staffing services across key industries.
            </p>
          </div>
        </div>
      </section>

      {/* 🟢 SERVICES GRID SECTION (Background Changed to Amber-50) */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Industries We Power
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive staffing solutions designed for the unique demands of South Tamil Nadu's growing sectors.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index} 
                  // 🟢 UPDATED: border-gray-100 -> border-amber-100
                  className="flex flex-col w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] p-10 rounded-2xl bg-white border <border-amber-100></border-amber-50> shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl mb-8 shrink-0">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-2xl mb-4 text-gray-900">{service.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-base mb-8">{service.description}</p>
                  
                  {/* 🟢 UPDATED: border-t border-amber-100 */}
                  <div className="mt-auto pt-8 border-t border-amber-100">
                    <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Key Features</h4>
                    <ul className="space-y-4">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
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
      <section className="section-padding bg-amber-50 border-t border-amber-100">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Efficient and Transparent Recruitment Process
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              For Clients and Candidates: Understanding our process & systems ensures a smooth journey from application to onboarding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
            {processSteps.map((item, index) => (
              <div 
                key={index}
                // 🟢 UPDATED: border-amber-100 for consistency
                className="group p-8 rounded-2xl border border-amber-100 bg-white hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl font-bold text-blue-950 mb-4 group-hover:text-primary transition-colors duration-300">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
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
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "150ms" }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Need Specialized Staffing?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today to discuss how our tailored services can meet your specific workforce requirements.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">
                Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
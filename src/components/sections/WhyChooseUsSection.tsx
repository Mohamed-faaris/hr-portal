import {
    MapPin,
    Users,
    Briefcase,
    Handshake,
    Headset,
    ShieldCheck,
  } from "lucide-react";
  
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Partner with Dharvista?
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Dharvista combines local insight with professional recruitment
              practices to deliver dependable workforce solutions that benefit
              both employers and job seekers.
            </p>
          </div>
  
          {/* Reasons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div
                  key={index}
                  className="
                    group relative rounded-2xl border border-border bg-card
                    p-10 text-center
                    transition-all duration-300 ease-out
                    hover:-translate-y-2 hover:scale-[1.04]
                    hover:shadow-xl hover:border-primary/30
                  "
                >
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
  
                  {/* Icon */}
                  <div className="relative z-10 mb-6 flex justify-center">
                    <div className="w-18 h-18 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                      <Icon className="h-9 w-9 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                  </div>
  
                  {/* Content */}
                  <h3 className="relative z-10 text-xl font-semibold mb-3">
                    {reason.title}
                  </h3>
                  <p className="relative z-10 text-muted-foreground text-base leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
  
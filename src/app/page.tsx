import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowRight, Users, Target, Award, Briefcase } from "lucide-react";
import IndustriesSection from "~/components/sections/IndustriesSection";
import LatestJobsSection from "~/components/sections/LatestJobsSection";
import ClienteleSection from "~/components/sections/ClienteleSection";
import Layout from "~/components/Layout";

export default function HomePage() {
  return (
    <Layout>
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-primary text-primary-foreground overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-primary to-[#051530]" />
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 container-wide text-center">
          <div className="opacity-0 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-5xl mx-auto tracking-tight leading-tight drop-shadow-lg">
              Building Bridges to Professional Dreams
            </h1>
          </div>

          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <p className="text-xl md:text-2xl text-primary-foreground/90 font-light mb-6 max-w-3xl mx-auto">
              Empowering Talent, Connecting Opportunities. <br className="hidden md:block" />
              Your Trusted HR Partner in South Tamil Nadu.
            </p>
          </div>

          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <p className="text-base md:text-lg text-primary-foreground/70 mb-10 max-w-3xl mx-auto leading-relaxed">
              Premier recruitment experts delivering tailored placement services.
              Specializing in talent sourcing, skill enhancement training, resume optimization,
              and interview coaching.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold text-lg px-8 h-14 border-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              <Link href="/jobs">
                Start Your Journey
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:text-white font-semibold text-lg px-8 h-14 backdrop-blur-sm"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto border-t border-white/10 pt-12 opacity-0 animate-slide-up" style={{ animationDelay: "500ms" }}>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 tracking-tighter drop-shadow-md">100+</div>
              <div className="text-xs md:text-sm font-semibold tracking-[0.2em] text-primary-foreground/60 uppercase">
                Successful Placements
              </div>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 tracking-tighter drop-shadow-md">17</div>
              <div className="text-xs md:text-sm font-semibold tracking-[0.2em] text-primary-foreground/60 uppercase">
                Clients Served
              </div>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 tracking-tighter drop-shadow-md">2025</div>
              <div className="text-xs md:text-sm font-semibold tracking-[0.2em] text-primary-foreground/60 uppercase">
                Established
              </div>
            </div>
          </div>
        </div>
      </section>

      <LatestJobsSection />

      <section className="section-padding bg-amber-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Who We Are
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>

          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dharvista is a recruitment agency headquartered in Aruppukottai,
              Virudhunagar District, Tamil Nadu. We specialize in bridging skilled
              talent from rural and semi-urban areas with opportunities across
              local and global industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Expert Team",
                desc: "Seasoned professionals with deep industry knowledge",
                icon: Users
              },
              {
                title: "Precision Matching",
                desc: "Tailored solutions for perfect candidate-client fit",
                icon: Target
              },
              {
                title: "Proven Results",
                desc: "Track record of successful placements across sectors",
                icon: Award
              },
              {
                title: "Industry Reach",
                desc: "Serving Fireworks, Textile, IT, and Medical industries",
                icon: Briefcase
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="opacity-0 animate-slide-up group relative rounded-2xl border border-amber-100 bg-white p-10 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-accent/30"
                  style={{ animationDelay: `${100 + index * 75}ms` }}
                >
                  <div className="relative z-10 mb-6 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                      <Icon className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                  </div>

                  <h3 className="relative z-10 font-bold text-xl mb-3 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="relative z-10 text-gray-500 text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <IndustriesSection />

      <div className="bg-amber-50">
        <ClienteleSection />
      </div>

      <section className="section-padding bg-amber-50 border-t border-amber-100">
        <div className="container-wide text-center">
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "150ms" }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Find Your Next Opportunity?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Browse our current openings or get in touch with our team to discuss
              your career aspirations.
            </p>
            <Button asChild size="lg">
              <Link href="/jobs">
                Explore Careers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

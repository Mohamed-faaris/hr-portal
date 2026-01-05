"use client";

import Layout from "~/components/Layout";
import { Badge } from "~/components/ui/badge";
import { 
  Target, Lightbulb, Heart, Handshake, ShieldCheck, 
  TrendingUp, Users, Award, CheckCircle2, FileText,
  Clock, MapPin, UserCheck, Headphones, Network, GraduationCap
} from "lucide-react";
import ClienteleSection from "~/components/sections/ClienteleSection";

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
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center bg-primary text-primary-foreground overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-primary to-[#051530]" />
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 container-wide text-center">
          <div className="opacity-0 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-5xl mx-auto tracking-tight leading-tight drop-shadow-lg">
              Your Vision, Our Direction
            </h1>
          </div>

          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <p className="text-lg md:text-xl text-primary-foreground/90 font-light mb-10 max-w-4xl mx-auto leading-relaxed">
              Dharvista HR & Placement Solutions is a premier HR Consultancy dedicated to bridging the gap between untapped talent in rural and semi-urban areas and forward-thinking companies.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto border-t border-white/10 pt-10 opacity-0 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-center gap-2 mb-1 text-secondary">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-bold text-lg">Est. 2025</span>
              </div>
              <div className="text-xs text-primary-foreground/60 uppercase tracking-wider">Nov 4, 2025</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-center gap-2 mb-1 text-secondary">
                <FileText className="h-5 w-5" />
                <span className="font-bold text-lg">GST Registered</span>
              </div>
              <div className="text-xs text-primary-foreground/60 uppercase tracking-wider">33FMLPD0102C1ZZ</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-center gap-2 mb-1 text-secondary">
                <ShieldCheck className="h-5 w-5" />
                <span className="font-bold text-lg">UDYAM Registered</span>
              </div>
              <div className="text-xs text-primary-foreground/60 uppercase tracking-wider">TN-32-0092632</div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 MISSION & VISION SECTION (White BG) */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            {/* 🟢 UPDATED: bg-gray-50 -> bg-amber-50, border-gray-100 -> border-amber-100 */}
            <div className="bg-white p-10 rounded-2xl border border-amber-100 h-full shadow-sm hover:shadow-md transition-shadow">
              <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <Target className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To empower rural and emerging city professionals by providing quality HR Consulting, training, and career development services—enabling sustainable employment and community growth.
              </p>
            </div>

            {/* 🟢 UPDATED: bg-gray-50 -> bg-amber-50, border-gray-100 -> border-amber-100 */}
            <div className="bg-white p-10 rounded-2xl border border-amber-100 h-full shadow-sm hover:shadow-md transition-shadow">
              <div className="h-14 w-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 text-secondary-foreground">
                <Lightbulb className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To be the foremost HR consultancy in South Tamil Nadu, enabling over <span className="font-bold text-primary">10,000 careers by 2030</span>, fostering inclusive, fair employment and contributing to socio-economic development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 CORE VALUES (Background Changed to Amber-50) */}
      <section className="section-padding bg-amber-50 border-t border-amber-100">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our work is guided by the principles embedded in our name: 
              <span className="font-bold text-primary"> DHARVISTA</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Dedication", 
                desc: "We are deeply committed to the success of our candidates and clients. We go above and beyond to ensure every placement is a perfect match, dedicating our resources to your long-term growth.", 
                icon: Heart 
              },
              { 
                title: "Humanity", 
                desc: "We treat every individual with dignity and respect. We believe in a people-first approach, ensuring that empathy and kindness remain at the heart of our professional interactions.", 
                icon: Users 
              },
              { 
                title: "Alignment", 
                desc: "Matching the right talent with the right opportunity is our specialty. Our strategic screening process ensures that skills, culture, and aspirations align perfectly for mutual success.", 
                icon: Target 
              },
              { 
                title: "Reliability", 
                desc: "We are a partner you can count on, every step of the way. We deliver on our promises with consistency, meeting deadlines and expectations to build a dependable partnership.", 
                icon: ShieldCheck 
              },
              { 
                title: "Value", 
                desc: "We deliver tangible results that drive growth. We focus on creating real ROI for businesses and career progression for candidates, adding genuine worth to every connection we make.", 
                icon: Award 
              },
              { 
                title: "Integrity", 
                desc: "We operate with honesty and transparency always. We uphold the highest ethical standards, ensuring clear communication and honest practices in every recruitment process.", 
                icon: CheckCircle2 
              },
              { 
                title: "Support", 
                desc: "We provide guidance and coaching for career growth. From interview coaching to onboarding advice, we stand by our candidates and clients throughout the entire professional journey.", 
                icon: Handshake 
              },
              { 
                title: "Trust", 
                desc: "Building long-term relationships based on confidence. We earn your confidence through transparent actions, protecting your data and interests with the utmost care and security.", 
                icon: ShieldCheck 
              },
              { 
                title: "Advancement", 
                desc: "Constantly pushing for progress and development. We champion continuous learning and upskilling, driving the professional evolution of the workforce in South Tamil Nadu.", 
                icon: TrendingUp 
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="h-full">
                  {/* 🟢 UPDATED: border-gray-100 -> border-amber-100 */}
                  <div className="flex flex-col h-full p-10 rounded-2xl bg-white border border-amber-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl mb-8">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-bold text-2xl mb-4 text-gray-900">
                      {value.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-base mt-auto">
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
      <section className="section-padding bg-white border-t border-amber-100">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Partner with Dharvista?
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We bring local expertise and global standards together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  // 🟢 UPDATED: border-gray-100 -> border-amber-100
                  className="group flex items-center gap-6 p-8 rounded-2xl border border-amber-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-16 w-16 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-8 w-8" />
                  </div>
                  <span className="text-lg font-bold text-gray-800 leading-tight">
                    {item.text}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 🟢 CLIENTELE (Already Updated to Amber-50) */}
      <ClienteleSection />
    </Layout>
  );
}
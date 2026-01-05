"use client";

import { useState } from "react";
import Layout from "~/components/Layout";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { useToast } from "~/hooks/use-toast";
import { Mail, Phone, MapPin, Linkedin, Instagram, MessageCircle, ExternalLink } from "lucide-react";
import FloatingWhatsApp from "~/components/FloatingWhatsApp";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent",
      description: "Thank you for your enquiry. We'll be in touch shortly.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const mapLink = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.6625872747986!2d78.12449367479992!3d9.498169090583133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b013b006f2e2729%3A0x45cabefdceceb308!2sDHARVISTA%20HR%20%26%20Placement%20Solutions!5e1!3m2!1sen!2sus!4v1766753981266!5m2!1sen!2sus";

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center bg-primary text-primary-foreground overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-primary to-[#051530]" />
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 container-wide text-center">
          <div className="opacity-0 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Contact Us</h1>
          </div>
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "150ms" }}>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Get in touch with our team to discuss your requirements
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left Column: Contact Form */}
            <div className="opacity-0 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" required className="border-gray-200 focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" required className="border-gray-200 focus:border-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" required className="border-gray-200 focus:border-primary" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" className="border-gray-200 focus:border-primary" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" required className="border-gray-200 focus:border-primary" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="How can we help you?"
                    className="border-gray-200 focus:border-primary"
                  />
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting} className="bg-accent text-accent-foreground hover:bg-accent/90 w-full md:w-auto font-bold shadow-md">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Right Column: Contact Info */}
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "250ms" }}>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                
                {/* Address Card */}
                <a 
                    href="https://www.google.com/maps/place/DHARVISTA+HR+%26+Placement+Solutions/@9.4981691,78.1244937,17z/data=!3m1!4b1!4m6!3m5!1s0x3b013b006f2e2729:0x45cabefdceceb308!8m2!3d9.4981691!4d78.1266824!16s%2Fg%2F11c4840j4m?entry=ttu&g_ep=EgoyMDI1MDEyNi4wIKXMDSoASAFQAw%3D%3D" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="card-corporate flex items-start gap-4 opacity-0 animate-slide-up hover:bg-amber-50 transition-colors cursor-pointer group border border-gray-100" 
                    style={{ animationDelay: "275ms" }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold mb-1">Main Office</h3>
                        <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      1/209/C4, Kural Vidhi, Jeyaram Nagar<br />
                      Main Road, Aathipatti<br />
                      Aruppukottai - 626 101, Tamil Nadu
                    </p>
                  </div>
                </a>

                {/* Phone Card */}
                <div className="card-corporate flex items-start gap-4 opacity-0 animate-slide-up border border-gray-100 hover:bg-amber-50 transition-colors" style={{ animationDelay: "350ms" }}>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone & WhatsApp</h3>
                    <div className="text-muted-foreground text-sm">
                      <p>Primary: +91 6381451289</p>
                      <p>Alternate: +91 9345026323</p>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="card-corporate flex items-start gap-4 opacity-0 animate-slide-up border border-gray-100 hover:bg-amber-50 transition-colors" style={{ animationDelay: "425ms" }}>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <div className="text-muted-foreground text-sm break-all">
                      <p><span className="font-medium text-foreground">Business:</span> dharvistahrplacementsolutions@gmail.com</p>
                      <p className="mt-1"><span className="font-medium text-foreground">Candidate:</span> dharvistahr@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "500ms" }}>
                <h3 className="font-semibold mb-4">Connect With Us</h3>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://www.linkedin.com/company/109600486/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 hover:bg-amber-100 rounded-md transition-colors text-sm font-medium text-gray-800"
                  >
                    <Linkedin className="h-4 w-4 text-primary" />
                    LinkedIn
                  </a>
                  <a 
                    href="https://www.instagram.com/dharvistahr?igsh=eTQ2bXcyNGp5Zmp4&utm_source=ig_contact_invite" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 hover:bg-amber-100 rounded-md transition-colors text-sm font-medium text-gray-800"
                  >
                    <Instagram className="h-4 w-4 text-primary" />
                    Instagram
                  </a>
                  <a 
                    href="https://whatsapp.com/channel/0029Vb6zCH20LKZKj1w4sB2j" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 hover:bg-amber-100 rounded-md transition-colors text-sm font-medium text-gray-800"
                  >
                    <MessageCircle className="h-4 w-4 text-primary" />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-8 p-6 bg-amber-50 border border-amber-100 rounded-lg opacity-0 animate-fade-in" style={{ animationDelay: "600ms" }}>
                <h3 className="font-semibold mb-2 text-gray-900">Office Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday - Sunday: Closed
                </p>
              </div>

              {/* Google Map */}
              <div className="mt-8 rounded-xl overflow-hidden shadow-sm border border-amber-100 opacity-0 animate-fade-in h-[300px]" style={{ animationDelay: "650ms" }}>
                  <iframe 
                    src={mapLink}
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  ></iframe>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 🟢 UPDATED: threshold={-1} forces it to show immediately */}
      <FloatingWhatsApp threshold={-1} />
    </Layout>
  );
}
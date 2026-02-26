"use client";

import { useState } from "react";
import Layout from "~/components/Layout";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { useToast } from "~/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import FloatingWhatsApp from "~/components/FloatingWhatsApp";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer } from "~/lib/animations";

export const dynamic = "force-static";

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

  const mapLink =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.6625872747986!2d78.12449367479992!3d9.498169090583133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b013b006f2e2729%3A0x45cabefdceceb308!2sDHARVISTA%20HR%20%26%20Placement%20Solutions!5e1!3m2!1sen!2sus!4v1766753981266!5m2!1sen!2sus";

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="bg-primary text-primary-foreground relative flex min-h-[40vh] flex-col items-center justify-center overflow-hidden pt-20 pb-16">
        <div className="from-primary via-primary absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] to-[#051530]" />
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
            <h1 className="mb-4 text-4xl font-bold drop-shadow-lg md:text-5xl">
              Contact Us
            </h1>
          </motion.div>
          <motion.div variants={fadeIn}>
            <p className="text-primary-foreground/90 mx-auto max-w-2xl text-xl">
              Get in touch with our team to discuss your requirements
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-2xl font-bold">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      required
                      className="focus:border-primary border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      required
                      className="focus:border-primary border-gray-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="focus:border-primary border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="focus:border-primary border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    required
                    className="focus:border-primary border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="How can we help you?"
                    className="focus:border-primary border-gray-200"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 w-full font-bold shadow-md md:w-auto"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>

            {/* Right Column: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-2xl font-bold">Get in Touch</h2>
              <div className="space-y-6">
                {/* Address Card */}
                <a
                  href="https://www.google.com/maps/place/DHARVISTA+HR+%26+Placement+Solutions/@9.4981691,78.1244937,17z/data=!3m1!4b1!4m6!3m5!1s0x3b013b006f2e2729:0x45cabefdceceb308!8m2!3d9.4981691!4d78.1266824!16s%2Fg%2F11c4840j4m?entry=ttu&g_ep=EgoyMDI1MDEyNi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-corporate animate-slide-up group flex cursor-pointer items-start gap-4 border border-gray-100  transition-colors hover:bg-amber-50"
                  style={{ animationDelay: "275ms" }}
                >
                  <div className="bg-primary/10 group-hover:bg-primary/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-colors">
                    <MapPin className="text-primary h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="mb-1 font-semibold">Main Office</h3>
                      <ExternalLink className="text-muted-foreground group-hover:text-primary h-3 w-3" />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      1/209/C4, Kural Vidhi, Jeyaram Nagar
                      <br />
                      Main Road, Aathipatti
                      <br />
                      Aruppukottai - 626 101, Tamil Nadu
                    </p>
                  </div>
                </a>

                {/* Phone Card */}
                <div
                  className="card-corporate animate-slide-up flex items-start gap-4 border border-gray-100  transition-colors hover:bg-amber-50"
                  style={{ animationDelay: "350ms" }}
                >
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <Phone className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">Phone & WhatsApp</h3>
                    <div className="text-muted-foreground text-sm">
                      <p>Primary: +91 6381451289</p>
                      <p>Alternate: +91 9345026323</p>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div
                  className="card-corporate animate-slide-up flex items-start gap-4 border border-gray-100  transition-colors hover:bg-amber-50"
                  style={{ animationDelay: "425ms" }}
                >
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <Mail className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">Email</h3>
                    <div className="text-muted-foreground text-sm break-all">
                      <p>
                        <span className="text-foreground font-medium">
                          Business:
                        </span>{" "}
                        dharvistahrplacementsolutions@gmail.com
                      </p>
                      <p className="mt-1">
                        <span className="text-foreground font-medium">
                          Candidate:
                        </span>{" "}
                        dharvistahr@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div
                className="animate-fade-in mt-8 "
                style={{ animationDelay: "500ms" }}
              >
                <h3 className="mb-4 font-semibold">Connect With Us</h3>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.linkedin.com/company/109600486/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md border border-amber-100 bg-amber-50 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-amber-100"
                  >
                    <Linkedin className="text-primary h-4 w-4" />
                    LinkedIn
                  </a>
                  <a
                    href="https://www.instagram.com/dharvistahr?igsh=eTQ2bXcyNGp5Zmp4&utm_source=ig_contact_invite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md border border-amber-100 bg-amber-50 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-amber-100"
                  >
                    <Instagram className="text-primary h-4 w-4" />
                    Instagram
                  </a>
                  <a
                    href="https://wa.me/916381451289"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md border border-amber-100 bg-amber-50 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-amber-100"
                  >
                    <MessageCircle className="text-primary h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div
                className="animate-fade-in mt-8 rounded-lg border border-amber-100 bg-amber-50 p-6 "
                style={{ animationDelay: "600ms" }}
              >
                <h3 className="mb-2 font-semibold text-gray-900">
                  Office Hours
                </h3>
                <p className="text-muted-foreground">
                  Monday - Saturday: 9:00 AM - 6:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>

              {/* Google Map */}
              <div
                className="animate-fade-in mt-8 h-75 overflow-hidden rounded-xl border border-amber-100  shadow-sm"
                style={{ animationDelay: "650ms" }}
              >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🟢 UPDATED: threshold={-1} forces it to show immediately */}
      <FloatingWhatsApp threshold={-1} />
    </Layout>
  );
}

"use client";

import React, { useState } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

import {
  Mail,
  Phone,
  MapPin,
  Smartphone,
  Facebook,
  Twitter,
  Instagram,
  ArrowRight,
  LucideIcon,
  Linkedin,
} from "lucide-react";

// --- Type Definitions ---

interface FormInputProps {
  type?: string;
  placeholder: string;
  label: string;
  name: string;
  required?: boolean;
}

interface InfoItemProps {
  Icon: LucideIcon;
  title: string;
  content: string;
  link: string;
}

// --- Component Definitions ---

// Mock Component for the Logo/Branding
const Logo: React.FC = () => (
  <div className="flex items-center space-x-2">
    <span className="text-xl font-bold tracking-widest text-white uppercase">
      Venture<span className="font-light text-gray-400"> LAB</span>
    </span>
  </div>
);

// Form Input Component for reusability
const FormInput: React.FC<FormInputProps> = ({
  type = "text",
  placeholder,
  label,
  name,
  required = false,
}) => (
  <div className="w-full mb-4">
    <label htmlFor={name} className="sr-only">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 text-sm text-gray-200 bg-black border border-gray-600 rounded-lg focus:ring-amber-500 focus:border-amber-500 placeholder-gray-400 transition duration-150"
    />
  </div>
);

// Contact Form Component
const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // Explicitly type the event handler
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("Sending...");

    // Mock API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage(
        "Thank you for contacting us! We will get back to you shortly."
      );
      (e.target as HTMLFormElement).reset();
    }, 2000);
  };

  return (
    <div className="p-8 bg-black">
      <h2 className="text-sm font-semibold tracking-wider text-amber-500 uppercase">
        Contact Us
      </h2>
      <h1 className="mt-1 text-4xl font-extrabold text-white">Get In Touch</h1>

      <form onSubmit={handleSubmit} className="mt-8">
        <FormInput
          label="Name"
          name="name"
          placeholder="Your Name..."
          required
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="example@yourmail.com"
          required
        />
        <FormInput label="Subject" name="subject" placeholder="Title..." />

        <div className="mb-4">
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Type Here..."
            rows={6}
            required
            className="w-full px-4 py-3 text-sm text-gray-200 bg-black border border-gray-600 rounded-lg focus:ring-amber-500 focus:border-amber-500 placeholder-gray-400 transition duration-150 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 text-base font-semibold text-gray-900 bg-amber-500 rounded-lg shadow-lg hover:bg-amber-400 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Now"}
        </button>
        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.startsWith("Thank you")
                ? "text-green-400"
                : "text-amber-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

// Contact Info Item Component
const InfoItem: React.FC<InfoItemProps> = ({ Icon, title, content, link }) => (
  <a
    href={link}
    className="flex items-start p-4 transition duration-300 transform rounded-lg hover:bg-gray-800 hover:scale-[1.02] active:scale-100"
  >
    <Icon className="w-6 h-6 mr-4 text-amber-500 shrink-0 mt-0.5" />
    <div>
      <h3 className="text-base font-semibold text-gray-300">{title}</h3>
      <p className="text-sm text-gray-400">{content}</p>
    </div>
  </a>
);

// Main Application Component
const App: React.FC = () => {
  // Utility for map placeholder
  const mapImageUrl: string ="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.9946538933773!2d77.06351547515897!3d28.719705775617317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d068dbf44ecd7%3A0xc4ce5551f8ac8360!2sMaharaja%20Agrasen%20Institute%20Of%20Technology(MAIT)!5e0!3m2!1sen!2sin!4v1763892261394!5m2!1sen!2sin";

  // Utility for contact placeholder
  const contactImageUrl: string =
    "https://i.pinimg.com/736x/7b/68/49/7b68493122d5fd7f7cddae6a85124cd3.jpg";

  // Utility for CTA background image
  const ctaImageUrl: string =
    "https://www.follol.com/wp-content/uploads/2018/11/HIRE-US-1-2-4.jpg";

  // Type definition for the image error event
  const handleImageError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src =
      "https://placehold.co/400x200/18181b/ffffff?text=Map+Unavailable";
  };

  return (
    <div className="min-h-screen font-sans bg-black-900 text-gray-100">
      {/* Main Content Header */}
      <header
        className="py-24 text-center relative py-24 mt-16 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${contactImageUrl})` }}
      >
        <h1 className="text-5xl font-extrabold text-white sm:text-6xl">
          Contact Us
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          We're ready to hear from you.
        </p>
      </header>

      {/* Main Contact Section */}
      <main className="container px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-1">
            <ContactForm />
          </div>

          {/*Contact Info & Map */}
          <div className="lg:col-span-2">
            {/* Introductory Text */}
            <p className="max-w-xl mb-12 text-gray-300 text-md">
              "Have an idea, question, or feedback? Reach out to us anytime —
              we’re always here to help. Let’s create something amazing
              together."
            </p>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <InfoItem
                Icon={Phone}
                title="Phone Number"
                content="+91 82877 84380"
                link="tel:+918287784380"
              />
              <InfoItem
                Icon={Mail}
                title="Email Address"
                content="kartik1909singh@gmail.com"
                link="kartik1909singh@gmail.com"
              />
              <InfoItem
                Icon={Smartphone}
                title="Whatsapp"
                content="+91 82877 84380"
                link="https://wa.me/8287784380"
              />
              <InfoItem
                Icon={MapPin}
                title="Our Office"
                content="PSP Area, Plot No. 1, Sector-22, Rohini, Delhi-110086"
                link="https://www.google.com/maps?q=Maharaja+Agrasen+Institute+of+Technology+Delhi"
              />
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 overflow-hidden rounded-xl shadow-lg border-4 border-black">
              <iframe
                title="Office Location Map"                
                src={mapImageUrl}
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </main>

      {/*(Hire Us Now) */}
      <section
        className="relative py-24 mt-16 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${ctaImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative z-10 text-center container mx-auto px-4">
          <h2 className="text-sm font-semibold tracking-widest text-white uppercase">
            Hire Us Now
          </h2>
          <h1 className="mt-4 text-5xl font-extrabold text-white sm:text-6xl max-w-4xl mx-auto leading-tight">
            We Are Always Ready To Take A Perfect Shot
          </h1>
          <button className="mt-8 flex items-center justify-center mx-auto space-x-2 px-8 py-3 text-base font-semibold text-gray-900 bg-amber-500 rounded-lg shadow-xl hover:bg-amber-400 transition duration-300 transform hover:scale-[1.03] active:scale-100">
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-950">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            {/* Logo & Social */}
            <div className="col-span-2 lg:col-span-2">
              <Logo />
              <p className="max-w-xs mt-4 text-sm text-gray-500">
                "We are the innovation engine, transforming disruptive ideas
                into viable, market-ready businesses. Partner with us to build
                the future of technology."
              </p>
              <div className="flex mt-4 space-x-3">
                <a
                  href="#"
                  className="p-2 transition duration-300 rounded-full text-gray-400 bg-gray-800 hover:text-amber-500 hover:bg-gray-700"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 transition duration-300 rounded-full text-gray-400 bg-gray-800 hover:text-amber-500 hover:bg-gray-700"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/startup_sphere/?__pwa=1"
                  className="p-2 transition duration-300 rounded-full text-gray-400 bg-gray-800 hover:text-amber-500 hover:bg-gray-700"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 transition duration-300 rounded-full text-gray-400 bg-gray-800 hover:text-amber-500 hover:bg-gray-700"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/*Our Store */}
            <div>
              <h4 className="text-lg font-semibold text-white">Our Store</h4>
              <ul className="mt-4 space-y-2 flex-col">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-amber-500"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-amber-500"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-amber-500"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-amber-500"
                  >
                    Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Get In Touch */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-lg font-semibold text-white">Get In Touch</h4>
              <ul className="mt-4 space-y-3 text-sm text-gray-400">
                <li className="flex items-start">
                  <MapPin className="shrink-0 w-5 h-5 mt-1 mr-3 text-amber-500" />
                  <span>Rohini Sector-22, Delhi-110086</span>
                </li>
                <li className="flex items-start">
                  <Phone className="shrink-0 w-5 h-5 mt-1 mr-3 text-amber-500" />
                  <span>+91 82877 84380</span>
                </li>
                <li className="flex items-start">
                  <Smartphone className="shrink-0 w-5 h-5 mt-1 mr-3 text-amber-500" />
                  <span>+91 82877 84380</span>
                </li>
                <li className="flex items-start">
                  <Mail className="flex w-5 h-5 mt-1 mr-3 text-amber-500" />
                  <span>kartik1909singh</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 mt-10 text-center border-t border-black">
            <p className="text-xs text-gray-500">
              Copyright © 2025 Venture Lab | Powered by Venture Lab
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

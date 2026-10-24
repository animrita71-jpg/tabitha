import { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

export default function Footer() {
  const [appointmentEmail, setAppointmentEmail] = useState('');
  const [appointmentTopic, setAppointmentTopic] = useState('Bridal Coral & Okuku Consultation');
  const [submitted, setSubmitted] = useState(false);

  const handleInquiry = (e) => {
    e.preventDefault();
    if (!appointmentEmail.trim()) return;
    setSubmitted(true);
    setAppointmentEmail('');
  };

  return (
    <footer id="contact" className="bg-[#08152B] text-slate-300 border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand & Nigerian Flagship Showroom */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#home" className="text-2xl font-bold tracking-tight text-white inline-block">
              Tabitha <span className="text-[#FF5A26]">Beads &amp; Accessories</span>
            </a>
            <p className="text-sm text-slate-300/90 leading-relaxed max-w-sm">
              Handcrafted Nigerian bridal coral sets, groom chieftaincy strands, crystal Aso-Ebi clutches, embellished Auto-Geles, and luxury waist beads.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <p>Lagos Studio: 24 Admiralty Way, Lekki Phase 1, Lagos, Nigeria</p>
              <p>Abuja Pickup Desk: Wuse II, Abuja · Mon – Sat, 9:30 AM – 6:30 PM</p>
              <p>Inquiries: hello@tabithabeads.ng · +234 (0) 809 555 0148</p>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-2.5">
              <h3 className="text-xs font-semibold text-white tracking-wide">Shop</h3>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#collection" className="hover:text-white transition-colors">Coral Beads &amp; Regalia</a></li>
                <li><a href="#collection" className="hover:text-white transition-colors">Bridal Fans &amp; Wigs</a></li>
                <li><a href="#collection" className="hover:text-white transition-colors">Ankara &amp; Dutch Wax</a></li>
                <li><a href="#collection" className="hover:text-white transition-colors">Traditional Attire</a></li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xs font-semibold text-white tracking-wide">Services</h3>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#bespoke" className="hover:text-white transition-colors">Custom Bridal Regalia</a></li>
                <li><a href="#bespoke" className="hover:text-white transition-colors">Aso-Ebi Squad Packages</a></li>
                <li><a href="#craftsmanship" className="hover:text-white transition-colors">Bead Restringing Care</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Diaspora DHL Shipping</a></li>
              </ul>
            </div>
          </div>

          {/* Bridal & Styling Consultation Form */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-white">Book a Bridal or Aso-Ebi Consultation</h3>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              Schedule a Lekki showroom visit or virtual colour-matching session for your upcoming traditional wedding.
            </p>

            {submitted ? (
              <div className="mt-4 p-3.5 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2.5 text-xs text-white">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B3D] shrink-0" aria-hidden="true" />
                <span>Consultation request received. Our Lagos bridal stylist will contact you today.</span>
              </div>
            ) : (
              <form onSubmit={handleInquiry} className="mt-4 space-y-2.5">
                <select
                  value={appointmentTopic}
                  onChange={(e) => setAppointmentTopic(e.target.value)}
                  aria-label="Consultation topic"
                  className="w-full h-10 px-3 text-xs bg-[#102344] border border-white/15 rounded-lg text-slate-200 focus:outline-none focus:border-white cursor-pointer"
                >
                  <option>Bridal Coral &amp; Okuku Consultation</option>
                  <option>Aso-Ebi Clutches &amp; Auto-Gele Bulk Order</option>
                  <option>Groom &amp; Chieftaincy Coral Sizing</option>
                </select>

                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={appointmentEmail}
                    onChange={(e) => setAppointmentEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Email address for bridal consultation"
                    className="flex-1 h-10 px-3 text-xs bg-[#102344] border border-white/15 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-white"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 h-10 bg-[#E04819] hover:bg-[#F25623] text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Quiet Copyright Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Tabitha Beads and Accessories. All rights reserved.</p>
          <p>Handcrafted in Lagos, Nigeria · Nationwide Dispatch &amp; Worldwide DHL Express</p>
        </div>
      </div>
    </footer>
  );
}

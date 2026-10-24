import { ArrowRight, Gem, Crown, ShieldCheck, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/catalog.js';
import ResilientImage from './ResilientImage.jsx';

const PILLARS = [
  {
    id: 'coral',
    icon: Gem,
    title: 'Authentic Natural Coral',
    tone: 'light',
  },
  {
    id: 'royalty',
    icon: Crown,
    title: 'Bridal & Groom Regalia',
    tone: 'light',
  },
  {
    id: 'durability',
    icon: ShieldCheck,
    title: 'Dutch Wax & Luxury Wigs',
    tone: 'accent',
  },
  {
    id: 'service',
    icon: Sparkles,
    title: 'Custom Beaded Hand Fans',
    tone: 'accent',
  },
];

export default function Hero() {
  return (
    <section id="home" className="bg-white">
      {/* Geometric Architectural Hero Banner */}
      <div className="relative overflow-hidden bg-[#0B1D3A] min-h-[560px] lg:min-h-[630px] flex items-stretch">
        <div className="absolute inset-0">
          <ResilientImage
            src={HERO_IMAGE}
            alt="Nigerian royal groom wearing hand-woven coral beaded cap, cylindrical coral necklace, beaded walking staff, and ceremonial attire"
            fallbackTitle="Tabitha Beads and Accessories"
            className="w-full h-full object-cover object-[center_22%]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#08162E]/95 via-[#0B1D3A]/60 to-[#08162E]/92"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#08152B]/85 via-transparent to-[#08152B]/35"
            aria-hidden="true"
          />
          <svg
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1440 640"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="0,0 530,0 385,640 0,640" fill="#0B1D3A" fillOpacity="0.65" />
            <polygon points="940,0 1440,0 1440,640 780,640" fill="#0B1D3A" fillOpacity="0.68" />
            <polygon points="870,640 1440,390 1440,640" fill="#E04819" />
            <polygon points="1025,520 1165,456 1212,482 1025,562" fill="#F25C2A" fillOpacity="0.55" />
          </svg>
        </div>

        {/* Main Hero Content Container */}
        <div className="relative z-10 max-w-[1280px] w-full mx-auto px-6 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <p className="text-sm md:text-base font-medium text-slate-200 tracking-wide max-w-md">
              Nigeria&rsquo;s Trusted Destination for Coral Beads, Bridal Fans, Wigs &amp; Wax Prints
            </p>

            <h1 className="text-[clamp(2.35rem,4.3vw,3.65rem)] font-bold leading-[1.07] tracking-tight text-white max-w-xl">
              Tabitha
              <span className="block text-[#FF5A26] mt-1">Beads &amp; Accessories</span>
            </h1>

            <p className="text-sm md:text-base text-slate-200/95 leading-relaxed max-w-[52ch]">
              Hand-strung Benin &amp; Igbo coral necklaces, beaded Okuku caps, personalized bridal fans, HD human hair wigs, traditional groom outfits, and authentic 6-yard Dutch &amp; Ankara wax fabrics.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#collection"
                className="group inline-flex items-center gap-3 pl-5 pr-2 py-2 min-h-[46px] bg-white text-[#0B1D3A] font-semibold text-sm rounded-full shadow-sm hover:bg-slate-100 transition-transform duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Shop Full Catalog</span>
                <span className="w-8 h-8 rounded-full bg-[#E04819] text-white flex items-center justify-center transition-transform duration-150 group-hover:translate-x-0.5">
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </a>

              <a
                href="#bespoke"
                className="inline-flex items-center justify-center px-5 py-2.5 min-h-[46px] text-sm font-semibold text-white border border-white/30 rounded-full hover:bg-white/10 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Custom Bridal Package
              </a>
            </div>
          </div>

          {/* Right Column: 2x2 Pillars + Bottom-Right Coral Wedge */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-10 lg:pl-8">
            <div className="grid grid-cols-2 gap-5 max-w-md lg:ml-auto pt-2">
              {PILLARS.map((pillar) => {
                const IconComponent = pillar.icon;
                const isAccent = pillar.tone === 'accent';
                return (
                  <div key={pillar.id} className="flex items-center gap-3.5">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                        isAccent
                          ? 'bg-[#E04819] text-white ring-4 ring-[#E04819]/25'
                          : 'bg-white text-[#0B1D3A] ring-4 ring-white/20'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-sm font-semibold text-white leading-snug tracking-wide">
                      {pillar.title}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="lg:ml-auto max-w-sm rounded-xl lg:rounded-none bg-[#E04819] lg:bg-transparent p-5 lg:p-0 lg:pt-14 text-white">
              <div className="w-10 h-0.5 bg-white/90 mb-3" aria-hidden="true" />
              <h2 className="text-lg font-bold tracking-tight text-white">
                Complete Traditional &amp; Owambe Styling
              </h2>
              <p className="mt-1.5 text-xs md:text-sm text-white/95 leading-relaxed">
                Everything for brides, grooms, chiefs, and Aso-Ebi guests under one roof—with nationwide and global delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Below-Hero Split Studio Intro & Quantitative Proof Strip */}
      <div id="craftsmanship" className="border-b border-slate-200/80 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold text-[#E04819] tracking-wider">
                Our Heritage &amp; Offerings
              </p>
              <h2 className="mt-1.5 text-2xl md:text-3xl font-bold text-[#0B1D3A] tracking-tight">
                Tabitha Beads &amp; Accessories
              </h2>
            </div>

            <div className="lg:col-span-7">
              <p className="text-base text-slate-600 leading-relaxed max-w-[68ch]">
                From caliper-verified natural cylindrical coral beads and hand-woven Okuku crowns to personalized floral bridal fans, HD human hair wigs, velvet Isiagu tunics, and guaranteed 6-yard Dutch &amp; Ankara wax prints, we outfit Nigerian royalty at home and abroad.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-200/75 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-2xl font-bold text-[#0B1D3A] tabular-nums">26+</p>
              <p className="mt-1 text-xs text-slate-500">Signature Coral, Wig &amp; Wax Designs in Stock</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0B1D3A] tabular-nums">2,300+</p>
              <p className="mt-1 text-xs text-slate-500">Brides, Grooms &amp; Chiefs Styled Since 2018</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0B1D3A] tabular-nums">36 States</p>
              <p className="mt-1 text-xs text-slate-500">Fast Nigerian Dispatch + UK, US &amp; Canada DHL</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0B1D3A] tabular-nums">100%</p>
              <p className="mt-1 text-xs text-slate-500">Authentic Coral Stones &amp; Colourfast Cotton Wax</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

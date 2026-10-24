import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Eye, Plus, Check } from 'lucide-react';
import { PRODUCTS } from '../data/catalog.js';
import { useCart } from '../context/CartContext.jsx';
import ResilientImage from './ResilientImage.jsx';

const HERO_LOOKBOOK = [
  {
    index: '01',
    shortLabel: 'Groom Regalia',
    productId: 'tb-02',
    objectPosition: 'object-[center_18%]',
    editorialCaption: 'Hand-loomed Eru-Ivie crown cap, barrel coral strand & ceremonial cane',
  },
  {
    index: '02',
    shortLabel: 'Bridal Fan',
    productId: 'tb-01',
    objectPosition: 'object-center',
    editorialCaption: 'Woven Aso-Oke hand fan with 3D burgundy blossoms & custom gold lettering',
  },
  {
    index: '03',
    shortLabel: 'Jumbo Coral',
    productId: 'tb-05',
    objectPosition: 'object-center',
    editorialCaption: 'Caliper-verified 20mm+ natural cylindrical coral stones for generational wear',
  },
  {
    index: '04',
    shortLabel: 'Okuku Caps',
    productId: 'tb-04',
    objectPosition: 'object-center',
    editorialCaption: 'Hand-knotted crimson & Olokun ivory coral cluster caps for royalty',
  },
];

const PROOF_METRICS = [
  {
    value: '26+',
    label: 'Signature Coral, Wig & Wax Designs Ready to Order',
  },
  {
    value: '2,300+',
    label: 'Nigerian Brides, Grooms & Titled Chiefs Styled Since 2018',
  },
  {
    value: '24–48h',
    label: 'Express Dispatch Across All 36 States + DHL Worldwide',
  },
  {
    value: '100%',
    label: 'Genuine High-Density Coral & Guaranteed 6-Yard Block Wax',
  },
];

export default function Hero({ onQuickView }) {
  const { addItem, formatPrice } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);
  const [justAddedId, setJustAddedId] = useState(null);

  const resolvedSlides = HERO_LOOKBOOK.map((entry) => ({
    ...entry,
    product: PRODUCTS.find((item) => item.id === entry.productId) || PRODUCTS[0],
  }));

  const currentSlide = resolvedSlides[activeIndex] || resolvedSlides[0];
  const activeProduct = currentSlide.product;
  const isAdded = justAddedId === activeProduct.id;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? resolvedSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === resolvedSlides.length - 1 ? 0 : prev + 1));
  };

  const handleHeroAddToCart = () => {
    addItem(activeProduct, activeProduct.variants[0], 1);
    setJustAddedId(activeProduct.id);
    window.setTimeout(() => {
      setJustAddedId((prev) => (prev === activeProduct.id ? null : prev));
    }, 1400);
  };

  return (
    <section id="home" className="bg-white border-b border-slate-200/80">
      {/* 2026 Architectural Split Hero */}
      <div className="max-w-[1280px] mx-auto px-6 pt-8 pb-12 lg:pt-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Narrative, Focal CTA & Interactive Lookbook Selector */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-6 lg:pr-4">
              {/* Balanced Display Headline */}
              <h1 className="text-[clamp(2.45rem,4.3vw,3.85rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#0B1D3A] max-w-xl">
                Tabitha
                <span className="block text-[#E04819] mt-1">Beads &amp; Accessories</span>
              </h1>

              {/* Concise Editorial Prose */}
              <p className="text-base text-slate-600 leading-relaxed max-w-[52ch]">
                Hand-strung Benin &amp; Igbo coral necklaces, beaded Okuku caps, personalized bridal fans, HD human hair wigs, traditional groom outfits, and authentic 6-yard Dutch &amp; Ankara wax fabrics.
              </p>

              {/* Single Dominant Primary CTA + Quiet Secondary Route */}
              <div className="pt-1 flex flex-wrap items-center gap-3.5">
                <a
                  href="#collection"
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[48px] bg-[#0B1D3A] hover:bg-[#142C54] text-white text-sm font-semibold rounded-xl transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E04819]"
                >
                  <span>Explore Full Catalog</span>
                  <ArrowRight
                    className="w-4 h-4 text-[#FF6B3D] transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="#bespoke"
                  className="inline-flex items-center justify-center px-5 py-3.5 min-h-[48px] bg-white hover:bg-slate-50 text-[#0B1D3A] text-sm font-semibold border border-slate-300 hover:border-[#0B1D3A] rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E04819]"
                >
                  Custom Bridal Styling
                </a>
              </div>
            </div>

            {/* Interactive Curated Edition Switcher */}
            <div className="mt-10 pt-7 border-t border-slate-200/80">
              <div className="flex items-center justify-between gap-4 mb-3.5">
                <span className="text-xs font-medium text-slate-500">
                  Featured Atelier Spotlight ({activeIndex + 1} / {resolvedSlides.length})
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="View previous featured piece"
                    className="w-9 h-9 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-[#0B1D3A] flex items-center justify-center transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E04819]"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="View next featured piece"
                    className="w-9 h-9 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-[#0B1D3A] flex items-center justify-center transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E04819]"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div
                role="tablist"
                aria-label="Featured 2026 lookbook pieces"
                className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-100/90 rounded-xl"
              >
                {resolvedSlides.map((slide, idx) => {
                  const selected = idx === activeIndex;
                  return (
                    <button
                      key={slide.productId}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveIndex(idx)}
                      className={`px-3 py-2.5 min-h-[40px] rounded-lg text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 truncate cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E04819] ${
                        selected
                          ? 'bg-white text-[#0B1D3A] shadow-xs'
                          : 'text-slate-600 hover:text-[#0B1D3A]'
                      }`}
                    >
                      {slide.index}. {slide.shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Full-Clarity Shoppable Editorial Lookbook Frame */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] lg:h-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 group">
              <ResilientImage
                key={activeProduct.id}
                src={activeProduct.image}
                alt={activeProduct.imageAlt}
                fallbackTitle={activeProduct.name}
                className={`w-full h-full object-cover ${currentSlide.objectPosition} transition-transform duration-200 group-hover:scale-[1.015]`}
              />

              {/* Measured Bottom Contrast Scrim for WCAG AA Legibility */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Contiguous Shoppable Overlay Footer */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                <div className="space-y-1.5 max-w-md">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-white/80">
                    <span>{activeProduct.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeProduct.availability}</span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                    {activeProduct.name}
                  </h2>

                  <p className="text-xs text-white/85 leading-relaxed line-clamp-2">
                    {currentSlide.editorialCaption}
                  </p>

                  <p className="pt-0.5 text-base font-bold text-[#FF7A52] tabular-nums">
                    {formatPrice(activeProduct.priceNgn)}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {onQuickView && (
                    <button
                      type="button"
                      onClick={() => onQuickView(activeProduct)}
                      aria-label={`Quick view ${activeProduct.name}`}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 min-h-[42px] rounded-lg bg-white/15 hover:bg-white/25 backdrop-blur-xs text-xs font-semibold text-white border border-white/25 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Inspect</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleHeroAddToCart}
                    className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[42px] rounded-lg text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#E04819] hover:bg-[#C93D12] text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Below-Hero Heritage & Quantitative Proof Bar */}
      <div id="craftsmanship" className="border-t border-slate-200/80 bg-[#FAFAFA]/70">
        <div className="max-w-[1280px] mx-auto px-6 py-8 lg:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 lg:divide-x lg:divide-slate-200/80">
            {PROOF_METRICS.map((metric, idx) => (
              <div key={metric.value} className={idx > 0 ? 'lg:pl-8' : ''}>
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1D3A] tabular-nums">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-snug">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { BESPOKE_OPTIONS, BESPOKE_FEATURE_IMAGE, CLIENT_TESTIMONIALS } from '../data/catalog.js';
import { useCart } from '../context/CartContext.jsx';

export default function BespokeSection() {
  const { addItem, openCart, formatPrice } = useCart();
  const [selectedSilhouette, setSelectedSilhouette] = useState(BESPOKE_OPTIONS.silhouettes[0]);
  const [selectedPalette, setSelectedPalette] = useState(BESPOKE_OPTIONS.palettes[0]);
  const [selectedFinish, setSelectedFinish] = useState(BESPOKE_OPTIONS.finishes[0]);
  const [clientNotes, setClientNotes] = useState('');
  const [bookingReceipt, setBookingReceipt] = useState(null);

  const estimatedTotalNgn = selectedSilhouette.basePriceNgn + selectedFinish.surchargeNgn;
  const depositAmountNgn = Math.round(estimatedTotalNgn * 0.5);

  const handleAddDeposit = () => {
    const noteSuffix = clientNotes.trim() ? ` · Note: ${clientNotes.trim()}` : '';
    addItem(
      {
        id: `bespoke-${selectedSilhouette.id}-${selectedPalette.id}-${selectedFinish.id}`,
        name: `Custom ${selectedSilhouette.label} (50% Deposit)`,
        category: 'coral-bridal',
        categoryLabel: 'Custom Bridal & Aso-Ebi',
        priceNgn: depositAmountNgn,
        image: BESPOKE_FEATURE_IMAGE,
        imageAlt: 'Tabitha Beads and Accessories custom personalized bridal fan and coral regalia commission',
      },
      `${selectedPalette.label} · ${selectedFinish.label}${noteSuffix}`,
      1
    );

    setBookingReceipt({
      ref: `TB-${Math.floor(1000 + Math.random() * 9000)}`,
      summary: `${selectedSilhouette.label} in ${selectedPalette.label}`,
      turnaround: selectedSilhouette.turnaround,
    });
    openCart();
  };

  return (
    <section id="bespoke" className="py-16 lg:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Traditional Wedding & Aso-Ebi Story + Testimonials */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div>
              <p className="text-xs font-semibold text-[#E04819] tracking-wider">
                Bespoke Bridal, Groom &amp; Aso-Ebi Commissions
              </p>
              <h2 className="mt-1.5 text-2xl md:text-4xl font-bold text-[#0B1D3A] tracking-tight">
                Personalized Bridal Fans, Okuku Crowns &amp; Squad Bundles
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Commission a personalized mirror-gold name bridal fan, full Benin or Igbo couple coral regalia, groomsmen coral sets, and coordinated 6-yard Ankara or Dutch wax Aso-Ebi bundles tailored to your wedding colours.
              </p>

              <dl className="mt-8 space-y-4 border-t border-slate-200/80 pt-6 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">01. Custom Name Bridal Fans</dt>
                  <dd className="font-medium text-[#0B1D3A] text-right">Gold acrylic name &amp; 3D floral beadwork</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">02. Bride, Groom &amp; Squad Sets</dt>
                  <dd className="font-medium text-[#0B1D3A] text-right">Matched coral caps, collars &amp; wax bundles</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">03. Nationwide &amp; Diaspora</dt>
                  <dd className="font-medium text-[#0B1D3A] text-right">36 Nigerian states &amp; 3–5 day DHL Express</dd>
                </div>
              </dl>
            </div>

            <div className="space-y-5 pt-4 border-t border-slate-200/80">
              {CLIENT_TESTIMONIALS.map((item) => (
                <figure key={item.id} className="p-5 rounded-xl bg-[#F8F7F4] border border-slate-200/70">
                  <blockquote className="text-xs md:text-sm text-slate-700 leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 flex items-center flex-wrap gap-1.5 text-xs text-slate-500">
                    <span className="font-semibold text-[#0B1D3A]">{item.author}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.role}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.organization}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Custom Bridal & Aso-Ebi Estimator */}
          <div className="lg:col-span-7 bg-[#0B1D3A] text-white rounded-2xl p-6 sm:p-10 flex flex-col justify-between">
            <div className="space-y-7">
              <div>
                <p className="text-xs font-semibold text-[#FF6B3D] tracking-wide">
                  Custom Bridal &amp; Chieftaincy Estimator
                </p>
                <h3 className="mt-1 text-xl sm:text-2xl font-bold text-white">
                  Build Your Custom Tabitha Beads Package
                </h3>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 tracking-wide mb-2.5">
                  1. Select Bridal, Groom, or Aso-Ebi Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {BESPOKE_OPTIONS.silhouettes.map((item) => {
                    const active = selectedSilhouette.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedSilhouette(item)}
                        className={`p-3.5 rounded-xl border text-left transition-colors duration-150 cursor-pointer ${
                          active
                            ? 'bg-white text-[#0B1D3A] border-white'
                            : 'bg-[#12284C] text-slate-200 border-white/15 hover:border-white/35'
                        }`}
                      >
                        <span className="block text-xs font-semibold leading-snug">{item.label}</span>
                        <span
                          className={`mt-1.5 block text-xs tabular-nums ${
                            active ? 'text-[#E04819] font-semibold' : 'text-slate-400'
                          }`}
                        >
                          From {formatPrice(item.basePriceNgn)} · {item.turnaround}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 tracking-wide mb-2.5">
                  2. Choose Coral &amp; Aso-Ebi Color Harmony
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {BESPOKE_OPTIONS.palettes.map((palette) => {
                    const active = selectedPalette.id === palette.id;
                    return (
                      <button
                        key={palette.id}
                        type="button"
                        onClick={() => setSelectedPalette(palette)}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-colors duration-150 cursor-pointer ${
                          active
                            ? 'bg-white text-[#0B1D3A] border-white'
                            : 'bg-[#12284C] text-slate-200 border-white/15 hover:border-white/35'
                        }`}
                      >
                        <span className="flex items-center -space-x-1.5 shrink-0" aria-hidden="true">
                          <span
                            className={`w-5 h-5 rounded-full border border-white/60 ${palette.swatchPrimaryClass}`}
                          />
                          <span
                            className={`w-5 h-5 rounded-full border border-white/60 ${palette.swatchAccentClass}`}
                          />
                        </span>
                        <span className="text-xs font-medium leading-snug">{palette.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 tracking-wide mb-2.5">
                  3. Select Clasp &amp; Custom Detailing
                </label>
                <div className="flex flex-wrap gap-2">
                  {BESPOKE_OPTIONS.finishes.map((finish) => {
                    const active = selectedFinish.id === finish.id;
                    return (
                      <button
                        key={finish.id}
                        type="button"
                        onClick={() => setSelectedFinish(finish)}
                        className={`px-3.5 py-2 min-h-[40px] rounded-lg border text-xs font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                          active
                            ? 'bg-[#E04819] text-white border-[#E04819]'
                            : 'bg-[#12284C] text-slate-200 border-white/15 hover:border-white/35'
                        }`}
                      >
                        {finish.label}{' '}
                        {finish.surchargeNgn > 0
                          ? `(+${formatPrice(finish.surchargeNgn)})`
                          : '(Included)'}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="bespoke-notes" className="block text-xs font-semibold text-slate-200 tracking-wide mb-2">
                  4. Bride Name for Fan, Wedding Date, or Sizing Notes (Optional)
                </label>
                <input
                  id="bespoke-notes"
                  type="text"
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="e.g., Name on fan: DAMILOLA, December Benin wedding, XL groom tunic..."
                  className="w-full h-11 px-3.5 text-sm bg-[#12284C] border border-white/20 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-300 block">
                    Estimated Package Total ({selectedSilhouette.turnaround} Studio Build)
                  </span>
                  <div className="flex flex-wrap items-baseline gap-2.5 mt-0.5">
                    <span className="text-2xl font-bold text-white tabular-nums">
                      {formatPrice(estimatedTotalNgn)}
                    </span>
                    <span className="text-xs text-[#FF855E] font-medium tabular-nums">
                      50% Booking Deposit: {formatPrice(depositAmountNgn)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddDeposit}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] bg-[#E04819] hover:bg-[#F25623] text-white text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  <span className="tabular-nums">
                    Add {formatPrice(depositAmountNgn)} Deposit to Cart
                  </span>
                </button>
              </div>

              {bookingReceipt && (
                <div className="mt-4 p-3.5 rounded-lg bg-white/10 border border-white/20 flex items-start gap-2.5 text-xs text-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-[#FF855E] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="font-semibold">Booking #{bookingReceipt.ref} added to your Cart:</span>{' '}
                    {bookingReceipt.summary} ({bookingReceipt.turnaround} build).
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Catalog', href: '#collection' },
  { label: 'Our Craft', href: '#craftsmanship' },
  { label: 'Custom Bridal', href: '#bespoke' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ activeSection, onSelectSection }) {
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-[1280px] mx-auto h-full px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={() => onSelectSection('home')}
          className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-[#0B1D3A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E04819]"
        >
          Tabitha <span className="text-[#E04819]">Beads &amp; Accessories</span>
        </a>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => onSelectSection(sectionId)}
                className={`relative py-1.5 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E04819] ${
                  isActive ? 'text-[#E04819] font-semibold' : 'hover:text-[#0B1D3A]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#E04819] transition-transform duration-150 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action reading live state from CartContext */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open shopping cart with ${itemCount} selected items`}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-xs font-semibold text-white bg-[#0B1D3A] hover:bg-[#142C54] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E04819]"
          >
            <ShoppingBag className="w-4 h-4 text-[#FF6B3D]" aria-hidden="true" />
            <span className="tabular-nums">Cart ({itemCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
}

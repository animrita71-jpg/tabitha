import { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import ResilientImage from './ResilientImage.jsx';

export default function ProductModal({ product, onClose }) {
  const { addItem, openCart, formatPrice } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product ? product.variants[0] : '');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const handlePurchase = () => {
    addItem(product, selectedVariant, quantity);
    onClose();
    openCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/65 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 text-slate-700 hover:text-[#0B1D3A] flex items-center justify-center border border-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Left Gallery */}
        <div className="md:col-span-6 bg-[#F3F1EC] flex flex-col justify-between">
          <div className="aspect-[4/3] md:aspect-auto md:h-full w-full overflow-hidden">
            <ResilientImage
              src={product.image}
              alt={product.imageAlt}
              fallbackTitle={product.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Right Contiguous Purchase Module */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500">
              <span>{product.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{product.availability}</span>
              <span aria-hidden="true">·</span>
              <span>{product.leadTime}</span>
            </div>

            <h2 id="pdp-modal-title" className="mt-2 text-2xl font-bold text-[#0B1D3A] tracking-tight">
              {product.name.trim()}
            </h2>

            <p className="mt-2 text-xl font-bold text-[#E04819] tabular-nums">
              {formatPrice(product.priceNgn)}
            </p>

            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-5 pt-4 border-t border-slate-200/80">
              <p className="text-xs font-semibold text-slate-700">Materials &amp; Specifications</p>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">{product.materials}</p>
            </div>

            <div className="mt-5">
              <label className="block text-xs font-semibold text-[#0B1D3A] mb-2">
                Select Option / Configuration
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => {
                  const active = selectedVariant === variant;
                  return (
                    <button
                      key={variant}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-3.5 py-2 min-h-[40px] text-xs font-medium rounded-lg border transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                        active
                          ? 'border-[#0B1D3A] bg-[#0B1D3A] text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {variant}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/80 space-y-4">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center border border-slate-200 rounded-lg h-11">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-full flex items-center justify-center text-slate-600 hover:text-[#0B1D3A] cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <span className="w-8 text-center text-sm font-semibold text-[#0B1D3A] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-10 h-full flex items-center justify-center text-slate-600 hover:text-[#0B1D3A] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                onClick={handlePurchase}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] bg-[#E04819] hover:bg-[#C93D12] text-white text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                <span className="tabular-nums">
                  Add to Cart · {formatPrice(product.priceNgn * quantity)}
                </span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#0B1D3A]" aria-hidden="true" />
                {product.leadTime}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0B1D3A]" aria-hidden="true" />
                Carefully packaged in Lagos with nationwide &amp; worldwide courier
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

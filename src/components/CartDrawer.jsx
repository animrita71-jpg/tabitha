import { useState } from 'react';
import { X, Minus, Plus, Trash2, ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import ResilientImage from './ResilientImage.jsx';

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    items,
    itemCount,
    subtotalNgn,
    discountNgn,
    shippingNgn,
    totalNgn,
    remainingForFreeShippingNgn,
    appliedPromo,
    promoError,
    applyPromo,
    updateQuantity,
    removeItem,
    clearCart,
    formatPrice,
  } = useCart();

  const [step, setStep] = useState('bag'); // 'bag' | 'checkout' | 'confirmed'
  const [promoInput, setPromoInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    cityState: 'Lekki Phase 1, Lagos',
  });
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    applyPromo(promoInput);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderNumber = `TB-${Math.floor(1040 + Math.random() * 8900)}`;
    setConfirmedOrder({
      orderNumber,
      customerName: customer.fullName,
      paymentMethod:
        paymentMethod === 'cod'
          ? 'Pay on Delivery (Lagos / Abuja Dispatch Rider)'
          : 'Card / Bank Transfer (Instant Verification)',
      totalFormatted: formatPrice(totalNgn),
      itemCount,
      address: `${customer.address}, ${customer.cityState}`,
    });
    clearCart();
    setStep('confirmed');
  };

  const handleCloseDrawer = () => {
    if (step === 'confirmed') {
      setStep('bag');
      setConfirmedOrder(null);
    }
    closeCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      onClick={handleCloseDrawer}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 id="cart-drawer-title" className="text-lg font-bold text-[#0B1D3A]">
              {step === 'bag' && `Shopping Cart (${itemCount})`}
              {step === 'checkout' && 'Tabitha Beads Checkout'}
              {step === 'confirmed' && 'Order Confirmation'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleCloseDrawer}
            aria-label="Close shopping cart"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-[#0B1D3A] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Step 3: Post-Order Confirmed State */}
        {step === 'confirmed' && confirmedOrder ? (
          <div className="p-6 flex-1 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-emerald-700">
                  Order #{confirmedOrder.orderNumber} Confirmed — Preparing Shipment
                </p>
                <h3 className="mt-1 text-xl font-bold text-[#0B1D3A]">
                  Thank you, {confirmedOrder.customerName}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Our Lagos bead artisans are inspecting your selections and packaging your order for express dispatch.
                </p>
              </div>

              <dl className="p-4 rounded-xl bg-[#F8F7F4] border border-slate-200/80 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Order Reference</dt>
                  <dd className="font-semibold text-[#0B1D3A] tabular-nums">#{confirmedOrder.orderNumber}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Items Purchased</dt>
                  <dd className="font-semibold text-[#0B1D3A] tabular-nums">{confirmedOrder.itemCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Payment Method</dt>
                  <dd className="font-semibold text-[#0B1D3A] text-right max-w-[200px]">
                    {confirmedOrder.paymentMethod}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Delivery Destination</dt>
                  <dd className="font-medium text-slate-700 text-right max-w-[200px]">{confirmedOrder.address}</dd>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm">
                  <dt className="font-semibold text-[#0B1D3A]">Total Verified</dt>
                  <dd className="font-bold text-[#E04819] tabular-nums">{confirmedOrder.totalFormatted}</dd>
                </div>
              </dl>
            </div>

            <button
              type="button"
              onClick={handleCloseDrawer}
              className="mt-6 w-full py-3 min-h-[44px] bg-[#0B1D3A] hover:bg-[#142C54] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Continue Shopping Tabitha Beads
            </button>
          </div>
        ) : items.length === 0 ? (
          /* Empty Cart State */
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-4">
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-base font-semibold text-[#0B1D3A]">Your shopping cart is empty</h3>
            <p className="mt-1.5 text-xs text-slate-500 max-w-xs leading-relaxed">
              Add coral bead sets, personalized bridal fans, HD wigs, traditional groom outfits, or 6-yard wax prints from the catalog.
            </p>
            <button
              type="button"
              onClick={handleCloseDrawer}
              className="mt-5 px-5 py-2.5 min-h-[40px] bg-[#0B1D3A] text-white text-xs font-semibold rounded-lg hover:bg-[#142C54] transition-colors cursor-pointer"
            >
              Browse Product Catalog
            </button>
          </div>
        ) : step === 'bag' ? (
          /* Step 1: Itemized Selections View */
          <>
            <div className="px-6 py-3 bg-[#F8F7F4] border-b border-slate-200/80 flex items-center justify-between gap-2 text-xs text-slate-700">
              {remainingForFreeShippingNgn > 0 ? (
                <span>
                  Add <strong className="font-semibold tabular-nums">{formatPrice(remainingForFreeShippingNgn)}</strong> more for free express delivery.
                </span>
              ) : (
                <span className="font-medium text-emerald-800">
                  Complimentary Insured Express Delivery unlocked.
                </span>
              )}

              <button
                type="button"
                onClick={clearCart}
                className="text-slate-500 hover:text-red-600 font-medium whitespace-nowrap shrink-0 cursor-pointer"
              >
                Clear All
              </button>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-200/75 px-6">
              {items.map((item) => (
                <div key={item.cartKey} className="py-4 flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F3F1EC] shrink-0">
                    <ResilientImage
                      src={item.image}
                      alt={item.imageAlt}
                      fallbackTitle={item.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-[#0B1D3A] leading-snug truncate">
                        {item.name.trim()}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeItem(item.cartKey)}
                        aria-label={`Remove ${item.name}`}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{item.variant}</p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-slate-200 rounded-md h-8">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-full flex items-center justify-center text-slate-600 hover:text-[#0B1D3A] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" aria-hidden="true" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-full flex items-center justify-center text-slate-600 hover:text-[#0B1D3A] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#0B1D3A] tabular-nums">
                        {formatPrice(item.priceNgn * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo + Subtotal Footer */}
            <div className="p-6 border-t border-slate-200 bg-[#FAFAFA] space-y-4">
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo code (try TABITHA10)"
                  aria-label="Promo code"
                  className="flex-1 h-10 px-3 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0B1D3A]"
                />
                <button
                  type="submit"
                  className="px-4 h-10 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {promoError && <p className="text-xs text-red-600">{promoError}</p>}
              {appliedPromo && (
                <p className="text-xs text-emerald-700 font-medium">
                  Code {appliedPromo} applied — 10% privilege deducted.
                </p>
              )}

              <dl className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="font-medium text-slate-900 tabular-nums">
                    {formatPrice(subtotalNgn)}
                  </dd>
                </div>
                {discountNgn > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <dt>Client Privilege (10%)</dt>
                    <dd className="tabular-nums">-{formatPrice(discountNgn)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt>Express Dispatch</dt>
                  <dd className="tabular-nums">
                    {shippingNgn === 0 ? 'Complimentary' : formatPrice(shippingNgn)}
                  </dd>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-[#0B1D3A]">
                  <dt>Total</dt>
                  <dd className="tabular-nums">{formatPrice(totalNgn)}</dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full inline-flex items-center justify-center gap-2 py-3 min-h-[44px] bg-[#E04819] hover:bg-[#C93D12] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </>
        ) : (
          /* Step 2: Delivery & Payment Verification Form */
          <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-6 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setStep('bag')}
                className="text-xs font-semibold text-slate-500 hover:text-[#0B1D3A] cursor-pointer"
              >
                &larr; Back to Selected Items
              </button>

              <div>
                <label className="block text-xs font-semibold text-[#0B1D3A] mb-2">
                  Select Payment Option
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paystack')}
                    className={`p-3 rounded-lg border text-xs font-semibold text-left cursor-pointer ${
                      paymentMethod === 'paystack'
                        ? 'border-[#0B1D3A] bg-[#0B1D3A] text-white'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    Card / Bank Transfer
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-lg border text-xs font-semibold text-left cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#0B1D3A] bg-[#0B1D3A] text-white'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    Pay on Delivery
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="chk-name" className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  id="chk-name"
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  placeholder="Chidinma Okafor"
                  className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0B1D3A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="chk-email" className="block text-xs font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    id="chk-email"
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    placeholder="chidinma@email.com"
                    className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0B1D3A]"
                  />
                </div>
                <div>
                  <label htmlFor="chk-phone" className="block text-xs font-medium text-slate-700 mb-1">
                    WhatsApp / Phone Number
                  </label>
                  <input
                    id="chk-phone"
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="+234 803 555 0192"
                    className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0B1D3A]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="chk-address" className="block text-xs font-medium text-slate-700 mb-1">
                  Street Delivery Address
                </label>
                <input
                  id="chk-address"
                  type="text"
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="14 Admiralty Way, Lekki Phase 1"
                  className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0B1D3A]"
                />
              </div>

              <div>
                <label htmlFor="chk-city" className="block text-xs font-medium text-slate-700 mb-1">
                  City, State / Country
                </label>
                <input
                  id="chk-city"
                  type="text"
                  required
                  value={customer.cityState}
                  onChange={(e) => setCustomer({ ...customer, cityState: e.target.value })}
                  placeholder="Lagos, Nigeria (or London, UK)"
                  className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0B1D3A]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex justify-between text-sm font-bold text-[#0B1D3A]">
                <span>Total Due {paymentMethod === 'cod' ? 'on Delivery' : 'Now'}</span>
                <span className="tabular-nums">{formatPrice(totalNgn)}</span>
              </div>
              <button
                type="submit"
                className="w-full py-3 min-h-[44px] bg-[#E04819] hover:bg-[#C93D12] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Confirm Order · {formatPrice(totalNgn)}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

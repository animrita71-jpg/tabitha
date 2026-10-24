import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Eye, Plus, Check, ShoppingBag } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/catalog.js';
import { useCart } from '../context/CartContext.jsx';
import ResilientImage from './ResilientImage.jsx';

export default function ProductCatalog({ onQuickView }) {
  const {
    currency,
    setCurrency,
    addItem,
    openCart,
    itemCount,
    subtotalNgn,
    formatPrice,
    getProductQuantity,
  } = useCart();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showAllItems, setShowAllItems] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.materials.toLowerCase().includes(query) ||
        product.categoryLabel.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.priceNgn - b.priceNgn);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.priceNgn - a.priceNgn);
    }
    return list;
  }, [activeCategory, searchQuery, sortBy]);

  const isDefaultAllView = activeCategory === 'all' && !searchQuery.trim() && sortBy === 'featured';
  const visibleProducts =
    isDefaultAllView && !showAllItems ? filteredProducts.slice(0, 12) : filteredProducts;

  const handleQuickAdd = (product) => {
    addItem(product, product.variants[0], 1);
    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === product.id ? null : prev));
    }, 1300);
  };

  const resetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section id="collection" className="py-16 lg:py-24 bg-[#FAFAFA]">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Heading + Currency Switcher & Active Cart Selection Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold text-[#E04819] tracking-wider">
              Tabitha Beads &amp; Accessories · {PRODUCTS.length} Authentic Pieces
            </p>
            <h2 className="mt-1.5 text-2xl md:text-4xl font-bold text-[#0B1D3A] tracking-tight">
              Coral Beads, Bridal Fans, Wigs &amp; Wax Fabrics
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center p-1 bg-slate-200/70 rounded-lg">
              {['NGN', 'USD'].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setCurrency(code)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    currency === code
                      ? 'bg-white text-[#0B1D3A] shadow-xs'
                      : 'text-slate-600 hover:text-[#0B1D3A]'
                  }`}
                >
                  {code === 'NGN' ? 'NGN (₦)' : 'USD ($)'}
                </button>
              ))}
            </div>

            {itemCount > 0 && (
              <button
                type="button"
                onClick={openCart}
                className="inline-flex items-center gap-2 px-4 py-2 min-h-[38px] text-xs font-semibold bg-[#E04819] hover:bg-[#C93D12] text-white rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="tabular-nums">
                  View Selections ({itemCount} · {formatPrice(subtotalNgn)})
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Interactive Filter, Search & Sort Toolbar */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-8 border-b border-slate-200/80">
          <div
            role="tablist"
            aria-label="Filter catalog by category"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/65 rounded-xl w-fit"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 min-h-[40px] text-xs font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E04819] ${
                    isSelected
                      ? 'bg-white text-[#0B1D3A] shadow-xs'
                      : 'text-slate-600 hover:text-[#0B1D3A]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coral, fan, wig, Ankara..."
                aria-label="Search catalog"
                className="w-full h-10 pl-9 pr-3 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B1D3A]"
              />
            </div>

            <div className="relative flex items-center">
              <SlidersHorizontal
                className="w-3.5 h-3.5 text-slate-500 absolute left-3 pointer-events-none"
                aria-hidden="true"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
                className="h-10 pl-8 pr-8 text-xs font-medium bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-[#0B1D3A] cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty Filter State */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white border border-slate-200/80 rounded-2xl mt-8 px-6">
            <h3 className="text-lg font-semibold text-[#0B1D3A]">No pieces match your search</h3>
            <p className="mt-1.5 text-sm text-slate-500 max-w-md mx-auto">
              Try searching for coral beads, Okuku cap, Isiagu, bridal hand fan, HD wig, or Dutch wax.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 px-5 py-2.5 min-h-[40px] text-xs font-semibold text-white bg-[#0B1D3A] hover:bg-[#142C54] rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* 3-Column Uniform 4:3 Product Grid */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleProducts.map((product) => {
                const isAdded = recentlyAddedId === product.id;
                const qtyInCart = getProductQuantity(product.id);

                return (
                  <article
                    key={product.id}
                    className="group bg-white border border-slate-200/85 rounded-2xl overflow-hidden flex flex-col transition-transform duration-150 hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-[4/3] w-full bg-[#F3F1EC] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => onQuickView(product)}
                        className="block w-full h-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#E04819]"
                        aria-label={`Inspect ${product.name}`}
                      >
                        <ResilientImage
                          src={product.image}
                          alt={product.imageAlt}
                          fallbackTitle={product.name}
                          className="w-full h-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.03]"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => onQuickView(product)}
                        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] bg-white/95 backdrop-blur-xs text-[#0B1D3A] text-xs font-semibold rounded-lg shadow-xs opacity-95 lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100 transition-opacity duration-150 cursor-pointer whitespace-nowrap"
                      >
                        <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Quick View</span>
                      </button>
                    </div>

                    {/* Card Body with Zero-Pill Unboxed Metadata */}
                    <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                      <div>
                        <div className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500">
                          <span>{product.categoryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span>{product.craftNote}</span>
                          {qtyInCart > 0 && (
                            <>
                              <span aria-hidden="true">·</span>
                              <button
                                type="button"
                                onClick={openCart}
                                className="text-[#E04819] font-semibold hover:underline cursor-pointer tabular-nums"
                              >
                                {qtyInCart} in Cart
                              </button>
                            </>
                          )}
                        </div>

                        <h3 className="mt-2 text-base font-semibold text-[#0B1D3A] leading-snug">
                          <button
                            type="button"
                            onClick={() => onQuickView(product)}
                            className="text-left hover:text-[#E04819] transition-colors duration-150 cursor-pointer"
                          >
                            {product.name.trim()}
                          </button>
                        </h3>

                        <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <span className="text-[15px] font-bold text-[#0B1D3A] tabular-nums">
                            {formatPrice(product.priceNgn)}
                          </span>
                          <span className="block text-[11px] text-slate-400 truncate">
                            {product.variants[0]}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleQuickAdd(product)}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] text-xs font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E04819] ${
                            isAdded
                              ? 'bg-emerald-700 text-white'
                              : 'bg-[#0B1D3A] text-white hover:bg-[#E04819]'
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
                  </article>
                );
              })}
            </div>

            {/* Expand / Collapse Full 26-Item Catalog Toggle */}
            {isDefaultAllView && filteredProducts.length > 12 && (
              <div className="mt-12 text-center">
                <button
                  type="button"
                  onClick={() => setShowAllItems((prev) => !prev)}
                  className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] text-sm font-semibold text-[#0B1D3A] bg-white border border-slate-300 hover:border-[#0B1D3A] rounded-xl transition-colors duration-150 whitespace-nowrap cursor-pointer"
                >
                  {showAllItems
                    ? 'Show Featured 12 Pieces'
                    : `View All ${filteredProducts.length} Catalog Pieces`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

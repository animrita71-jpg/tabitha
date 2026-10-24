import { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ProductCatalog from './components/ProductCatalog.jsx';
import BespokeSection from './components/BespokeSection.jsx';
import ProductModal from './components/ProductModal.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Footer from './components/Footer.jsx';

function StorefrontShell() {
  const { closeCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeCart]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#0F172A]">
      <Navbar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
      />

      <main className="flex-1">
        <Hero onQuickView={(product) => setSelectedProduct(product)} />

        <ProductCatalog onQuickView={(product) => setSelectedProduct(product)} />

        <BespokeSection />
      </main>

      <Footer />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <StorefrontShell />
    </CartProvider>
  );
}

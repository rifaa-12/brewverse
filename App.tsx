import React, { useState } from 'react';
import { CartItem, Product, ScreenType, Companion } from './types';
import { INITIAL_CART_ITEMS } from './data/mockData';
import { ThreeCoffeeScene } from './components/ThreeCoffeeScene';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { CustomizerModal } from './components/CustomizerModal';
import { RitualFilmModal } from './components/RitualFilmModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { CollectionView } from './views/CollectionView';
import { CartView } from './views/CartView';
import { ProductView } from './views/ProductView';
import { CheckoutView } from './views/CheckoutView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [customizerProduct, setCustomizerProduct] = useState<Product | null>(null);
  const [filmModalOpen, setFilmModalOpen] = useState(false);
  const [toast, setToast] = useState<{ title: string; desc: string } | null>(null);

  const showToast = (title: string, desc: string) => {
    setToast({ title, desc });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      showToast('Removed Allocation', `${item.name} removed from your tasting ritual.`);
    }
  };

  const handleQuickAdd = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name.includes(product.name));
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        name: product.name,
        subtitle: `${product.flavorNotes.split('•')[0].trim()} • Single Origin Extractions`,
        categoryTag: product.categoryLabel,
        price: product.price,
        quantity: 1,
        image: product.image,
        notes: product.flavorNotes,
      };
      return [...prev, newItem];
    });
    showToast(`Added ${product.name}`, `$${product.price.toFixed(2)} added to your tasting ritual.`);
  };

  const handleAddCompanion = (companion: Companion) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === companion.name);
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      const newItem: CartItem = {
        id: `comp-cart-${Date.now()}`,
        name: companion.name,
        subtitle: companion.description,
        categoryTag: companion.categoryTag,
        price: companion.price,
        quantity: 1,
        image: companion.image,
      };
      return [...prev, newItem];
    });
    showToast(
      `Companion Added`,
      `${companion.name} ($${companion.price.toFixed(2)}) integrated into brew ritual.`
    );
  };

  const handleConfirmCustomizedAdd = (customized: {
    product: Product;
    temp: string;
    milk: string;
    sweetness: string;
    shots: string;
    calculatedPrice: number;
  }) => {
    const newItem: CartItem = {
      id: `custom-${Date.now()}`,
      name: `${customized.product.name} (Bespoke)`,
      subtitle: `${customized.temp.split(' ')[0]} • ${customized.milk} • ${customized.shots}`,
      categoryTag: 'BESPOKE ATELIER CALIBRATION',
      price: customized.calculatedPrice,
      quantity: 1,
      image: customized.product.image,
      notes: `${customized.milk}, ${customized.sweetness}`,
    };
    setCartItems((prev) => [...prev, newItem]);
    showToast(
      'Bespoke Extraction Added',
      `${customized.product.name} configured with ${customized.milk} and ${customized.shots}.`
    );
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#0c0908] text-[#f6efe8] overflow-x-hidden selection:bg-[#d99b61] selection:text-[#0c0908]">
      {/* 3D Three.js Interactive Coffee Scene */}
      <ThreeCoffeeScene />

      {/* Ambient Cinematic Deep Vignette & Glow Background */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_65%_28%,_rgba(217,155,97,0.16)_0%,_rgba(140,74,30,0.06)_40%,_rgba(12,9,8,0.98)_85%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(229,184,105,0.08)_0%,_transparent_60%)]" />

      {/* Top Bar Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onToggleCartDrawer={() => setCartDrawerOpen(!cartDrawerOpen)}
      />

      {/* Main Content Area */}
      <main className="relative z-20 w-full pt-20">
        {currentScreen === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onQuickAdd={handleQuickAdd}
            onOpenCustomizer={(prod) => setCustomizerProduct(prod)}
            onOpenFilmModal={() => setFilmModalOpen(true)}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'collection' && (
          <CollectionView
            onNavigate={handleNavigate}
            onQuickAdd={handleQuickAdd}
            onOpenCustomizer={(prod) => setCustomizerProduct(prod)}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'cart' && (
          <CartView
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onAddCompanion={handleAddCompanion}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'product' && (
          <ProductView
            onAddToCart={(item) => {
              setCartItems((prev) => [
                ...prev,
                { ...item, id: `prod-add-${Date.now()}` },
              ]);
            }}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'checkout' && (
          <CheckoutView
            cartItems={cartItems}
            onClearCart={() => setCartItems([])}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Roastery Footer */}
      <Footer onNavigate={handleNavigate} onShowToast={showToast} />

      {/* Interactive Sliding Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => handleNavigate('checkout')}
        onViewFullCart={() => handleNavigate('cart')}
        onShowToast={showToast}
      />

      {/* Atelier Customizer Modal */}
      <CustomizerModal
        isOpen={!!customizerProduct}
        product={customizerProduct}
        onClose={() => setCustomizerProduct(null)}
        onConfirmAdd={handleConfirmCustomizedAdd}
      />

      {/* Extraction Philosophy Film Modal */}
      <RitualFilmModal
        isOpen={filmModalOpen}
        onClose={() => setFilmModalOpen(false)}
      />

      {/* Floating Toast Notification */}
      <Toast toast={toast} />
    </div>
  );
}

// src/App.jsx  — v2 Cinematic
import { useState, useEffect, useRef } from 'react';
import './styles/globals.css';

import Loader from './components/Loader/Loader.jsx';
import Nav from './components/Nav/Nav.jsx';
import CinematicHero from './components/CinematicHero/CinematicHero.jsx';
import Marquee from './components/Marquee/Marquee.jsx';
import Features from './components/Features/Features.jsx';
import Collection from './components/Collection/Collection.jsx';
import ParallaxText from './components/ParallaxText/ParallaxText.jsx';
import TechStats from './components/TechStats/TechStats.jsx';
import Story from './components/Story/Story.jsx';
import VideoImmersive from './components/VideoImmersive/VideoImmersive.jsx';
import Signup from './components/Signup/Signup.jsx';
import Footer from './components/Footer/Footer.jsx';

import Storefront from './components/Storefront/Storefront.jsx';
import LensModal from './components/LensModal/LensModal.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import QuickViewModal from './components/QuickViewModal/QuickViewModal.jsx';
// ... (skipping useGlobalReveal and useLenis imports for brevity, writing full file down)

function useGlobalReveal(active) {
  useEffect(() => {
    if (!active) return;
    const selectors = '.reveal,.reveal-left,.reveal-right,.reveal-scale';
    const attach = () => {
      const els = document.querySelectorAll(`${selectors}:not(.is-visible)`);
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
      els.forEach(el => obs.observe(el));
      return obs;
    };
    const obs = attach();
    const t = setTimeout(() => { obs.disconnect(); attach(); }, 600);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, [active]);
}

function useLenis(active) {
  useEffect(() => {
    if (!active) return;
    let lenis, raf;
    const init = async () => {
      try {
        const { default: Lenis } = await import('lenis');
        lenis = new Lenis({
          lerp: 0.07,
          duration: 1.2,
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.8,
        });
        window.__lenis = lenis;
        const animate = (time) => { lenis.raf(time); raf = requestAnimationFrame(animate); };
        raf = requestAnimationFrame(animate);
      } catch (e) {
        console.warn('Lenis not available, using native scroll');
      }
    };
    init();
    return () => { lenis?.destroy(); cancelAnimationFrame(raf); delete window.__lenis; };
  }, [active]);
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // E-commerce state
  const [currentView, setCurrentView] = useState('/'); // '/' or '/shop' or '/product' or '/wishlist'
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [isLensModalOpen, setIsLensModalOpen] = useState(false);
  
  const [viewedProduct, setViewedProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useLenis(loaded);
  useGlobalReveal(loaded);

  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', window.scrollY + 'px');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAddToCart = (item) => {
    setCartItems(prev => [...prev, item]);
    setCartCount(c => c + 1);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
    setCartCount(c => Math.max(0, c - 1));
  };

  const handleToggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  const handleNavigate = (id) => {
    if (id === 'home') {
      setCurrentView('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'collection') {
      setCurrentView('/shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'shop') {
      setCurrentView('/shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'wishlist') {
      setCurrentView('/wishlist');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (currentView !== '/') {
      setCurrentView('/');
      // wait for DOM to render the homepage views
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      {loaded && (
        <div id="app">
          <Nav cartCount={cartCount} cartItems={cartItems} onNavigate={handleNavigate} onRemoveFromCart={handleRemoveFromCart} wishlistCount={wishlist.length} />

          {currentView === '/' ? (
             <>
               <CinematicHero />
               <VideoImmersive />
               <Marquee />
               <Features />
               <Collection 
                 onAddToCart={handleAddToCart} 
                 onProductClick={(p) => { setViewedProduct(p); setCurrentView('/product'); }}
                 onQuickView={(p) => { setQuickViewProduct(p); setIsQuickViewOpen(true); }}
                 onViewAll={() => handleNavigate('shop')}
               />
               <ParallaxText />
               <TechStats />
               <Story />
               <Signup />
             </>
          ) : currentView === '/product' ? (
             <ProductDetails 
               product={viewedProduct}
               onBack={() => setCurrentView('/shop')}
               onAddToCart={handleAddToCart}
               onSelectLenses={(p) => { setActiveProduct(p); setIsLensModalOpen(true); }}
             />
          ) : currentView === '/wishlist' ? (
             <div style={{ padding:'150px 5vw', minHeight:'100vh', background:'var(--bg)', color:'var(--fg)' }}>
               <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2rem,4vw,4rem)', marginBottom:'40px' }}>Your Wishlist</h1>
               {wishlist.length === 0 ? (
                 <p style={{ color:'var(--fg-dim)', fontSize:'1.1rem' }}>Your wishlist is empty. Browse the collection and tap the heart icon to save items.</p>
               ) : (
                 <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'24px' }}>
                   {wishlist.map(p => (
                     <div key={p.id} style={{ background:'var(--bg-2)', border:'1px solid var(--border)', borderRadius:'12px', padding:'20px', cursor:'pointer' }} onClick={() => { setViewedProduct(p); setCurrentView('/product'); }}>
                       {p.image && <img src={p.image} alt={p.name} style={{ width:'100%', height:'200px', objectFit:'contain', marginBottom:'16px' }} />}
                       <h3 style={{ margin:'0 0 8px', fontSize:'1rem' }}>{p.name}</h3>
                       <div style={{ fontWeight:800, color:'#111', fontSize:'1.1rem' }}>{p.price}</div>
                       <button onClick={(e) => { e.stopPropagation(); handleToggleWishlist(p); }} style={{ marginTop:'12px', background:'none', border:'1px solid #ff3366', color:'#ff3366', padding:'8px 20px', borderRadius:'6px', cursor:'pointer', fontSize:'12px', fontWeight:600 }}>Remove</button>
                     </div>
                   ))}
                 </div>
               )}
             </div>
          ) : (
             <Storefront 
               onOpenLensModal={(p) => { setActiveProduct(p); setIsLensModalOpen(true); }} 
               onProductClick={(p) => { setViewedProduct(p); setCurrentView('/product'); }}
               onQuickView={(p) => { setQuickViewProduct(p); setIsQuickViewOpen(true); }}
               onAddToCart={handleAddToCart}
               wishlist={wishlist}
               onToggleWishlist={handleToggleWishlist}
             />
          )}

          <Footer />

          {/* Modal Overlays */}
          <LensModal 
             product={activeProduct}
             isOpen={isLensModalOpen}
             onClose={() => setIsLensModalOpen(false)}
             onAddToCart={handleAddToCart}
          />
          <QuickViewModal 
             product={quickViewProduct}
             isOpen={isQuickViewOpen}
             onClose={() => setIsQuickViewOpen(false)}
             onAddToCart={handleAddToCart}
             onSelectLenses={(p) => { setActiveProduct(p); setIsLensModalOpen(true); }}
          />
        </div>
      )}
    </>
  );
}

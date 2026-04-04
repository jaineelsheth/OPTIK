import { useState, useEffect, useMemo } from 'react';
import styles from './Storefront.module.css';
import { PRODUCTS } from '../../data/products.jsx';

export default function Storefront({ onOpenLensModal, onProductClick, onQuickView, onAddToCart, wishlist = [], onToggleWishlist }) {
  const [filter, setFilter] = useState('All');
  const [added, setAdded] = useState({});

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const isWishlisted = (id) => wishlist.some(p => p.id === id);

  const displayProducts = useMemo(() => PRODUCTS.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'Contact Lenses') return p.isContactLens;
    if (filter === 'Colour Lenses') return p.category === 'Colour Lenses';
    if (filter === 'Lenscare') return p.category === 'Lenscare';
    return p.category === filter;
  }), [filter]);

  const handleAdd = (e, product) => {
    e.stopPropagation();
    setAdded(prev => ({ ...prev, [product.id]: true }));
    onAddToCart({ ...product, qty: 1 });
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 1500);
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>The Collection</h1>
        <div className={styles.filters}>
          {['All', 'Contact Lenses', 'Colour Lenses', 'Toric', 'Multifocal', 'Lenscare'].map(f => (
            <button key={f} className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {displayProducts.map((p) => (
          <div key={p.id} className={styles.card} onClick={() => onProductClick(p)}>
            {/* Product image */}
            <div className={styles.visual}>
              {p.image ? (
                <img src={p.image} alt={p.name} className={styles.productImg} loading="lazy" onError={(e) => { e.target.style.display='none'; }} />
              ) : p.svg}
            </div>

            {/* Info below image — clean, visible layout */}
            <div className={styles.cardInfo}>
              <div className={styles.cardName}>{p.name}</div>
              <div className={styles.cardCategory}>{p.category}</div>
              <div className={styles.cardPrice}>{p.price}</div>

              {/* Color bar — only for products with colors */}
              {p.colors && p.colors.length > 0 && (
                <div className={styles.colorBar}>
                  {p.colors.map(c => (
                    <span key={c} className={styles.colorChip} title={c}>{c}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Hover overlay */}
            <div className={styles.overlay}>
              <div className={styles.actionsTop}>
                <button 
                  className={`${styles.iconBtn} ${isWishlisted(p.id) ? styles.favorited : ''}`} 
                  onClick={(e) => { e.stopPropagation(); if (onToggleWishlist) onToggleWishlist(p); }}
                  title={isWishlisted(p.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted(p.id) ? '#ff3366' : 'none'} stroke={isWishlisted(p.id) ? '#ff3366' : 'currentColor'} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                <button 
                  className={`${styles.iconBtn} ${added[p.id] ? styles.added : ''}`} 
                  onClick={(e) => handleAdd(e, p)}
                  title={added[p.id] ? "Added" : "Add to Bag"}
                >
                  {added[p.id] ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2ed573" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                  )}
                </button>
              </div>
              
              <button className={styles.buyBtn} onClick={(e) => { e.stopPropagation(); onOpenLensModal(p); }}>
                {p.isContactLens ? 'BUY NOW' : 'ADD TO BAG'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

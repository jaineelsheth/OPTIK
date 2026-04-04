// src/components/Collection/Collection.jsx
import { useState } from 'react';
import styles from './Collection.module.css';
import { PRODUCTS } from '../../data/products.jsx';

const FILTERS = ['All', 'Colour', 'Toric', 'Multifocal', 'Lenscare'];

export default function Collection({ onAddToCart, onProductClick, onQuickView, onViewAll }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [added, setAdded] = useState({});

  const filtered = activeFilter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p =>
      p.category === activeFilter ||
      (activeFilter === 'Colour' && p.category === 'Colour Lenses')
    );

  const handleAdd = (product) => {
    setAdded(a => ({ ...a, [product.id]: true }));
    onAddToCart({ ...product, qty: 1 });
    setTimeout(() => setAdded(a => ({ ...a, [product.id]: false })), 1600);
  };

  return (
    <section id="collection" className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <div className={styles.label}>
            <span className={styles.labelLine} />
            Collection
          </div>
          <h2 className={`${styles.title} reveal`}>
            Our<br /><em className={styles.em}>finest</em><br />eyewear
          </h2>
        </div>
        <div className={styles.headerRight}>
          {/* Filters */}
          <div className={styles.filters}>
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`${styles.filter} ${activeFilter === f ? styles.filterActive : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <a href="#shop" className={styles.viewAll} onClick={(e) => { e.preventDefault(); if (onViewAll) onViewAll(); }}>
            View all
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Products grid */}
      <div className={styles.grid}>
        {filtered.map((p, i) => (
          <ProductCard
            key={p.id}
            product={p}
            index={i}
            added={added[p.id]}
            onAdd={() => handleAdd(p)}
            onProductClick={() => onProductClick(p)}
            onQuickView={() => onQuickView(p)}
          />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, index, added, onAdd, onProductClick, onQuickView }) {
  const isHero = product.hero && index === 0;
  const delays = ['delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5'];

  return (
    <div
      className={`${styles.card} ${isHero ? styles.cardHero : ''} reveal ${delays[index % 5]}`}
      onClick={onProductClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Trust & Tag Badges */}
      <div className={styles.topBadges}>
        {product.tag && <div className={styles.badge}>{product.tag}</div>}
        <div className={styles.trustBadge}>✓ FREE DELIVERY</div>
      </div>

      {/* Visual */}
      <div className={styles.visual}>
        <div className={styles.visualInner}>
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className={styles.productImg}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400/0a0a12/1a56ff?text=BAUSCH+%2B+LOMB'; }} 
            />
          ) : (
            product.svg
          )}
        </div>

        {/* Social proof */}
        <div className={styles.urgency}>
          <span className={styles.pulseDot} />
          {((product.id.charCodeAt(product.id.length - 1) % 8) + 8)} people viewing this right now
        </div>

        {/* Hover overlay */}
        <div className={styles.overlay}>
          {product.review && (
            <div className={styles.customerReview}>
              <span className={styles.stars}>★★★★★</span>
              <p>"{product.review}"</p>
            </div>
          )}
          <button
            className={`${styles.overlayBtn} ${added ? styles.overlayBtnAdded : ''}`}
            onClick={(e) => { e.stopPropagation(); onAdd(); }}
          >
            {added ? '✓ ADDED' : 'ADD TO BAG'}
          </button>
          <button 
            className={styles.overlayQuickview}
            onClick={(e) => { e.stopPropagation(); onQuickView(); }}
          >DETAILS</button>
        </div>
      </div>

      {/* Info */}
      <div className={styles.info}>
        <div className={styles.infoLeft}>
          <div className={styles.name}>{product.name}</div>
          <div className={styles.type}>{product.type}</div>
        </div>
        <div className={styles.price}>{product.price}</div>
      </div>


    </div>
  );
}

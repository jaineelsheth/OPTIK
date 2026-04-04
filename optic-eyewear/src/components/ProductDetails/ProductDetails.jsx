import { useState, useEffect } from 'react';
import styles from './ProductDetails.module.css';

export default function ProductDetails({ product, onBack, onAddToCart, onSelectLenses }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImg(0);
    setSelectedColor(0);
  }, [product]);

  if (!product) return null;

  const colors = product.colors || [];
  const isContactLens = product.isContactLens;
  // Use images array if available, otherwise fall back to single image
  const images = product.images && product.images.length > 0 
    ? product.images 
    : product.image ? [product.image] : [];

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack}>
        &larr; Back to Shop
      </button>

      <div className={styles.grid}>
        {/* Image gallery */}
        <div className={styles.visualColumn}>
          <div className={styles.imageWrapper}>
            {images.length > 0 ? (
              <img 
                src={images[activeImg]} 
                alt={product.name} 
                style={{ width:'100%', height:'100%', objectFit:'contain', padding:'20px' }}
                onError={(e) => { e.target.style.opacity = '0.3'; }}
              />
            ) : product.svg}
          </div>
          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div style={{ display:'flex', gap:'10px', marginTop:'16px' }}>
              {images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImg(i)}
                  style={{
                    width:'72px', height:'72px', borderRadius:'8px', overflow:'hidden', cursor:'pointer',
                    border: activeImg === i ? '2px solid var(--blue, #0055ff)' : '2px solid var(--border)',
                    background:'var(--bg-2)', padding:'4px', transition:'border-color 0.2s'
                  }}
                >
                  <img src={img} alt={`${product.name} view ${i+1}`} style={{ width:'100%', height:'100%', objectFit:'contain' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.infoColumn}>
          <div className={styles.tag}>{product.tag || 'Classic'}</div>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.price}>
            {product.price}
            <span style={{ fontSize:'13px', color:'var(--fg-dim)', marginLeft:'12px', fontWeight:400 }}>MRP (incl. all taxes)</span>
          </div>
          
          <p className={styles.description}>{product.desc}</p>

          {/* Color options */}
          {colors.length > 0 && (
            <div style={{ marginBottom:'28px' }}>
              <h3 style={{ fontSize:'12px', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--fg-dim)', marginBottom:'12px' }}>Available Shades</h3>
              <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
                {colors.map((c, i) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(i)}
                    style={{
                      padding:'8px 16px', borderRadius:'20px', fontSize:'12px', fontWeight:600,
                      border: selectedColor === i ? '2px solid var(--blue, #0055ff)' : '1px solid var(--border)',
                      background: selectedColor === i ? 'rgba(0,85,255,0.1)' : 'transparent',
                      color:'var(--fg)', cursor:'pointer', transition:'all 0.2s'
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Review */}
          {product.review && (
            <div style={{ background:'var(--bg-2)', padding:'20px', borderRadius:'8px', marginBottom:'28px', borderLeft:'3px solid var(--blue, #0055ff)' }}>
              <div style={{ color:'#ffcc00', fontSize:'12px', letterSpacing:'2px', marginBottom:'6px' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p style={{ fontStyle:'italic', color:'var(--fg-dim)', fontSize:'14px', lineHeight:'1.6', margin:0 }}>"{product.review}"</p>
            </div>
          )}

          <div className={styles.features}>
            <h3>Product Details</h3>
            <ul>
              {isContactLens ? (
                <>
                  <li>Bausch + Lomb Certified</li>
                  <li>High Moisture Content</li>
                  <li>UV Protection</li>
                  <li>Easy Handling Tint</li>
                  <li>Free Delivery across India</li>
                </>
              ) : (
                <>
                  <li>Multi-purpose formula</li>
                  <li>Cleans, rinses & stores</li>
                  <li>Keeps lenses moist all day</li>
                  <li>Free Delivery across India</li>
                </>
              )}
            </ul>
          </div>

          <div className={styles.actions}>
            <button 
              className={styles.cartBtn} 
              onClick={() => onAddToCart({ ...product, qty: 1, selectedColor: colors[selectedColor] || null })}
            >
              Add to Bag — {product.price}
            </button>
            <button 
              className={styles.lensBtn} 
              onClick={() => onSelectLenses(product)}
            >
              {isContactLens ? 'Buy With Prescription' : 'Select Lenses'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

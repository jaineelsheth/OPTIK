import { useEffect, useState } from 'react';
import styles from './QuickViewModal.module.css';

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart, onSelectLenses }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // match animation duration
  };

  return (
    <div className={`${styles.backdrop} ${isVisible ? styles.visible : ''}`} onClick={handleClose}>
      <div className={`${styles.modal} ${isVisible ? styles.visible : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleClose}>&times;</button>
        
        <div className={styles.split}>
          <div className={styles.visual}>
            <div className={styles.imageWrapper}>
             {product.image ? (
               <img src={product.image} alt={product.name} style={{ width:'100%', height:'100%', objectFit:'contain', padding:'16px' }} onError={(e) => { e.target.style.display='none'; }} />
             ) : product.svg}
            </div>
          </div>
          
          <div className={styles.details}>
            <div className={styles.tag}>{product.tag || 'Classic'}</div>
            <h2 className={styles.title}>{product.name}</h2>
            <div className={styles.price}>{product.price}</div>
            <p className={styles.desc}>
              {product.desc || `Quick preview of the ${product.name}. A perfect blend of style and function.`}
            </p>
            
            <div className={styles.actions}>
              <button 
                className={styles.cartBtn} 
                onClick={() => {
                  onAddToCart({ ...product, qty: 1 });
                  handleClose();
                }}
              >
                Add to Cart
              </button>
              <button 
                className={styles.lensBtn} 
                onClick={() => {
                  handleClose();
                  // wait for close anim then open lenses
                  setTimeout(() => onSelectLenses(product), 300);
                }}
              >
                {product.isContactLens ? 'Buy With Prescription' : 'Select Lenses'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

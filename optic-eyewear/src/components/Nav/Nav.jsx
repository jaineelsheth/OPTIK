import { useState, useEffect } from 'react';
import styles from './Nav.module.css';

const LINKS = ['Collection', 'Technology', 'Story', 'Contact'];

export default function Nav({ cartCount, cartItems = [], onNavigate, onRemoveFromCart, wishlistCount = 0 }) {
  const displayCount = cartItems.length > 0 ? cartItems.reduce((acc, item) => acc + item.qty, 0) : cartCount;
  
  const cartTotal = cartItems.reduce((acc, item) => {
    const framePrice = parseFloat(item.price.replace(/[^0-9.-]+/g, '')) || 0;
    const lensPrice = item.lensPrice || 0;
    return acc + ((framePrice + lensPrice) * item.qty);
  }, 0);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [coupon, setCoupon] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <a href="/" className={styles.logo} onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('home'); }}>OPTIC</a>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {LINKS.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className={styles.link} onClick={(e) => { 
                e.preventDefault(); 
                setMenuOpen(false); 
                if (onNavigate) onNavigate(l.toLowerCase());
              }}>
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.right}>
          {/* Wishlist */}
          <button 
            onClick={() => { if (onNavigate) onNavigate('wishlist'); }}
            style={{ background:'none', border:'none', color:'inherit', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px', position:'relative' }}
            title="Wishlist"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            {wishlistCount > 0 && (
              <span style={{ position:'absolute', top:'-6px', right:'-8px', background:'#ff3366', color:'#fff', width:'16px', height:'16px', borderRadius:'50%', fontSize:'9px', fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center' }}>
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button 
            className={styles.cartBtn} 
            onClick={() => setCartOpen(true)} 
            style={{ background:'none', border:'none', color:'inherit', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px' }}
          >
            <span style={{ fontFamily:'var(--font-ui, sans-serif)', fontSize:'11px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase' }}>Bag</span>
            {displayCount > 0 && (
              <span style={{ background:'var(--blue, #0055ff)', color:'#fff', width:'18px', height:'18px', borderRadius:'50%', fontSize:'9px', fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center' }}>
                {displayCount}
              </span>
            )}
          </button>
          
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span />
          </button>
        </div>
      </nav>

      {/* Slide-out Cart Sidebar */}
      <div 
        style={{
          position:'fixed', top:0, right: cartOpen ? 0 : '-500px', width:'100%', maxWidth:'500px', height:'100vh', 
          backgroundColor:'var(--bg)', borderLeft:'1px solid var(--border)', zIndex:1000, display:'flex', flexDirection:'column',
          transition:'right 0.4s cubic-bezier(0.16,1,0.3,1)', color:'var(--fg)', boxShadow: cartOpen ? '-10px 0 50px rgba(0,0,0,0.5)' : 'none'
        }}
      >
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'30px', borderBottom:'1px solid var(--border)' }}>
          <h3 style={{ margin:0, fontFamily:'var(--font-ui, sans-serif)', fontSize:'1.25rem', fontWeight:600 }}>Your Bag ({displayCount})</h3>
          <button onClick={() => setCartOpen(false)} style={{ background:'none', border:'none', fontSize:'2rem', cursor:'pointer', color:'var(--fg-dim)' }}>&times;</button>
        </div>
        
        <div style={{ flex:1, padding:'30px', overflowY:'auto' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign:'center', color:'var(--fg-dim)', marginTop:'50%', fontFamily:'var(--font-ui)' }}>
              Your bag is empty. Browse the collection to add items.
            </div>
          ) : (
            <div>
              {cartItems.map((item, i) => {
                const framePrice = parseFloat(item.price.replace(/[^0-9.-]+/g, '')) || 0;
                const lensPrice = item.lensPrice || 0;
                return (
                  <div key={i} style={{ display:'flex', gap:'20px', marginBottom:'24px', paddingBottom:'24px', borderBottom:'1px solid var(--border)' }}>
                    <div style={{ width:'80px', height:'80px', background:'var(--bg-2)', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'10px', flexShrink:0 }}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'contain', padding:'8px' }} />
                      ) : (
                        <div style={{ transform:'scale(0.35)' }}>{item.svg}</div>
                      )}
                    </div>
                    <div style={{ flex:1, fontFamily:'var(--font-ui)' }}>
                      <h4 style={{ margin:'0 0 4px', fontSize:'0.95rem', fontWeight:600 }}>{item.name}</h4>
                      {item.lensConfig && (
                        <div style={{ fontSize:'11px', color:'var(--blue, #0055ff)', marginBottom:'4px' }}>{item.lensConfig}</div>
                      )}
                      {item.selectedColor && (
                        <div style={{ fontSize:'11px', color:'var(--fg-dim)', marginBottom:'4px' }}>Shade: {item.selectedColor}</div>
                      )}
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'8px' }}>
                        <span style={{ fontWeight:700, fontSize:'1rem' }}>{item.price}</span>
                        <button 
                          onClick={() => onRemoveFromCart(i)} 
                          style={{ background:'none', border:'none', color:'#ff3366', cursor:'pointer', fontSize:'12px', fontWeight:600, padding:'4px 8px' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div style={{ padding:'30px', borderTop:'1px solid var(--border)', background:'var(--bg-2)' }}>
            <div style={{ display:'flex', gap:'10px', marginBottom:'25px' }}>
              <input 
                type="text" placeholder="Discount code" value={coupon} onChange={(e) => setCoupon(e.target.value)}
                style={{ flex:1, padding:'14px 18px', border:'1px solid var(--border)', borderRadius:'6px', backgroundColor:'var(--bg)', color:'var(--fg)', fontFamily:'var(--font-ui)', fontSize:'14px', outline:'none' }}
              />
              <button style={{ background:'var(--bg-3)', color:'var(--fg)', border:'1px solid var(--border)', padding:'0 24px', borderRadius:'6px', cursor:'pointer', fontWeight:600 }}>Apply</button>
            </div>

            <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'var(--font-ui)', fontWeight:700, fontSize:'1.5rem', marginBottom:'25px' }}>
              <span>Total</span>
              <span>{'\u20B9'}{cartTotal.toLocaleString()}</span>
            </div>
            
            <button style={{ width:'100%', background:'var(--blue, #0055ff)', color:'#fff', border:'none', padding:'20px', fontFamily:'var(--font-ui)', fontSize:'15px', fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase', cursor:'pointer', borderRadius:'6px' }} onClick={() => alert('Proceeding to checkout...')}>
              Checkout Securely
            </button>
          </div>
        )}
      </div>

      {cartOpen && <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(5px)', zIndex:999 }} onClick={() => setCartOpen(false)} />}
    </>
  );
}

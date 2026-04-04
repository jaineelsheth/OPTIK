import { useState } from 'react';
import styles from './LensModal.module.css';

export default function LensModal({ product, isOpen, onClose, onAddToCart }) {
  const [step, setStep] = useState(0); 
  const [rx, setRx] = useState({
    rSph: '', rCyl: '', rAxis: '', rAdd: '',
    lSph: '', lCyl: '', lAxis: '', lAdd: '',
    pd: ''
  });

  if (!isOpen || !product) return null;

  const isContactLens = product.isContactLens;

  const resetAndClose = () => {
    onClose();
    setTimeout(() => { setStep(0); setRx({ rSph:'', rCyl:'', rAxis:'', rAdd:'', lSph:'', lCyl:'', lAxis:'', lAdd:'', pd:'' }); }, 400);
  };

  const handleNoPower = () => {
    onAddToCart({ ...product, lensConfig: isContactLens ? 'Zero Power (Plano)' : 'Frame Only (Zero Power)', lensPrice: 0, qty: 1 });
    resetAndClose();
  };

  const handleSubmitRx = (e) => {
    e.preventDefault();
    const config = isContactLens 
      ? `Power: R ${rx.rSph}/${rx.rCyl}x${rx.rAxis} | L ${rx.lSph}/${rx.lCyl}x${rx.lAxis}`
      : `Prescription Lens`;
    onAddToCart({ ...product, lensConfig: config, lensPrice: 0, qty: 1 });
    resetAndClose();
  };

  const handleRxChange = (field, value) => {
    setRx(prev => ({ ...prev, [field]: value }));
  };

  // --- CONTACT LENS FLOW ---
  if (isContactLens) {
    return (
      <div className={styles.backdrop} onClick={resetAndClose}>
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          <div className={styles.header}>
            <h2>{step === 0 ? 'How would you like to buy?' : 'Enter Your Prescription'}</h2>
            <button className={styles.closeBtn} onClick={resetAndClose}>&times;</button>
          </div>

          <div className={styles.content}>
            {/* Product preview */}
            <div style={{ textAlign:'center', padding:'16px 0 24px', borderBottom:'1px solid var(--border)', marginBottom:'24px' }}>
              {product.image && <img src={product.image} alt={product.name} style={{ height:'80px', objectFit:'contain', marginBottom:'12px' }}/>}
              <div style={{ fontWeight:700, fontSize:'1.1rem' }}>{product.name}</div>
              <div style={{ color:'var(--fg-dim)', fontSize:'0.9rem' }}>{product.price}</div>
            </div>

            {step === 0 && (
              <div className={styles.choiceGrid}>
                <div className={styles.choiceCard} onClick={() => setStep(1)}>
                  <div className={styles.choiceIcon}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--blue, #0055ff)" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7z"/></svg>
                  </div>
                  <h3>Buy With Power</h3>
                  <p>I have a prescription and need powered contact lenses.</p>
                </div>
                <div className={styles.choiceCard} onClick={handleNoPower}>
                  <div className={styles.choiceIcon}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--blue, #0055ff)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </div>
                  <h3>Buy Without Power</h3>
                  <p>I want cosmetic / zero-power lenses only.</p>
                </div>
              </div>
            )}

            {step === 1 && (
              <form onSubmit={handleSubmitRx}>
                <div className={styles.rxGrid}>
                  <div className={styles.rxRowTitle}>Right Eye (O.D.)</div>
                  <div className={styles.rxInputGroup}>
                    <label>SPHERICAL (SPH)</label>
                    <input type="text" placeholder="-2.00" value={rx.rSph} onChange={e => handleRxChange('rSph', e.target.value)} required />
                  </div>
                  <div className={styles.rxInputGroup}>
                    <label>CYLINDER (CYL)</label>
                    <input type="text" placeholder="-0.75" value={rx.rCyl} onChange={e => handleRxChange('rCyl', e.target.value)} />
                  </div>
                  <div className={styles.rxInputGroup}>
                    <label>AXIS</label>
                    <input type="text" placeholder="180" value={rx.rAxis} onChange={e => handleRxChange('rAxis', e.target.value)} />
                  </div>

                  <div className={styles.rxRowTitle}>Left Eye (O.S.)</div>
                  <div className={styles.rxInputGroup}>
                    <label>SPHERICAL (SPH)</label>
                    <input type="text" placeholder="-1.75" value={rx.lSph} onChange={e => handleRxChange('lSph', e.target.value)} required />
                  </div>
                  <div className={styles.rxInputGroup}>
                    <label>CYLINDER (CYL)</label>
                    <input type="text" placeholder="-0.50" value={rx.lCyl} onChange={e => handleRxChange('lCyl', e.target.value)} />
                  </div>
                  <div className={styles.rxInputGroup}>
                    <label>AXIS</label>
                    <input type="text" placeholder="90" value={rx.lAxis} onChange={e => handleRxChange('lAxis', e.target.value)} />
                  </div>
                </div>

                <button type="submit" className={styles.checkoutBtn}>
                  CONFIRM & ADD TO BAG
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- GLASSES / FRAMES FLOW (original) ---
  return (
    <div className={styles.backdrop} onClick={resetAndClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{step === 0 ? 'Select Lens Type' : step === 1 ? 'Choose Lens Package' : 'Enter Prescription'}</h2>
          <button className={styles.closeBtn} onClick={resetAndClose}>&times;</button>
        </div>
        <div className={styles.content}>
          {step === 0 && (
            <div>
              <p style={{textAlign:'center', color:'var(--fg-dim)', fontSize:'1.1rem'}}>Frame: {product.name} — {product.price}</p>
              <div className={styles.choiceGrid}>
                <div className={styles.choiceCard} onClick={() => setStep(1)}>
                  <div className={styles.choiceIcon}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--blue, #0055ff)" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7z"/></svg>
                  </div>
                  <h3>Buy With Power Lenses</h3>
                  <p>Upload prescription for Single Vision, Bifocal, or Progressive lenses.</p>
                </div>
                <div className={styles.choiceCard} onClick={handleNoPower}>
                  <div className={styles.choiceIcon}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--blue, #0055ff)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/></svg>
                  </div>
                  <h3>Buy Without Power</h3>
                  <p>I only need the frames for fashion / blue light filtering.</p>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <p style={{textAlign:'center', color:'var(--fg-dim)', marginBottom:'24px'}}>Select a lens package, then enter your prescription.</p>
              <div className={styles.packageGrid}>
                {[
                  { id:'ar', name:'Standard Anti-Reflect', price:500, features:['Scratch Resistant','Anti Reflective'] },
                  { id:'blue', name:'Blue Tech +', price:990, features:['Scratch Resistant','Anti Reflective','Blue Light Filter','Dust Repellent'] },
                  { id:'zeiss', name:'ZEISS DuraVision', price:2500, features:['Scratch Resistant','Anti Reflective','Blue Light Filter','Water Repellent','100% UV','High Clarity'] },
                ].map(pkg => (
                  <div key={pkg.id} className={styles.pkgCard}>
                    <div className={styles.pkgName}>{pkg.name}</div>
                    <div className={styles.pkgPrice}>₹{pkg.price}</div>
                    <ul className={styles.pkgFeatures}>
                      {pkg.features.map(f => <li key={f}><span>✓</span> {f}</li>)}
                    </ul>
                    <button className={styles.pkgBtn} onClick={() => { setStep(2); }}>Select</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmitRx}>
              <div className={styles.rxGrid}>
                <div className={styles.rxRowTitle}>Right Eye (O.D.)</div>
                <div className={styles.rxInputGroup}><label>SPH</label><input type="text" placeholder="+0.00" required /></div>
                <div className={styles.rxInputGroup}><label>CYL</label><input type="text" placeholder="0.00" /></div>
                <div className={styles.rxInputGroup}><label>AXIS</label><input type="text" placeholder="0" /></div>
                <div className={styles.rxInputGroup}><label>ADD</label><input type="text" placeholder="+0.00" /></div>
                <div className={styles.rxRowTitle}>Left Eye (O.S.)</div>
                <div className={styles.rxInputGroup}><label>SPH</label><input type="text" placeholder="+0.00" required /></div>
                <div className={styles.rxInputGroup}><label>CYL</label><input type="text" placeholder="0.00" /></div>
                <div className={styles.rxInputGroup}><label>AXIS</label><input type="text" placeholder="0" /></div>
                <div className={styles.rxInputGroup}><label>PD</label><input type="text" placeholder="63.0" required /></div>
              </div>
              <button type="submit" className={styles.checkoutBtn}>CONFIRM & ADD TO BAG</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

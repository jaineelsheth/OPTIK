// src/components/Signup/Signup.jsx
import { useState } from 'react';
import styles from './Signup.module.css';

export default function Signup() {
  const [email, setEmail]   = useState('');
  const [done,  setDone]    = useState(false);
  const [error, setError]   = useState('');

  const handleSubmit = () => {
    if (!email.includes('@')) { setError('Please enter a valid email.'); return; }
    setDone(true);
    setEmail('');
    setError('');
  };

  return (
    <section id="contact" className={styles.section}>
      {/* Ghost background word */}
      <div className={styles.bgWord} aria-hidden>ŌPTIC</div>

      {/* Ripple rings decoration */}
      <div className={styles.rippleGroup}>
        <span /><span /><span />
      </div>

      <div className={styles.content}>
        <div className={`${styles.eyebrow} reveal`}>Join the Vision</div>

        <h2 className={`${styles.title} reveal delay-1`}>
          Get <em className={styles.em}>15% off</em><br />your first order
        </h2>

        <p className={`${styles.sub} reveal delay-2`}>
          Early access, restocks, and exclusive drops — for vision-first people.
        </p>

        {done ? (
          <div className={`${styles.success} reveal`}>
            <span className={styles.successIcon}>✓</span>
            You're in. Welcome to ŌPTIC.
          </div>
        ) : (
          <div className={`${styles.form} reveal delay-3`}>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="your@email.com"
              className={styles.input}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button className={styles.submitBtn} onClick={handleSubmit}>
              <span>Subscribe</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <p className={`${styles.note} reveal delay-4`}>
          No spam. Unsubscribe anytime. Only vision-worthy updates.
        </p>

        {/* Trust pills */}
        <div className={`${styles.trustRow} reveal delay-5`}>
          {['Free Shipping', '30-Day Returns', 'Optician Approved', 'UV Certified'].map((t) => (
            <div key={t} className={styles.trustPill}>
              <span className={styles.trustDot} />
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

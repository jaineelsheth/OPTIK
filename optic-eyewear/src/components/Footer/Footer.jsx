// src/components/Footer/Footer.jsx
import styles from './Footer.module.css';

const FOOTER_COLS = [
  {
    title: 'Shop',
    links: ['Contact Lenses', 'Blue Light Glasses', 'Sunglasses', 'Accessories', 'Bundles'],
  },
  {
    title: 'Help',
    links: ['How to Order', 'Prescription Guide', 'Shipping Policy', 'Returns', 'FAQ'],
  },
  {
    title: 'Company',
    links: ['About ŌPTIC', 'Our Technology', 'Sustainability', 'Press', 'Careers'],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Main grid */}
      <div className={styles.top}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>ŌPTIC®</div>
          <p className={styles.tagline}>
            Premium contact lenses and eyewear crafted for those who refuse to
            compromise on clarity.
          </p>
          <div className={styles.socials}>
            {['Instagram', 'TikTok', 'Pinterest', 'YouTube'].map((s) => (
              <a key={s} href="#" className={styles.social}>{s}</a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_COLS.map((col) => (
          <div key={col.title} className={styles.col}>
            <h4 className={styles.colTitle}>{col.title}</h4>
            <ul className={styles.colList}>
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className={styles.colLink}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <span className={styles.copy}>©ŌPTIC 2026. All rights reserved.</span>
        <div className={styles.legal}>
          {['Privacy Policy', 'Terms of Service', 'Shipping', 'Refunds'].map((l) => (
            <a key={l} href="#" className={styles.legalLink}>{l}</a>
          ))}
        </div>
      </div>

      {/* Giant "SEE BEYOND" at very bottom */}
      <div className={styles.bigWord} aria-hidden>SEE BEYOND</div>
    </footer>
  );
}

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './VideoImmersive.module.css';
import bgVideo from '../../assets/hero-bg.mp4';
import eyeSrc from '../../assets/eye_iris.png';

gsap.registerPlugin(ScrollTrigger);

export default function VideoImmersive() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx = gsap.context(() => {
      // Parallax effect on the grid panels
      const panels = gridRef.current.children;
      
      gsap.fromTo(panels,
        { y: 150, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          }
        }
      );

      // Individual slow subtle parallax on the media inside panels
      const mediaElements = section.querySelectorAll('.parallax-media');
      mediaElements.forEach((media, i) => {
        gsap.fromTo(media, 
          { y: '-10%' },
          {
            y: '10%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            }
          }
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <div className={styles.logoRow}>
          <div className={styles.ticketPattern}>////////////////////////////////////////</div>
          <div className={styles.logoCenter}>
            <h1>ŌPTIC<br/><span>POWER</span></h1>
            <div className={styles.origin}>↓ THE ORIGIN</div>
          </div>
          <button className={styles.btn}>JOIN WAITLIST →</button>
        </div>
      </div>

      <div ref={gridRef} className={styles.grid}>
        
        {/* Top Left: Eye */}
        <div className={`${styles.panel} ${styles.panelEye}`}>
          <img src={eyeSrc} alt="Eye" className={`parallax-media ${styles.media}`} />
          <div className={styles.label}>TIKTOK</div>
        </div>

        {/* Top Right: Video */}
        <div className={`${styles.panel} ${styles.panelVideo}`}>
          <video src={bgVideo} autoPlay loop muted playsInline className={`parallax-media ${styles.media}`} />
          <div className={styles.label}>INSTAGRAM</div>
        </div>

        {/* Bottom Left: Video 1 */}
        <div className={`${styles.panel} ${styles.panelBotLeft}`}>
          <iframe 
            src="https://www.youtube.com/embed/Y0PWLZE4Pkc?autoplay=1&mute=1&loop=1&playlist=Y0PWLZE4Pkc&controls=0&showinfo=0&rel=0"
            className={`parallax-media ${styles.media}`}
            allow="autoplay; encrypted-media"
            frameBorder="0"
            style={{ pointerEvents: 'none' }}
          />
        </div>

        {/* Bottom Mid: Video 2 */}
        <div className={`${styles.panel} ${styles.panelBotMid}`}>
          <iframe 
            src="https://www.youtube.com/embed/-01-XBHXFq8?autoplay=1&mute=1&loop=1&playlist=-01-XBHXFq8&controls=0&showinfo=0&rel=0"
            className={`parallax-media ${styles.media}`}
            allow="autoplay; encrypted-media"
            frameBorder="0"
            style={{ pointerEvents: 'none' }}
          />
        </div>

        {/* Bottom Right: Video 3 */}
        <div className={`${styles.panel} ${styles.panelBotRight}`}>
          <iframe 
            src="https://www.youtube.com/embed/1CDaAk9VIFA?autoplay=1&mute=1&loop=1&playlist=1CDaAk9VIFA&controls=0&showinfo=0&rel=0"
            className={`parallax-media ${styles.media}`}
            allow="autoplay; encrypted-media"
            frameBorder="0"
            style={{ pointerEvents: 'none' }}
          />
        </div>

      </div>
    </section>
  );
}

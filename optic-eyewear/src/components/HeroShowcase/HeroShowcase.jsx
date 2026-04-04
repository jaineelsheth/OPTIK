import { useEffect, useRef } from 'react';
import styles from './HeroShowcase.module.css';

import lensImg from '../../assets/product-lens.png';
import sunImg from '../../assets/product-sunglasses.png';
import eyeImg from '../../assets/product-eyeglasses.png';

const PRODUCTS = [
  {
    id: 'lenses',
    label: 'CONTACT LENSES',
    title: 'HYDRACORE\nLENSES',
    desc: 'A daily act of power. Fast-acting hydration crafted for those who demand peak performance from their eyes from sunrise to midnight.',
    img: lensImg,
    bgClass: styles.bgLenses
  },
  {
    id: 'sun',
    label: 'SUNGLASSES',
    title: 'AEROSPACE\nSUN SHIELDS',
    desc: 'Uncompromising protection. Aerospace-grade frames meeting absolute UV defense for the modern outdoors. Stay radiant in the sun.',
    img: sunImg,
    bgClass: styles.bgSun
  },
  {
    id: 'eye',
    label: 'EYEGLASSES',
    title: 'RADICAL\nCLARITY',
    desc: 'Timeless design, radical clarity. Anti-reflective lenses set in ultra-lightweight magnesium alloy structures supporting your daily focus.',
    img: eyeImg,
    bgClass: styles.bgEye
  }
];

export default function HeroShowcase() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  
  const imgsRef = useRef([]);
  const titlesLeftRef = useRef([]);
  const descsRightRef = useRef([]);
  const bgRef = useRef(null);
  const navPillsRef = useRef([]);
  const textBg1Ref = useRef(null);
  const textBg2Ref = useRef(null);

  useEffect(() => {
    let gsapInstance, ScrollTriggerInstance;

    const initGSAP = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsapInstance = gsap;
        ScrollTriggerInstance = ScrollTrigger;

        const section = sectionRef.current;
        if (!section) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=400%',
            pin: true,
            scrub: 1,
            fastScrollEnd: true,
            onUpdate: (self) => {
              const progress = self.progress;
              let activeIndex = 0;
              if (progress > 0.3) activeIndex = 1;
              if (progress > 0.6) activeIndex = 2;
              
              containerRef.current.setAttribute('data-active', activeIndex);
              
              navPillsRef.current.forEach((pill, i) => {
                if (pill) {
                  if (i === activeIndex) pill.classList.add(styles.activePill);
                  else pill.classList.remove(styles.activePill);
                }
              });
            }
          }
        });

        // Setup initial states
        gsap.set(titlesLeftRef.current.slice(1), { opacity: 0, y: 50 });
        gsap.set(descsRightRef.current.slice(1), { opacity: 0, y: 30 });
        gsap.set(imgsRef.current.slice(1), { opacity: 0, scale: 0.9, y: 20 });
        
        // Massive background text parallax
        tl.to(textBg1Ref.current, { x: '-20%', duration: 6 }, 0)
          .to(textBg2Ref.current, { x: '10%', duration: 6 }, 0);

        // Transition 0 -> 1 (Lenses -> Sunglasses)
        tl.to(titlesLeftRef.current[0], { opacity: 0, y: -50, duration: 1 }, 1)
          .to(descsRightRef.current[0], { opacity: 0, y: -30, duration: 1 }, 1)
          .to(imgsRef.current[0], { opacity: 0, scale: 1.1, y: -20, duration: 1 }, 1)
          
          .to(titlesLeftRef.current[1], { opacity: 1, y: 0, duration: 1 }, 2)
          .to(descsRightRef.current[1], { opacity: 1, y: 0, duration: 1 }, 2)
          .to(imgsRef.current[1], { opacity: 1, scale: 1, y: 0, duration: 1 }, 2)
          
          .to({}, { duration: 1 }); // Hold

        // Transition 1 -> 2 (Sunglasses -> Eyeglasses)
        tl.to(titlesLeftRef.current[1], { opacity: 0, y: -50, duration: 1 }, 4)
          .to(descsRightRef.current[1], { opacity: 0, y: -30, duration: 1 }, 4)
          .to(imgsRef.current[1], { opacity: 0, scale: 1.1, y: -20, duration: 1 }, 4)

          .to(titlesLeftRef.current[2], { opacity: 1, y: 0, duration: 1 }, 5)
          .to(descsRightRef.current[2], { opacity: 1, y: 0, duration: 1 }, 5)
          .to(imgsRef.current[2], { opacity: 1, scale: 1, y: 0, duration: 1 }, 5)
          
          .to({}, { duration: 1 }); // Hold

      } catch (e) {
        console.warn('GSAP not loaded:', e.message);
      }
    };

    initGSAP();

    return () => {
      if (ScrollTriggerInstance) ScrollTriggerInstance.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={containerRef} className={styles.container} data-active="0">
        
        {/* Animated Background Layers */}
        <div ref={bgRef} className={styles.bgLayers}>
          <div className={`${styles.bgLayer} ${styles.bgLenses}`} />
          <div className={`${styles.bgLayer} ${styles.bgSun}`} />
          <div className={`${styles.bgLayer} ${styles.bgEye}`} />
          
          {/* MASSIVE TYPOGRAPHY BACKGROUND */}
          <div className={styles.massiveTextWrap}>
            <div className={styles.massiveTextWrapper} ref={textBg1Ref}>
              VISION BEYOND ORDINARY STATE OF ART
            </div>
            <div className={styles.massiveTextWrapper} ref={textBg2Ref} style={{ transform: 'translateX(-10%)' }}>
              VISION BEYOND ORDINARY STATE OF ART
            </div>
          </div>

          <div className={styles.noise} />
        </div>

        {/* Top Navigation Pattern */}
        <div className={styles.header}>
          <div className={styles.heroSub}>↓ HERO PRODUCTS</div>
          <div className={styles.navPillContainer}>
            {PRODUCTS.map((prod, i) => (
              <div 
                key={prod.id} 
                className={`${styles.navPill} ${i === 0 ? styles.activePill : ''}`}
                ref={el => navPillsRef.current[i] = el}
              >
                {prod.label}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Areas */}
        <div className={styles.contentWrap}>
          {PRODUCTS.map((prod, i) => (
            <div key={prod.id} className={styles.productSlide}>
              
              <div className={styles.titleCol} ref={el => titlesLeftRef.current[i] = el}>
                <div className={styles.titleAccent}>ŌPTIC</div>
                <h2 className={styles.titleText}>
                  {prod.title.split('\n').map((line, idx) => (
                    <span key={idx} className={idx === 0 ? styles.titleRegular : styles.titleBold}>
                      {line}<br />
                    </span>
                  ))}
                </h2>
              </div>

              <div className={styles.imageCol}>
                <div className={styles.productImgWrap} ref={el => imgsRef.current[i] = el}>
                  <img src={prod.img} alt={prod.title} className={styles.productImg} draggable={false} />
                </div>
              </div>

              <div className={styles.descCol} ref={el => descsRightRef.current[i] = el}>
                <div className={styles.descCounter}>0{i + 1} / 03</div>
                <p className={styles.descText}>{prod.desc}</p>
              </div>

            </div>
          ))}
        </div>

        <div className={styles.footerText}>
          PROVIDES UNPARALLELED CLARITY, STRENGTH, <br />
          AND PROTECTION FOR THE MODERN HUMAN
        </div>

      </div>
    </section>
  );
}

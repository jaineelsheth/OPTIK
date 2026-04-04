// src/components/Cursor/Cursor.jsx
import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const rafRef  = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top  = e.clientY + 'px';
      }
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top  = ring.current.y + 'px';
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    // Expand on hover
    const onEnter = () => {
      dotRef.current?.classList.add(styles.expanded);
      ringRef.current?.classList.add(styles.ringHide);
    };
    const onLeave = () => {
      dotRef.current?.classList.remove(styles.expanded);
      ringRef.current?.classList.remove(styles.ringHide);
    };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a,button').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </>
  );
}

/* Prevent Chrome from visually pulling the page past its true top boundary.
   Ordinary downward scrolling, keyboard navigation and anchor links are unchanged. */
(() => {
  'use strict';

  const scroller = () => {
    const body = document.body;
    if (body && body.scrollHeight > body.clientHeight) return body;
    return document.scrollingElement || document.documentElement;
  };

  const atTop = () => {
    const el = scroller();
    return (el.scrollTop || window.scrollY || 0) <= 0;
  };

  window.addEventListener('wheel', (event) => {
    if (event.deltaY < 0 && atTop()) event.preventDefault();
  }, { passive: false, capture: true });

  let touchY = null;
  window.addEventListener('touchstart', (event) => {
    touchY = event.touches.length ? event.touches[0].clientY : null;
  }, { passive: true, capture: true });

  window.addEventListener('touchmove', (event) => {
    if (touchY === null || !event.touches.length) return;
    const nextY = event.touches[0].clientY;
    const pullingDown = nextY > touchY;
    touchY = nextY;
    if (pullingDown && atTop()) event.preventDefault();
  }, { passive: false, capture: true });

  window.addEventListener('touchend', () => { touchY = null; }, { passive: true });
  window.addEventListener('touchcancel', () => { touchY = null; }, { passive: true });
})();

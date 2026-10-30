import { useEffect } from 'react';

let programmaticRaf = null;
let syncPositionCallback = null;

/**
 * EaseInOutCubic function matching prime.bharatesevakendra.com
 */
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Programmatic smooth scroll to a target Y position with cubic easing
 * @param {number} targetY - Target scroll position in pixels
 * @param {number} [customDuration] - Optional duration in ms
 */
export function smoothScrollTo(targetY, customDuration) {
  if (typeof window === 'undefined') return;

  if (programmaticRaf) {
    cancelAnimationFrame(programmaticRaf);
    programmaticRaf = null;
  }

  const startY = window.scrollY;
  const maxScroll = Math.max(
    0,
    Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    ) - window.innerHeight
  );

  const clampedTarget = Math.max(0, Math.min(targetY, maxScroll));
  const diff = clampedTarget - startY;

  if (Math.abs(diff) < 2) return;

  const duration =
    customDuration ||
    Math.min(950, Math.max(500, Math.sqrt(Math.abs(diff)) * 16));
  const startTime = performance.now();

  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const eased = easeInOutCubic(progress);
    const current = startY + diff * eased;

    window.scrollTo({ top: current, behavior: 'instant' });
    if (syncPositionCallback) syncPositionCallback(current);

    if (progress < 1) {
      programmaticRaf = requestAnimationFrame(step);
    } else {
      window.scrollTo({ top: clampedTarget, behavior: 'instant' });
      if (syncPositionCallback) syncPositionCallback(clampedTarget);
      programmaticRaf = null;
    }
  };

  programmaticRaf = requestAnimationFrame(step);
}

/**
 * Smoothly scroll to any target element or selector
 * @param {string|HTMLElement} target - Element or selector (e.g. '#work', '#book')
 * @param {number} [offsetPadding=20] - Top offset padding in pixels
 */
export function scrollToElement(target, offsetPadding = 20) {
  if (typeof window === 'undefined') return;

  const el =
    typeof target === 'string'
      ? document.getElementById(target.replace(/^#/, '')) ||
        document.querySelector(target)
      : target;

  if (!el) return;

  const rect = el.getBoundingClientRect();
  const targetPos = rect.top + window.scrollY - offsetPadding;
  smoothScrollTo(Math.max(0, targetPos));
}

/**
 * useSmoothScroll Hook
 * Implements the signature momentum-lerp wheel and keyboard smooth scrolling
 * exactly matching prime.bharatesevakendra.com.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let wheelRaf = null;
    let isRunning = false;

    const clamp = (val, min, max) => Math.max(min, Math.min(val, max));

    const getMaxScroll = () => {
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
      return Math.max(0, scrollHeight - window.innerHeight);
    };

    const stopWheelAnimation = () => {
      if (wheelRaf) {
        cancelAnimationFrame(wheelRaf);
        wheelRaf = null;
      }
      isRunning = false;
    };

    syncPositionCallback = (pos) => {
      currentY = pos;
      targetY = pos;
    };

    const stopProgrammatic = () => {
      if (programmaticRaf) {
        cancelAnimationFrame(programmaticRaf);
        programmaticRaf = null;
      }
    };

    // RAF loop with exact lerp coefficient (0.082) from prime.bharatesevakendra.com
    const updateScroll = () => {
      const diff = targetY - currentY;
      if (Math.abs(diff) > 0.5) {
        currentY += diff * 0.082;
        window.scrollTo({
          top: Math.round(currentY * 10) / 10,
          behavior: 'instant',
        });
        wheelRaf = requestAnimationFrame(updateScroll);
      } else {
        currentY = targetY;
        window.scrollTo({
          top: currentY,
          behavior: 'instant',
        });
        stopWheelAnimation();
      }
    };

    const startWheelAnimation = () => {
      stopProgrammatic();
      if (!isRunning) {
        isRunning = true;
        wheelRaf = requestAnimationFrame(updateScroll);
      }
    };

    const isEditable = (el) => {
      if (!el) return false;
      const tag = el.tagName ? el.tagName.toLowerCase() : '';
      return (
        tag === 'input' ||
        tag === 'textarea' ||
        tag === 'select' ||
        el.isContentEditable
      );
    };

    const isInsideScrollable = (el, deltaY) => {
      let node = el;
      while (node && node !== document.body && node !== document.documentElement) {
        const overflowY = window.getComputedStyle(node).overflowY;
        if (
          (overflowY === 'auto' || overflowY === 'scroll') &&
          node.scrollHeight > node.clientHeight
        ) {
          const canScrollDown =
            deltaY > 0 && node.scrollTop + node.clientHeight < node.scrollHeight - 1;
          const canScrollUp = deltaY < 0 && node.scrollTop > 1;
          if (canScrollDown || canScrollUp) return true;
        }
        node = node.parentElement;
      }
      return false;
    };

    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey || isInsideScrollable(e.target, e.deltaY)) {
        return;
      }
      e.preventDefault();

      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        delta *= 36;
      } else if (e.deltaMode === 2) {
        delta *= window.innerHeight;
      }

      // If user reverses scroll direction while animating, reset target immediately
      if ((delta > 0 && targetY < currentY) || (delta < 0 && targetY > currentY)) {
        targetY = currentY;
      }

      const maxScroll = getMaxScroll();
      targetY = clamp(targetY + delta, 0, maxScroll);
      startWheelAnimation();
    };

    const handleKeyDown = (e) => {
      if (isEditable(document.activeElement) || e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      let delta = 0;
      const pageStep = window.innerHeight * 0.85;

      switch (e.key) {
        case 'ArrowDown':
          delta = 95;
          break;
        case 'ArrowUp':
          delta = -95;
          break;
        case 'PageDown':
          delta = pageStep;
          break;
        case 'PageUp':
          delta = -pageStep;
          break;
        case ' ':
          delta = e.shiftKey ? -pageStep : pageStep;
          break;
        case 'Home':
          e.preventDefault();
          smoothScrollTo(0);
          return;
        case 'End':
          e.preventDefault();
          smoothScrollTo(getMaxScroll());
          return;
        default:
          return;
      }

      if (delta !== 0) {
        e.preventDefault();
        const maxScroll = getMaxScroll();
        targetY = clamp(targetY + delta, 0, maxScroll);
        startWheelAnimation();
      }
    };

    const handleNativeScroll = () => {
      if (!programmaticRaf) {
        if (isRunning) {
          if (Math.abs(window.scrollY - currentY) > 60) {
            currentY = window.scrollY;
            targetY = window.scrollY;
            stopWheelAnimation();
          }
        } else {
          currentY = window.scrollY;
          targetY = window.scrollY;
        }
      }
    };

    const handleTouchStart = () => {
      stopProgrammatic();
      stopWheelAnimation();
      currentY = window.scrollY;
      targetY = window.scrollY;
    };

    const handleResize = () => {
      currentY = window.scrollY;
      targetY = window.scrollY;
      stopWheelAnimation();
      stopProgrammatic();
    };

    // Smooth scroll interceptor for in-page anchor links (#work, #about, #book)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.startsWith('#work-')) return;

      const targetEl =
        document.getElementById(href.replace(/^#/, '')) ||
        document.querySelector(href);

      if (targetEl) {
        e.preventDefault();
        scrollToElement(targetEl);
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', href);
        }
      }
    };

    window.__smoothScrollTo = smoothScrollTo;
    window.__scrollToElement = scrollToElement;

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('click', handleAnchorClick);

    return () => {
      stopWheelAnimation();
      stopProgrammatic();
      syncPositionCallback = null;
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleNativeScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
}

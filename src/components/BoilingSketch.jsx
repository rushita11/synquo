import { useState, useEffect, useRef, useMemo } from 'react';
import rough from 'roughjs';

/**
 * Generates multiple sketchy, hand-drawn double-loop ellipse frames using roughjs.
 * Matches the animation technique used on atulkhola.com (7 FPS line-boil).
 */
function createRoughEllipseFrames({
  width,
  height,
  padX,
  padY,
  widthOffset = 0,
  heightOffset = 0,
  seed = 1,
  frameCount = 3,
  color = '#FFE100',
  strokeWidth = 2.6,
  roughness = 1.45,
  bowing = 1.15,
}) {
  const extraW = Math.max(0, widthOffset);
  const extraH = Math.max(0, heightOffset);
  const totalW = Math.max(1, Math.round(width + padX * 2 + extraW));
  const totalH = Math.max(1, Math.round(height + padY * 2 + extraH));
  const cx = totalW / 2;
  const cy = totalH / 2;
  const rx = Math.max(1, width + padX * 1.3 + widthOffset);
  const ry = Math.max(1, height + padY * 1.35 + heightOffset);

  const gen = rough.generator();
  const frames = [];

  for (let i = 0; i < frameCount; i++) {
    // Unique seed per frame for natural organic hand-drawn variation
    const frameSeed = (seed + i * 7919) % 2147483647;
    const shape = gen.ellipse(cx, cy, rx, ry, {
      seed: frameSeed,
      roughness,
      bowing,
      stroke: color,
      strokeWidth,
      curveFitting: 0.95,
      curveTightness: 0,
      disableMultiStroke: false, // creates authentic double-loop sketch
    });

    const paths = gen.toPaths(shape);
    const d = paths.map((p) => p.d).join(' ');

    frames.push({
      d,
      width: totalW,
      height: totalH,
      padX: padX + Math.round(extraW / 2),
      padY: padY + Math.round(extraH / 2),
    });
  }

  return frames;
}

/**
 * BoilingSketch Component
 * Draws an authentic hand-drawn circle/loop around target text, exactly matching
 * the reference at https://www.atulkhola.com/:
 * 1. Smooth stroke draw-on when entering viewport (via stroke-dashoffset)
 * 2. Continuous 7 FPS "line boil" (cycling hand-drawn rough variations)
 * 3. Subtle floating micro-wobble for natural physics feel
 */
export default function BoilingSketch({
  children,
  inView = true,
  delay = 0,
  duration = 480,
  fps = 7,
  color = '#FFE100',
  strokeWidth = 2.6,
  seed = 42,
  paddingX,
  paddingY,
  widthOffset = 0,
  heightOffset = 0,
  className = '',
}) {
  const textRef = useRef(null);
  const pathRef = useRef(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [activeFrame, setActiveFrame] = useState(0);
  const [strokeLength, setStrokeLength] = useState(600);
  const [isDrawn, setIsDrawn] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  // Calculate dynamic padding based on text dimensions
  const padX = paddingX ?? Math.max(14, Math.round((dimensions.width || 80) * 0.16));
  const padY = paddingY ?? Math.max(8, Math.round((dimensions.height || 36) * 0.28));

  // Measure text element on mount & observe resizing
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
      }
    };

    measure();

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });
    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Pre-generate 3 hand-drawn sketch variations (frames) with roughjs
  const frames = useMemo(() => {
    const w = dimensions.width || 80;
    const h = dimensions.height || 36;
    return createRoughEllipseFrames({
      width: w,
      height: h,
      padX,
      padY,
      widthOffset,
      heightOffset,
      seed,
      frameCount: 3,
      color,
      strokeWidth,
    });
  }, [dimensions.width, dimensions.height, padX, padY, widthOffset, heightOffset, seed, color, strokeWidth]);

  // Measure path length for stroke-dashoffset animation
  useEffect(() => {
    if (pathRef.current) {
      try {
        const len = Math.ceil(pathRef.current.getTotalLength()) || 600;
        setStrokeLength(len);
      } catch {
        setStrokeLength(600);
      }
    }
  }, [frames]);

  // Handle draw-in animation trigger
  useEffect(() => {
    if (!inView || isDrawn) return;

    const startTimer = setTimeout(() => {
      setIsDrawing(true);
    }, delay);

    const completeTimer = setTimeout(() => {
      setIsDrawn(true);
    }, delay + duration + 30);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(completeTimer);
    };
  }, [inView, delay, duration, isDrawn]);

  // Continuous "Line Boil" animation at reference FPS (7 FPS)
  useEffect(() => {
    if (!isDrawn) return;

    const frameInterval = Math.round(1000 / Math.max(1, fps));
    let frameId;
    let lastTime = performance.now();

    const boilTick = (now) => {
      if (now - lastTime >= frameInterval) {
        setActiveFrame((prev) => (prev + 1) % frames.length);
        lastTime = now;
      }
      frameId = requestAnimationFrame(boilTick);
    };

    frameId = requestAnimationFrame(boilTick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isDrawn, fps, frames.length]);

  const currentFrame = frames[activeFrame] || frames[0];
  const offset = isDrawn || isDrawing ? 0 : strokeLength;

  return (
    <span className={`manifesto-word-highlight relative inline-block whitespace-nowrap select-none ${className}`}>
      {/* Wrapped Content */}
      <span ref={textRef} className="relative z-10 inline-block px-1.5 py-0.5">
        {children}
      </span>

      {/* Hand-Drawn Continuous Boiling Circle SVG */}
      {currentFrame && (
        <svg
          className={`boiling-sketch-svg absolute pointer-events-none ${isDrawn ? 'is-boiling' : ''
            }`}
          style={{
            left: -currentFrame.padX,
            top: -currentFrame.padY,
            width: currentFrame.width,
            height: currentFrame.height,
            overflow: 'visible',
            zIndex: 15,
          }}
          viewBox={`0 0 ${currentFrame.width} ${currentFrame.height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d={currentFrame.d}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: strokeLength,
              strokeDashoffset: offset,
              transition: isDrawn
                ? 'none'
                : `stroke-dashoffset ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
              willChange: 'stroke-dashoffset, d',
            }}
          />
        </svg>
      )}
    </span>
  );
}

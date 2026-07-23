"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

interface Farm {
  slug: string;
  name: string;
  year: string;
  summary: string;
  image?: string;
  logo?: string;
}

interface FarmCarouselProps {
  farms: Farm[];
}

const AUTOPLAY_MS = 6500;
const RESUME_MS = 5000;
const TRANSITION_MS = 400;

export function FarmCarousel({ farms }: FarmCarouselProps) {
  const count = farms.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<number | null>(null);
  const resumeRef = useRef<number | null>(null);
  const dragStartX = useRef(0);
  const viewportWidth = useRef(1);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % count) + count) % count);
    },
    [count],
  );

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const pauseInteraction = useCallback(() => {
    stopAutoplay();
    if (resumeRef.current !== null) {
      window.clearTimeout(resumeRef.current);
      resumeRef.current = null;
    }
  }, [stopAutoplay]);

  const scheduleResume = useCallback(() => {
    if (resumeRef.current !== null) window.clearTimeout(resumeRef.current);
    if (reducedMotion) return;
    resumeRef.current = window.setTimeout(() => {
      resumeRef.current = null;
      autoplayRef.current = window.setInterval(() => {
        setActiveIndex((current) => (current + 1) % count);
      }, AUTOPLAY_MS);
    }, RESUME_MS);
  }, [count, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    autoplayRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % count);
    }, AUTOPLAY_MS);
    return () => {
      if (autoplayRef.current !== null) window.clearInterval(autoplayRef.current);
      if (resumeRef.current !== null) window.clearTimeout(resumeRef.current);
    };
  }, [count, reducedMotion]);

  const withInteraction = (action: () => void) => {
    pauseInteraction();
    action();
    scheduleResume();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      withInteraction(() => goTo(activeIndex + 1));
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      withInteraction(() => goTo(activeIndex - 1));
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pauseInteraction();
    dragStartX.current = event.clientX;
    viewportWidth.current = viewportRef.current?.clientWidth || 1;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setDragOffset(event.clientX - dragStartX.current);
  };

  const endDrag = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = Math.max(60, viewportWidth.current * 0.15);
    if (dragOffset < -threshold) {
      goTo(activeIndex + 1);
    } else if (dragOffset > threshold) {
      goTo(activeIndex - 1);
    }
    setDragOffset(0);
    scheduleResume();
  };

  const trackTransition = isDragging || reducedMotion ? "none" : `transform ${TRANSITION_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`;

  return (
    <div
      className="farm-carousel"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Fazendas do grupo"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={pauseInteraction}
      onMouseLeave={scheduleResume}
      onFocus={pauseInteraction}
      onBlur={scheduleResume}
    >
      <div className="farm-carousel-viewport" ref={viewportRef}>
        <div
          className="farm-carousel-track"
          style={{ transform: `translateX(calc(${-activeIndex * 100}% + ${dragOffset}px))`, transition: trackTransition }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {farms.map((farm) => {
            const imgSrc = farm.image || farm.logo || `/assets/farm-${farm.slug}.png`;
            return (
              <article className="farm-slide" key={farm.slug}>
                <div className="farm-slide-card">
                  {imgSrc && (
                    <div className="farm-slide-image-wrapper">
                      <img src={imgSrc} alt={farm.name} className="farm-slide-image" />
                    </div>
                  )}
                  <h3>{farm.name}</h3>
                  <p>{farm.summary}</p>
                  <a href={`/fazendas/${farm.slug}`}>Conhecer nossas Fazendas →</a>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="farm-carousel-controls">
        <button
          type="button"
          className="farm-carousel-arrow"
          aria-label="Fazenda anterior"
          onClick={() => withInteraction(() => goTo(activeIndex - 1))}
        >
          ‹
        </button>
        <div className="farm-carousel-dots">
          {farms.map((farm, index) => (
            <button
              type="button"
              key={farm.slug}
              className="farm-carousel-dot"
              aria-label={`Ir para ${farm.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => withInteraction(() => goTo(index))}
            />
          ))}
        </div>
        <button
          type="button"
          className="farm-carousel-arrow"
          aria-label="Próxima fazenda"
          onClick={() => withInteraction(() => goTo(activeIndex + 1))}
        >
          ›
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {farms[activeIndex].name}
      </p>
    </div>
  );
}

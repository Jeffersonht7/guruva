"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

interface Farm {
  slug: string;
  name: string;
  year: string;
  summary: string;
  image?: string;
  logo?: string;
  photo?: string;
}

interface FarmCarouselProps {
  farms: Farm[];
  kicker?: string;
  title?: string;
  variant?: "cine" | "simple";
}

const AUTOPLAY_MS = 6500;
const RESUME_MS = 5000;
const TRANSITION_MS = 400;

export function FarmCarousel({ farms, kicker, title, variant = "cine" }: FarmCarouselProps) {
  const count = farms.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isGridLayout, setIsGridLayout] = useState(false);
  const isSimpleGrid = variant === "simple" && isGridLayout;
  const isMobileVertical = variant === "simple" && !isGridLayout;
  // Each "cine" slide only takes up part of the viewport width, leaving a
  // peek of the next slide visible. Without a trailing clone, the last real
  // slide has no "next" to peek at and leaves blank space beside it.
  const loopSlides =
    count > 1
      ? [...farms.map((farm) => ({ farm, isClone: false })), { farm: farms[0], isClone: true }]
      : farms.map((farm) => ({ farm, isClone: false }));

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

  useEffect(() => {
    if (variant !== "simple") return;
    const mql = window.matchMedia("(min-width: 640px)");
    const update = () => setIsGridLayout(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [variant]);

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
    if (reducedMotion || isSimpleGrid) return;
    resumeRef.current = window.setTimeout(() => {
      resumeRef.current = null;
      autoplayRef.current = window.setInterval(() => {
        setActiveIndex((current) => (current + 1) % count);
      }, AUTOPLAY_MS);
    }, RESUME_MS);
  }, [count, reducedMotion, isSimpleGrid]);

  useEffect(() => {
    if (reducedMotion || isSimpleGrid) return;
    autoplayRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % count);
    }, AUTOPLAY_MS);
    return () => {
      if (autoplayRef.current !== null) window.clearInterval(autoplayRef.current);
      if (resumeRef.current !== null) window.clearTimeout(resumeRef.current);
    };
  }, [count, reducedMotion, isSimpleGrid]);

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

  const onKeyDownVertical = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      withInteraction(() => goTo(activeIndex + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      withInteraction(() => goTo(activeIndex - 1));
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a")) return;
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
    <div className={`farm-carousel${variant === "simple" ? " farm-carousel-simple" : ""}${isSimpleGrid ? " is-grid-layout" : ""}`}>
      {(kicker || title) && (
        <div className="farm-carousel-heading">
          <div>
            {kicker && <span className="section-kicker">{kicker}</span>}
            {title && <h2>{title}</h2>}
          </div>
          {variant === "cine" && (
            <div className="farm-carousel-arrows">
              <button
                type="button"
                className="farm-carousel-arrow"
                aria-label="Fazenda anterior"
                onClick={() => withInteraction(() => goTo(activeIndex - 1))}
              >
                ←
              </button>
              <button
                type="button"
                className="farm-carousel-arrow"
                aria-label="Próxima fazenda"
                onClick={() => withInteraction(() => goTo(activeIndex + 1))}
              >
                →
              </button>
            </div>
          )}
        </div>
      )}

      {isSimpleGrid ? (
        <div className="farm-simple-grid">
          {farms.map((farm) => (
            <a className="farm-simple-card is-active" key={farm.slug} href={`/fazendas/${farm.slug}`}>
              <span className="farm-simple-logo-wrap">
                <img className="farm-simple-logo" src={farm.logo} alt={farm.name} loading="lazy" />
              </span>
              <h3>{farm.name}</h3>
              <p>{farm.summary}</p>
            </a>
          ))}
        </div>
      ) : isMobileVertical ? (
        <div className="farm-carousel-vertical">
          <div
            className="farm-carousel-viewport-vertical"
            ref={viewportRef}
            role="region"
            aria-roledescription="carrossel"
            aria-label="Fazendas do grupo"
            tabIndex={0}
            onKeyDown={onKeyDownVertical}
            onMouseEnter={pauseInteraction}
            onMouseLeave={scheduleResume}
            onFocus={pauseInteraction}
            onBlur={scheduleResume}
          >
            <div
              className="farm-carousel-track-vertical"
              style={{
                transform: `translateY(calc((var(--vslide-h) + var(--vslide-gap)) * ${-activeIndex}))`,
                transition: trackTransition,
              }}
            >
              {farms.map((farm, index) => (
                <div className="farm-slide-vertical" key={farm.slug}>
                  <a
                    className={`farm-simple-card${index === activeIndex ? " is-active" : " is-inactive"}`}
                    href={`/fazendas/${farm.slug}`}
                  >
                    <span className="farm-simple-logo-wrap">
                      <img className="farm-simple-logo" src={farm.logo} alt={farm.name} loading="lazy" />
                    </span>
                    <h3>{farm.name}</h3>
                    <p>{farm.summary}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="farm-carousel-vertical-arrows">
            <button
              type="button"
              className="farm-carousel-arrow"
              aria-label="Fazenda anterior"
              onClick={() => withInteraction(() => goTo(activeIndex - 1))}
            >
              ↑
            </button>
            <button
              type="button"
              className="farm-carousel-arrow"
              aria-label="Próxima fazenda"
              onClick={() => withInteraction(() => goTo(activeIndex + 1))}
            >
              ↓
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            className="farm-carousel-viewport"
            ref={viewportRef}
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
            <div
              className="farm-carousel-track"
              style={{
                transform: `translateX(calc((var(--slide-basis) + var(--slide-gap, 24px)) * ${-activeIndex} + ${dragOffset}px))`,
                transition: trackTransition,
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              {loopSlides.map(({ farm, isClone }, index) => {
                const bgSrc = farm.photo || farm.image || farm.logo || `/assets/farm-${farm.slug}.png`;
                return (
                  <article
                    className="farm-slide"
                    key={isClone ? `${farm.slug}-loop-clone` : farm.slug}
                    aria-hidden={isClone || undefined}
                  >
                    <div className={`farm-cine-card${index === activeIndex ? " is-active" : " is-inactive"}`}>
                      <div className="farm-cine-bg" style={{ backgroundImage: `url('${bgSrc}')` }} />
                      <div className="farm-cine-gradient" aria-hidden="true" />
                      <div className="farm-cine-content">
                        <span className="farm-cine-kicker">Desde {farm.year}</span>
                        <h3>{farm.name}</h3>
                        <p>{farm.summary}</p>
                        <a className="farm-cine-cta" href={`/fazendas/${farm.slug}`} tabIndex={isClone ? -1 : undefined}>
                          Explorar unidade
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="farm-carousel-controls">
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
          </div>
        </>
      )}

      <p className="sr-only" aria-live="polite">
        {farms[activeIndex].name}
      </p>
    </div>
  );
}

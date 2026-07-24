"use client";

import { useCallback, useEffect, useState } from "react";

export interface ValueItem {
  icon: string;
  title: string;
  text: string;
}

interface ValuesCarouselProps {
  items: ValueItem[];
}

const AUTOPLAY_MS = 4500;

export function ValuesCarousel({ items }: ValuesCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const minSwipeDistance = 40;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="values-carousel-wrapper">
      {/* Desktop Grid Layout */}
      <div className="values-grid-desktop">
        {items.map((item, idx) => (
          <article key={idx}>
            <span className="value-icon" aria-hidden="true">
              <img src={item.icon} alt="" width="52" height="52" />
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      {/* Mobile & Tablet Carousel Layout */}
      <div
        className="values-carousel-mobile"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="values-carousel-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {items.map((item, idx) => (
            <div className="values-carousel-slide" key={idx}>
              <article className="values-carousel-card">
                <span className="value-icon" aria-hidden="true">
                  <img src={item.icon} alt="" width="52" height="52" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </div>
          ))}
        </div>

        {/* Carousel Dots Navigation */}
        <div className="values-carousel-dots">
          {items.map((item, idx) => (
            <button
              key={idx}
              type="button"
              className={`values-carousel-dot ${idx === activeIndex ? "is-active" : ""}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Ir para ${item.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

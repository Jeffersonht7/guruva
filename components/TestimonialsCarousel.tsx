"use client";

import { useCallback, useEffect, useState } from "react";

export interface Testimonial {
  quote: string;
  source: string;
  tag: string;
}

interface TestimonialsCarouselProps {
  items: Testimonial[];
}

const AUTOPLAY_MS = 6000;

export function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const getIndex = (offset: number) => (activeIndex + offset + items.length) % items.length;

  const active = items[activeIndex];
  const prevItem = items[getIndex(-1)];
  const nextItem = items[getIndex(1)];

  return (
    <div className="testimonial-carousel-container">
      <div className="testimonial-stage">
        <button type="button" className="carousel-nav-btn prev" onClick={prevSlide} aria-label="Depoimento anterior">
          ‹
        </button>

        <div className="testimonial-slides-wrapper">
          <blockquote className="testimonial-slide is-side is-prev" onClick={prevSlide}>
            <p>{prevItem.quote}</p>
            <cite>
              {prevItem.source} <span>· {prevItem.tag}</span>
            </cite>
          </blockquote>

          <blockquote className="testimonial-slide is-center">
            <p>{active.quote}</p>
            <cite>
              {active.source} <span>· {active.tag}</span>
            </cite>
          </blockquote>

          <blockquote className="testimonial-slide is-side is-next" onClick={nextSlide}>
            <p>{nextItem.quote}</p>
            <cite>
              {nextItem.source} <span>· {nextItem.tag}</span>
            </cite>
          </blockquote>
        </div>

        <button type="button" className="carousel-nav-btn next" onClick={nextSlide} aria-label="Próximo depoimento">
          ›
        </button>
      </div>

      <div className="testimonial-dots-nav">
        {items.map((item, index) => (
          <button
            type="button"
            key={index}
            className={`testimonial-dot ${index === activeIndex ? "is-active" : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Ir para depoimento ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

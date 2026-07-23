"use client";

import { useState, useEffect, useCallback } from "react";
import { grapes } from "./guruvaData";

export function GrapeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? grapes.length - 1 : prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === grapes.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const getIndex = (offset: number) => {
    return (activeIndex + offset + grapes.length) % grapes.length;
  };

  const activeGrape = grapes[activeIndex];
  const prevGrape = grapes[getIndex(-1)];
  const nextGrape = grapes[getIndex(1)];

  return (
    <section className="grape-carousel-section" id="uvas" aria-label="Nossas Variedades de Uvas">
      <div className="grape-carousel-container">
        <div className="grape-copy-side">
          <span className="grape-section-title">Nossas Variedades</span>
          <h2 className="grape-variety-subtitle">{activeGrape.name}</h2>
          <div className="grape-specs-badges">
            <span className="spec-tag">{activeGrape.color}</span>
            <span className="spec-tag">{activeGrape.texture}</span>
            <span className="spec-tag">{activeGrape.sweetness}</span>
          </div>
        </div>

        <div className="grape-stage-side">
          <button className="carousel-nav-btn prev" onClick={prevSlide} aria-label="Anterior">
            ‹
          </button>

          <div className="grape-slides-wrapper">
            {/* Left Blurred Slide */}
            <div className="grape-card-slide side-slide left-slide" onClick={prevSlide}>
              <img src={prevGrape.image} alt={prevGrape.name} />
            </div>

            {/* Center Sharp Active Slide */}
            <div className="grape-card-slide center-slide active-slide">
              <img src={activeGrape.image} alt={activeGrape.name} />
            </div>

            {/* Right Blurred Slide */}
            <div className="grape-card-slide side-slide right-slide" onClick={nextSlide}>
              <img src={nextGrape.image} alt={nextGrape.name} />
            </div>
          </div>

          <button className="carousel-nav-btn next" onClick={nextSlide} aria-label="Próximo">
            ›
          </button>
        </div>
      </div>

      <div className="grape-dots-nav">
        {grapes.map((_, idx) => (
          <button
            key={idx}
            className={`grape-dot ${idx === activeIndex ? "is-active" : ""}`}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

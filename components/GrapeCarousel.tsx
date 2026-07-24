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
      <div className="grape-section-heading">
        <span className="section-kicker">Nossas Variedades</span>
        <h2>Sabores que conquistam mercados.</h2>
      </div>

      <div className="grape-carousel-container">
        <div className="grape-stage-side">
          <button className="carousel-nav-btn prev" onClick={prevSlide} aria-label="Anterior">
            ‹
          </button>

          <div className="grape-slides-wrapper">
            {/* Left Blurred Slide */}
            <div className="grape-card-slide side-slide" onClick={prevSlide}>
              <img src={prevGrape.image} alt={prevGrape.name} />
              <div className="grape-card-side-label">
                <span>{prevGrape.shortName}</span>
              </div>
            </div>

            {/* Center Sharp Active Slide */}
            <div className="grape-card-slide center-slide">
              <img src={activeGrape.image} alt={activeGrape.name} />
              <div className="grape-card-gradient" aria-hidden="true"></div>
              <div className="grape-card-content">
                <span className="grape-card-badge">Premium Choice</span>
                <h3 className="grape-card-title">{activeGrape.shortName}</h3>
                <p className="grape-card-description">{activeGrape.description}</p>
                <div className="grape-card-tags">
                  <span className="grape-tag-outline">{activeGrape.color}</span>
                  <span className="grape-tag-outline">{activeGrape.texture}</span>
                </div>
              </div>
            </div>

            {/* Right Blurred Slide */}
            <div className="grape-card-slide side-slide" onClick={nextSlide}>
              <img src={nextGrape.image} alt={nextGrape.name} />
              <div className="grape-card-side-label">
                <span>{nextGrape.shortName}</span>
              </div>
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

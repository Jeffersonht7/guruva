"use client";

import { useLayoutEffect, useRef, useState, type PointerEvent } from "react";

export interface TimelineJourneyItem {
  year: string;
  title: string;
  text: string;
  image: string;
}

interface TimelineJourneyProps {
  items: TimelineJourneyItem[];
}

interface WavePoint {
  x: number;
  y: number;
}

export function TimelineJourney({ items }: TimelineJourneyProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStart = useRef(0);
  const [wave, setWave] = useState<{ width: number; height: number; points: WavePoint[] }>({
    width: 0,
    height: 0,
    points: [],
  });

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const trackRect = track.getBoundingClientRect();
      const points = photoRefs.current.map((photo) => {
        if (!photo) return { x: 0, y: 0 };
        const rect = photo.getBoundingClientRect();
        return {
          x: rect.left - trackRect.left + rect.width / 2 + track.scrollLeft,
          y: rect.top - trackRect.top + rect.height / 2,
        };
      });
      const maxY = points.reduce((max, point) => Math.max(max, point.y), 0);
      setWave({ width: track.scrollWidth, height: maxY + 40, points });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [items]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    dragStartX.current = event.clientX;
    scrollStart.current = track.scrollLeft;
    track.setPointerCapture(event.pointerId);
    track.classList.add("is-dragging");
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !isDragging.current) return;
    const delta = event.clientX - dragStartX.current;
    track.scrollLeft = scrollStart.current - delta;
  };

  const endDrag = () => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = false;
    track.classList.remove("is-dragging");
  };

  const scrollByStep = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  const pathD = wave.points.reduce((acc, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const prev = wave.points[index - 1];
    const midX = (prev.x + point.x) / 2;
    return `${acc} C ${midX} ${prev.y}, ${midX} ${point.y}, ${point.x} ${point.y}`;
  }, "");

  return (
    <div className="timeline-journey">
      <div
        className="timeline-journey-track"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        role="group"
        aria-label="Linha do tempo. Arraste para o lado para ver mais marcos."
      >
        {wave.width > 0 && (
          <svg
            className="timeline-journey-wave"
            width={wave.width}
            height={wave.height}
            viewBox={`0 0 ${wave.width} ${wave.height}`}
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path d={pathD} stroke="url(#journey-gradient)" strokeWidth="3" strokeLinecap="round" />
            <defs>
              <linearGradient id="journey-gradient" x1="0" y1="0" x2={wave.width} y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#174b35" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#174b35" />
                <stop offset="100%" stopColor="#174b35" stopOpacity="0.25" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {items.map((item, index) => (
          <article className={`timeline-node ${index % 2 === 0 ? "is-up" : "is-down"}`} key={`${item.year}-${index}`}>
            <div
              className="timeline-node-photo"
              ref={(el) => {
                photoRefs.current[index] = el;
              }}
            >
              <img src={item.image} alt="" draggable={false} />
              <span className="timeline-node-year">{item.year}</span>
            </div>
            <h4>{item.title}</h4>
            <span>{item.text}</span>
          </article>
        ))}
      </div>

      <div className="timeline-journey-controls">
        <button type="button" className="timeline-journey-arrow" aria-label="Ver marcos anteriores" onClick={() => scrollByStep(-1)}>
          ‹
        </button>
        <button type="button" className="timeline-journey-arrow" aria-label="Ver próximos marcos" onClick={() => scrollByStep(1)}>
          ›
        </button>
      </div>
    </div>
  );
}

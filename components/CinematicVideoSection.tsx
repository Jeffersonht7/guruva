"use client";

import { useRef, useState } from "react";

interface CinematicVideoSectionProps {
  videoSrc: string;
  posterSrc: string;
  kicker: string;
  title: string;
  ariaLabel: string;
}

export function CinematicVideoSection({ videoSrc, posterSrc, kicker, title, ariaLabel }: CinematicVideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    video.muted = isMuted;
    video.play();
    setIsPlaying(true);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setIsMuted(next);
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (video) video.currentTime = 0;
    setIsPlaying(false);
  };

  return (
    <section className="cinematic-break" aria-label={ariaLabel}>
      <video
        ref={videoRef}
        className="cinematic-break-video"
        src={videoSrc}
        poster={posterSrc}
        playsInline
        preload="metadata"
        data-parallax
        onEnded={handleEnded}
      />
      <div className="cinematic-break-content">
        <div className={`cinematic-break-text${isPlaying ? " is-hidden" : ""}`} aria-hidden={isPlaying}>
          <span>{kicker}</span>
          <p>{title}</p>
        </div>
        <div className="cinematic-break-controls">
          <button
            type="button"
            className="cinematic-control-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 4.5v15l13-7.5-13-7.5Z" />
              </svg>
            )}
          </button>
          {isPlaying && (
            <button
              type="button"
              className="cinematic-control-btn is-mute"
              onClick={toggleMute}
              aria-label={isMuted ? "Ativar som" : "Silenciar vídeo"}
            >
              {isMuted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 9v6h4l5 4V5L8 9H4Z" />
                  <path d="m16 9 5 6M21 9l-5 6" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 9v6h4l5 4V5L8 9H4Z" />
                  <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

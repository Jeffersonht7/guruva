"use client";

import { useEffect } from "react";

export function useGuruvaInteractions() {
  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    const header = document.querySelector<HTMLElement>("[data-header]");
    const hero = document.querySelector<HTMLElement>(".hero");
    const heroVideo = document.querySelector<HTMLVideoElement>(".hero-video");
    const commercialModal = document.querySelector<HTMLElement>("[data-commercial-modal]");
    const commercialOpenButtons = document.querySelectorAll<HTMLElement>("[data-commercial-open], a[href='#contato']");
    const commercialCloseButtons = document.querySelectorAll<HTMLElement>("[data-commercial-close]");
    const commercialForm = document.querySelector<HTMLFormElement>(".commercial-modal-form");
    const careersModal = document.querySelector<HTMLElement>("[data-careers-modal]");
    const careersOpenButtons = document.querySelectorAll<HTMLElement>("[data-careers-open]");
    const careersCloseButtons = document.querySelectorAll<HTMLElement>("[data-careers-close]");
    const careersForm = document.querySelector<HTMLFormElement>(".careers-form");
    const metricsStage = document.querySelector<HTMLElement>(".metrics-stage");
    const parallaxEl = document.querySelector<HTMLElement>("[data-parallax]");

    let ticking = false;
    let introStarted = false;
    let introComplete = false;
    let introStartTime = 0;
    let introDuration = 700;

    const updateHeader = () => {
      // Only pages with a collapsing hero (the home page) want the header to
      // fade in on scroll. Elsewhere the header renders already-visible via
      // `initiallyScrolled`, and recalculating from scrollY on mount (always
      // 0 at that point) would strip that class and leave the header
      // invisible/unclickable until the user scrolls.
      if (!hero) return;
      header?.classList.toggle("is-scrolled", window.scrollY > 40);
    };

    const getCollapsedHeroHeight = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        // Proportional to innerHeight (not a fixed px value): on many phones the
        // initial innerHeight (address bar visible) is already below a fixed
        // 660px, which collapsed the shrink range to zero and made the
        // animation appear broken on mobile.
        return Math.min(Math.max(window.innerHeight * 0.78, 420), 620);
      }
      return Math.min(Math.max(window.innerHeight * 0.71, 560), 680);
    };

    const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

    const getHeroVideoScale = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        return { expanded: 1.45, collapsed: 1.32 };
      }

      return { expanded: 1.34, collapsed: 1.24 };
    };

    const requestMotionUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateHeader();
        updateHeroMotion();
        ticking = false;
        if (introStarted && !introComplete) {
          requestMotionUpdate();
        }
      });
    };

    const startHeroIntro = (duration = 700) => {
      if (introStarted || introComplete) return;
      introStarted = true;
      introStartTime = performance.now();
      introDuration = duration;
      requestMotionUpdate();
    };

    const updateHeroMotion = () => {
      if (!hero) return;

      const expanded = window.innerHeight;
      const collapsed = Math.min(getCollapsedHeroHeight(), expanded);
      const hasStartedIntro = window.scrollY > 1;

      if (hasStartedIntro) {
        startHeroIntro(520);
      }

      const scrollRange = Math.max(180, Math.min(420, expanded - collapsed + 220));
      const timedProgress = introStarted ? Math.min((performance.now() - introStartTime) / introDuration, 1) : 0;
      const scrollProgress = Math.min(Math.max(window.scrollY / scrollRange, 0), 1);
      const rawProgress = introComplete ? 1 : Math.max(timedProgress, scrollProgress);

      if (introStarted && timedProgress >= 1) {
        introComplete = true;
      }

      const progressValue = easeOutCubic(rawProgress);
      const currentHeight = expanded - (expanded - collapsed) * progressValue;
      const videoZoom = getHeroVideoScale();
      const videoScale = videoZoom.expanded - (videoZoom.expanded - videoZoom.collapsed) * progressValue;

      hero.style.setProperty("--hero-height", `${Math.round(currentHeight)}px`);
      hero.style.setProperty("--hero-video-scale", videoScale.toFixed(3));
      hero.classList.toggle("has-revealed", introStarted || introComplete);
    };

    const updateParallax = () => {
      if (!parallaxEl?.parentElement) return;
      const rect = parallaxEl.parentElement.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0), 1);
      parallaxEl.style.transform = `scale(1.12) translateY(${((progress - 0.5) * 40).toFixed(1)}px)`;
    };

    const onScroll = () => {
      requestMotionUpdate();
      updateParallax();
    };
    const onWheel = () => startHeroIntro(520);
    const onTouchMove = () => startHeroIntro(520);
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "End"].includes(event.key)) {
        startHeroIntro(520);
      }
    };
    const onResize = () => {
      requestMotionUpdate();
      updateParallax();
    };
    const onVideoTimeUpdate = () => {
      if (!heroVideo?.duration || introStarted || introComplete) return;
      if (heroVideo.duration - heroVideo.currentTime <= 3) {
        startHeroIntro(1400);
      }
    };
    // Some mobile browsers ignore the `muted`/`autoPlay` JSX attributes on first
    // paint and silently block playback, leaving a black frame with an inert
    // native play affordance. Force the property (not just the attribute) and
    // retry on the user's first tap if the initial play() is rejected.
    const retryHeroVideoPlay = () => {
      heroVideo?.play().catch(() => {});
    };
    if (heroVideo) {
      heroVideo.muted = true;
      retryHeroVideoPlay();
      hero?.addEventListener("touchstart", retryHeroVideoPlay, { once: true, passive: true });
      hero?.addEventListener("click", retryHeroVideoPlay, { once: true });
    }
    const openCommercialModal = (event?: Event) => {
      event?.preventDefault();
      if (!commercialModal) return;
      commercialModal.classList.add("is-open");
      commercialModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      commercialModal.querySelector<HTMLInputElement>("input")?.focus();
    };
    const closeCommercialModal = () => {
      if (!commercialModal) return;
      commercialModal.classList.remove("is-open");
      commercialModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };
    const onCommercialSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      const button = commercialForm?.querySelector<HTMLButtonElement>("button");
      if (!button || !commercialForm) return;
      const originalText = button.textContent || "";

      button.textContent = "Solicitação enviada";
      button.disabled = true;

      window.setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        commercialForm.reset();
        closeCommercialModal();
      }, 1800);
    };
    const openCareersModal = (event?: Event) => {
      event?.preventDefault();
      if (!careersModal) return;
      careersModal.classList.add("is-open");
      careersModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      careersModal.querySelector<HTMLInputElement>("input")?.focus();
    };
    const closeCareersModal = () => {
      if (!careersModal) return;
      careersModal.classList.remove("is-open");
      careersModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };
    const onCareersSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      const button = careersForm?.querySelector<HTMLButtonElement>("button");
      if (!button || !careersForm) return;
      const originalText = button.textContent || "";

      button.textContent = "Candidatura enviada";
      button.disabled = true;

      window.setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        careersForm.reset();
        closeCareersModal();
      }, 1800);
    };
    const onEscapeModal = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCommercialModal();
        closeCareersModal();
      }
    };

    let metricsObserver: IntersectionObserver | undefined;
    if (metricsStage) {
      metricsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              metricsStage.classList.add("is-revealed");
              metricsObserver?.disconnect();
            }
          });
        },
        { threshold: 0.3 },
      );
      metricsObserver.observe(metricsStage);
    }

    const revealTargets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    let revealObserver: IntersectionObserver | undefined;
    if (revealTargets.length) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              revealObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
      );
      revealTargets.forEach((target) => revealObserver?.observe(target));
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    heroVideo?.addEventListener("timeupdate", onVideoTimeUpdate);
    commercialOpenButtons.forEach((button) => button.addEventListener("click", openCommercialModal));
    commercialCloseButtons.forEach((button) => button.addEventListener("click", closeCommercialModal));
    commercialForm?.addEventListener("submit", onCommercialSubmit);
    careersOpenButtons.forEach((button) => button.addEventListener("click", openCareersModal));
    careersCloseButtons.forEach((button) => button.addEventListener("click", closeCareersModal));
    careersForm?.addEventListener("submit", onCareersSubmit);
    window.addEventListener("keydown", onEscapeModal);

    updateHeader();
    updateHeroMotion();
    updateParallax();

    return () => {
      metricsObserver?.disconnect();
      revealObserver?.disconnect();
      window.history.scrollRestoration = previousScrollRestoration;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      heroVideo?.removeEventListener("timeupdate", onVideoTimeUpdate);
      hero?.removeEventListener("touchstart", retryHeroVideoPlay);
      hero?.removeEventListener("click", retryHeroVideoPlay);
      commercialOpenButtons.forEach((button) => button.removeEventListener("click", openCommercialModal));
      commercialCloseButtons.forEach((button) => button.removeEventListener("click", closeCommercialModal));
      commercialForm?.removeEventListener("submit", onCommercialSubmit);
      careersOpenButtons.forEach((button) => button.removeEventListener("click", openCareersModal));
      careersCloseButtons.forEach((button) => button.removeEventListener("click", closeCareersModal));
      careersForm?.removeEventListener("submit", onCareersSubmit);
      window.removeEventListener("keydown", onEscapeModal);
      document.body.style.overflow = "";
    };
  }, []);
}

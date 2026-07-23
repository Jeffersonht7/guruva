const header = document.querySelector("[data-header]");
const hero = document.querySelector(".hero");
const heroVideo = document.querySelector(".hero-video");
const journeyShell = document.querySelector(".journey-shell");
const progress = document.querySelector("[data-progress]");
const form = document.querySelector(".contact-form");
const farmMapCanvas = document.querySelector(".maplibregl-canvas");
const farmPins = document.querySelectorAll("[data-farm-pin]");
const farmPopup = document.querySelector("[data-farm-popup]");
let ticking = false;
let introStarted = false;
let introComplete = false;
let introStartTime = 0;
let introDuration = 700;

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 40);
};

const getCollapsedHeroHeight = () => {
  if (window.matchMedia("(max-width: 640px)").matches) return 660;
  return Math.min(Math.max(window.innerHeight * 0.71, 560), 680);
};

const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);
const getHeroVideoScale = () => {
  if (window.matchMedia("(max-width: 640px)").matches) {
    return { expanded: 1.45, collapsed: 1.32 };
  }

  return { expanded: 1.34, collapsed: 1.24 };
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

const updateJourneyProgress = () => {
  if (!journeyShell || !progress) return;

  const maxScroll = journeyShell.scrollWidth - journeyShell.clientWidth;
  const ratio = maxScroll > 0 ? journeyShell.scrollLeft / maxScroll : 0;
  progress.style.width = `${Math.max(12, ratio * 100)}%`;
};

const drawFarmMap = () => {
  if (!farmMapCanvas) return;

  const rect = farmMapCanvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  farmMapCanvas.width = Math.max(1, Math.round(rect.width * scale));
  farmMapCanvas.height = Math.max(1, Math.round(rect.height * scale));

  const ctx = farmMapCanvas.getContext("2d");
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);

  const drawPath = (points, color, width, alpha = 1) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    points.forEach(([x, y], index) => {
      const px = x * rect.width;
      const py = y * rect.height;
      if (index === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
    ctx.restore();
  };

  const background = ctx.createLinearGradient(0, 0, rect.width, rect.height);
  background.addColorStop(0, "#111312");
  background.addColorStop(0.48, "#080908");
  background.addColorStop(1, "#15120d");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, rect.width, rect.height);

  const river = [
    [-0.05, 0.84],
    [0.13, 0.8],
    [0.27, 0.75],
    [0.42, 0.7],
    [0.58, 0.72],
    [0.74, 0.77],
    [1.05, 0.82]
  ];
  ctx.save();
  ctx.lineWidth = rect.height * 0.2;
  ctx.strokeStyle = "rgba(72, 104, 116, 0.48)";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  river.forEach(([x, y], index) => {
    const px = x * rect.width;
    const py = y * rect.height;
    if (index === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.stroke();
  ctx.restore();

  const roads = [
    [[0.02, 0.62], [0.18, 0.52], [0.34, 0.48], [0.5, 0.42], [0.78, 0.34], [0.98, 0.28]],
    [[0.08, 0.2], [0.22, 0.34], [0.37, 0.5], [0.52, 0.66], [0.7, 0.94]],
    [[0.16, 0.96], [0.25, 0.7], [0.28, 0.45], [0.32, 0.12]],
    [[0.48, 0.04], [0.5, 0.28], [0.52, 0.46], [0.56, 0.72], [0.55, 0.98]],
    [[0.68, 0.08], [0.64, 0.28], [0.66, 0.52], [0.8, 0.68], [0.96, 0.78]],
    [[0.0, 0.38], [0.18, 0.39], [0.34, 0.35], [0.55, 0.3], [0.82, 0.24]],
    [[0.1, 0.75], [0.26, 0.65], [0.48, 0.6], [0.78, 0.56], [1.0, 0.48]]
  ];
  roads.forEach((road, index) => drawPath(road, index % 2 ? "rgba(94, 104, 132, 0.62)" : "rgba(111, 119, 143, 0.5)", index % 2 ? 3 : 2, 1));

  for (let i = 0; i < 18; i += 1) {
    const x = 0.58 + (i % 6) * 0.055;
    const y = 0.22 + Math.floor(i / 6) * 0.09;
    drawPath([[x, y], [x + 0.1, y + 0.03]], "rgba(89, 99, 125, 0.55)", 2, 0.9);
  }

  drawPath([[0.46, 0.02], [0.47, 0.2], [0.44, 0.35], [0.46, 0.56], [0.43, 0.68]], "rgba(62, 116, 143, 0.62)", 1.4, 0.9);

  ctx.fillStyle = "rgba(255, 248, 230, 0.14)";
  ctx.font = "700 13px Trebuchet MS";
  ctx.fillText("PETROLINA", rect.width * 0.72, rect.height * 0.46);
  ctx.font = "700 10px Trebuchet MS";
  ctx.fillStyle = "rgba(255, 248, 230, 0.18)";
  ctx.fillText("PROJETO SENADOR NILO COELHO", rect.width * 0.09, rect.height * 0.2);
  ctx.fillText("RIO SÃO FRANCISCO", rect.width * 0.78, rect.height * 0.84);
};

const updateFarmPopup = (pin) => {
  if (!farmPopup || !pin) return;
  farmPins.forEach((item) => item.classList.toggle("is-active", item === pin));
  farmPopup.querySelector("[data-popup-name]").textContent = pin.dataset.name;
  farmPopup.querySelector("[data-popup-area]").textContent = `${pin.dataset.area} · ${pin.dataset.address}`;
  farmPopup.querySelector("[data-popup-link]").href = pin.href;
};

window.addEventListener("scroll", requestMotionUpdate, { passive: true });
window.addEventListener("wheel", () => startHeroIntro(520), { passive: true });
window.addEventListener("touchmove", () => startHeroIntro(520), { passive: true });
window.addEventListener("keydown", (event) => {
  if (["ArrowDown", "PageDown", " ", "End"].includes(event.key)) {
    startHeroIntro(520);
  }
});
window.addEventListener("resize", requestMotionUpdate);
window.addEventListener("resize", drawFarmMap);
heroVideo?.addEventListener("timeupdate", () => {
  if (!heroVideo.duration || introStarted || introComplete) return;
  if (heroVideo.duration - heroVideo.currentTime <= 3) {
    startHeroIntro(1400);
  }
});
journeyShell?.addEventListener("scroll", updateJourneyProgress, { passive: true });
farmPins.forEach((pin) => {
  pin.addEventListener("mouseenter", () => updateFarmPopup(pin));
  pin.addEventListener("focus", () => updateFarmPopup(pin));
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = form.querySelector("button");
  const originalText = button.textContent;

  button.textContent = "Solicitacao registrada";
  button.disabled = true;

  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    form.reset();
  }, 2400);
});

updateHeader();
updateHeroMotion();
updateJourneyProgress();
drawFarmMap();

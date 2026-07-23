"use client";

import type { Unidade } from "./BusinessUnitsMap";

interface MapMarkerProps {
  unidade: Unidade;
  active: boolean;
  onActivate: (unidade: Unidade) => void;
}

export function MapMarker({ unidade, active, onActivate }: MapMarkerProps) {
  return (
    <button
      type="button"
      aria-label={`Ver unidade ${unidade.nome}`}
      onClick={() => onActivate(unidade)}
      className="group relative flex items-center gap-2 outline-none"
    >
      <span className="relative grid size-5 place-items-center">
        <span className="absolute inline-flex size-8 animate-ping rounded-full bg-[#7e1757]/30" />
        <span
          className={[
            "relative size-4 rounded-full border-2 border-white bg-[#7e1757] shadow-[0_0_24px_rgba(126,23,87,0.65)] transition",
            active ? "scale-125 bg-[#961e69]" : "group-hover:scale-110",
          ].join(" ")}
        />
      </span>

      <span
        className={[
          "rounded-full border border-[#7e1757]/30 bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#173f2c] shadow-lg backdrop-blur-md transition",
          active ? "border-[#7e1757] text-[#7e1757] font-extrabold" : "opacity-90 group-hover:opacity-100",
        ].join(" ")}
      >
        {unidade.nome}
      </span>
    </button>
  );
}

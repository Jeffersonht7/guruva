"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Map, { Marker, Popup, type MapRef } from "react-map-gl/maplibre";
import styles from "./BusinessUnitsMap.module.css";
import { MapMarker } from "./MapMarker";

export interface Unidade {
  nome: string;
  lat: number;
  lng: number;
  mapsUrl: string;
  logoSrc?: string;
  address?: string;
  description?: string;
  details?: string[];
}

const DEFAULT_UNIDADES: Unidade[] = [
  {
    nome: "Matriz",
    lat: -9.3891,
    lng: -40.503,
    mapsUrl: "https://maps.app.goo.gl/xxxxx",
    description: "Unidade operacional do ecossistema.",
  },
  {
    nome: "Cassimiro",
    lat: -9.374,
    lng: -40.487,
    mapsUrl: "https://maps.app.goo.gl/xxxxx",
    description: "Ponto de apoio produtivo.",
  },
  {
    nome: "Guararapes",
    lat: -9.405,
    lng: -40.526,
    mapsUrl: "https://maps.app.goo.gl/xxxxx",
    description: "Unidade conectada à operação agrícola.",
  },
];

interface BusinessUnitsMapProps {
  unidades?: Unidade[];
  title?: string;
  eyebrow?: string;
  description?: string;
  variant?: "dark" | "leaf" | "green";
  layout?: "stacked" | "split";
  sideItems?: string[];
}

const LIGHT_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
const DETAIL_ZOOM = 9.8;
const FOCUS_ZOOM = 12.2;
const REGION_ZOOM = 11.1;
const MIN_ZOOM = 8.6;
const MAX_BOUNDS: [[number, number], [number, number]] = [
  [-43.5, -11.4],
  [-38.1, -7.4],
];

function getBounds(unidades: Unidade[]): [[number, number], [number, number]] {
  const lngs = unidades.map((unit) => unit.lng);
  const lats = unidades.map((unit) => unit.lat);

  return [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)],
  ];
}

export function BusinessUnitsMap({
  unidades = DEFAULT_UNIDADES,
  eyebrow = "05 - Localização",
  title = "Onde a operação se conecta.",
  description,
  variant = "dark",
  layout = "stacked",
  sideItems,
}: BusinessUnitsMapProps) {
  const mapRef = useRef<MapRef | null>(null);
  const mapUnits = unidades.length > 0 ? unidades : DEFAULT_UNIDADES;
  const [activeUnit, setActiveUnit] = useState<Unidade | null>(null);
  const [currentZoom, setCurrentZoom] = useState(10.8);
  const [mapError, setMapError] = useState(false);
  const titleWords = title.split(" ");
  const titleLastWord = titleWords.pop();
  const showDetailedUnits = currentZoom >= DETAIL_ZOOM;
  const isLeaf = variant === "leaf";
  const isGreen = variant === "green";
  const displayedEyebrow = isLeaf || isGreen ? "Mapa das fazendas" : eyebrow;

  const initialViewState = useMemo(
    () => ({
      latitude: mapUnits.reduce((sum, unit) => sum + unit.lat, 0) / mapUnits.length,
      longitude: mapUnits.reduce((sum, unit) => sum + unit.lng, 0) / mapUnits.length,
      zoom: 10.8,
    }),
    [mapUnits],
  );

  const groupCenter = useMemo(
    () => ({
      latitude: mapUnits.reduce((sum, unit) => sum + unit.lat, 0) / mapUnits.length,
      longitude: mapUnits.reduce((sum, unit) => sum + unit.lng, 0) / mapUnits.length,
    }),
    [mapUnits],
  );

  const fitUnits = useCallback(() => {
    if (!mapRef.current || mapUnits.length === 0) return;

    try {
      mapRef.current.fitBounds(getBounds(mapUnits), {
        padding: { top: 72, right: 72, bottom: 72, left: 72 },
        duration: 900,
      });
    } catch {
      // fitBounds silent catch
    }
  }, [mapUnits]);

  const focusUnit = useCallback((unit: Unidade) => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    try {
      map.flyTo({
        center: [unit.lng, unit.lat],
        zoom: Math.max(map.getZoom(), FOCUS_ZOOM),
        duration: 900,
        essential: true,
        offset: [0, 148],
      });
    } catch {
      // flyTo silent catch
    }
  }, []);

  const handleMarkerToggle = useCallback(
    (unit: Unidade) => {
      setActiveUnit((current) => {
        if (current?.nome === unit.nome) return null;
        focusUnit(unit);
        return unit;
      });
    },
    [focusUnit],
  );

  const focusGroup = useCallback(() => {
    setActiveUnit(null);
    try {
      mapRef.current?.getMap().flyTo({
        center: [groupCenter.longitude, groupCenter.latitude],
        zoom: REGION_ZOOM,
        duration: 950,
        essential: true,
      });
    } catch {
      // flyTo silent catch
    }
  }, [groupCenter]);

  const handleMapMove = useCallback((event: { viewState: { zoom: number } }) => {
    const nextZoom = event.viewState.zoom;
    setCurrentZoom(nextZoom);
    if (nextZoom < DETAIL_ZOOM) setActiveUnit(null);
  }, []);

  const zoomIn = () => {
    try {
      mapRef.current?.getMap().zoomIn({ duration: 260 });
    } catch {
      // zoomIn silent catch
    }
  };
  const zoomOut = () => {
    try {
      mapRef.current?.getMap().zoomOut({ duration: 260 });
    } catch {
      // zoomOut silent catch
    }
  };

  const mapCardClassName =
    layout === "split"
      ? "relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#d9c999]/30 bg-[#f5f0e4] shadow-2xl sm:aspect-video"
      : "relative h-[360px] overflow-hidden rounded-2xl border border-[#d9c999]/45 bg-[#f5f0e4] shadow-[0_30px_90px_rgba(23,18,10,0.35)] sm:h-[440px] lg:h-[520px]";

  const mapStage = (
    <div className={mapCardClassName}>
          {!mapError ? (
            <Map
              ref={mapRef}
              mapStyle={LIGHT_STYLE}
              initialViewState={initialViewState}
              dragRotate={false}
              touchZoomRotate={true}
              attributionControl={false}
              minZoom={MIN_ZOOM}
              maxBounds={MAX_BOUNDS}
              onLoad={fitUnits}
              onMove={handleMapMove}
              onError={() => setMapError(true)}
              style={{ width: "100%", height: "100%" }}
            >
              {showDetailedUnits ? (
                mapUnits.map((unidade) => (
                  <Marker key={unidade.nome} latitude={unidade.lat} longitude={unidade.lng} anchor="center">
                    <MapMarker unidade={unidade} active={activeUnit?.nome === unidade.nome} onActivate={handleMarkerToggle} />
                  </Marker>
                ))
              ) : (
                <Marker latitude={groupCenter.latitude} longitude={groupCenter.longitude} anchor="center">
                  <button
                    type="button"
                    onClick={focusGroup}
                    className="group relative flex items-center gap-2 outline-none"
                    aria-label="Aproximar para ver fazendas Guruva"
                  >
                    <span className="relative grid size-8 place-items-center">
                      <span className="absolute inline-flex size-12 animate-ping rounded-full bg-[#7e1757]/30" />
                      <span className="relative grid size-7 place-items-center rounded-full border-2 border-white bg-[#7e1757] text-[11px] font-black text-white shadow-[0_0_34px_rgba(126,23,87,0.65)]">
                        {mapUnits.length}
                      </span>
                    </span>
                    <span className="rounded-full border border-[#7e1757]/35 bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#173f2c] shadow-lg backdrop-blur-md transition group-hover:border-[#7e1757]">
                      Guruva Group
                    </span>
                  </button>
                </Marker>
              )}

              {activeUnit ? (
                <Popup
                  latitude={activeUnit.lat}
                  longitude={activeUnit.lng}
                  closeButton={false}
                  closeOnClick={false}
                  anchor="bottom"
                  offset={28}
                  className={styles.popup}
                >
                  <div className="relative max-h-[320px] w-[300px] max-w-[86vw] overflow-hidden rounded-2xl border border-white/80 bg-white/80 p-4 text-[#173f2c] shadow-[0_24px_70px_rgba(40,30,10,0.28),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-2xl sm:w-[340px] sm:max-w-[82vw]">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(255,255,255,0.58)_48%,rgba(255,248,225,0.72))]" />
                    <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-white/95" />
                    <div className="relative max-h-[288px] overflow-y-auto pr-1">
                      <div className="mb-3 flex items-center gap-3">
                        {activeUnit.logoSrc ? (
                          <div className="grid h-14 w-20 shrink-0 place-items-center rounded-xl border border-[#e6d8af] bg-white p-2 shadow-sm">
                            <img src={activeUnit.logoSrc} alt={`Logo ${activeUnit.nome}`} className="max-h-full max-w-full object-contain" />
                          </div>
                        ) : null}
                        <div>
                          <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-[#a67918]">
                            Unidade agrícola
                          </span>
                          <strong className="block text-base font-black leading-tight">{activeUnit.nome}</strong>
                        </div>
                      </div>

                      {activeUnit.description ? <p className="text-sm leading-relaxed text-[#365a46]">{activeUnit.description}</p> : null}

                      {activeUnit.details?.length ? (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {activeUnit.details.map((detail) => (
                            <span
                              key={detail}
                              className="rounded-full border border-[#7e1757]/25 bg-[#fcf2f8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#7e1757]"
                            >
                              {detail}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <div className="mt-4 border-t border-[#e6d8af]/70 pt-3">
                        <a
                          href={activeUnit.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${activeUnit.lat},${activeUnit.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#7e1757] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#651045] hover:shadow-lg active:scale-[0.98]"
                        >
                          <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Ver localização
                        </a>
                      </div>
                    </div>
                  </div>
                </Popup>
              ) : null}
            </Map>
          ) : (
            <div className="flex h-full w-full flex-col justify-between bg-[#173f2c] p-6 text-white">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Petrolina - PE · Vale do São Francisco</span>
                <h3 className="mt-1 text-2xl font-bold">Localização das 4 Fazendas</h3>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {mapUnits.map((unit) => (
                  <a
                    key={unit.nome}
                    href={unit.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col gap-1 rounded-xl border border-white/20 bg-white/10 p-3 transition hover:bg-white/20"
                  >
                    <strong className="text-amber-300">{unit.nome}</strong>
                    <span className="text-xs text-white/80">{unit.description || "Unidade Agrícola"}</span>
                    <span className="mt-2 text-[10px] uppercase tracking-wider text-amber-400">Ver no Google Maps</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(255,248,232,0.34)_78%,rgba(71,51,20,0.22)_100%)]" />

          <div className="absolute bottom-5 right-5 z-10 overflow-hidden rounded-xl border border-[#d0b165]/30 bg-white/75 shadow-xl backdrop-blur-md">
            <button
              type="button"
              onClick={zoomIn}
              className="grid size-10 place-items-center text-lg font-black text-[#173f2c] transition hover:bg-[#d6aa35] hover:text-white"
              aria-label="Aproximar mapa"
            >
              +
            </button>
            <button
              type="button"
              onClick={zoomOut}
              className="grid size-10 place-items-center border-t border-[#d0b165]/30 text-lg font-black text-[#173f2c] transition hover:bg-[#d6aa35] hover:text-white"
              aria-label="Afastar mapa"
            >
              −
            </button>
          </div>

          <button
            type="button"
            className="absolute bottom-5 left-5 z-10 grid size-9 place-items-center rounded-full border border-[#d0b165]/30 bg-white/75 text-sm font-black text-[#173f2c] shadow-lg backdrop-blur-md"
            aria-label="Informações do mapa"
            title="© CARTO, © OpenStreetMap contributors"
          >
            i
          </button>
    </div>
  );

  return (
    <section
      className={
        isGreen
          ? "bg-[#82aa3c] px-4 py-16 text-white sm:px-6 lg:px-8"
          : isLeaf
            ? "leaf-map-section px-4 py-20 text-[#173f2c] sm:px-6 lg:px-8"
            : "bg-[#1c130c] px-4 py-20 text-amber-50 sm:px-6 lg:px-8"
      }
    >
      <div className="mx-auto max-w-6xl">
        {layout === "split" ? (
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-4">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-amber-400">{displayedEyebrow}</p>
              <h2 className="max-w-md font-serif text-4xl font-normal leading-[1.05] text-amber-50 sm:text-5xl">{title}</h2>
              {description ? <p className="mt-6 max-w-md text-sm leading-relaxed text-amber-50/70">{description}</p> : null}
              {sideItems?.length ? (
                <ul className="mt-8 space-y-4">
                  {sideItems.map((item) => (
                    <li key={item} className="group flex items-center gap-4">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-[#d5a642]" />
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-amber-50/90 transition-colors group-hover:text-[#d5a642]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="lg:col-span-8">{mapStage}</div>
          </div>
        ) : (
          <>
            <p
              className={
                isGreen
                  ? "mb-5 text-xs font-bold uppercase tracking-[0.36em] text-white/90"
                  : "mb-5 text-xs font-bold uppercase tracking-[0.36em] text-amber-400"
              }
            >
              {displayedEyebrow}
            </p>
            <h2
              className={
                isGreen
                  ? "mb-10 max-w-3xl font-serif text-4xl leading-none text-white sm:text-6xl"
                  : isLeaf
                    ? "mb-10 max-w-3xl font-serif text-4xl leading-none text-[#17120e] sm:text-6xl"
                    : "mb-10 max-w-3xl font-serif text-4xl leading-none text-amber-50 sm:text-6xl"
              }
            >
              {titleWords.join(" ")} <em className={isGreen ? "font-normal text-[#24180f]" : "font-normal text-amber-400"}>{titleLastWord}</em>
            </h2>
            {mapStage}
          </>
        )}
      </div>
    </section>
  );
}

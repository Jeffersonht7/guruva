"use client";

import dynamic from "next/dynamic";
import { GuruvaPageShell } from "@/components/GuruvaShell";
import { FarmCarousel } from "@/components/FarmCarousel";
import { farms, farmUnits } from "@/components/guruvaData";

const BusinessUnitsMap = dynamic(
  () => import("@/next-map-components/BusinessUnitsMap").then((module) => module.BusinessUnitsMap),
  {
    ssr: false,
    loading: () => (
      <section className="bg-[#1c130c] px-4 py-20 text-amber-50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-4">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-amber-400">Localização estratégica</p>
              <h2 className="max-w-md font-serif text-4xl font-normal leading-[1.05] text-amber-50 sm:text-5xl">
                Nossos Polos Produtivos
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-amber-50/70">
                Distribuição geográfica otimizada para garantir o microclima ideal para cada variedade de uva de
                mesa, com logística integrada para mercados globais.
              </p>
              <ul className="mt-8 space-y-4">
                {farms.map((farm) => (
                  <li key={farm.slug} className="flex items-center gap-4">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#d5a642]" />
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-amber-50/90">{farm.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-8">
              <div className="relative aspect-[4/3] animate-pulse rounded-3xl border border-white/10 bg-white/5 sm:aspect-video" />
            </div>
          </div>
        </div>
      </section>
    ),
  },
);

const stats = [
  {
    title: "100% Irrigação",
    text: "Sistemas inteligentes de gestão hídrica em toda a área produtiva das quatro fazendas.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3s6 7.2 6 11.2A6 6 0 0 1 6 14.2C6 10.2 12 3 12 3Z" />
      </svg>
    ),
  },
  {
    title: "Padrão de exportação",
    text: "Colheita e embalagem em menos de 24h, garantindo frescor máximo até o destino final.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
        <path d="M3 8l9 5 9-5M12 13v8" />
      </svg>
    ),
  },
  {
    title: "Certificações internacionais",
    text: "Auditorias constantes garantindo segurança alimentar e rastreabilidade em toda a cadeia.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="m9 12 2 2 4-4" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
];

export default function FazendasPage() {
  return (
    <GuruvaPageShell>
      <section className="subpage-hero farms-hero">
        <div
          className="farms-hero-banner"
          style={{ backgroundImage: "url('/assets/fazenda-de-mangas-vale-do-sao-francisco-1-1290x724.webp')" }}
        >
          <div className="farms-hero-copy">
            <span className="section-kicker">Nossas fazendas</span>
            <h1>
              Onde a terra encontra a <em style={{ color: "var(--gold)" }}>excelência</em> internacional.
            </h1>
            <p>
              Operações de alta precisão no coração do Vale do São Francisco, focadas em fruticultura de exportação
              com padrões rigorosos de qualidade e sustentabilidade.
            </p>
          </div>
        </div>
      </section>

      <BusinessUnitsMap
        unidades={farmUnits}
        variant="dark"
        layout="split"
        eyebrow="Localização estratégica"
        title="Nossos Polos Produtivos"
        description="Distribuição geográfica otimizada para garantir o microclima ideal para cada variedade de uva de mesa, com logística integrada para mercados globais."
        sideItems={farms.map((farm) => farm.name)}
      />

      <section className="section operation" aria-label="As fazendas do grupo">
        <FarmCarousel
          farms={farms}
          kicker="As 4 fazendas do grupo"
          title="Um grupo, quatro fazendas, um só padrão de qualidade."
        />
      </section>

      <section className="subpage-section" data-reveal>
        <span className="section-kicker">Padrão operacional</span>
        <h2>Tecnologia e rigor em cada etapa do cultivo.</h2>
        <div className="values-grid farm-stats-grid">
          {stats.map((stat) => (
            <article key={stat.title}>
              <span className="value-icon stat-icon" aria-hidden="true">
                {stat.icon}
              </span>
              <h3>{stat.title}</h3>
              <p>{stat.text}</p>
            </article>
          ))}
        </div>
      </section>
    </GuruvaPageShell>
  );
}

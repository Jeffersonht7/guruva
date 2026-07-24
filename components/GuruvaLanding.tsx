"use client";

import dynamic from "next/dynamic";
import { FarmCarousel } from "./FarmCarousel";
import { GrapeCarousel } from "./GrapeCarousel";
import { CareersModal, CommercialModal, SiteFooter, SiteHeader } from "./GuruvaShell";
import { farms, farmUnits, grapes, partners } from "./guruvaData";
import { useGuruvaInteractions } from "./useGuruvaInteractions";

const BusinessUnitsMap = dynamic(
  () => import("../next-map-components/BusinessUnitsMap").then((module) => module.BusinessUnitsMap),
  {
    ssr: false,
    loading: () => (
      <section className="bg-[#82aa3c] px-4 py-16 text-amber-50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.36em] text-white/90">Mapa das fazendas</p>
          <h2 className="mb-10 max-w-3xl font-serif text-4xl leading-none text-white sm:text-6xl">
            Onde a operação se <em className="font-normal text-[#24180f]">conecta.</em>
          </h2>
          <div className="relative h-[360px] animate-pulse rounded-2xl border border-white/40 bg-[#6b912c] sm:h-[440px] lg:h-[520px]" />
        </div>
      </section>
    ),
  },
);

const metricSlots = [
  { a: ["20+", "Anos de história"], b: ["18+", "Países atendidos"] },
  { a: ["4", "Empresas no ecossistema"], b: ["9.500+", "Toneladas exportadas"] },
  { a: ["850+", "Hectares cultivados"], b: ["12m", "Produção durante todo o ano"] },
];

export function GuruvaLanding() {
  useGuruvaInteractions();

  return (
    <>
      <SiteHeader initiallyScrolled={false} />

      <main id="top">
        <section className="hero" aria-label="Guruva Group">
          <video
            className="hero-video"
            src="/assets/guruva-hero.mp4"
            poster="/assets/guruva-hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="hero-shade"></div>
          <div className="hero-content">
            <h1 className="hero-title" aria-label="Do Vale do São Francisco para o mundo. From the São Francisco Valley to the world.">
              <span className="headline-art headline-art-pt">
                <img src="/assets/headline-pt.svg" alt="" aria-hidden="true" />
              </span>
              <span className="headline-art headline-art-en">
                <img src="/assets/headline-en.svg" alt="" aria-hidden="true" />
              </span>
            </h1>
          </div>
          <div className="hero-scroll-cue" aria-hidden="true">
            <span></span>
          </div>
        </section>

        <section className="metrics" id="operacao" aria-label="Dados da operação">
          <div className="metrics-stage">
            {metricSlots.map((slot) => (
              <article className="metric-slot" key={slot.a[1]}>
                <div className="metric-card metric-card-a">
                  <strong className="metric-value">{slot.a[0]}</strong>
                  <span className="metric-label">{slot.a[1]}</span>
                </div>
                <div className="metric-card metric-card-b">
                  <strong className="metric-value">{slot.b[0]}</strong>
                  <span className="metric-label">{slot.b[1]}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="leaf-field">
          <section className="section operation" aria-label="Fazendas do grupo">
            <FarmCarousel
              farms={farms}
              kicker="As 4 fazendas do grupo"
              title="Um grupo, quatro fazendas, um só padrão de qualidade."
              variant="simple"
            />
          </section>

          <div className="map-section-divider-container" aria-hidden="true">
            <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="map-section-divider-svg">
              <path d="M 0,140 L 0,18 C 380,-25 820,40 1440,95 L 1440,140 Z" fill="#82aa3c" />
            </svg>
          </div>
        </div>

        <div className="map-green-section">
          <BusinessUnitsMap unidades={farmUnits} variant="green" title="Onde a operação se conecta." />
        </div>

        <section className="partners-section" aria-label="Parceiros que confiam no Grupo Guruva">
          <div className="partners-title-container">
            <span className="partners-title">Parceiros que confiam no Grupo Guruva</span>
          </div>
          <div className="partners-marquee">
            <div className="partners-track">
              {[0, 1, 2, 3].map((group) => (
                <div className="partners-group" aria-hidden={group > 0} key={group}>
                  {partners.map((partner) => (
                    <img src={partner.logo} alt={group === 0 ? partner.name : ""} key={`${group}-${partner.name}`} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="group-cta-section" aria-label="Conheça o Grupo Guruva">
          <div className="group-cta-inner">
            <span className="section-kicker">ECOSSISTEMA INTEGRADO</span>
            <h2>Uma estrutura sólida de cultivo, qualidade e exportação.</h2>
            <p>Conheça a história, a tecnologia e a presença internacional das 4 fazendas que formam o Grupo Guruva.</p>
            <div className="group-cta-actions">
              <a className="button primary" href="/quem-somos">
                Conhecer o Grupo Guruva
              </a>
            </div>
          </div>
        </section>

        <GrapeCarousel />

        <section className="certifications-section" id="certificacoes">
          <div className="certifications-copy">
            <h2>Nossas Certificações</h2>
            <p>
              A Guruva atua com processos auditáveis e práticas agrícolas sustentáveis, reforçando o compromisso com
              qualidade, rastreabilidade, segurança do alimento e responsabilidade no campo.
            </p>
          </div>
          <div className="certifications-logos" aria-label="Certificações">
            <img src="/assets/cert-globalgap.png" alt="GlobalG.A.P. GGN certificado" />
            <img src="/assets/cert-smeta.svg" alt="SMETA Sedex certificado" />
          </div>
          <a className="certifications-cta" href="/sustentabilidade-certificacoes">
            Veja todas as certificações
          </a>
        </section>

        <section className="section market" id="mercado">
          <div>
            <span className="section-kicker">Presença internacional</span>
            <h2>Do Vale do São Francisco para compradores globais.</h2>
            <p>
              A operação posiciona o Brasil como origem, o Vale como território produtivo e os mercados internacionais
              como destino de uma cadeia preparada para consistência.
            </p>
          </div>
          <div className="market-map-card" aria-label="Mapa de presença internacional">
            <div className="market-map-stage" role="img" aria-label="Mercados atendidos pela Guruva no mapa mundi">
              <img className="market-map-image" src="/assets/market-map-enhanced.png" alt="" aria-hidden="true" />
            </div>
            <button className="market-commercial-cta" type="button" data-commercial-open>
              Falar com time comercial
            </button>
          </div>
        </section>
      </main>

      <CommercialModal />
      <CareersModal />
      <SiteFooter />
    </>
  );
}

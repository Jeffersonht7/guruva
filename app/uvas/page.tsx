import { GuruvaPageShell } from "@/components/GuruvaShell";
import SocialCards from "@/components/ui/card-fan-carousel";
import { grapes } from "@/components/guruvaData";

const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

const grapeFanCards = grapes.map((grape) => ({
  imgUrl: grape.image,
  alt: grape.name,
  title: grape.shortName,
  description: grape.description,
}));

export default function UvasPage() {
  return (
    <GuruvaPageShell>
      <section className="subpage-hero grape-page-hero">
        <span className="section-kicker">Nossas uvas</span>
        <h1>Uva de mesa sem sementes com padrão de exportação.</h1>
        <p>
          Trabalhamos com variedades selecionadas pelo equilíbrio entre sabor, aparência e desempenho logístico, para
          que a qualidade chegue intacta ao consumidor final.
        </p>
      </section>

      <section className="grape-carousel-section" aria-label="Nossas Variedades de Uvas">
        <SocialCards cards={grapeFanCards} accent="green" />
      </section>

      <section className="grape-catalog-section" data-reveal>
        <div className="farm-location-divider farm-location-divider-top" aria-hidden="true">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
          </svg>
        </div>
        <div className="grape-catalog-inner">
          <span className="section-kicker">Catálogo completo</span>
          <h2>Seleção premium.</h2>
          <div className="grape-catalog-grid">
            {grapes.map((grape) => (
              <article className="grape-catalog-card" key={grape.name}>
                <img src={grape.image} alt={grape.name} />
                <div className="grape-catalog-card-body">
                  <span>Seedless</span>
                  <h3>{grape.shortName}</h3>
                  <div className="grape-catalog-tags">
                    <span className="grape-tag-pill">{grape.color}</span>
                    <span className="grape-tag-pill">{grape.texture}</span>
                    <span className="grape-tag-pill">{grape.sweetness}</span>
                  </div>
                  <p>{grape.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="farm-location-divider farm-location-divider-bottom" aria-hidden="true">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
          </svg>
        </div>
      </section>

      <section className="subpage-section harvest-calendar-section" data-reveal>
        <span className="section-kicker">Disponibilidade</span>
        <h2>Calendário de safra.</h2>
        <p className="harvest-calendar-intro">
          Colhemos o ano inteiro: cada variedade tem sua janela de pico, garantindo fornecimento contínuo para o
          mercado internacional. Datas indicativas — janelas variam conforme o ciclo de poda e o clima da safra.
        </p>
        <div className="harvest-calendar-card">
          <div className="harvest-calendar-scroll">
            <div className="harvest-calendar-table">
              <div className="harvest-calendar-row harvest-calendar-header">
                <span className="harvest-calendar-label" aria-hidden="true" />
                {months.map((month) => (
                  <span className="harvest-calendar-month" key={month}>
                    {month}
                  </span>
                ))}
              </div>
              {grapes.map((grape) => (
                <div className="harvest-calendar-row" key={grape.name}>
                  <span className="harvest-calendar-label">{grape.shortName}</span>
                  {months.map((_, index) => (
                    <span
                      className={`harvest-calendar-cell${grape.harvestMonths.includes(index + 1) ? " is-active" : ""}`}
                      key={grape.name + index}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="harvest-calendar-legend">
          <span>
            <i className="harvest-calendar-dot" aria-hidden="true" />
            Pico de safra
          </span>
        </div>
      </section>

      <section className="group-cta-section" aria-label="Fale com o time comercial sobre as variedades">
        <div className="group-cta-inner">
          <span className="section-kicker">Fale com a gente</span>
          <h2>Interessado em levar o padrão Guruva para o seu mercado?</h2>
          <p>
            Nosso time comercial apresenta especificações técnicas, disponibilidade de safra e condições de
            exportação para cada variedade.
          </p>
          <div className="group-cta-actions">
            <a className="button primary" href="#contato" data-commercial-open>
              Falar com consultor
            </a>
            <a className="group-cta-secondary" href="/sustentabilidade-certificacoes">
              Ver certificações
            </a>
          </div>
        </div>
      </section>
    </GuruvaPageShell>
  );
}

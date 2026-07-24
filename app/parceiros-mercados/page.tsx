import { GuruvaPageShell } from "@/components/GuruvaShell";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";

const testimonials = [
  {
    quote: "A consistência de padrão e a previsibilidade logística tornam a operação muito competitiva.",
    source: "Comprador europeu",
    tag: "depoimento modelo",
  },
  {
    quote: "A rastreabilidade e a qualidade visual das uvas ajudam a proteger nosso programa no varejo.",
    source: "Distribuidor asiático",
    tag: "depoimento modelo",
  },
  {
    quote: "O calendário de colheita da Guruva encaixa perfeitamente com a janela de demanda do nosso mercado.",
    source: "Importador norte-americano",
    tag: "depoimento modelo",
  },
];

const marketCountries = ["United Kingdom", "Netherlands", "Germany", "USA", "Canada", "UAE"];

export default function ParceirosMercadosPage() {
  return (
    <GuruvaPageShell>
      <section className="subpage-hero hero-centered mercados-hero">
        <span className="section-kicker">Parceiros & mercados</span>
        <h1>
          Compromisso técnico,
          <br />
          <em>presença global.</em>
        </h1>
        <p>
          Unindo tecnologia de ponta aos principais mercados do mundo através de uma cadeia de suprimentos integrada e parcerias estratégicas.
        </p>
        <div className="mercados-hero-divider" aria-hidden="true">
          <span className="mercados-hero-line" />
          <span className="mercados-hero-icons">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="9" cy="12" r="5" />
              <circle cx="15" cy="12" r="5" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
          <span className="mercados-hero-line" />
        </div>
      </section>

      <section className="subpage-section testimonials-section" data-reveal>
        <span className="section-kicker">Compradores internacionais</span>
        <h2>Depoimentos que atravessam fronteiras.</h2>
        <TestimonialsCarousel items={testimonials} />
      </section>

      <section className="section market subpage-market" id="mercado">
        <div>
          <div className="section-kicker">Presença internacional</div>
          <h2>Levando o melhor da nossa terra para o mundo.</h2>
          <p>

          </p>
          <div className="market-stats">
            <div className="market-stat">
              <strong>18+</strong>
              <span>Países atendidos</span>
            </div>
            <div className="market-stat">
              <strong>9.5k</strong>
              <span>Toneladas exportadas / ano</span>
            </div>
          </div>
          <div className="market-countries" aria-label="Principais mercados atendidos">
            {marketCountries.map((country) => (
              <span key={country}>{country}</span>
            ))}
          </div>
        </div>
        <div className="market-map-card" aria-label="Mapa de presença internacional">
          <div className="market-map-stage" role="img" aria-label="Mercados atendidos pela Guruva no mapa mundi">
            <img className="market-map-image" src="/assets/market-map-enhanced.png" alt="" aria-hidden="true" />
          </div>
        </div>
      </section>

    </GuruvaPageShell>
  );
}

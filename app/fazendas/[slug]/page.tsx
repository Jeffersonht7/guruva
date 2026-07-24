import { notFound } from "next/navigation";
import { GuruvaPageShell } from "@/components/GuruvaShell";
import { farms, farmUnits, grapes } from "@/components/guruvaData";

export function generateStaticParams() {
  return farms.map((farm) => ({ slug: farm.slug }));
}

function formatCoordinate(value: number, positive: string, negative: string) {
  const dir = value >= 0 ? positive : negative;
  const abs = Math.abs(value);
  const deg = Math.floor(abs);
  const minFloat = (abs - deg) * 60;
  const min = Math.floor(minFloat);
  const sec = Math.round((minFloat - min) * 60);
  return `${deg}° ${min}' ${sec}" ${dir}`;
}

function formatCoordinates(lat: number, lng: number) {
  return `${formatCoordinate(lat, "N", "S")} ${formatCoordinate(lng, "E", "W")}`;
}

const differentiatorIcons = [
  <svg key="irrigation" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 3s6 7.2 6 11.2A6 6 0 0 1 6 14.2C6 10.2 12 3 12 3Z" />
  </svg>,
  <svg key="logistics" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
    <path d="M3 8l9 5 9-5M12 13v8" />
  </svg>,
  <svg key="soil" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="m9 12 2 2 4-4" />
    <circle cx="12" cy="12" r="9" />
  </svg>,
];

export default function FazendaPage({ params }: { params: { slug: string } }) {
  const farm = farms.find((item) => item.slug === params.slug);
  if (!farm) notFound();

  const unit = farmUnits.find((item) => item.nome === farm.shortName || item.nome.startsWith(farm.shortName));

  return (
    <GuruvaPageShell>
      <section className="subpage-hero farms-hero">
        <div className="farms-hero-banner" style={{ backgroundImage: `url('${farm.photo}')` }}>
          <div className="farms-hero-copy">
            <span className="section-kicker">Fazenda do grupo</span>
            <h1>{farm.name}</h1>
            <p>{farm.highlight}</p>
          </div>
        </div>
      </section>

      <section className="farm-location-section" data-reveal>
        <div className="farm-location-divider farm-location-divider-top" aria-hidden="true">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
          </svg>
        </div>
        <div className="farm-location-card">
          <div className="farm-location-info">
            <span className="farm-location-kicker">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 21s7-6.4 7-11.5A7 7 0 0 0 5 9.5C5 14.6 12 21 12 21Z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              Localização privilegiada
            </span>
            <h2>Onde a terra encontra o sol.</h2>
            <dl className="farm-location-facts">
              <div>
                <dt>Endereço</dt>
                <dd>{farm.address}</dd>
              </div>
              <div>
                <dt>Cidade</dt>
                <dd>Petrolina - PE, Vale do São Francisco</dd>
              </div>
              {unit ? (
                <div>
                  <dt>Coordenadas</dt>
                  <dd>{formatCoordinates(unit.lat, unit.lng)}</dd>
                </div>
              ) : null}
            </dl>
          </div>
          {unit ? (
            <div className="farm-location-map">
              <iframe
                title={`Mapa da ${farm.name}`}
                src={`https://www.google.com/maps?q=${unit.lat},${unit.lng}&z=12&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <span className="farm-location-map-badge">Mapa interativo</span>
            </div>
          ) : null}
        </div>
        <div className="farm-location-divider farm-location-divider-bottom" aria-hidden="true">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
          </svg>
        </div>
      </section>

      <section className="subpage-section" data-reveal>
        <span className="section-kicker">Diferenciais da operação</span>
        <h2>Por que essa unidade se destaca.</h2>
        <div className="values-grid farm-stats-grid">
          {farm.details.map((detail, index) => (
            <article key={detail}>
              <span className="value-icon stat-icon" aria-hidden="true">
                {differentiatorIcons[index % differentiatorIcons.length]}
              </span>
              <h3>{detail}</h3>
              <p>Estrutura integrada ao ecossistema Guruva, conectando manejo agrícola, padrão técnico e fluxo comercial.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="subpage-section" data-reveal>
        <span className="section-kicker">Uvas cultivadas aqui</span>
        <h2>Variedades premium desta unidade.</h2>
        <div className="values-grid farm-grape-grid">
          {grapes.map((grape) => (
            <article key={grape.name} className="farm-grape-card">
              <img src={grape.image} alt={grape.name} />
              <div>
                <h3>{grape.shortName}</h3>
                <p>{grape.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="group-cta-section" aria-label={`Conheça a ${farm.name}`}>
        <div className="group-cta-inner">
          <span className="section-kicker">Fale com a gente</span>
          <h2>Quer conhecer a {farm.shortName} de perto?</h2>
          <p>
            Nosso time comercial apresenta o padrão de qualidade, a capacidade produtiva e a logística de exportação
            desta unidade.
          </p>
          <div className="group-cta-actions">
            <a className="button primary" href="#contato" data-commercial-open>
              Fale com especialista
            </a>
            <a className="group-cta-secondary" href="/fazendas">
              Ver outras unidades
            </a>
          </div>
        </div>
      </section>
    </GuruvaPageShell>
  );
}

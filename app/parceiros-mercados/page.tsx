import { GuruvaPageShell } from "@/components/GuruvaShell";
import { partners } from "@/components/guruvaData";

export default function ParceirosMercadosPage() {
  return (
    <GuruvaPageShell>
      <section className="subpage-hero leaf-page">
        <span className="section-kicker">Parceiros & mercados</span>
        <h1>Parcerias técnicas e presença internacional.</h1>
        <p>
          Contamos com parceiros técnicos e institucionais que sustentam nossa evolução constante, enquanto nossa uva
          chega a mercados internacionais com o padrão do Vale do São Francisco.
        </p>
      </section>

      <section className="subpage-section partner-logo-grid">
        {partners.map((partner) => (
          <article key={partner.name}>
            <img src={partner.logo} alt={partner.name} />
          </article>
        ))}
      </section>

      <section className="section market subpage-market" id="mercado">
        <div>
          <div className="section-kicker">Presença internacional</div>
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
    </GuruvaPageShell>
  );
}

import { GuruvaPageShell } from "@/components/GuruvaShell";
import { farms } from "@/components/guruvaData";

export default function ContatoPage() {
  return (
    <GuruvaPageShell>
      <section className="subpage-hero contact-page-hero">
        <span className="section-kicker">Contato</span>
        <h1>Vamos falar sobre a sua próxima safra?</h1>
        <p>
          Seja para comprar, abrir parceria comercial ou solicitar especificações, nosso time está pronto para atender.
        </p>
        <button className="subpage-cta" type="button" data-commercial-open>
          Falar com comercial
        </button>
      </section>

      <section className="subpage-section split-section">
        <div>
          <span className="section-kicker">Comercial / Exportação</span>
          <h2>grupoguruva@guruva.com.br</h2>
        </div>
        <p>+55 (87) 3032-8525</p>
      </section>

      <section className="subpage-section contact-farms">
        {farms.map((farm) => (
          <article key={farm.slug}>
            <img src={farm.logo} alt={farm.name} />
            <div>
              <h3>{farm.name}</h3>
              <p>{farm.address}</p>
            </div>
          </article>
        ))}
      </section>
    </GuruvaPageShell>
  );
}

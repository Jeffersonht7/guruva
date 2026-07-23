import { GuruvaPageShell } from "@/components/GuruvaShell";
import { grapes } from "@/components/guruvaData";

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

      <section className="subpage-section grape-catalog">
        {grapes.map((grape) => (
          <article key={grape.name}>
            <img src={grape.image} alt={grape.name} />
            <div>
              <span>Seedless</span>
              <h2>{grape.name}</h2>
              <dl>
                <div>
                  <dt>Cor</dt>
                  <dd>{grape.color}</dd>
                </div>
                <div>
                  <dt>Textura</dt>
                  <dd>{grape.texture}</dd>
                </div>
                <div>
                  <dt>Doçura</dt>
                  <dd>{grape.sweetness}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </section>
    </GuruvaPageShell>
  );
}

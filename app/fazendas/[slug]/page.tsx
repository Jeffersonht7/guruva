import { notFound } from "next/navigation";
import { GuruvaPageShell } from "@/components/GuruvaShell";
import { farms } from "@/components/guruvaData";

export function generateStaticParams() {
  return farms.map((farm) => ({ slug: farm.slug }));
}

export default function FazendaPage({ params }: { params: { slug: string } }) {
  const farm = farms.find((item) => item.slug === params.slug);
  if (!farm) notFound();

  return (
    <GuruvaPageShell>
      <section className="subpage-hero farm-detail-hero">
        <div>
          <span className="section-kicker">Fazenda do grupo</span>
          <h1>{farm.name}</h1>
          <p>{farm.highlight}</p>
        </div>
        <img src={farm.logo} alt={farm.name} />
      </section>

      <section className="subpage-section split-section">
        <div>
          <span className="section-kicker">Localização</span>
          <h2>Projeto de Irrigação Senador Nilo Coelho, Petrolina-PE.</h2>
        </div>
        <p>{farm.address}</p>
      </section>

      <section className="subpage-section values-grid">
        {farm.details.map((detail) => (
          <article key={detail}>
            <span>{farm.shortName}</span>
            <h3>{detail}</h3>
            <p>Estrutura integrada ao ecossistema Guruva, conectando manejo agrícola, padrão técnico e fluxo comercial.</p>
          </article>
        ))}
      </section>
    </GuruvaPageShell>
  );
}

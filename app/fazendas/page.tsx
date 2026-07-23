import { GuruvaPageShell } from "@/components/GuruvaShell";
import { farms } from "@/components/guruvaData";

export default function FazendasPage() {
  return (
    <GuruvaPageShell>
      <section className="subpage-hero leaf-page">
        <span className="section-kicker">Nossas fazendas</span>
        <h1>Um grupo, quatro fazendas, um só padrão de qualidade.</h1>
        <p>
          Cada fazenda do Guruva Group tem sua própria identidade produtiva, mas compartilha o mesmo compromisso:
          ciência aplicada ao campo e uva de mesa sem sementes com padrão de exportação.
        </p>
      </section>

      <section className="subpage-section farm-directory">
        {farms.map((farm) => (
          <a className="farm-directory-card" href={`/fazendas/${farm.slug}`} key={farm.slug}>
            <img src={farm.logo} alt={farm.name} />
            <span>Desde {farm.year}</span>
            <h2>{farm.name}</h2>
            <p>{farm.summary}</p>
            <strong>Saiba mais</strong>
          </a>
        ))}
      </section>
    </GuruvaPageShell>
  );
}

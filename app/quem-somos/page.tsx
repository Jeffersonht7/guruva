import { GuruvaPageShell } from "@/components/GuruvaShell";

const timeline = [
  ["2004", "Implantação da Fazenda Guruva, origem do grupo."],
  ["2009", "Expansão com a aquisição da fazenda Ecograpes."],
  ["2011", "Incorporação da Nacional Frutas, fortalecendo comercialização e exportação."],
  ["2020", "Implantação da Fazenda Vinor, câmara fria própria e novas variedades."]
];

export default function QuemSomosPage() {
  return (
    <GuruvaPageShell>
      <section className="subpage-hero leaf-page">
        <span className="section-kicker">Quem somos</span>
        <h1>Somos apaixonados pela cultura da uva.</h1>
        <p>
          O Guruva Group nasceu em 2004, no coração do Vale do São Francisco, em Petrolina (PE), com a implantação da
          Fazenda Guruva. De lá para cá, o que começou como uma fazenda se tornou um grupo de quatro empresas
          especializadas na cultura da uva de mesa sem sementes.
        </p>
      </section>

      <section className="subpage-section split-section">
        <div>
          <span className="section-kicker">Origem e evolução</span>
          <h2>Quase duas décadas unindo campo, ciência e consistência.</h2>
        </div>
        <p>
          Ao longo da nossa trajetória, unimos persistência, empreendedorismo e ciência para dominar a arte de produzir
          uvas premium. Hoje produzimos, resfriamos e comercializamos uvas para atender mercados internos e
          internacionais, sustentados por parcerias sólidas com clientes e fornecedores.
        </p>
      </section>

      <section className="subpage-section values-grid">
        <article>
          <span>Missão</span>
          <h3>Frutas saudáveis</h3>
          <p>Produzir, de maneira sustentável e sistêmica, frutas saudáveis em boas condições econômicas, sociais e ambientais.</p>
        </article>
        <article>
          <span>Visão</span>
          <h3>Referência no Vale</h3>
          <p>Ser um grupo sólido e referência na produção de frutas do Vale do São Francisco, com boas práticas de gestão e manejo.</p>
        </article>
        <article>
          <span>Valores</span>
          <h3>Ética e excelência</h3>
          <p>Transparência, eficiência operacional, valorização da equipe e governança ambiental em toda a produção.</p>
        </article>
      </section>

      <section className="subpage-section">
        <span className="section-kicker">Linha do tempo</span>
        <h2>Do nascimento da Guruva à consolidação do grupo.</h2>
        <div className="timeline-ribbon subpage-ribbon">
          {timeline.map(([year, text]) => (
            <article key={year}>
              <strong>{year}</strong>
              <span>{text}</span>
            </article>
          ))}
        </div>
      </section>
    </GuruvaPageShell>
  );
}

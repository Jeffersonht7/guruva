import { GuruvaPageShell } from "@/components/GuruvaShell";

export default function SustentabilidadeCertificacoesPage() {
  return (
    <GuruvaPageShell>
      <section className="subpage-hero leaf-page">
        <span className="section-kicker">Sustentabilidade & certificações</span>
        <h1>Qualidade auditada, do campo à exportação.</h1>
        <p>
          Produzir bem é produzir com responsabilidade: com os colaboradores, com o meio ambiente e com quem recebe a
          nossa fruta em qualquer parte do mundo.
        </p>
      </section>

      <section className="certifications-section page-certifications">
        <div className="certifications-copy">
          <h2>Nossas Certificações</h2>
          <p>
            Mantemos processos auditáveis que reforçam nosso compromisso com boas práticas agrícolas, segurança do
            alimento, rastreabilidade e respeito ao trabalho no campo.
          </p>
        </div>
        <div className="certifications-logos" aria-label="Certificações">
          <button className="cert-nav" type="button" aria-label="Anterior">
            ‹
          </button>
          <img src="/assets/cert-globalgap.png" alt="GlobalG.A.P. GGN certificado" />
          <button className="cert-nav" type="button" aria-label="Próxima">
            ›
          </button>
        </div>
      </section>

      <section className="subpage-section values-grid">
        <article>
          <span>Campo</span>
          <h3>Boas práticas agrícolas</h3>
          <p>Manejo técnico, controle de origem e rotinas pensadas para preservar a qualidade do produto.</p>
        </article>
        <article>
          <span>Pessoas</span>
          <h3>Responsabilidade social</h3>
          <p>Segurança, treinamento e valorização das equipes envolvidas no processo produtivo.</p>
        </article>
        <article>
          <span>Governança</span>
          <h3>Processos auditáveis</h3>
          <p>Documentação, rastreabilidade e melhoria contínua para atender mercados exigentes.</p>
        </article>
      </section>
    </GuruvaPageShell>
  );
}

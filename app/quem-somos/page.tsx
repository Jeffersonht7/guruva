import { GuruvaPageShell } from "@/components/GuruvaShell";
import { CinematicVideoSection } from "@/components/CinematicVideoSection";
import { TimelineJourney } from "@/components/TimelineJourney";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { ValuesCarousel } from "@/components/ValuesCarousel";

const valuesData = [
  {
    icon: "/assets/missao.png",
    title: "Missão",
    text: "Conectar o mundo à excelência da fruticultura brasileira, entregando uvas de sabor inigualável com compromisso ético e sustentável.",
  },
  {
    icon: "/assets/visao.png",
    title: "Visão",
    text: "Ser o principal elo global entre o produtor de elite e o mercado consumidor premium, inovando em logística e qualidade.",
  },
  {
    icon: "/assets/valores.png",
    title: "Valores",
    text: "Respeito à terra, integridade nas relações, obsessão pela qualidade e inovação constante no campo e na gestão.",
  },
];

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

const timeline = [
  {
    year: "2004",
    title: "Fundação",
    text: "Implantação da Fazenda Guruva, origem do grupo.",
    image: "/assets/quem-somos-hero-photo.avif",
  },
  {
    year: "2009",
    title: "Expansão",
    text: "Expansão do grupo com a aquisição da Fazenda Ecograpes.",
    image: "/assets/quem%20somos%20img1.webp",
  },
  {
    year: "2011",
    title: "Consolidação",
    text: "Expansão do grupo com a aquisição da Fazenda Nacional Frutas.",
    image: "/assets/42057232-ai-gerado-vermelho-uvas-dentro-vinhedo-as-por-do-sol-foto.webp",
  },
  {
    year: "2020",
    title: "Nova unidade",
    text: "Implantação da Fazenda Vinor.",
    image: "/assets/clima-uva-temperatura-chuva-impacto-videira.webp",
  },
  {
    year: "2020",
    title: "Câmara fria",
    text: "Instalação de câmara fria própria.",
    image: "/assets/quem-somos-hero-photo.avif",
  },
  {
    year: "2020",
    title: "Novas variedades",
    text: "Implantação de novas variedades de uvas.",
    image: "/assets/quem%20somos%20img1.webp",
  },
];

export default function QuemSomosPage() {
  return (
    <GuruvaPageShell>
      <section className="subpage-hero hero-centered hero-tight hero-photo-bg">
        <span className="section-kicker">Quem somos</span>
        <h1>Somos apaixonados pela cultura da uva.</h1>
        <p>
          Fundada em 2004 em Petrolina-PE, a Guruva nasceu da união entre tradição familiar e visão global,
          transformando a riqueza do solo nordestino em excelência para o mundo.
        </p>
      </section>

      <section className="subpage-section values-grid-overlap" data-reveal>
        <ValuesCarousel items={valuesData} />
      </section>

      <section className="subpage-section evolution-section" data-reveal>
        <div>
          <h2>Uma evolução enraizada na qualidade.</h2>
          <p>
            O que começou como um sonho familiar nas margens do Rio São Francisco tornou-se referência internacional
            em exportação de frutas. Ao longo de duas décadas, a Guruva consolidou-se não apenas como produtora, mas
            como uma curadora de variedades premium, investindo em tecnologia de irrigação de ponta e processos de
            colheita manuais que respeitam o tempo da natureza.
          </p>
          <p>
            Nossa jornada é marcada pela resiliência e pela busca constante pelo sabor perfeito. Hoje, cruzamos
            fronteiras, levando a doçura e o frescor das uvas brasileiras para os mercados mais exigentes da Europa,
            Ásia e América do Norte.
          </p>
        </div>
        <div className="evolution-media">
          <img
            src="/assets/42057232-ai-gerado-vermelho-uvas-dentro-vinhedo-as-por-do-sol-foto.webp"
            alt="Uvas vermelhas no vinhedo ao pôr do sol"
          />
        </div>
      </section>

      <CinematicVideoSection
        videoSrc="/assets/guruva-hero.mp4"
        posterSrc="/assets/clima-uva-temperatura-chuva-impacto-videira.webp"
        kicker="Origem Petrolina"
        title="Onde a terra encontra o sol."
        ariaLabel="Origem em Petrolina"
      />

      <section className="subpage-section timeline-section" data-reveal>
        <span className="section-kicker">Nossa jornada</span>
        <h2>Marcos da nossa expansão.</h2>
        <TimelineJourney items={timeline} />
      </section>

      <section className="subpage-section testimonials-section" data-reveal>
        <span className="section-kicker">Compradores internacionais</span>
        <h2>Depoimentos que atravessam fronteiras.</h2>
        <TestimonialsCarousel items={testimonials} />
      </section>

      <section className="subpage-cta-panel" aria-label="Conheça as fazendas do grupo" data-reveal>
        <h2>Quer conhecer a origem da nossa qualidade?</h2>
        <a className="button primary" href="/fazendas">
          Conhecer nossas fazendas
        </a>
      </section>
    </GuruvaPageShell>
  );
}

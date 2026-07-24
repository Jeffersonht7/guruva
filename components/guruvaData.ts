import type { Unidade } from "@/next-map-components/BusinessUnitsMap";

export const farmUnits: Unidade[] = [
  {
    nome: "Guruva",
    lat: -9.3388923,
    lng: -40.6211587,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=-9.3388923,-40.6211587",
    logoSrc: "/assets/farm-guruva.png",
    address: "Projeto de Irrigação Senador Nilo Coelho, 291, núcleo 3, zona rural, Petrolina-PE, CEP 56.300-000",
    description: "Unidade de origem do grupo, conectando cultivo, padrão técnico e gestão da operação.",
    details: ["Cultivo de uvas premium", "Base operacional Guruva", "Vale do São Francisco"]
  },
  {
    nome: "Ecograpes",
    lat: -9.361071,
    lng: -40.647121,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=-9.361071,-40.647121",
    logoSrc: "/assets/farm-ecograpes.png",
    address: "Projeto de Irrigação Senador Nilo Coelho, 210, lote agrícola 120, núcleo 05, zona rural, Petrolina-PE, CEP 56.300-000",
    description: "Unidade agrícola integrada ao ecossistema, com foco em produção, manejo e consistência de entrega.",
    details: ["Produção agrícola", "Manejo técnico", "Controle de qualidade"]
  },
  {
    nome: "Nacional Frutas",
    lat: -9.328677,
    lng: -40.726624,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=-9.328677,-40.726624",
    logoSrc: "/assets/farm-nacional-frutas.png",
    address: "Projeto de Irrigação Senador Nilo Coelho, núcleo 04, lote agrícola CS19, zona rural, Petrolina-PE, CEP 56.302-970",
    description: "Unidade voltada ao fortalecimento produtivo e comercial do grupo.",
    details: ["Núcleo 04", "Capacidade produtiva", "Exportação"]
  },
  {
    nome: "Vinor",
    lat: -9.387055,
    lng: -40.734566,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=-9.387055,-40.734566",
    logoSrc: "/assets/farm-vinor.png",
    address: "Projeto de Irrigação Senador Nilo Coelho, núcleo 04, lote agrícola 009A, zona rural, Petrolina-PE, CEP 56.302-970",
    description: "Unidade agrícola posicionada para ampliar cobertura e fluxo produtivo.",
    details: ["Agronegócios", "Área rural irrigada", "Fluxo integrado"]
  }
];

export const farms = [
  {
    slug: "guruva",
    name: "Guruva Agronegócio",
    shortName: "Guruva",
    year: "2004",
    logo: "/assets/farm-guruva.png",
    image: "/assets/farm-guruva.png",
    photo: "/assets/42057232-ai-gerado-vermelho-uvas-dentro-vinhedo-as-por-do-sol-foto.webp",
    address: "Projeto de Irrigação Senador Nilo Coelho, 291, núcleo 3, zona rural, Petrolina-PE, CEP 56.300-000",
    summary: "A fazenda que deu origem ao grupo, no coração do Vale do São Francisco.",
    highlight: "Unidade de origem do grupo, conectando cultivo, padrão técnico e gestão da operação.",
    details: ["Cultivo de uvas premium", "Base operacional Guruva", "Vale do São Francisco"]
  },
  {
    slug: "ecograpes",
    name: "Ecograpes Agronegócio",
    shortName: "Ecograpes",
    year: "2009",
    logo: "/assets/farm-ecograpes.png",
    image: "/assets/farm-ecograpes.png",
    photo: "/assets/quem%20somos%20img1.webp",
    address: "Projeto de Irrigação Senador Nilo Coelho, 210, lote agrícola 120, núcleo 05, zona rural, Petrolina-PE, CEP 56.300-000",
    summary: "Ampliou a capacidade produtiva e fortaleceu a operação agrícola do grupo.",
    highlight: "Unidade agrícola integrada ao ecossistema, com foco em produção, manejo e consistência de entrega.",
    details: ["Produção agrícola", "Manejo técnico", "Controle de qualidade"]
  },
  {
    slug: "nacional-frutas",
    name: "Nacional Frutas",
    shortName: "Nacional",
    year: "2011",
    logo: "/assets/farm-nacional-frutas.png",
    image: "/assets/farm-nacional-frutas.png",
    photo: "/assets/clima-uva-temperatura-chuva-impacto-videira.webp",
    address: "Projeto de Irrigação Senador Nilo Coelho, núcleo 04, lote agrícola CS19, zona rural, Petrolina-PE, CEP 56.302-970",
    summary: "Unidade ligada ao fortalecimento comercial e à capacidade de exportação.",
    highlight: "Unidade do grupo voltada ao fortalecimento da capacidade produtiva no Projeto Senador Nilo Coelho.",
    details: ["Ecossistema de fazendas", "Produção no núcleo 04", "Petrolina-PE"]
  },
  {
    slug: "vinor",
    name: "Vinor Agronegócio",
    shortName: "Vinor",
    year: "2020",
    logo: "/assets/farm-vinor.png",
    image: "/assets/farm-vinor.png",
    photo: "/assets/quem-somos-hero-photo.avif",
    address: "Projeto de Irrigação Senador Nilo Coelho, núcleo 04, lote agrícola 009A, zona rural, Petrolina-PE, CEP 56.302-970",
    summary: "A fazenda mais nova do grupo, com câmara fria própria e novas variedades.",
    highlight: "Unidade agrícola do ecossistema Guruva, posicionada para ampliar cobertura e fluxo produtivo.",
    details: ["Agronegócios", "Área rural irrigada", "Fluxo produtivo integrado"]
  }
];

export const grapes = [
  {
    name: "ARRA Cherry Crush™ - ARD 36",
    shortName: "ARRA Cherry Crush™",
    color: "Vermelha",
    texture: "Firme",
    sweetness: "Perfil premium",
    description: "Equilíbrio perfeito entre acidez e doçura com crocância incomparável.",
    image: "/assets/grape-arra-cherry-crush.png",
    harvestMonths: [1, 2, 3, 8, 9]
  },
  {
    name: "IFG Sugar Crisp™",
    shortName: "IFG Sugar Crisp™",
    color: "Verde",
    texture: "Crocante",
    sweetness: "Doce e fresca",
    description: "Crocância marcante e doçura fresca que conquistam já na primeira mordida.",
    image: "/assets/grape-ifg-sugar-crisp.png",
    harvestMonths: [4, 5, 10, 11]
  },
  {
    name: "Grapa ARRA Sweeties™",
    shortName: "ARRA Sweeties™",
    color: "Verde",
    texture: "Firme",
    sweetness: "Equilibrada",
    description: "Doçura equilibrada e textura firme, ideal para o paladar mais exigente.",
    image: "/assets/grape-arra-sweeties.png",
    harvestMonths: [6, 7, 12]
  }
];

export const partners = [
  { name: "IFG", logo: "/assets/partner-ifg.png" },
  { name: "Embrapa", logo: "/assets/partner-embrapa.png" },
  { name: "Grapa", logo: "/assets/partner-grapa.png" },
  { name: "ITUM grape genetics", logo: "/assets/partner-itum.png" }
];

export const jobOpenings = [
  "Operações agrícolas",
  "Controle de qualidade",
  "Logística e exportação",
  "Comercial / Exportação",
  "Administrativo",
  "Estágio",
  "Outra vaga / Candidatura espontânea"
];

# Guruva — Design System + kit de prompts para o Google Stitch

Extraído do código real (`app/globals.css`, `tailwind.config.ts`, `components/`), não inventado.
Use este documento como a "fonte da verdade" para conversar com o Stitch: cole o **Prompt Mestre**
primeiro, depois um prompt por página, e sempre 1 mudança por vez.

---

## 1. Personalidade da marca

Site institucional de agronegócio premium — cinematográfico na entrada (hero em vídeo),
editorial no restante (serifa + paleta terrosa + vidro fosco). Não é "tech futurista": é
"boutique de vinhedo/exportadora premium". Palavras-chave para guiar o tom em qualquer prompt:
**cinematic, editorial, warm-earth, premium agribusiness, organic motion, confident, global reach
with valley origin** — evite termos como "futuristic", "neon", "cyberpunk", "flat tech SaaS".

## 2. Paleta de cores (hex reais do código)

| Token | Hex | Uso |
|---|---|---|
| `--soil` | `#24180f` | fundo escuro (hero, seção "mercado"), texto em contraste |
| `--vine` | `#174b35` | verde principal — CTAs, links de destaque, ribbons |
| `--leaf` | `#5d7d3d` | verde secundário |
| `--grape` | `#6f263d` | vinho/acento (nome da marca, detalhes) |
| `--gold` | `#d5a642` | dourado — kickers/eyebrows, botão primário no hero |
| `--mist` | `#f4f0e8` | fundo neutro claro alternativo |
| `--paper` | `#fffaf0` | fundo creme / texto claro sobre fundo escuro |
| `--ink` | `#16120d` | texto principal |
| `--muted` | `#736a5e` | texto secundário |
| `--line` | `rgba(36,24,15,.14)` | bordas sutis |
| `#82aa3c` | — | verde vivo do bloco "mapa das fazendas" |
| `#423223` / `#2c2c2c` | — | textos escuros alternativos em blocos brancos |
| `#5a3f27` / `#3f2c20` | — | botões marrom (certificações, CTA mapa) |
| `#2f56a1 · #0f716a · #79a864 · #f3c400` | — | cores por era na timeline (uma cor por marco histórico) |

Regra geral: **seções brancas predominam**, intercaladas com 1–2 blocos escuros/coloridos
de alto impacto (hero em vídeo escuro, bloco verde do mapa, bloco escuro "mercado
internacional") — nunca mais de ~30% da página em fundo escuro.

## 3. Tipografia

- **Display/títulos**: `Fraunces` (serifada variável, peso 300–900, com itálico) —
  `font-variation-settings: "SOFT" 35` dá um traço mais suave/orgânico, não uma serifa dura.
- **Corpo/UI**: `General Sans` (400/500/600/700) — parágrafos, nav, botões.
- **Padrão de "kicker/eyebrow"** usado em toda parte: label pequeno, uppercase, `letter-spacing`
  largo (0.14–0.16em), peso 800, cor dourada (`--gold`) ou marrom-escura, sempre acima do
  título de seção. Ex.: `AS 4 FAZENDAS DO GRUPO`, `ORIGEM E EVOLUÇÃO`.
- Escala: H1/H2 muito grandes (`clamp(2.3rem, 13vw, 4rem)` mobile → `clamp(2.8rem, 5vw, 5.4rem)`
  desktop), `line-height` bem apertado (0.93–1.05) — títulos "grandes e respirando".

## 4. Layout & componentes

- **Largura de conteúdo**: até 1180px no desktop, respiro generoso (`padding: 110px 0` desktop,
  `74px` mobile entre seções).
- **Nav**: pílula flutuante com `backdrop-filter: blur(20px)`, aparece ao rolar, cantos 999px.
- **Botões**: sempre pílula (`border-radius: 999px`), uppercase, `letter-spacing` largo. Primário
  = dourado ou verde `--vine` sólido; secundário = contorno translúcido sobre fundo escuro.
- **Cards**: cantos grandes (14–22px), fundo branco/translúcido com `backdrop-filter: blur`,
  sombra difusa grande e suave (`box-shadow: 0 18-24px 55-70px rgba(22,18,13,.09-.18)`) — nunca
  sombra dura.
- **Carrosséis**: dois padrões já existentes —
  1. *Farm carousel*: swipe horizontal, 1 card centralizado por vez, dots de navegação.
  2. *Grape carousel*: 3 cards visíveis, card central nítido e em destaque (scale 1.08), laterais
     desfocados e reduzidos (`opacity .42, blur 6px, scale .84`) — efeito "3D showcase" tipo Apple.
- **Divisores curvos em SVG** entre blocos de cor diferente (ex.: branco → verde antes do mapa).
- **Marquee infinito** para logos de parceiros/certificações.
- **Timeline em "fita"**: cada marco é uma seta/chevron colorida (`clip-path` em bandeira),
  uma cor por década/marco.
- **Ticker de métricas**: números que trocam com crossfade + blur + grayscale a cada ~6s.
- **Textura de fundo**: grid de linhas finas quase invisível (`opacity ~.04`) atrás do site
  inteiro, mais um padrão de folhas (`leaf-field`) atrás de certas seções — nunca ilustração
  vetorial, sempre fotografia real (fazenda, uvas, vinhedo).

## 5. Movimento

- Entradas em scroll: `opacity + blur(6-10px) + translateY(14-22px)` → estado final limpo,
  `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out expo) em quase tudo.
- Hero: título entra com blur-in, e a arte do headline alterna PT/EN em loop de 18s.
- Sempre respeita `prefers-reduced-motion`.

## 6. Fotografia/vídeo

- Hero em vídeo real (não stock genérico) do vinhedo, com overlay em gradiente escuro à esquerda
  (onde fica o texto) e mais claro à direita.
- Fotografia de produto (uvas) sempre em fundo branco/estúdio para os carrosséis de variedades.
- Logos de fazendas/certificações em PNG/SVG com fundo transparente.

---

## 7. Diagnóstico: Home vs. páginas internas

A **Home** tem ritmo cinematográfico: hero em vídeo (escuro) → métricas (branco) → carrossel de
fazendas (leaf/branco) → divisor curvo → **mapa verde vivo** → marquee de parceiros (branco) →
CTA (branco) → carrossel de uvas 3D (branco) → certificações (branco) → **bloco escuro de mercado
internacional** → footer. Há alternância de cor, curvas, vídeo e 3 tipos de carrossel diferentes.

As **páginas internas** (Quem Somos, Fazendas, Uvas, Parceiros & Mercados, Sustentabilidade,
Contato) hoje são muito mais planas: praticamente sempre `subpage-hero` (texto só) +
`subpage-section` (texto ou grid de 3 cards) + às vezes a timeline. Não reaproveitam vídeo, mapa,
carrosséis 3D nem os blocos escuros/coloridos de impacto que a Home tem. É aqui que o Stitch pode
ajudar mais: **estender a linguagem cinematográfica da Home para as páginas internas**, em vez de
mantê-las como "páginas de texto com cards".

Estrutura ideal recomendada por página (baseada no conteúdo real que já existe no código):

| Página | Conteúdo hoje | O que falta / estrutura ideal |
|---|---|---|
| **Quem Somos** | hero texto, 1 bloco de texto, grid Missão/Visão/Valores, timeline | Adicionar bloco cinematográfico (foto/vídeo em tela cheia) entre a origem e os valores; reusar o *ticker de métricas* da Home com números institucionais (anos, hectares, países); enriquecer a timeline com imagem por marco; fechar com CTA para Fazendas |
| **Fazendas (lista)** | grid simples de 4 cards-link | Abrir com o mapa (`BusinessUnitsMap`) mostrando as 4 unidades; transformar os cards em formato "farm carousel" cinematográfico (foto de fundo, ano, destaque) em vez de card plano |
| **Fazenda [detalhe]** | hero texto + endereço + 3 cards genéricos | Hero com foto/vídeo real da fazenda (como o hero da Home); mapa de localização única; variedades cultivadas naquela fazenda; CTA de contato pré-preenchido |
| **Uvas** | grid de cards com specs (cor/textura/doçura) | Usar o *grape carousel 3D* como abertura interativa; manter os cards de spec abaixo; adicionar calendário de safra/sazonalidade |
| **Parceiros & Mercados** | grid de logos + mapa mundial (duplicado da Home) | Separar em 2 módulos claros: "Parceiros técnicos" (logos categorizados) e "Mercados" (mapa + lista de países + métrica de volume exportado) |
| **Sustentabilidade & Certificações** | hero + 2 logos + grid de 3 cards | Expandir cada certificação em card próprio (escopo, validade, link do documento); métricas de impacto (água, energia) no estilo ticker; foto de práticas em campo |
| **Contato** | hero + e-mail/telefone + lista de fazendas | Formulário real (o CSS de `commercial-modal-form` já existe e pode virar formulário embutido na página); mapa com as 4 fazendas; segmentar por assunto (comercial, exportação, imprensa) |

---

## 8. Como usar isso no Google Stitch

Boas práticas do Stitch (não é só "peça e pronto"):

1. **Formule cada prompt como Ideia + Tema + Conteúdo + Imagem de referência.** Suba um
   screenshot da Home atual (`http://127.0.0.1:3001`) como imagem de referência sempre que
   quiser manter consistência visual.
2. **Uma mudança por prompt.** Não peça "redesenhe o site inteiro" — peça uma seção/página por
   vez, veja o resultado, refine.
3. **Use termos de UI específicos** ("aumente o card central do carrossel", "adicione um divisor
   curvo em SVG entre a seção branca e a verde"), não pedidos vagos ("deixe mais bonito").
4. **Descreva o clima antes das features**: "cinematográfico, editorial, terroso, premium" — o
   Stitch usa Gemini, então adjetivos de mood pesam bastante no resultado.
5. Comece **sempre pelo Prompt Mestre** (abaixo) no início de um projeto novo no Stitch — ele
   fixa paleta, tipografia e linguagem de componente para todas as telas seguintes na mesma
   conversa/projeto.

### Prompt Mestre (cole primeiro, plataforma = Web)

```
Estou desenhando o site institucional da Guruva, um grupo agroexportador de uvas de mesa sem
sementes no Vale do São Francisco (Brasil), com 4 fazendas e presença em 18+ países. O estilo é
cinematográfico e editorial-premium, não "tech/futurista" — pense em uma vinícola boutique de
alto padrão cruzada com um relatório institucional confiável.

Paleta: fundo principal creme #fffaf0, texto #16120d, verde principal #174b35, dourado de
destaque #d5a642, vinho #6f263d, marrom terra escuro #24180f (usado só em 1-2 blocos de alto
impacto por página, nunca mais que ~30% da página). Tipografia: títulos em serifada variável tipo
Fraunces (traço suave, orgânico, tamanhos grandes com line-height apertado), corpo em uma
sans-serif humanista tipo General Sans. Todo título de seção tem um "kicker" pequeno acima:
uppercase, letter-spacing largo, peso bold, cor dourada.

Componentes recorrentes: navbar em pílula flutuante com efeito de vidro fosco (glassmorphism);
botões sempre em formato pílula, uppercase, letter-spacing largo; cards com cantos grandes
(16-22px) e sombra difusa grande e suave, nunca sombra dura; divisores curvos em SVG entre blocos
de cores diferentes; texturas orgânicas (leve grid de linhas de fundo, padrão de folhas) — sempre
com fotografia real de vinhedo/uva, nunca ilustração vetorial.

Anime entradas de seção com fade + blur + leve deslocamento vertical, suave, tipo ease-out.
Alterne blocos de fundo claro (predominante) com 1-2 blocos escuros ou de cor viva de alto
impacto por página, nunca mais que isso.
```

### Prompt por página

> Cole o Prompt Mestre uma vez no início da conversa/projeto. Depois use estes prompts, um de
> cada vez, subindo um screenshot da tela atual como referência quando quiser refinar algo já
> existente.

**Home (melhorias)**
```
Refine a home page do site Guruva mantendo a estrutura atual: hero em vídeo full-bleed com
overlay escuro e título que aparece com efeito de blur; seção de métricas com números grandes;
carrossel horizontal das 4 fazendas; mapa em bloco verde vivo mostrando as unidades; marquee
infinito de logos de parceiros; CTA institucional; carrossel 3D de variedades de uva (card
central em destaque, laterais desfocados); seção de certificações; bloco escuro final com mapa
mundial de mercados atendidos e botão "falar com comercial".

Melhore: (1) adicione uma pequena faixa "como visto em / certificado por" logo abaixo do hero;
(2) dê aos cards do carrossel de fazendas um link visual mais claro para a página de cada
fazenda; (3) no bloco de certificações, adicione um selo/badge com "auditoria mais recente" para
reforçar credibilidade. Não altere a paleta nem a tipografia do Prompt Mestre.
```

**Quem Somos**
```
Desenhe a página "Quem Somos" do Guruva Group. Estrutura: (1) hero só com texto — kicker "Quem
somos", H1 "Somos apaixonados pela cultura da uva", parágrafo de origem (fundada em 2004 em
Petrolina-PE); (2) bloco de texto sobre evolução da empresa; (3) NOVO: uma seção cinematográfica
em tela cheia com foto/vídeo real do vinhedo, cobrindo a largura toda, para dar respiro entre o
texto institucional e o restante; (4) grid de 3 cards para Missão / Visão / Valores; (5) NOVO: um
ticker de métricas (mesmo componente da home) com "20+ anos", "4 empresas", "850+ hectares"; (6)
timeline horizontal em formato de fita colorida com um marco por ano (2004, 2009, 2011, 2020),
cada marco com uma cor diferente; (7) CTA final convidando a conhecer as fazendas.
```

**Fazendas (listagem)**
```
Desenhe a página de listagem "Nossas Fazendas". Estrutura: (1) hero de texto com kicker "Nossas
fazendas" e H1; (2) NOVO: um mapa interativo no topo mostrando as 4 fazendas geolocalizadas
(Guruva, Ecograpes, Nacional Frutas, Vinor), todas na região de Petrolina-PE; (3) troque o grid
simples de cards por um carrossel cinematográfico horizontal — cada fazenda como um card grande
com foto de fundo, "desde [ano]", nome, resumo curto e botão "saiba mais", 1 fazenda em destaque
por vez, navegação por setas/dots.
```

**Fazenda — página de detalhe**
```
Desenhe o template de detalhe de uma fazenda individual do Guruva Group (ex.: Fazenda Vinor).
Estrutura: (1) hero cinematográfico com foto/vídeo real da fazenda em tela cheia (como o hero da
home), overlay escuro, kicker "Fazenda do grupo", nome da fazenda em título grande, frase de
destaque; (2) bloco de localização com endereço completo e mapa de localização única (mesmo
componente de mapa da home, mas focado só nesta fazenda); (3) grid de 3 cards com os diferenciais
operacionais da fazenda; (4) NOVO: seção com as variedades de uva cultivadas nesta fazenda
especificamente, em formato de cards pequenos; (5) CTA final "falar com comercial" já indicando
esta fazenda como origem.
```

**Uvas (catálogo de variedades)**
```
Desenhe a página "Nossas Uvas". Estrutura: (1) hero de texto, kicker "Nossas uvas", H1 "Uva de
mesa sem sementes com padrão de exportação"; (2) reaproveite o carrossel 3D de variedades (card
central em destaque, laterais desfocados) como peça interativa principal logo após o hero; (3)
abaixo, grid detalhado com um card por variedade mostrando foto em fundo branco de estúdio e
ficha técnica (cor, textura, doçura); (4) NOVO: seção de calendário de safra mostrando em quais
meses do ano cada variedade está disponível, em formato de linha do tempo horizontal.
```

**Parceiros & Mercados**
```
Desenhe a página "Parceiros & Mercados", separada em dois módulos claros. Módulo 1 "Parceiros
técnicos": grid de logos de parceiros institucionais/técnicos, agrupados por categoria (ex.:
certificadoras, tecnologia, logística) com um pequeno rótulo de categoria acima de cada grupo.
Módulo 2 "Mercados internacionais": bloco de fundo escuro em tela cheia com um mapa mundial
mostrando os 18+ países atendidos, uma métrica em destaque (ex.: "9.500+ toneladas exportadas"),
lista/tags dos principais países ou regiões, e botão "falar com time comercial".
```

**Sustentabilidade & Certificações**
```
Desenhe a página "Sustentabilidade & Certificações". Estrutura: (1) hero de texto, kicker
"Sustentabilidade & certificações", H1 "Qualidade auditada, do campo à exportação"; (2) grid de
cards de certificação — um card por certificação (ex.: GlobalG.A.P., SMETA) com logo, nome,
escopo/validade e um link "ver documento"; (3) NOVO: uma seção com métricas de impacto ambiental
no formato de ticker (ex.: consumo de água, energia, hectares com manejo sustentável); (4) NOVO:
bloco cinematográfico com foto real de práticas em campo, texto sobreposto; (5) grid final de 3
cards para Campo / Pessoas / Governança, como já existe hoje.
```

**Contato**
```
Desenhe a página "Contato". Estrutura: (1) hero de texto com kicker "Contato", H1 "Vamos falar
sobre a sua próxima safra?", botão "falar com comercial"; (2) bloco com e-mail e telefone
comercial em destaque tipográfico grande (serifado); (3) NOVO: formulário de contato embutido na
página (nome, e-mail, assunto — comercial / exportação / imprensa —, mensagem), usando inputs
com fundo translúcido e borda inferior fina, estilo elegante e minimalista, não um formulário
genérico de SaaS; (4) grid com as 4 fazendas (logo + endereço) como hoje, mas com um mapa
combinado no topo mostrando todas as localizações.
```

---

## 9. Depois do Stitch

O Stitch exporta HTML/CSS ou manda para o Figma. Ao trazer de volta para este projeto Next.js:
mapeie as classes geradas para os tokens/variáveis já existentes em `app/globals.css`
(`--soil`, `--vine`, `--gold` etc.) em vez de criar uma paleta paralela, e reaproveite os
componentes já existentes (`FarmCarousel`, `GrapeCarousel`, `BusinessUnitsMap`,
`commercial-modal-form`) sempre que a tela gerada pedir algo equivalente — a maior parte dos
"NOVO" acima já tem CSS parcialmente pronto no projeto (ex.: o form do modal comercial pode virar
o formulário da página de Contato).

# Guruva Design System

## Direcao Criativa

O site da Guruva deve comunicar uma operacao agricola premium, internacional e confiavel. A percepcao principal e cinematografica: Vale do Sao Francisco, vinhedos, cadeia fria, exportacao e escala. Evitar aparencia institucional generica; o foco e operacao, estrutura, processo e mercado global.

Principios:
- Cinematografico, agricola, premium.
- Alto contraste sobre video/imagem.
- Tipografia editorial com detalhes manuscritos.
- Layouts densos, elegantes e objetivos.
- Motion suave, nunca chamativo demais.
- Visual de exportadora moderna, nao landing page promocional comum.

## Paleta

```css
:root {
  --soil: #24180f;
  --vine: #174b35;
  --leaf: #5d7d3d;
  --grape: #6f263d;
  --guruva-magenta: #99185a;
  --script-green: #8fc227;
  --gold: #d5a642;
  --mist: #f4f0e8;
  --paper: #fffaf0;
  --ink: #16120d;
  --muted: #736a5e;
  --line: rgba(36, 24, 15, 0.14);
}
```

Uso:
- `--soil`: fundos escuros, overlays, footer.
- `--vine`: CTAs comerciais, detalhes de confianca.
- `--grape` / `--guruva-magenta`: marca, numeros pendentes, acentos premium.
- `--script-green`: palavras manuscritas da headline.
- `--gold`: botoes primarios, indicadores, labels pequenos.
- `--mist` / `--paper`: fundos claros sofisticados.

## Tipografia

Familias:
- Display editorial: `Georgia, "Times New Roman", serif`
- Manuscrita: `Meddon`, fallback `"Segoe Script", cursive`
- UI/labels: `"Trebuchet MS", Verdana, sans-serif`

Regras:
- Headlines grandes usam Georgia, com line-height apertado.
- A palavra/frase emocional usa Meddon em verde.
- Labels, navegacao, botoes e metadados usam Trebuchet em uppercase com letter-spacing.
- Nao usar fontes sans genericas modernas como Inter/Roboto para a identidade principal.

## Hero

Conceito:
- Video full-screen no carregamento, sem textos.
- Se o usuario der scroll, ocorre zoom out suave e aparecem textos.
- Se o usuario nao interagir, nos ultimos 3 segundos do video a animacao inicia sozinha.
- Depois do primeiro reveal, a hero permanece no tamanho de banner, sem voltar ao full-screen.

Conteudo:
- Headline alterna entre PT e EN.
- As headlines devem ser imagens/SVG transparentes para manter composicao responsiva.
- Manter `aria-label` no `h1` com o texto completo para acessibilidade.

Composicao PT:
- "Do Vale"
- "do Sao Francisco"
- "Para o mundo."

Composicao EN:
- "From the"
- "Sao Francisco Valley"
- "to the world."

Motion:
- Fade in e fade out reais.
- Movimento vertical maximo: 10-14px.
- Timing recomendado: ciclo de 18s.

## Header

Estilo:
- Header fixo centralizado.
- Inicialmente oculto na primeira tela cheia.
- Aparece apos scroll/reveal.
- Fundo translucido com blur.

Logo:
- Usar `assets/guruva-logo.webp`.
- Nao usar placeholder com circulo "G".

Navegacao:
- Operacao
- Processo
- Variedades
- Mercado
- Contato
- CTA: Comercial

## Componentes

### Botoes

Primario:
- Fundo `--gold`
- Texto `--ink`
- Uppercase, Trebuchet, bold
- Altura minima: 48px

Secundario:
- Fundo transparente
- Borda branca translucida
- Texto branco

### Faixa de Numeros

Deve ser ticker horizontal continuo.

Estilo:
- Fluid glass.
- Fundo claro translucido.
- Blur e saturacao.
- Separadores finos.
- Cards com brilho interno sutil.

Exemplos de metricas:
- `20+` anos de historia
- `4` empresas no ecossistema
- `XX` hectares cultivados
- `XX` paises atendidos
- `XX` toneladas exportadas
- `12m` producao durante todo o ano

### Cards de Operacao

Devem vender estrutura, nao "empresa":
- Estrutura
- Tecnologia
- Certificacoes
- Logistica
- Processo produtivo
- Pessoas
- Mercado internacional

Evitar cards arredondados demais. Raio maximo sugerido: 8px, preferencialmente 0-4px neste projeto.

## Secoes Recomendadas

Ordem narrativa:
1. Hero cinematografico
2. Numeros da operacao
3. As 4 fazendas como ecossistema
4. Journey of a Grape
5. Estrutura, tecnologia e logistica
6. Variedades em catalogo premium
7. Mapa mundial de exportacoes
8. ESG e sustentabilidade
9. Linha do tempo
10. Depoimentos internacionais
11. CTA comercial

## Journey of a Grape

Fluxo:
Vinhedo -> Colheita -> Selecao -> Embalagem -> Camara fria -> Transporte -> Exportacao -> Supermercados internacionais

Visual:
- Linha horizontal.
- Etapas numeradas.
- Scroll horizontal em mobile.
- Indicador de progresso em dourado.
- Texto curto e operacional.

## Imagens e Video

Hero:
- Video real dos vinhedos/colheita/packing/logistica.
- Sempre com overlay escuro para leitura.
- Evitar imagens stock genericas quando houver material real.

Tratamento:
- Saturacao levemente elevada.
- Contraste sutil.
- Crop cinematografico.
- Sem bordas pretas aparentes.

## Responsividade

Regras:
- Hero precisa funcionar em desktop, tablet e celulares estreitos.
- Headlines como SVG/imagem devem usar `object-fit: contain`.
- Evitar texto absoluto individual em mobile para frases artisticas.
- Nunca permitir scroll horizontal.
- Em mobile, header simplifica a navegacao e mantem logo + CTA.

Breakpoints sugeridos:
- Desktop: acima de 1180px
- Notebook/tablet: ate 980px
- Mobile: ate 640px
- Mobile estreito: ate 390px

## Motion

Sensacao:
- Cinematografica, suave, premium.

Duracoes:
- Hero reveal por scroll: 500-700ms.
- Reveal automatico pelo video: 1200-1500ms.
- Fade headline: 1.2-1.8s dentro do ciclo.
- Cards/interacoes: 250-400ms.

Easing:
```css
cubic-bezier(0.16, 1, 0.3, 1)
```

## Regras Do Que Evitar

- Nao fazer landing page com hero de marketing generico.
- Nao usar gradientes roxo/azul artificiais.
- Nao usar cards arredondados grandes.
- Nao colocar textos longos na hero.
- Nao depender de posicionamento absoluto de palavras soltas em mobile.
- Nao criar secoes sobre "quem somos" como foco principal.
- Nao usar assets escuros/blurred demais se o produto/operacao precisa ser visto.

## Prompt Para Claude Design

Use este direcionamento:

"Crie um site premium e cinematografico para a Guruva, uma operacao agricola e exportadora de uvas do Vale do Sao Francisco. O foco nao deve ser 'quem somos', mas sim escala, estrutura, tecnologia, certificacoes, logistica, processo produtivo, pessoas e mercado internacional. Use uma estetica editorial agricola premium, com video hero, headline bilingue em SVG/imagem transparente, paleta vinho/verde/dourado/papel, componentes com glass suave e motion cinematografico. O site deve parecer uma operacao internacional pronta para compradores globais."

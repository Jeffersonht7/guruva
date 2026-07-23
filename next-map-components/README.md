# BusinessUnitsMap

Componente client-side para Next.js 14 + TypeScript + Tailwind CSS usando MapLibre GL JS.

## Instalação

```bash
npm install maplibre-gl react-map-gl
```

## Uso

Copie os arquivos desta pasta para, por exemplo, `components/map/` no seu projeto Next:

- `BusinessUnitsMap.tsx`
- `MapMarker.tsx`
- `BusinessUnitsMap.module.css`

Depois use em uma página ou seção:

```tsx
import { BusinessUnitsMap, type Unidade } from "@/components/map/BusinessUnitsMap";

const unidades: Unidade[] = [
  {
    nome: "Matriz",
    lat: -9.3891,
    lng: -40.503,
    mapsUrl: "https://maps.app.goo.gl/xxxxx",
  },
  {
    nome: "Cassimiro",
    lat: -9.374,
    lng: -40.487,
    mapsUrl: "https://maps.app.goo.gl/xxxxx",
  },
  {
    nome: "Guararapes",
    lat: -9.405,
    lng: -40.526,
    mapsUrl: "https://maps.app.goo.gl/xxxxx",
  },
];

export default function Page() {
  return <BusinessUnitsMap unidades={unidades} />;
}
```

O componente usa o style dark gratuito da Carto:

```txt
https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json
```

Troque as coordenadas e `mapsUrl` pelos dados reais das unidades.

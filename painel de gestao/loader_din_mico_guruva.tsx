import React, { useState, useEffect, useMemo } from 'react';

export default function App({
  bgColor = "#f9fafb", 
  grapeCenterColor = "#7C1F55",
  grapeEdgeColor = "#40102A",
  grapeBorderColor = "#ffffff",
  textColor = "#40102A",
  groupColor = "#869b46",
}) {
  // Estado que simula se o seu site/app ainda está carregando dados
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado da máquina de animação: init -> assembling -> loading -> revealing -> closing -> exploding -> done
  const [phase, setPhase] = useState('init');

  // Temporizador para simular um carregamento real (após 3.5s o app "termina" de carregar)
  useEffect(() => {
    if (!isLoading) return;
    const t = setTimeout(() => {
      setIsLoading(false); // Avisa a animação que o carregamento acabou!
    }, 3500);
    return () => clearTimeout(t);
  }, [isLoading]);

  // Máquina de Estados da Animação
  useEffect(() => {
    let timer;
    switch (phase) {
      case 'init':
        // Dá um micro-delay para o navegador registrar a posição espalhada inicial
        timer = setTimeout(() => setPhase('assembling'), 50);
        break;
      case 'assembling':
        // Tempo da atração magnética (800ms)
        timer = setTimeout(() => setPhase('loading'), 800);
        break;
      case 'loading':
        // Fica pulsando infinitamente enquanto isLoading for true.
        // Se já carregou, avança para revelar a logo.
        if (!isLoading) setPhase('revealing');
        break;
      case 'revealing':
        // Desliza pro lado e mostra "GURUVA Group" por 2 segundos
        timer = setTimeout(() => setPhase('closing'), 2000);
        break;
      case 'closing':
        // Desliza de volta para o centro (esconde o texto) por 800ms
        timer = setTimeout(() => setPhase('exploding'), 800);
        break;
      case 'exploding':
        // Explode as uvas para fora da tela
        timer = setTimeout(() => setPhase('done'), 600);
        break;
      default:
        break;
    }
    return () => clearTimeout(timer);
  }, [phase, isLoading]);

  // Posições caóticas inicias calculadas apenas uma vez
  const grapes = useMemo(() => {
    const baseGrapes = [
      { id: 1, cx: 111, cy: 120 }, { id: 2, cx: 137, cy: 120 }, { id: 3, cx: 163, cy: 120 }, { id: 4, cx: 189, cy: 120 },
      { id: 5, cx: 124, cy: 142.5 }, { id: 6, cx: 150, cy: 142.5 }, { id: 7, cx: 176, cy: 142.5 },
      { id: 8, cx: 137, cy: 165 }, { id: 9, cx: 163, cy: 165 },
      { id: 10, cx: 150, cy: 187.5 },
    ];

    return baseGrapes.map((g) => {
      const dx = g.cx - 150;
      const dy = g.cy - 144;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const distance = 150 + Math.random() * 200; 
      return {
        ...g,
        sx: dx === 0 ? (Math.random() - 0.5) * 150 : (dx / dist) * distance,
        sy: dx === 0 && dy === 0 ? -distance : (dy / dist) * distance,
        rot: (Math.random() - 0.5) * 500,
      };
    });
  }, []);

  const handleReplay = () => {
    setPhase('init');
    setIsLoading(true);
  };

  return (
    <div 
      className={`flex flex-col items-center justify-center min-h-screen overflow-hidden phase-${phase}`}
      style={{ backgroundColor: bgColor }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Great+Vibes&display=swap');

          /* --- 1. COMPORTAMENTO DAS UVAS INDIVIDUAIS --- */
          .grape {
            transform-box: fill-box;
            transform-origin: center;
          }
          /* Estado Inicial e Explosão Final (espalhadas e invisíveis) */
          .phase-init .grape {
            transform: translate(calc(var(--sx) * 1px), calc(var(--sy) * 1px)) rotate(calc(var(--rot) * 1deg)) scale(0.2);
            opacity: 0;
            transition: none;
          }
          .phase-exploding .grape, .phase-done .grape {
            transform: translate(calc(var(--sx) * 1px), calc(var(--sy) * 1px)) rotate(calc(var(--rot) * -1deg)) scale(0.2);
            opacity: 0;
            transition: transform 0.6s ease-in, opacity 0.5s ease-out;
          }
          /* Magnético para o centro (Assembling) e mantido no lugar nas fases do meio */
          .phase-assembling .grape, .phase-loading .grape, .phase-revealing .grape, .phase-closing .grape {
            transform: translate(0px, 0px) rotate(0deg) scale(1);
            opacity: 1;
            /* O segredo do impacto magnético está nessa curva cúbica! */
            transition: transform 0.8s cubic-bezier(0.8, 0, 0, 1), opacity 0.5s ease;
          }

          /* --- 2. PULSAR (Bouncing) ENQUANTO CARREGA --- */
          .bunch-pulser {
            transition: transform 0.3s ease; /* Transição suave caso o pulso pare bruscamente */
            transform-origin: center;
          }
          @keyframes bouncePulse {
            0%, 100% { transform: scale(1) translateY(0); }
            50% { transform: scale(1.05) translateY(-5px); }
          }
          .phase-loading .bunch-pulser {
            animation: bouncePulse 1.2s infinite ease-in-out;
          }

          /* --- 3. DESLIZAMENTO PARA MOSTRAR A LOGO --- */
          .bunch-slider {
            transition: transform 0.9s cubic-bezier(0.25, 1, 0.5, 1);
          }
          /* Por padrão, fica no centro (X=150 no viewBox) */
          .bunch-slider { transform: translateX(150px); }
          /* Quando vai revelar, desliza para a esquerda (X=30) */
          .phase-revealing .bunch-slider { transform: translateX(30px); }

          /* --- 4. TEXTO DA LOGO --- */
          .logo-text-group {
            transition: transform 0.9s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.7s ease;
            opacity: 0;
            transform: translateX(15px); /* Inicia levemente pra direita */
          }
          .phase-revealing .logo-text-group {
            opacity: 1;
            transform: translateX(0px); /* Encaixa perfeito no lugar */
          }
          .phase-closing .logo-text-group, .phase-exploding .logo-text-group, .phase-done .logo-text-group {
            opacity: 0;
            transform: translateX(-15px); /* Sai saindo pra esquerda */
          }

          /* --- 5. CABINHO (STEM) --- */
          .stem {
            transform-origin: bottom right;
            transform-box: fill-box;
            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
          }
          .phase-init .stem, .phase-exploding .stem, .phase-done .stem {
            transform: scale(0) rotate(-20deg);
            opacity: 0;
          }
          .phase-assembling .stem, .phase-loading .stem, .phase-revealing .stem, .phase-closing .stem {
            transform: scale(1) rotate(0deg);
            opacity: 1;
            transition-delay: 0.2s; /* Espera as uvas chegarem perto para crescer */
          }

          /* --- 6. TEXTO DE CARREGANDO INFERIOR --- */
          .loading-text {
            transition: opacity 0.4s ease;
            opacity: 0;
          }
          @keyframes textPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.9; } }
          
          .phase-assembling .loading-text, .phase-loading .loading-text {
            animation: textPulse 1.5s infinite;
            opacity: 1;
          }
        `}
      </style>

      {/* Container Principal */}
      <div className="relative w-full max-w-2xl h-64 flex items-center justify-center -ml-8 sm:ml-0">
        <svg viewBox="0 0 600 300" className="w-full h-full overflow-visible drop-shadow-xl">
          <defs>
            <radialGradient id="grape-grad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor={grapeCenterColor} />
              <stop offset="100%" stopColor={grapeEdgeColor} />
            </radialGradient>
          </defs>

          {/* Camada 1: Desliza para esquerda e direita */}
          <g className="bunch-slider">
            {/* Camada 2: Pulsa para cima e para baixo durante o carregamento */}
            <g className="bunch-pulser">
              <path
                className="stem"
                d="M 150 115 Q 145 85 130 75"
                fill="none"
                stroke={grapeEdgeColor}
                strokeWidth="4"
                strokeLinecap="round"
              />

              {grapes.map((g) => (
                <circle
                  key={g.id}
                  cx={g.cx}
                  cy={g.cy}
                  r="13"
                  fill="url(#grape-grad)"
                  stroke={grapeBorderColor}
                  strokeWidth="1.5"
                  className="grape"
                  style={{ '--sx': g.sx, '--sy': g.sy, '--rot': g.rot }}
                />
              ))}
            </g>
          </g>

          {/* Camada do Texto da Logo */}
          <g className="logo-text-group">
            <text 
              x="235" y="160" 
              fontFamily="'Fraunces', serif" fontSize="68" fontWeight="600" 
              fill={textColor} letterSpacing="2"
            >
              GURUVA
            </text>
            <text 
              x="425" y="215" 
              fontFamily="'Great Vibes', cursive" fontSize="60" 
              fill={groupColor}
            >
              Group
            </text>
          </g>
        </svg>
      </div>
      
      {/* Texto de Loading que some quando a logo é revelada */}
      <div 
        className="loading-text mt-0 tracking-[0.25em] text-sm font-semibold"
        style={{ fontFamily: "'Fraunces', serif", color: textColor }}
      >
        CARREGANDO
      </div>

      {/* --- UI EXCLUSIVA PARA DEMONSTRAÇÃO (Pode remover na versão final) --- */}
      {phase === 'done' && (
        <button 
          onClick={handleReplay}
          className="absolute bottom-10 px-6 py-2 bg-[#40102A] text-white rounded-full font-sans text-sm hover:scale-105 transition-transform"
        >
          Reiniciar Animação
        </button>
      )}
      {phase === 'loading' && isLoading && (
        <button 
          onClick={() => setIsLoading(false)}
          className="absolute bottom-10 px-6 py-2 bg-[#869b46] text-white rounded-full font-sans text-sm hover:scale-105 transition-transform"
        >
          Forçar Fim do Carregamento
        </button>
      )}
    </div>
  );
}
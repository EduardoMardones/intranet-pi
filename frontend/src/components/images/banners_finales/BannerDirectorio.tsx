import React from 'react';

const BannerDirectorio: React.FC = () => {
  return (
    <div className="banner-container">
      <style>{`
        .banner-container {
          max-width: 900px;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          background: #ffffff;
        }

        .banner-container svg {
          display: block;
          width: 100%;
          height: auto;
          will-change: opacity;
        }

        .float-element,
        .float-slow,
        .float-fast,
        .wave-layer {
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .wave-layer {
          transform-origin: center;
          animation: floatWave 6s ease-in-out infinite alternate;
        }
        .wave-layer:nth-child(odd) { animation-duration: 7s; }
        .wave-layer:nth-child(even) { animation-duration: 9s; animation-direction: alternate-reverse; }

        .float-element {
          animation: floatUp 5s ease-in-out infinite;
          animation-fill-mode: both;
        }

        .float-slow {
          animation: floatUp 7s ease-in-out infinite;
          animation-fill-mode: both;
        }

        .float-fast {
          animation: floatUp 4s ease-in-out infinite;
          animation-fill-mode: both;
        }

        .banner-container svg {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes floatWave {
          0% { transform: translateX(0px) skewX(0deg); }
          100% { transform: translateX(15px) skewX(2deg); }
        }

        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      
      <svg viewBox="0 0 900 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="calipsoGradientDirectorio" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="shadowDirectorio" filterUnits="userSpaceOnUse" x="0" y="0" width="900" height="180">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
          </filter>

          <filter id="iconShadowDirectorio" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0ea5e9" floodOpacity="0.4"/>
          </filter>

          <filter id="softBlurDirectorio">
            <feGaussianBlur stdDeviation="1.5"/>
          </filter>
        </defs>

        <rect width="900" height="180" fill="#ffffff"/>

        {/* TEXTOS */}
        <g transform="translate(160, 0)">
          <text x="0" y="70" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0f172a" letterSpacing="-0.5">
            Directorio de
          </text>
          <text x="0" y="105" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0284c7" letterSpacing="-0.5">
            Funcionarios
          </text>
          
          <text x="0" y="135" fontFamily="Arial, sans-serif" fontSize="14" fill="#64748b">
            Encuentra a tu equipo de trabajo
          </text>
        </g>

        {/* ICONO PRINCIPAL: Tarjeta de Usuario + Lupa */}
        <g transform="translate(40, 45)">
          <rect width="90" height="90" rx="20" fill="url(#calipsoGradientDirectorio)" filter="url(#iconShadowDirectorio)"/>
          
          <g transform="translate(15, 20)">
            {/* Tarjeta de Identificación */}
            <rect x="0" y="0" width="45" height="55" rx="3" fill="white"/>
            {/* Foto de perfil simulada */}
            <rect x="12" y="8" width="21" height="21" rx="10.5" fill="#e0f2fe"/>
            <path d="M 12,29 Q 22.5,22 33,29 V 29 H 12 V 29" fill="#bae6fd"/>
            {/* Líneas de texto simuladas */}
            <rect x="8" y="35" width="29" height="3" rx="1.5" fill="#bae6fd"/>
            <rect x="12" y="42" width="21" height="3" rx="1.5" fill="#e0f2fe"/>
            <rect x="15" y="48" width="15" height="3" rx="1.5" fill="#e0f2fe"/>

            {/* Lupa (Búsqueda) superpuesta */}
            <g transform="translate(30, 25)">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3.5" fill="none"/>
              <circle cx="12" cy="12" r="10" stroke="#22d3ee" strokeWidth="2" fill="#22d3ee" fillOpacity="0.2"/>
              <line x1="20" y1="20" x2="28" y2="28" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
              <line x1="20" y1="20" x2="28" y2="28" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round"/>
            </g>
          </g>
        </g>

        {/* OLAS DINÁMICAS */}
        <g opacity="0.95">
          <path className="wave-layer" d="M 550,0 C 600,60 520,120 580,180 L 900,180 L 900,0 Z" fill="#bae6fd" opacity="0.3"/>
          <path className="wave-layer" d="M 620,0 C 600,50 660,130 630,180 L 900,180 L 900,0 Z" fill="#7dd3fc" opacity="0.4"/>
          <path className="wave-layer" d="M 690,0 C 740,50 650,120 710,180 L 900,180 L 900,0 Z" fill="#38bdf8" opacity="0.5"/>
          <path className="wave-layer" d="M 760,0 C 730,60 800,110 770,180 L 900,180 L 900,0 Z" fill="#0ea5e9" opacity="0.6"/>
          <path className="wave-layer" d="M 820,0 C 860,60 780,120 830,180 L 900,180 L 900,0 Z" fill="#0284c7" opacity="0.7"/>
        </g>

        {/* BURBUJAS DECORATIVAS */}
        <g opacity="0.5">
          <g className="float-element">
            <circle cx="585" cy="65" r="16" fill="#ffffff" fillOpacity="0.2" stroke="#7dd3fc" strokeWidth="2"/>
            <circle cx="579" cy="60" r="5" fill="#ffffff" opacity="0.6"/>
          </g>
          <circle cx="565" cy="105" r="8" fill="#ffffff" fillOpacity="0.15" stroke="#7dd3fc" strokeWidth="1.5" className="float-fast" style={{ animationDelay: '1.2s' }}/>
        </g>

        {/* ICONOS FLOTANTES - Perfiles de usuarios */}
        <g transform="translate(600, 90)" opacity="0.6">
          <g className="float-element">
            <circle cx="8" cy="8" r="8" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1.5"/>
            <circle cx="8" cy="5" r="2.5" fill="white"/>
            <path d="M 4,11 Q 8,9 12,11" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </g>
        </g>

        <g transform="translate(660, 65)" opacity="0.55">
          <g className="float-slow" style={{ animationDelay: '1.2s' }}>
            <circle cx="8" cy="8" r="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5"/>
            <circle cx="8" cy="5" r="2.5" fill="white"/>
            <path d="M 4,11 Q 8,9 12,11" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </g>
        </g>

        <g transform="translate(730, 120)" opacity="0.6">
          <g className="float-element" style={{ animationDelay: '0.7s' }}>
            <circle cx="8" cy="8" r="8" fill="#22d3ee" stroke="#0284c7" strokeWidth="1.5"/>
            <circle cx="8" cy="5" r="2.5" fill="white"/>
            <path d="M 4,11 Q 8,9 12,11" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BannerDirectorio;

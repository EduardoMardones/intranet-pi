import React from 'react';

const BannerDirectorio: React.FC = () => {
  return (
    <div className="banner-container">
      <style>{`
        .banner-container {
          width: 100%;
          height: 250px;
          border-radius: 0;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          background: #ffffff;
        }

        .banner-container svg {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
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
      
      <svg viewBox="0 0 900 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="calipsoGradientDirectorio" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="shadowDirectorio" filterUnits="userSpaceOnUse" x="0" y="0" width="900" height="250">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
          </filter>

          <filter id="iconShadowDirectorio" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0ea5e9" floodOpacity="0.4"/>
          </filter>

          <filter id="softBlurDirectorio">
            <feGaussianBlur stdDeviation="1.5"/>
          </filter>
        </defs>

        <rect width="900" height="250" fill="#ffffff"/>

        {/* TEXTOS (Bajados +35px) */}
        <g transform="translate(160, 35)">
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

        {/* ICONO PRINCIPAL (Bajado +35px) */}
        <g transform="translate(40, 80)">
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

        {/* OLAS DINÁMICAS (Recalculadas para Y=250) */}
        <g opacity="0.95">
          <path className="wave-layer" d="M 550,0 C 600,80 520,160 580,250 L 900,250 L 900,0 Z" fill="#bae6fd" opacity="0.3"/>
          <path className="wave-layer" d="M 620,0 C 600,70 660,170 630,250 L 900,250 L 900,0 Z" fill="#7dd3fc" opacity="0.4"/>
          <path className="wave-layer" d="M 690,0 C 740,70 650,160 710,250 L 900,250 L 900,0 Z" fill="#38bdf8" opacity="0.5"/>
          <path className="wave-layer" d="M 760,0 C 730,80 800,150 770,250 L 900,250 L 900,0 Z" fill="#0ea5e9" opacity="0.6"/>
          <path className="wave-layer" d="M 820,0 C 860,80 780,160 830,250 L 900,250 L 900,0 Z" fill="#0284c7" opacity="0.7"/>
        </g>

        {/* DECORACIONES (Bajadas ~35px) */}
        
        {/* Burbujas */}
        <g opacity="0.5">
          <g className="float-element">
            <circle cx="585" cy="100" r="16" fill="#ffffff" fillOpacity="0.2" stroke="#7dd3fc" strokeWidth="2"/>
            <circle cx="579" cy="95" r="5" fill="#ffffff" opacity="0.6"/>
          </g>
          <circle cx="565" cy="140" r="8" fill="#ffffff" fillOpacity="0.15" stroke="#7dd3fc" strokeWidth="1.5" className="float-fast" style={{ animationDelay: '1.2s' }}/>
        </g>

        <g opacity="0.45">
          <g className="float-slow" style={{ animationDelay: '1.5s' }}>
            <circle cx="715" cy="125" r="14" fill="#ffffff" fillOpacity="0.22" stroke="#38bdf8" strokeWidth="2"/>
            <circle cx="709" cy="120" r="4" fill="#ffffff" opacity="0.6"/>
          </g>
          <circle cx="690" cy="90" r="7" fill="#ffffff" fillOpacity="0.14" stroke="#38bdf8" strokeWidth="1.5" className="float-fast" style={{ animationDelay: '1.8s' }}/>
        </g>

        <g opacity="0.6">
          <g className="float-fast" style={{ animationDelay: '0.8s' }}>
            <circle cx="845" cy="160" r="13" fill="#ffffff" fillOpacity="0.28" stroke="#e0f2fe" strokeWidth="2"/>
            <circle cx="839" cy="155" r="4" fill="#ffffff" opacity="0.7"/>
          </g>
        </g>

        {/* PLANTAS (Bajadas +35px) */}
        <g transform="translate(575, 155)" opacity="0.4">
          <g className="float-element">
            <path d="M 0,40 Q -2,25 -3,15 Q -2,8 0,0" stroke="#0ea5e9" strokeWidth="2" fill="none" opacity="0.5"/>
            <ellipse cx="-8" cy="10" rx="5" ry="9" fill="#7dd3fc" fillOpacity="0.3" transform="rotate(-25 -8 10)"/>
            <ellipse cx="8" cy="18" rx="6" ry="10" fill="#38bdf8" fillOpacity="0.25" transform="rotate(20 8 18)"/>
          </g>
        </g>

        <g transform="translate(800, 65)" opacity="0.8">
          <g className="float-element">
            <path d="M 0,80 Q -5,50 -6,35 Q -4,20 0,0" stroke="#e0f2fe" strokeWidth="2" fill="none" opacity="0.6"/>
            <ellipse cx="-12" cy="20" rx="8" ry="14" fill="#ffffff" fillOpacity="0.3" stroke="#bae6fd" strokeWidth="1.5" transform="rotate(-30 -12 20)"/>
            <ellipse cx="12" cy="30" rx="9" ry="16" fill="#ffffff" fillOpacity="0.2" stroke="#bae6fd" strokeWidth="1.5" transform="rotate(25 12 30)"/>
          </g>
        </g>

        {/* HOJAS INDIVIDUALES (Bajadas +35px) */}
        <g opacity="0.35">
          <g transform="translate(600, 75) rotate(15)">
            <g className="float-slow">
              <ellipse cx="0" cy="0" rx="8" ry="14" fill="#38bdf8" fillOpacity="0.2" stroke="#0ea5e9" strokeWidth="1"/>
              <line x1="0" y1="-8" x2="0" y2="8" stroke="#0284c7" strokeWidth="1" opacity="0.4"/>
            </g>
          </g>
          <g transform="translate(825, 85) rotate(-15)">
            <g className="float-slow" style={{ animationDelay: '1.5s' }}>
              <ellipse cx="0" cy="0" rx="5" ry="9" fill="#e0f2fe" fillOpacity="0.22" stroke="#bae6fd" strokeWidth="1"/>
              <line x1="0" y1="-6" x2="0" y2="6" stroke="#bae6fd" strokeWidth="0.8" opacity="0.55"/>
            </g>
          </g>
        </g>

        {/* ICONOS DE PERFIL FLOTANTES (Bajados ~35px) */}

        {/* Usuario/Avatar Simple */}
        <g transform="translate(590, 130)" opacity="0.6">
          <g className="float-element">
            <circle cx="10" cy="6" r="5" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1.5"/>
            <path d="M 1,18 Q 10,10 19,18" stroke="#0284c7" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </g>
        </g>

        {/* Credencial/Badge */}
        <g transform="translate(660, 95)" opacity="0.55">
          <g className="float-slow" style={{ animationDelay: '1.2s' }}>
            <rect x="0" y="0" width="16" height="22" rx="2" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5"/>
            <rect x="4" y="4" width="8" height="8" rx="4" fill="#e0f2fe"/>
            <line x1="3" y1="15" x2="13" y2="15" stroke="#e0f2fe" strokeWidth="1.5"/>
            <line x1="3" y1="18" x2="10" y2="18" stroke="#e0f2fe" strokeWidth="1.5"/>
            <path d="M 8,0 L 8,-5" stroke="#0284c7" strokeWidth="1"/>
          </g>
        </g>

        {/* Lupa */}
        <g transform="translate(740, 145)" opacity="0.6">
          <g className="float-element" style={{ animationDelay: '0.7s' }}>
            <circle cx="8" cy="8" r="7" fill="none" stroke="#0ea5e9" strokeWidth="1.5"/>
            <line x1="13" y1="13" x2="18" y2="18" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="8" cy="8" r="3" fill="#e0f2fe" opacity="0.5"/>
          </g>
        </g>

        {/* Teléfono */}
        <g transform="translate(690, 170)" opacity="0.5">
          <g className="float-fast" style={{ animationDelay: '0.4s' }}>
            <rect x="0" y="0" width="12" height="20" rx="2" fill="#7dd3fc" stroke="#0284c7" strokeWidth="1.5"/>
            <line x1="4" y1="2" x2="8" y2="2" stroke="#0284c7" strokeWidth="1"/>
            <circle cx="6" cy="16" r="1.5" fill="#0284c7"/>
          </g>
        </g>

        {/* Arroba/Email */}
        <g transform="translate(625, 155)" opacity="0.6">
          <g className="float-slow" style={{ animationDelay: '1.6s' }}>
            <path d="M 10,10 A 5,5 0 1 0 15,10 M 15,10 L 15,9 A 9,9 0 1 0 10,19" 
                  fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="10" cy="10" r="2.5" fill="#0ea5e9"/>
          </g>
        </g>

        {/* Maletín */}
        <g transform="translate(820, 135)" opacity="0.7">
          <g className="float-element" style={{ animationDelay: '1s' }}>
            <rect x="0" y="4" width="20" height="14" rx="2" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5"/>
            <path d="M 7,4 L 7,1 Q 7,0 10,0 Q 13,0 13,1 L 13,4" stroke="#0284c7" strokeWidth="1.5" fill="none"/>
            <line x1="10" y1="4" x2="10" y2="18" stroke="#0284c7" strokeWidth="1" opacity="0.5"/>
          </g>
        </g>

        {/* Pin de Ubicación */}
        <g transform="translate(860, 175)" opacity="0.65">
          <g className="float-fast" style={{ animationDelay: '0.9s' }}>
            <path d="M 8,0 Q 16,0 16,8 Q 16,16 8,20 Q 0,16 0,8 Q 0,0 8,0 Z" 
                  fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5"/>
            <circle cx="8" cy="8" r="3" fill="#0ea5e9"/>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BannerDirectorio;
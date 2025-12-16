import React from 'react';

const BannerComunicados: React.FC = () => {
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
          position: relative;
        }

        .banner-container svg {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
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

        .banner-content-svg {
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
      
      <svg 
        className="banner-content-svg"
        viewBox="0 0 900 250" 
        xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="calipsoGradientComunicados" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="shadowComunicados" filterUnits="userSpaceOnUse" x="0" y="0" width="900" height="250">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
          </filter>

          <filter id="iconShadowComunicados" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0ea5e9" floodOpacity="0.4"/>
          </filter>

          <filter id="softBlurComunicados">
            <feGaussianBlur stdDeviation="1.5"/>
          </filter>
        </defs>

        {/* Fondo blanco */}
        <rect width="900" height="250" fill="#ffffff"/>

        {/* TEXTOS (Bajados +35px) */}
        <g transform="translate(160, 35)">
          <text x="0" y="70" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0f172a" letterSpacing="-0.5">
            Comunicados
          </text>
          <text x="0" y="105" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0284c7" letterSpacing="-0.5">
            Oficiales
          </text>
          
          <text x="0" y="135" fontFamily="Arial, sans-serif" fontSize="14" fill="#64748b">
            Información importante e institucional
          </text>
        </g>

        {/* ICONO PRINCIPAL: Megáfono (Bajado +35px) */}
        <g transform="translate(40, 80)">
          <rect width="90" height="90" rx="20" fill="url(#calipsoGradientComunicados)" filter="url(#iconShadowComunicados)"/>
          
          <g transform="translate(6, 22)">
            {/* Megáfono */}
            <path d="M 10,15 L 10,35 Q 10,40 15,40 L 40,40 L 55,50 L 55,0 L 40,10 L 15,10 Q 10,10 10,15 Z" 
                  fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M 15,40 L 15,50 Q 15,55 20,55 L 25,55 Q 30,55 30,50 L 30,40" 
                  fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            
            {/* Ondas de sonido */}
            <path d="M 62,15 Q 68,25 62,35" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.9"/>
            <path d="M 68,10 Q 78,25 68,40" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
            <path d="M 74,5 Q 88,25 74,45" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5"/>
            
            {/* Detalle interior */}
            <circle cx="25" cy="25" r="4" fill="#22d3ee"/>
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

        {/* PLANTAS */}
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

        {/* HOJAS INDIVIDUALES */}
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

        {/* ICONOS FLOTANTES (Bajados ~35px y ajustados) */}

        {/* Sobre/Email (Notificación) */}
        <g transform="translate(595, 130)" opacity="0.6">
          <g className="float-element">
            <rect x="0" y="0" width="24" height="16" rx="2" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1.5"/>
            <path d="M 0,0 L 12,9 L 24,0" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="20" cy="-4" r="3" fill="#ef4444" stroke="white" strokeWidth="1"/>
          </g>
        </g>

        {/* Campana (Alerta) */}
        <g transform="translate(660, 95)" opacity="0.55">
          <g className="float-slow" style={{ animationDelay: '1.2s' }}>
            <path d="M 10,2 Q 18,2 18,10 L 20,15 L 0,15 L 2,10 Q 2,2 10,2 Z" 
                  fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5"/>
            <circle cx="10" cy="17" r="2.5" fill="#0284c7"/>
            {/* Ondas de sonido pequeñas */}
            <path d="M 22,8 Q 24,10 22,12" stroke="#0ea5e9" strokeWidth="1.5" fill="none"/>
            <path d="M -2,8 Q -4,10 -2,12" stroke="#0ea5e9" strokeWidth="1.5" fill="none"/>
          </g>
        </g>

        {/* Tablero/Clipboard (Oficial) */}
        <g transform="translate(740, 145)" opacity="0.6">
          <g className="float-element" style={{ animationDelay: '0.7s' }}>
            <rect x="0" y="0" width="20" height="26" rx="2" fill="#ffffff" fillOpacity="0.9" stroke="#0ea5e9" strokeWidth="1.5"/>
            <rect x="5" y="-3" width="10" height="4" rx="1" fill="#0284c7"/> {/* Clip */}
            <line x1="4" y1="6" x2="16" y2="6" stroke="#bae6fd" strokeWidth="1.5"/>
            <line x1="4" y1="10" x2="16" y2="10" stroke="#bae6fd" strokeWidth="1.5"/>
            <line x1="4" y1="14" x2="14" y2="14" stroke="#bae6fd" strokeWidth="1.5"/>
            <line x1="4" y1="18" x2="16" y2="18" stroke="#bae6fd" strokeWidth="1.5"/>
          </g>
        </g>

        {/* Megáfono Pequeño */}
        <g transform="translate(690, 170)" opacity="0.5">
          <g className="float-fast" style={{ animationDelay: '0.4s' }}>
            <path d="M 0,5 L 0,11 L 4,11 L 10,15 L 10,1 L 4,5 Z" fill="#7dd3fc" stroke="#0284c7" strokeWidth="1.5"/>
            <path d="M 12,4 Q 14,8 12,12" stroke="#0ea5e9" strokeWidth="1.5" fill="none"/>
            <path d="M 15,2 Q 19,8 15,14" stroke="#0ea5e9" strokeWidth="1.5" fill="none"/>
          </g>
        </g>

        {/* Signo de Exclamación (Importante) */}
        <g transform="translate(625, 155)" opacity="0.6">
          <g className="float-slow" style={{ animationDelay: '1.6s' }}>
            <circle cx="0" cy="0" r="10" fill="none" stroke="#0ea5e9" strokeWidth="1.5"/>
            <rect x="-1" y="-5" width="2" height="6" rx="1" fill="#ef4444"/>
            <circle cx="0" cy="4" r="1.5" fill="#ef4444"/>
          </g>
        </g>

        {/* Micrófono (Anuncio) */}
        <g transform="translate(820, 135)" opacity="0.7">
          <g className="float-element" style={{ animationDelay: '1s' }}>
            <rect x="6" y="0" width="8" height="14" rx="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5"/>
            <line x1="6" y1="3" x2="14" y2="3" stroke="#0284c7" strokeWidth="0.5" opacity="0.5"/>
            <line x1="6" y1="6" x2="14" y2="6" stroke="#0284c7" strokeWidth="0.5" opacity="0.5"/>
            <line x1="6" y1="9" x2="14" y2="9" stroke="#0284c7" strokeWidth="0.5" opacity="0.5"/>
            <path d="M 2,8 Q 2,15 10,15 Q 18,15 18,8" fill="none" stroke="#0284c7" strokeWidth="1.5"/>
            <line x1="10" y1="15" x2="10" y2="20" stroke="#0284c7" strokeWidth="1.5"/>
            <line x1="6" y1="20" x2="14" y2="20" stroke="#0284c7" strokeWidth="1.5"/>
          </g>
        </g>

        {/* Calendario/Evento */}
        <g transform="translate(860, 175)" opacity="0.65">
          <g className="float-fast" style={{ animationDelay: '0.9s' }}>
            <rect x="0" y="2" width="18" height="16" rx="2" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5"/>
            <rect x="0" y="2" width="18" height="4" rx="2" fill="#0ea5e9"/>
            <line x1="5" y1="0" x2="5" y2="4" stroke="#0284c7" strokeWidth="1.5"/>
            <line x1="13" y1="0" x2="13" y2="4" stroke="#0284c7" strokeWidth="1.5"/>
            <rect x="4" y="9" width="3" height="3" fill="#0ea5e9" opacity="0.5"/>
            <rect x="9" y="9" width="3" height="3" fill="#0ea5e9" opacity="0.5"/>
            <rect x="14" y="9" width="2" height="3" fill="#0ea5e9" opacity="0.5"/>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BannerComunicados;
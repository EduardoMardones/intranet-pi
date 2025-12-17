import React from 'react';

const BannerSoporte: React.FC = () => {
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
          will-change: opacity;
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        /* Optimización de rendering */
        .float-element,
        .float-slow,
        .float-fast,
        .wave-layer {
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Animación suave de las olas */
        .wave-layer {
          transform-origin: center;
          animation: floatWave 6s ease-in-out infinite alternate;
        }
        .wave-layer:nth-child(odd) { animation-duration: 7s; }
        .wave-layer:nth-child(even) { animation-duration: 9s; animation-direction: alternate-reverse; }

        /* Animación flotante para decorativos */
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
          <linearGradient id="calipsoGradientSoporte" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="shadowSoporte" filterUnits="userSpaceOnUse" x="0" y="0" width="900" height="250">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
          </filter>

          <filter id="iconShadowSoporte" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0ea5e9" floodOpacity="0.4"/>
          </filter>

          <filter id="softBlurSoporte">
            <feGaussianBlur stdDeviation="1.5"/>
          </filter>
        </defs>

        <rect width="900" height="250" fill="#ffffff"/>

        {/* === TEXTOS === */}
        <g transform="translate(160, 35)">
          <text x="0" y="70" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0f172a" letterSpacing="-0.5">
            Soporte
          </text>
          <text x="0" y="105" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0284c7" letterSpacing="-0.5">
            Técnico
          </text>
          
          <text x="0" y="135" fontFamily="Arial, sans-serif" fontSize="14" fill="#64748b">
            Asistencia informática y redes
          </text>
        </g>

        {/* === ICONO PRINCIPAL: Monitor + Herramientas === */}
        <g transform="translate(40, 80)">
          <rect width="90" height="90" rx="20" fill="url(#calipsoGradientSoporte)" filter="url(#iconShadowSoporte)"/>
          
          <g transform="translate(15, 20)">
            {/* Monitor */}
            <rect x="5" y="0" width="50" height="35" rx="3" fill="white"/>
            <rect x="8" y="3" width="44" height="29" rx="1" fill="#bae6fd"/>
            {/* Base Monitor */}
            <path d="M 30,35 L 30,45 M 20,45 L 40,45" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            
            {/* Engranaje en pantalla */}
            <circle cx="30" cy="17.5" r="8" stroke="white" strokeWidth="2.5" fill="none" strokeDasharray="3,2"/>
            <circle cx="30" cy="17.5" r="3" fill="white"/>

            {/* Llave Inglesa superpuesta */}
            <g transform="translate(35, 25) rotate(-45)">
              <path d="M 0,0 L 0,15 Q 0,18 3,18 Q 6,18 6,15 L 6,0" fill="#e2e8f0" stroke="#475569" strokeWidth="1"/>
              <path d="M -3,-6 Q -5,0 0,0 L 6,0 Q 11,0 9,-6 L 8,-8 L -2,-8 Z" fill="#64748b"/>
            </g>
          </g>
        </g>

        {/* === OLAS DINÁMICAS === */}
        <g opacity="0.95">
          <path className="wave-layer" d="M 550,0 C 600,80 520,160 580,250 L 900,250 L 900,0 Z" fill="#bae6fd" opacity="0.3"/>
          <path className="wave-layer" d="M 620,0 C 600,70 660,170 630,250 L 900,250 L 900,0 Z" fill="#7dd3fc" opacity="0.4"/>
          <path className="wave-layer" d="M 690,0 C 740,70 650,160 710,250 L 900,250 L 900,0 Z" fill="#38bdf8" opacity="0.5"/>
          <path className="wave-layer" d="M 760,0 C 730,80 800,150 770,250 L 900,250 L 900,0 Z" fill="#0ea5e9" opacity="0.6"/>
          <path className="wave-layer" d="M 820,0 C 860,80 780,160 830,250 L 900,250 L 900,0 Z" fill="#0284c7" opacity="0.7"/>
        </g>

        {/* === DECORACIONES (Burbujas) === */}
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

        {/* === PLANTAS === */}
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

        {/* === HOJAS FLOTANTES INDIVIDUALES === */}
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

        {/* === ICONOS DE SOPORTE FLOTANTES === */}

        {/* Laptop Abierto */}
        <g transform="translate(590, 130)" opacity="0.6">
          <g className="float-element">
            <rect x="0" y="0" width="18" height="12" rx="1" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5"/>
            <rect x="-2" y="12" width="22" height="2" rx="0.5" fill="#0284c7"/>
            <circle cx="9" cy="5" r="2" fill="#0ea5e9"/>
          </g>
        </g>

        {/* Engranaje/Tuerca */}
        <g transform="translate(660, 95)" opacity="0.55">
          <g className="float-slow" style={{ animationDelay: '1.2s' }}>
            <path d="M 12,2 L 12,5 M 19,9 L 16,10.5 M 19,15 L 16,13.5 M 12,22 L 12,19 M 5,15 L 8,13.5 M 5,9 L 8,10.5" stroke="#0284c7" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="6" fill="none" stroke="#0ea5e9" strokeWidth="2"/>
            <circle cx="12" cy="12" r="2" fill="#0284c7"/>
          </g>
        </g>

        {/* Llave Inglesa */}
        <g transform="translate(740, 145)" opacity="0.6">
          <g className="float-element" style={{ animationDelay: '0.7s' }}>
            <g transform="rotate(45 10 10)">
              <path d="M 6,2 L 6,14 Q 6,18 9,18 Q 12,18 12,14 L 12,2" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5"/>
              <path d="M 4,-4 Q 2,2 9,2 L 9,2 Q 16,2 14,-4 L 13,-6 L 5,-6 Z" fill="#0284c7"/>
            </g>
          </g>
        </g>

        {/* Señal Wi-Fi */}
        <g transform="translate(690, 170)" opacity="0.5">
          <g className="float-fast" style={{ animationDelay: '0.4s' }}>
            <circle cx="10" cy="14" r="2" fill="#0284c7"/>
            <path d="M 6,10 Q 10,6 14,10" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round"/>
            <path d="M 2,6 Q 10,0 18,6" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round"/>
          </g>
        </g>

        {/* Servidor/Database */}
        <g transform="translate(625, 155)" opacity="0.6">
          <g className="float-slow" style={{ animationDelay: '1.6s' }}>
            <ellipse cx="10" cy="4" rx="8" ry="3" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5"/>
            <path d="M 2,4 L 2,9 Q 2,12 10,12 Q 18,12 18,9 L 18,4" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5"/>
            <path d="M 2,9 L 2,14 Q 2,17 10,17 Q 18,17 18,14 L 18,9" fill="#7dd3fc" stroke="#0284c7" strokeWidth="1.5"/>
          </g>
        </g>

        {/* Bug/Bicho (Software Error) */}
        <g transform="translate(820, 135)" opacity="0.7">
          <g className="float-element" style={{ animationDelay: '1s' }}>
            <ellipse cx="10" cy="10" rx="6" ry="7" fill="#0284c7"/>
            <path d="M 4,6 L 1,4 M 16,6 L 19,4 M 4,10 L 0,10 M 16,10 L 20,10 M 4,14 L 1,16 M 16,14 L 19,16" stroke="#0284c7" strokeWidth="1.5"/>
          </g>
        </g>

        {/* Mouse de PC */}
        <g transform="translate(860, 175)" opacity="0.65">
          <g className="float-fast" style={{ animationDelay: '0.9s' }}>
            <rect x="4" y="2" width="12" height="18" rx="6" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5"/>
            <line x1="10" y1="2" x2="10" y2="8" stroke="#0284c7" strokeWidth="1.5"/>
            <line x1="4" y1="8" x2="16" y2="8" stroke="#0284c7" strokeWidth="1.5"/>
          </g>
        </g>

      </svg>
    </div>
  );
};

export default BannerSoporte;
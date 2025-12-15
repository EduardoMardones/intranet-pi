import React from 'react';

const BannerSoporte: React.FC = () => {
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
          <linearGradient id="calipsoGradientSoporte" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="shadowSoporte" filterUnits="userSpaceOnUse" x="0" y="0" width="900" height="180">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
          </filter>

          <filter id="iconShadowSoporte" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0ea5e9" floodOpacity="0.4"/>
          </filter>

          <filter id="softBlurSoporte">
            <feGaussianBlur stdDeviation="1.5"/>
          </filter>
        </defs>

        <rect width="900" height="180" fill="#ffffff"/>

        {/* TEXTOS */}
        <g transform="translate(160, 0)">
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

        {/* ICONO PRINCIPAL: Monitor + Herramientas */}
        <g transform="translate(40, 45)">
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
          <g className="float-slow" style={{ animationDelay: '0.8s' }}>
            <circle cx="620" cy="45" r="11" fill="#ffffff" fillOpacity="0.18" stroke="#bae6fd" strokeWidth="1.5"/>
            <circle cx="615" cy="41" r="3" fill="#ffffff" opacity="0.5"/>
          </g>
        </g>

        {/* ICONOS FLOTANTES - Elementos técnicos */}
        <g transform="translate(600, 100)" opacity="0.6">
          <g className="float-element">
            <circle cx="8" cy="8" r="8" fill="#64748b" stroke="#475569" strokeWidth="1.5"/>
            <circle cx="8" cy="8" r="5" stroke="white" strokeWidth="2" fill="none" strokeDasharray="2,1"/>
            <circle cx="8" cy="8" r="2" fill="white"/>
          </g>
        </g>

        <g transform="translate(670, 70)" opacity="0.55">
          <g className="float-slow" style={{ animationDelay: '1.2s' }}>
            <rect x="0" y="0" width="16" height="16" rx="2" fill="#3b82f6" stroke="#2563eb" strokeWidth="1.5"/>
            <rect x="3" y="3" width="10" height="10" rx="1" fill="#dbeafe"/>
            <path d="M 5,8 L 8,11 L 13,5" stroke="#2563eb" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </g>

        <g transform="translate(730, 120)" opacity="0.6">
          <g className="float-element" style={{ animationDelay: '0.7s' }}>
            <circle cx="8" cy="8" r="8" fill="#10b981" stroke="#059669" strokeWidth="1.5"/>
            <path d="M 8,4 L 8,12 M 4,8 L 12,8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </g>
        </g>

        <g transform="translate(780, 85)" opacity="0.5">
          <g className="float-slow" style={{ animationDelay: '1.5s' }}>
            <rect x="0" y="0" width="14" height="14" rx="2" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5"/>
            <path d="M 3,7 L 7,3 L 11,7 L 7,11 Z" fill="#fef3c7"/>
          </g>
        </g>

        <g transform="translate(830, 140)" opacity="0.55">
          <g className="float-fast" style={{ animationDelay: '0.3s' }}>
            <circle cx="6" cy="6" r="6" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5"/>
            <rect x="4.5" y="3" width="1" height="4" rx="0.5" fill="white"/>
            <circle cx="5" cy="8.5" r="0.8" fill="white"/>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BannerSoporte;

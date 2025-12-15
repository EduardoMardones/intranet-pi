import React from 'react';

const BannerVacaciones: React.FC = () => {
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
          <linearGradient id="calipsoGradientVacaciones" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="shadowVacaciones" filterUnits="userSpaceOnUse" x="0" y="0" width="900" height="180">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
          </filter>

          <filter id="iconShadowVacaciones" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0ea5e9" floodOpacity="0.4"/>
          </filter>

          <filter id="softBlurVacaciones">
            <feGaussianBlur stdDeviation="1.5"/>
          </filter>
        </defs>

        <rect width="900" height="180" fill="#ffffff"/>

        {/* TEXTOS */}
        <g transform="translate(160, 0)">
          <text x="0" y="70" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0f172a" letterSpacing="-0.5">
            Solicitudes de
          </text>
          <text x="0" y="105" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0284c7" letterSpacing="-0.5">
            Vacaciones
          </text>
          
          <text x="0" y="135" fontFamily="Arial, sans-serif" fontSize="14" fill="#64748b">
            Gestiona tus ausencias eficientemente
          </text>
        </g>

        {/* ICONO PRINCIPAL: Calendario */}
        <g transform="translate(40, 45)">
          <rect width="90" height="90" rx="20" fill="url(#calipsoGradientVacaciones)" filter="url(#iconShadowVacaciones)"/>
          
          <g transform="translate(20, 20)" stroke="white" strokeWidth="2.5" fill="none">
            <rect x="0" y="5" width="50" height="50" rx="3"/>
            <line x1="37" y1="0" x2="37" y2="10"/>
            <line x1="13" y1="0" x2="13" y2="10"/>
            <line x1="0" y1="18" x2="50" y2="18"/>
            <rect x="8" y="27" width="5" height="5" fill="white"/>
            <rect x="23" y="27" width="5" height="5" fill="white"/>
            <rect x="37" y="27" width="5" height="5" fill="white"/>
            <circle cx="40" cy="40" r="10" stroke="white" strokeWidth="2" fill="none" opacity="0.5"/>
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
            <circle cx="589" cy="67" r="2.5" fill="#ffffff" opacity="0.4"/>
          </g>
          <g className="float-slow" style={{ animationDelay: '0.8s' }}>
            <circle cx="620" cy="45" r="11" fill="#ffffff" fillOpacity="0.18" stroke="#bae6fd" strokeWidth="1.5"/>
            <circle cx="615" cy="41" r="3" fill="#ffffff" opacity="0.5"/>
          </g>
          <circle cx="565" cy="105" r="8" fill="#ffffff" fillOpacity="0.15" stroke="#7dd3fc" strokeWidth="1.5" className="float-fast" style={{ animationDelay: '1.2s' }}/>
          <circle cx="605" cy="90" r="7" fill="#ffffff" fillOpacity="0.16" stroke="#7dd3fc" strokeWidth="1.5" className="float-element" style={{ animationDelay: '0.4s' }}/>
        </g>

        {/* ICONOS FLOTANTES - Elementos de vacaciones */}
        <g transform="translate(600, 100)" opacity="0.6">
          <g className="float-element">
            <circle cx="8" cy="8" r="8" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5"/>
            <circle cx="8" cy="8" r="4" fill="#fef3c7"/>
          </g>
        </g>

        <g transform="translate(670, 70)" opacity="0.55">
          <g className="float-slow" style={{ animationDelay: '1.2s' }}>
            <path d="M 0,0 L 6,8 L 12,0 Z" fill="#22d3ee" stroke="#0ea5e9" strokeWidth="1.5"/>
            <rect x="4" y="8" width="4" height="8" fill="#0ea5e9"/>
          </g>
        </g>

        <g transform="translate(730, 120)" opacity="0.6">
          <g className="float-element" style={{ animationDelay: '0.7s' }}>
            <path d="M 8,0 Q 12,4 8,8 Q 4,4 8,0 Z" fill="#ec4899" stroke="#db2777" strokeWidth="1.5"/>
            <circle cx="8" cy="4" r="2" fill="#fce7f3"/>
          </g>
        </g>

        <g transform="translate(780, 85)" opacity="0.5">
          <g className="float-slow" style={{ animationDelay: '1.5s' }}>
            <rect x="0" y="0" width="12" height="12" rx="2" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="1.5"/>
            <path d="M 3,6 L 6,9 L 10,3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BannerVacaciones;

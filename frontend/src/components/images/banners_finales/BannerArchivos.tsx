import React from 'react';

const BannerArchivos: React.FC = () => {
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
          <linearGradient id="calipsoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="shadow" filterUnits="userSpaceOnUse" x="0" y="0" width="900" height="180">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
          </filter>

          <filter id="iconShadow" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0ea5e9" floodOpacity="0.4"/>
          </filter>

          <filter id="softBlur">
            <feGaussianBlur stdDeviation="1.5"/>
          </filter>
        </defs>

        <rect width="900" height="180" fill="#ffffff"/>

        {/* TEXTOS */}
        <g transform="translate(160, 0)">
          <text x="0" y="70" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0f172a" letterSpacing="-0.5">
            Gestión de
          </text>
          <text x="0" y="105" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0284c7" letterSpacing="-0.5">
            Archivos
          </text>
          
          <text x="0" y="135" fontFamily="Arial, sans-serif" fontSize="14" fill="#64748b">
            Organiza tus documentos digitales
          </text>
        </g>

        {/* ICONO PRINCIPAL: Carpeta con documentos */}
        <g transform="translate(40, 45)">
          <rect width="90" height="90" rx="20" fill="url(#calipsoGradient)" filter="url(#iconShadow)"/>
          
          <g transform="translate(15, 20)">
            {/* Carpeta */}
            <path d="M 5,15 L 5,50 Q 5,55 10,55 L 50,55 Q 55,55 55,50 L 55,20 Q 55,15 50,15 L 35,15 L 30,10 L 10,10 Q 5,10 5,15 Z" 
                  fill="white" stroke="white" strokeWidth="2"/>
            {/* Documentos dentro */}
            <rect x="15" y="25" width="15" height="20" rx="1" fill="#22d3ee" opacity="0.6"/>
            <rect x="32" y="25" width="15" height="20" rx="1" fill="#22d3ee" opacity="0.8"/>
            <line x1="18" y1="30" x2="27" y2="30" stroke="white" strokeWidth="1" opacity="0.8"/>
            <line x1="18" y1="34" x2="27" y2="34" stroke="white" strokeWidth="1" opacity="0.8"/>
            <line x1="35" y1="30" x2="44" y2="30" stroke="white" strokeWidth="1" opacity="0.8"/>
            <line x1="35" y1="34" x2="44" y2="34" stroke="white" strokeWidth="1" opacity="0.8"/>
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
        <g transform="translate(560, 30)" opacity="0.6">
          <g className="float-element">
            <ellipse cx="0" cy="0" rx="10" ry="14" fill="#e0f2fe" fillOpacity="0.25"/>
            <ellipse cx="-8" cy="-5" rx="7" ry="10" fill="#bae6fd" fillOpacity="0.2" transform="rotate(-20 -8 -5)"/>
            <ellipse cx="8" cy="3" rx="8" ry="11" fill="#e0f2fe" fillOpacity="0.25" transform="rotate(25 8 3)"/>
          </g>
        </g>

        <g transform="translate(640, 145)" opacity="0.5">
          <g className="float-slow" style={{ animationDelay: '1.5s' }}>
            <ellipse cx="0" cy="0" rx="11" ry="15" fill="#bae6fd" fillOpacity="0.28"/>
            <ellipse cx="-9" cy="-6" rx="8" ry="11" fill="#e0f2fe" fillOpacity="0.22" transform="rotate(-25 -9 -6)"/>
            <ellipse cx="9" cy="4" rx="9" ry="12" fill="#bae6fd" fillOpacity="0.28" transform="rotate(30 9 4)"/>
          </g>
        </g>

        <g transform="translate(720, 50)" opacity="0.5">
          <g className="float-slow" style={{ animationDelay: '2s' }}>
            <path d="M 0,50 Q -3,30 -4,20 Q -2,10 0,0" stroke="#0284c7" strokeWidth="2.5" fill="none" opacity="0.4"/>
            <ellipse cx="-10" cy="12" rx="7" ry="12" fill="#38bdf8" fillOpacity="0.25" transform="rotate(-28 -10 12)"/>
            <ellipse cx="10" cy="22" rx="8" ry="14" fill="#0ea5e9" fillOpacity="0.2" transform="rotate(22 10 22)"/>
            <ellipse cx="-7" cy="35" rx="6" ry="10" fill="#38bdf8" fillOpacity="0.25" transform="rotate(-38 -7 35)"/>
          </g>
        </g>

        {/* ICONOS DE ARCHIVOS FLOTANTES */}
        <g transform="translate(590, 100)" opacity="0.6">
          <g className="float-element">
            <rect x="0" y="0" width="14" height="18" rx="1.5" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5"/>
            <text x="7" y="12" fontFamily="Arial" fontSize="6" fontWeight="bold" fill="white" textAnchor="middle">PDF</text>
          </g>
        </g>

        <g transform="translate(625, 65)" opacity="0.6">
          <g className="float-slow" style={{ animationDelay: '1.2s' }}>
            <rect x="0" y="0" width="14" height="18" rx="1.5" fill="#10b981" stroke="#059669" strokeWidth="1.5"/>
            <line x1="3" y1="6" x2="11" y2="6" stroke="white" strokeWidth="0.8"/>
            <line x1="3" y1="9" x2="11" y2="9" stroke="white" strokeWidth="0.8"/>
            <line x1="3" y1="12" x2="11" y2="12" stroke="white" strokeWidth="0.8"/>
            <line x1="7" y1="4" x2="7" y2="14" stroke="white" strokeWidth="0.8"/>
          </g>
        </g>

        <g transform="translate(710, 130)" opacity="0.6">
          <g className="float-element" style={{ animationDelay: '0.7s' }}>
            <rect x="0" y="0" width="14" height="18" rx="1.5" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5"/>
            <line x1="3" y1="6" x2="11" y2="6" stroke="white" strokeWidth="0.8"/>
            <line x1="3" y1="9" x2="11" y2="9" stroke="white" strokeWidth="0.8"/>
            <line x1="3" y1="12" x2="10" y2="12" stroke="white" strokeWidth="0.8"/>
          </g>
        </g>

        <g transform="translate(680, 75)" opacity="0.6">
          <g className="float-fast" style={{ animationDelay: '0.4s' }}>
            <path d="M 0,5 L 0,15 Q 0,17 2,17 L 16,17 Q 18,17 18,15 L 18,7 Q 18,5 16,5 L 12,5 L 10,3 L 2,3 Q 0,3 0,5 Z" 
                  fill="#0ea5e9" stroke="#0284c7" strokeWidth="1.5"/>
          </g>
        </g>

        <g transform="translate(745, 95)" opacity="0.6">
          <g className="float-slow" style={{ animationDelay: '1.6s' }}>
            <rect x="0" y="0" width="16" height="16" rx="1.5" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="1.5"/>
            <circle cx="5" cy="5" r="2" fill="white" opacity="0.8"/>
            <path d="M 2,12 L 6,8 L 10,12 L 14,6" stroke="white" strokeWidth="1.5" fill="none" opacity="0.8"/>
          </g>
        </g>

        <g transform="translate(815, 140)" opacity="0.7">
          <g className="float-element" style={{ animationDelay: '1s' }}>
            <rect x="0" y="0" width="14" height="18" rx="1.5" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5"/>
            <rect x="5" y="3" width="4" height="2" fill="white" opacity="0.8"/>
            <rect x="5" y="6" width="4" height="2" fill="white" opacity="0.6"/>
            <rect x="5" y="9" width="4" height="2" fill="white" opacity="0.8"/>
            <rect x="5" y="12" width="4" height="2" fill="white" opacity="0.6"/>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BannerArchivos;

import React from 'react';

const BannerHomepage: React.FC = () => {
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
        .wave-layer,
        .pulse {
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

        .pulse {
          animation: pulse 2s ease-in-out infinite;
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

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      
      <svg viewBox="0 0 900 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="calipsoGradientHomepage" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="shadowHomepage" filterUnits="userSpaceOnUse" x="0" y="0" width="900" height="180">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
          </filter>

          <filter id="iconShadowHomepage" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0ea5e9" floodOpacity="0.4"/>
          </filter>
        </defs>

        <rect width="900" height="180" fill="#ffffff"/>

        {/* TEXTOS CON MENSAJE DE BIENVENIDA */}
        <g transform="translate(160, 0)">
          <text x="0" y="65" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="700" fill="#0f172a" letterSpacing="-0.5">
            Bienvenido a tu
          </text>
          <text x="0" y="100" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="700" fill="#0284c7" letterSpacing="-0.5">
            Portal CESFAM
          </text>
          
          <text x="0" y="130" fontFamily="Arial, sans-serif" fontSize="14" fill="#64748b">
            Gestión integral de salud y administración
          </text>
        </g>

        {/* ICONO PRINCIPAL: Hospital/CESFAM */}
        <g transform="translate(40, 45)">
          <rect width="90" height="90" rx="20" fill="url(#calipsoGradientHomepage)" filter="url(#iconShadowHomepage)"/>
          
          <g transform="translate(15, 20)">
            {/* Edificio Principal */}
            <rect x="5" y="15" width="50" height="35" rx="2" fill="white"/>
            
            {/* Entrada Urgencias / Techo Alto */}
            <rect x="20" y="5" width="20" height="15" rx="1" fill="white"/>
            
            {/* Cruz Médica (Símbolo CESFAM) */}
            <g className="pulse" transform="translate(30, 12)">
              <circle cx="0" cy="0" r="6" fill="#ef4444"/>
              <rect x="-1.5" y="-4" width="3" height="8" fill="white"/>
              <rect x="-4" y="-1.5" width="8" height="3" fill="white"/>
            </g>

            {/* Puertas de Vidrio */}
            <rect x="23" y="35" width="14" height="15" fill="#bae6fd"/>
            <line x1="30" y1="35" x2="30" y2="50" stroke="#0ea5e9" strokeWidth="1"/>

            {/* Ventanas */}
            <rect x="10" y="22" width="8" height="8" rx="1" fill="#e0f2fe"/>
            <rect x="10" y="35" width="8" height="8" rx="1" fill="#e0f2fe"/>
            <rect x="42" y="22" width="8" height="8" rx="1" fill="#e0f2fe"/>
            <rect x="42" y="35" width="8" height="8" rx="1" fill="#e0f2fe"/>

            {/* Arbusto decorativo */}
            <path d="M 50,50 Q 55,45 60,50 Q 65,45 70,50 L 50,50" fill="#a7f3d0"/>
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

        {/* ICONOS FLOTANTES - Elementos de salud */}
        <g transform="translate(600, 100)" opacity="0.6">
          <g className="float-element">
            <circle cx="8" cy="8" r="8" fill="#10b981" stroke="#059669" strokeWidth="1.5"/>
            <path d="M 5,8 L 7,10 L 11,5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </g>

        <g transform="translate(670, 70)" opacity="0.55">
          <g className="float-slow" style={{ animationDelay: '1.2s' }}>
            <circle cx="8" cy="8" r="8" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5"/>
            <rect x="6" y="4" width="1" height="8" fill="white"/>
            <rect x="4" y="6" width="8" height="1" fill="white"/>
          </g>
        </g>

        <g transform="translate(730, 120)" opacity="0.6">
          <g className="float-element" style={{ animationDelay: '0.7s' }}>
            <circle cx="8" cy="8" r="8" fill="#3b82f6" stroke="#2563eb" strokeWidth="1.5"/>
            <path d="M 8,4 L 8,12 M 4,8 L 12,8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BannerHomepage;

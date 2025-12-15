import React from 'react';

const BannerLudicos: React.FC = () => {
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
          <linearGradient id="calipsoGradientLudicos" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="shadowLudicos" filterUnits="userSpaceOnUse" x="0" y="0" width="900" height="180">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
          </filter>

          <filter id="iconShadowLudicos" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0ea5e9" floodOpacity="0.4"/>
          </filter>

          <filter id="softBlurLudicos">
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
            Actividades
          </text>
          
          <text x="0" y="135" fontFamily="Arial, sans-serif" fontSize="14" fill="#64748b">
            Gestiona tus ausencias eficientemente
          </text>
        </g>

        {/* ICONO PRINCIPAL: Megáfono */}
        <g transform="translate(40, 45)">
          <rect width="90" height="90" rx="20" fill="url(#calipsoGradientLudicos)" filter="url(#iconShadowLudicos)"/>
          
          <g transform="translate(45, 42) rotate(-15)">
            {/* Ondas de sonido */}
            <g stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9">
              <path d="M 28,-5 Q 35,5 28,15" opacity="0.8"/>
              <path d="M 34,-10 Q 45,5 34,20" opacity="0.6"/>
              <path d="M 40,-15 Q 55,5 40,25" opacity="0.4"/>
            </g>

            {/* Mango */}
            <path d="M -5,15 Q -5,28 -12,28 Q -18,28 -15,18 L -8,14 Z" fill="#e2e8f0"/>

            {/* Cuerpo principal */}
            <path d="M -18,2 L 20,-10 L 20,20 L -18,10 Z" fill="#ffffff"/>
            
            {/* Sombra sutil */}
            <path d="M -18,10 L 20,20 L 20,12 L -18,6 Z" fill="#cbd5e1" opacity="0.3"/>

            {/* Parte trasera */}
            <ellipse cx="-18" cy="6" rx="4" ry="7" fill="#f1f5f9"/>

            {/* Boca del megáfono */}
            <ellipse cx="20" cy="5" rx="6" ry="15" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
            
            {/* Interior oscuro */}
            <ellipse cx="20" cy="5" rx="4" ry="12" fill="#334155"/>

            {/* Botón superior */}
            <rect x="-10" y="-1" width="6" height="4" rx="1" fill="#cbd5e1" transform="translate(0, -4)"/>
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
        </g>

        {/* ICONOS FLOTANTES - Elementos de actividades */}
        <g transform="translate(600, 100)" opacity="0.6">
          <g className="float-element">
            <circle cx="8" cy="8" r="8" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5"/>
            <path d="M 8,4 L 10,8 L 8,12 L 6,8 Z" fill="#fef3c7"/>
          </g>
        </g>

        <g transform="translate(670, 70)" opacity="0.55">
          <g className="float-slow" style={{ animationDelay: '1.2s' }}>
            <circle cx="8" cy="8" r="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="1.5"/>
            <path d="M 5,5 L 8,3 L 11,5 L 11,11 L 8,13 L 5,11 Z" fill="#ddd6fe"/>
          </g>
        </g>

        <g transform="translate(730, 120)" opacity="0.6">
          <g className="float-element" style={{ animationDelay: '0.7s' }}>
            <circle cx="8" cy="8" r="8" fill="#10b981" stroke="#059669" strokeWidth="1.5"/>
            <path d="M 4,8 L 7,11 L 12,5" stroke="#d1fae5" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </g>

        <g transform="translate(780, 85)" opacity="0.5">
          <g className="float-slow" style={{ animationDelay: '1.5s' }}>
            <circle cx="8" cy="8" r="8" fill="#ec4899" stroke="#db2777" strokeWidth="1.5"/>
            <circle cx="8" cy="8" r="3" fill="#fce7f3"/>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BannerLudicos;

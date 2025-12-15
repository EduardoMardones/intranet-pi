import React from 'react';

const BannerLicencias: React.FC = () => {
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
          <linearGradient id="calipsoGradientLicencias" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="shadowLicencias" filterUnits="userSpaceOnUse" x="0" y="0" width="900" height="180">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
          </filter>

          <filter id="iconShadowLicencias" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0ea5e9" floodOpacity="0.4"/>
          </filter>

          <filter id="softBlurLicencias">
            <feGaussianBlur stdDeviation="1.5"/>
          </filter>
        </defs>

        <rect width="900" height="180" fill="#ffffff"/>

        {/* TEXTOS */}
        <g transform="translate(160, 0)">
          <text x="0" y="70" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0f172a" letterSpacing="-0.5">
            Licencias
          </text>
          <text x="0" y="105" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0284c7" letterSpacing="-0.5">
            Médicas
          </text>
          
          <text x="0" y="135" fontFamily="Arial, sans-serif" fontSize="14" fill="#64748b">
            Gestiona tu salud y recuperación
          </text>
        </g>

        {/* ICONO PRINCIPAL: Cruz Médica */}
        <g transform="translate(40, 45)">
          <rect width="90" height="90" rx="20" fill="url(#calipsoGradientLicencias)" filter="url(#iconShadowLicencias)"/>
          
          {/* Cruz médica */}
          <g transform="translate(25, 25)">
            <rect x="15" y="5" width="10" height="30" rx="2" fill="white"/>
            <rect x="5" y="15" width="30" height="10" rx="2" fill="white"/>
            <circle cx="20" cy="20" r="3" fill="#22d3ee"/>
          </g>
          
          {/* Pulso/ECG */}
          <path d="M 20,65 L 25,65 L 28,58 L 32,72 L 36,65 L 40,65" 
                stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
          <path d="M 50,65 L 55,65 L 58,58 L 62,72 L 66,65 L 70,65" 
                stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
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

        {/* ICONOS FLOTANTES - Elementos médicos */}
        <g transform="translate(600, 100)" opacity="0.6">
          <g className="float-element">
            <rect x="0" y="0" width="16" height="20" rx="2" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5"/>
            <path d="M 5,5 L 5,8 L 8,8 L 8,5 Z M 8,8 L 11,8 L 11,11 L 8,11 Z" fill="white"/>
          </g>
        </g>

        <g transform="translate(670, 70)" opacity="0.55">
          <g className="float-slow" style={{ animationDelay: '1.2s' }}>
            <circle cx="8" cy="8" r="8" fill="#ffffff" fillOpacity="0.8" stroke="#0ea5e9" strokeWidth="1.5"/>
            <path d="M 5,8 L 8,5 L 11,8 L 8,11 Z" fill="#0ea5e9"/>
          </g>
        </g>

        <g transform="translate(730, 120)" opacity="0.6">
          <g className="float-element" style={{ animationDelay: '0.7s' }}>
            <rect x="0" y="0" width="18" height="14" rx="2" fill="#10b981" stroke="#059669" strokeWidth="1.5"/>
            <rect x="4" y="4" width="5" height="1" fill="white"/>
            <rect x="4" y="7" width="10" height="1" fill="white"/>
            <rect x="4" y="10" width="8" height="1" fill="white"/>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BannerLicencias;

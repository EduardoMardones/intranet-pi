import React from 'react';

const BannerComunicados: React.FC = () => {
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
          <linearGradient id="calipsoGradientComunicados" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="shadowComunicados" filterUnits="userSpaceOnUse" x="0" y="0" width="900" height="180">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
          </filter>

          <filter id="iconShadowComunicados" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0ea5e9" floodOpacity="0.4"/>
          </filter>

          <filter id="softBlurComunicados">
            <feGaussianBlur stdDeviation="1.5"/>
          </filter>
        </defs>

        <rect width="900" height="180" fill="#ffffff"/>

        {/* TEXTOS */}
        <g transform="translate(160, 0)">
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

        {/* ICONO PRINCIPAL: Megáfono */}
        <g transform="translate(40, 45)">
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

        <g opacity="0.45">
          <g className="float-slow" style={{ animationDelay: '1.5s' }}>
            <circle cx="715" cy="90" r="14" fill="#ffffff" fillOpacity="0.22" stroke="#38bdf8" strokeWidth="2"/>
            <circle cx="709" cy="85" r="4" fill="#ffffff" opacity="0.6"/>
          </g>
          <circle cx="690" cy="55" r="7" fill="#ffffff" fillOpacity="0.14" stroke="#38bdf8" strokeWidth="1.5" className="float-fast" style={{ animationDelay: '1.8s' }}/>
        </g>

        {/* ICONOS FLOTANTES */}
        <g transform="translate(595, 95)" opacity="0.6">
          <g className="float-element">
            <rect x="0" y="0" width="24" height="16" rx="2" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1.5"/>
            <path d="M 0,0 L 12,9 L 24,0" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="20" cy="-4" r="3" fill="#ef4444" stroke="white" strokeWidth="1"/>
          </g>
        </g>

        <g transform="translate(660, 60)" opacity="0.55">
          <g className="float-slow" style={{ animationDelay: '1.2s' }}>
            <path d="M 10,2 Q 18,2 18,10 L 20,15 L 0,15 L 2,10 Q 2,2 10,2 Z" 
                  fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5"/>
            <circle cx="10" cy="17" r="2.5" fill="#0284c7"/>
            <path d="M 22,8 Q 24,10 22,12" stroke="#0ea5e9" strokeWidth="1.5" fill="none"/>
            <path d="M -2,8 Q -4,10 -2,12" stroke="#0ea5e9" strokeWidth="1.5" fill="none"/>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BannerComunicados;

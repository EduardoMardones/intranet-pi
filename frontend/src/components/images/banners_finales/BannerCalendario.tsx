import React from 'react';

const BannerCalendario: React.FC = () => {
  return (
    <div className="banner-container">
      <style>{`
        .banner-container {
          width: 100%;
          height: 250px; /* Altura actualizada */
          position: relative;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .banner-container svg {
          display: block;
          width: 100%;
          height: 100%;
        }

        /* Optimizaciones de renderizado */
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

        .banner-content-anim {
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
        className="banner-content-anim"
        viewBox="0 0 900 250" 
        preserveAspectRatio="xMidYMid slice" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="calipsoGradientNew" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="shadowNew" filterUnits="userSpaceOnUse" x="0" y="0" width="900" height="250">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
          </filter>

          <filter id="iconShadowNew" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0ea5e9" floodOpacity="0.4"/>
          </filter>
        </defs>

        {/* Fondo Blanco */}
        <rect width="100%" height="100%" fill="#ffffff"/>

        {/* === TEXTOS (Centrados verticalmente: Bajados +35px) === */}
        <g transform="translate(160, 35)">
          <text x="0" y="70" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0f172a" letterSpacing="-0.5">
            Calendario
          </text>
          <text x="0" y="105" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0284c7" letterSpacing="-0.5">
            Institucional
          </text>
          
          <text x="0" y="135" fontFamily="Arial, sans-serif" fontSize="14" fill="#64748b">
            Eventos, efemérides y fechas clave
          </text>
        </g>

        {/* === ICONO PRINCIPAL (Centrado verticalmente: Bajado +35px) === */}
        <g transform="translate(40, 80)">
          <rect width="90" height="90" rx="20" fill="url(#calipsoGradientNew)" filter="url(#iconShadowNew)"/>
          
          <g transform="translate(15, 15)">
            {/* Hoja de Calendario */}
            <rect x="5" y="5" width="50" height="55" rx="4" fill="white"/>
            {/* Cabecera roja/azul del calendario */}
            <path d="M 5,9 Q 5,5 9,5 L 51,5 Q 55,5 55,9 L 55,18 L 5,18 Z" fill="#0e7490"/>
            {/* Anillas del calendario */}
            <rect x="15" y="2" width="4" height="8" rx="2" fill="#cbd5e1"/>
            <rect x="41" y="2" width="4" height="8" rx="2" fill="#cbd5e1"/>
            
            {/* Cuadrícula simulada */}
            <rect x="12" y="25" width="36" height="2" rx="1" fill="#bae6fd"/>
            <rect x="12" y="32" width="36" height="2" rx="1" fill="#bae6fd"/>
            <rect x="12" y="39" width="36" height="2" rx="1" fill="#bae6fd"/>
            <rect x="12" y="46" width="20" height="2" rx="1" fill="#bae6fd"/>

            {/* Reloj superpuesto */}
            <g transform="translate(35, 35)">
              <circle cx="15" cy="15" r="14" fill="#22d3ee" stroke="white" strokeWidth="3"/>
              <circle cx="15" cy="15" r="2" fill="white"/>
              <line x1="15" y1="15" x2="15" y2="8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="15" y1="15" x2="20" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </g>
          </g>
        </g>

        {/* === OLAS DINÁMICAS (Recalculadas para altura 250px) === */}
        <g opacity="0.95">
          <path className="wave-layer" d="M 550,0 C 600,80 520,160 580,250 L 900,250 L 900,0 Z" fill="#bae6fd" opacity="0.3"/>
          <path className="wave-layer" d="M 620,0 C 600,70 660,170 630,250 L 900,250 L 900,0 Z" fill="#7dd3fc" opacity="0.4"/>
          <path className="wave-layer" d="M 690,0 C 740,70 650,160 710,250 L 900,250 L 900,0 Z" fill="#38bdf8" opacity="0.5"/>
          <path className="wave-layer" d="M 760,0 C 730,80 800,150 770,250 L 900,250 L 900,0 Z" fill="#0ea5e9" opacity="0.6"/>
          <path className="wave-layer" d="M 820,0 C 860,80 780,160 830,250 L 900,250 L 900,0 Z" fill="#0284c7" opacity="0.7"/>
        </g>

        {/* === DECORACIONES (Burbujas y Hojas) === */}
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

        {/* === ICONOS FLOTANTES === */}

        {/* Post-it Note */}
        <g transform="translate(590, 130)" opacity="0.6">
          <g className="float-element">
            <path d="M 2,2 L 18,2 L 18,18 L 14,22 L 2,22 Z" fill="#fef3c7" stroke="#fbbf24" strokeWidth="1.5"/>
            <path d="M 18,18 L 14,22 L 14,18 Z" fill="#f59e0b"/>
            <line x1="5" y1="8" x2="15" y2="8" stroke="#f59e0b" strokeWidth="1" opacity="0.5"/>
            <line x1="5" y1="12" x2="15" y2="12" stroke="#f59e0b" strokeWidth="1" opacity="0.5"/>
          </g>
        </g>

        {/* Pin/Chincheta */}
        <g transform="translate(660, 95)" opacity="0.6">
          <g className="float-slow" style={{ animationDelay: '1.2s' }}>
            <line x1="10" y1="14" x2="16" y2="20" stroke="#64748b" strokeWidth="1.5"/>
            <path d="M 4,8 L 10,14 L 14,10 L 8,4 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5"/>
            <circle cx="6" cy="6" r="2.5" fill="#fca5a5"/>
          </g>
        </g>

        {/* Reloj de Arena */}
        <g transform="translate(740, 145)" opacity="0.6">
          <g className="float-element" style={{ animationDelay: '0.7s' }}>
            <path d="M 5,2 L 15,2 L 11,10 L 15,18 L 5,18 L 9,10 L 5,2 Z" 
                  fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M 5,2 L 15,2" stroke="#0ea5e9" strokeWidth="1.5"/>
            <path d="M 5,18 L 15,18" stroke="#0ea5e9" strokeWidth="1.5"/>
            <path d="M 8,14 L 12,14 L 10,18 Z" fill="#0ea5e9" stroke="none"/>
            <path d="M 7,4 L 13,4 L 11,8 L 9,8 Z" fill="#0ea5e9" stroke="none"/>
          </g>
        </g>

        {/* Calendario Pequeño */}
        <g transform="translate(690, 170)" opacity="0.5">
          <g className="float-fast" style={{ animationDelay: '0.4s' }}>
            <rect x="0" y="2" width="16" height="14" rx="2" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5"/>
            <rect x="0" y="2" width="16" height="4" rx="1" fill="#0284c7"/>
            <text x="8" y="13" fontFamily="Arial" fontSize="6" fill="#0284c7" textAnchor="middle" fontWeight="bold">15</text>
          </g>
        </g>

        {/* Campana de Notificación */}
        <g transform="translate(625, 165)" opacity="0.6">
          <g className="float-slow" style={{ animationDelay: '1.6s' }}>
            <path d="M 10,2 Q 16,2 16,9 L 18,13 L 2,13 L 4,9 Q 4,2 10,2" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5"/>
            <circle cx="10" cy="15" r="2" fill="#0284c7"/>
          </g>
        </g>

        {/* Checklist/Tareas */}
        <g transform="translate(820, 135)" opacity="0.7">
          <g className="float-element" style={{ animationDelay: '1s' }}>
            <rect x="0" y="0" width="16" height="20" rx="2" fill="#ffffff" fillOpacity="0.8" stroke="#0284c7" strokeWidth="1.5"/>
            <path d="M 3,6 L 5,8 L 8,4" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="10" y1="6" x2="14" y2="6" stroke="#0284c7" strokeWidth="1" opacity="0.5"/>
            <path d="M 3,12 L 5,14 L 8,10" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="10" y1="12" x2="14" y2="12" stroke="#0284c7" strokeWidth="1" opacity="0.5"/>
          </g>
        </g>

        {/* Reloj/Alarma */}
        <g transform="translate(860, 175)" opacity="0.65">
          <g className="float-fast" style={{ animationDelay: '0.9s' }}>
            <circle cx="10" cy="10" r="8" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5"/>
            <path d="M 3,4 L 1,2" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M 17,4 L 19,2" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round"/>
            <polyline points="10,6 10,10 13,10" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
        </g>

      </svg>
    </div>
  );
};

export default BannerCalendario;
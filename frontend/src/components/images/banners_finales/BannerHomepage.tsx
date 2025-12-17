import React from 'react';

const BannerHomepage: React.FC = () => {
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
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
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
          animation: pulse 3s ease-in-out infinite;
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
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      
      <svg viewBox="0 0 900 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="calipsoGradientHomepage" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="shadowHomepage" filterUnits="userSpaceOnUse" x="0" y="0" width="900" height="250">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
          </filter>

          <filter id="iconShadowHomepage" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0ea5e9" floodOpacity="0.4"/>
          </filter>
        </defs>

        <rect width="900" height="250" fill="#ffffff"/>

        {/* TEXTOS CON MENSAJE DE BIENVENIDA */}
        <g transform="translate(160, 35)">
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
        <g transform="translate(40, 80)">
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
          <path className="wave-layer" d="M 550,0 C 600,80 520,160 580,250 L 900,250 L 900,0 Z" fill="#bae6fd" opacity="0.35"/>
          <path className="wave-layer" d="M 620,0 C 600,70 660,170 630,250 L 900,250 L 900,0 Z" fill="#7dd3fc" opacity="0.45"/>
          <path className="wave-layer" d="M 690,0 C 740,70 650,160 710,250 L 900,250 L 900,0 Z" fill="#38bdf8" opacity="0.55"/>
          <path className="wave-layer" d="M 760,0 C 730,80 800,150 770,250 L 900,250 L 900,0 Z" fill="#0ea5e9" opacity="0.65"/>
          <path className="wave-layer" d="M 820,0 C 860,80 780,160 830,250 L 900,250 L 900,0 Z" fill="#0284c7" opacity="0.75"/>
        </g>

        {/* DECORACIONES */}
        <g opacity="0.6">
          <g className="float-element">
            <circle cx="585" cy="100" r="16" fill="#ffffff" fillOpacity="0.3" stroke="#7dd3fc" strokeWidth="2"/>
            <circle cx="579" cy="95" r="5" fill="#ffffff" opacity="0.7"/>
          </g>
          <circle cx="605" cy="125" r="7" fill="#ffffff" fillOpacity="0.22" stroke="#7dd3fc" strokeWidth="1.5" className="float-element" style={{ animationDelay: '0.4s' }}/>
        </g>

        <g opacity="0.5">
          <circle cx="715" cy="125" r="14" fill="#ffffff" fillOpacity="0.28" stroke="#38bdf8" strokeWidth="2" className="float-slow" style={{ animationDelay: '1.5s' }}/>
          <g className="float-element" style={{ animationDelay: '0.6s' }}>
            <circle cx="740" cy="150" r="10" fill="#ffffff" fillOpacity="0.22" stroke="#7dd3fc" strokeWidth="1.5"/>
            <circle cx="736" cy="146" r="2.5" fill="#ffffff" opacity="0.6"/>
          </g>
        </g>

        <g opacity="0.65">
          <g className="float-fast" style={{ animationDelay: '0.8s' }}>
            <circle cx="845" cy="160" r="13" fill="#ffffff" fillOpacity="0.35" stroke="#e0f2fe" strokeWidth="2"/>
            <circle cx="839" cy="155" r="4" fill="#ffffff" opacity="0.8"/>
          </g>
        </g>

        {/* Plantas decorativas */}
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

        {/* === ICONOS VARIADOS FLOTANTES === */}
        
        {/* Calendario */}
        <g transform="translate(590, 130)" opacity="0.7">
          <g className="float-element">
            <rect x="0" y="2" width="16" height="16" rx="2" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1.5"/>
            <line x1="4" y1="0" x2="4" y2="4" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="12" y1="0" x2="12" y2="4" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="0" y1="7" x2="16" y2="7" stroke="#22d3ee" strokeWidth="1.5"/>
            <circle cx="5" cy="11" r="1" fill="white"/>
            <circle cx="8" cy="11" r="1" fill="white"/>
            <circle cx="11" cy="11" r="1" fill="white"/>
            <circle cx="5" cy="14" r="1" fill="white"/>
            <circle cx="8" cy="14" r="1" fill="white"/>
          </g>
        </g>

        {/* Usuario/Perfil */}
        <g transform="translate(625, 105)" opacity="0.7">
          <g className="float-slow" style={{ animationDelay: '1.2s' }}>
            <circle cx="8" cy="6" r="5" fill="#22d3ee" stroke="#0284c7" strokeWidth="1.5"/>
            <path d="M 0,18 Q 0,11 8,11 Q 16,11 16,18" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1.5"/>
          </g>
        </g>

        {/* Gráfico/Estadísticas */}
        <g transform="translate(710, 160)" opacity="0.7">
          <g className="float-element" style={{ animationDelay: '0.7s' }}>
            <rect x="0" y="0" width="18" height="18" rx="2" fill="#ffffff" fillOpacity="0.95" stroke="#0ea5e9" strokeWidth="1.5"/>
            <rect x="3" y="12" width="3" height="4" fill="#0ea5e9"/>
            <rect x="7" y="9" width="3" height="7" fill="#22d3ee"/>
            <rect x="11" y="6" width="3" height="10" fill="#0284c7"/>
          </g>
        </g>

        {/* Documento */}
        <g transform="translate(680, 110)" opacity="0.7">
          <g className="float-fast" style={{ animationDelay: '0.4s' }}>
            <rect x="0" y="0" width="14" height="18" rx="1.5" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5"/>
            <line x1="3" y1="5" x2="11" y2="5" stroke="white" strokeWidth="0.8"/>
            <line x1="3" y1="8" x2="11" y2="8" stroke="white" strokeWidth="0.8"/>
            <line x1="3" y1="11" x2="9" y2="11" stroke="white" strokeWidth="0.8"/>
          </g>
        </g>

        {/* Notificación/Campana */}
        <g transform="translate(745, 125)" opacity="0.7">
          <g className="float-slow" style={{ animationDelay: '1.6s' }}>
            <path d="M 8,3 Q 7,3 7,4 L 6,6 Q 4,8 4,11 L 12,11 Q 12,8 10,6 L 9,4 Q 9,3 8,3" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.2"/>
            <circle cx="8" cy="2" r="1.5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1"/>
            <circle cx="8" cy="13" r="1.5" fill="#f59e0b"/>
            <circle cx="13" cy="4" r="2" fill="#ef4444" stroke="white" strokeWidth="1"/>
          </g>
        </g>

        {/* Engranaje/Configuración */}
        <g transform="translate(815, 170)" opacity="0.8">
          <g className="float-element" style={{ animationDelay: '1s' }}>
            <circle cx="8" cy="8" r="8" fill="#64748b" stroke="#475569" strokeWidth="1.5"/>
            <circle cx="8" cy="8" r="4" fill="#e2e8f0" stroke="#475569" strokeWidth="1"/>
            <rect x="7" y="0" width="2" height="4" rx="0.5" fill="#94a3b8"/>
            <rect x="7" y="12" width="2" height="4" rx="0.5" fill="#94a3b8"/>
            <rect x="0" y="7" width="4" height="2" rx="0.5" fill="#94a3b8"/>
            <rect x="12" y="7" width="4" height="2" rx="0.5" fill="#94a3b8"/>
          </g>
        </g>

        {/* Reloj/Tiempo */}
        <g transform="translate(850, 110)" opacity="0.8">
          <g className="float-fast" style={{ animationDelay: '0.6s' }}>
            <circle cx="10" cy="10" r="8" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5"/>
            <polyline points="10,5 10,10 13,12" stroke="#0ea5e9" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BannerHomepage;
import React from 'react';

const BannerLicencias: React.FC = () => {
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
        }

        .banner-container svg {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
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
      
      <svg viewBox="0 0 900 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="calipsoGradientLicencias" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="shadowLicencias" filterUnits="userSpaceOnUse" x="0" y="0" width="900" height="250">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
          </filter>

          <filter id="iconShadowLicencias" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0ea5e9" floodOpacity="0.4"/>
          </filter>

          <filter id="softBlurLicencias">
            <feGaussianBlur stdDeviation="1.5"/>
          </filter>
        </defs>

        {/* Fondo blanco */}
        <rect width="900" height="250" fill="#ffffff"/>

        {/* TEXTOS */}
        <g transform="translate(160, 35)">
          <text x="0" y="70" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0f172a" letterSpacing="-0.5">
            Licencias
          </text>
          <text x="0" y="105" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0284c7" letterSpacing="-0.5">
            Médicas
          </text>
          
          <text x="0" y="135" fontFamily="Arial, sans-serif" fontSize="14" fill="#64748b">
            Registra Licencias Médicas
          </text>
        </g>

        {/* ICONO PRINCIPAL (Escalado 0.9 y Centrado) */}
        <g transform="translate(45, 80) scale(0.9)">
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
          <path className="wave-layer" d="M 550,0 C 600,60 520,120 580,250 L 900,250 L 900,0 Z" fill="#bae6fd" opacity="0.3"/>
          <path className="wave-layer" d="M 620,0 C 600,50 660,130 630,250 L 900,250 L 900,0 Z" fill="#7dd3fc" opacity="0.4"/>
          <path className="wave-layer" d="M 690,0 C 740,50 650,120 710,250 L 900,250 L 900,0 Z" fill="#38bdf8" opacity="0.5"/>
          <path className="wave-layer" d="M 760,0 C 730,60 800,110 770,250 L 900,250 L 900,0 Z" fill="#0ea5e9" opacity="0.6"/>
          <path className="wave-layer" d="M 820,0 C 860,60 780,120 830,250 L 900,250 L 900,0 Z" fill="#0284c7" opacity="0.7"/>
        </g>

        {/* DECORACIONES (Burbujas y círculos) */}
        <g opacity="0.5">
          <g className="float-element">
            <circle cx="585" cy="85" r="16" fill="#ffffff" fillOpacity="0.2" stroke="#7dd3fc" strokeWidth="2"/>
            <circle cx="579" cy="80" r="5" fill="#ffffff" opacity="0.6"/>
            <circle cx="589" cy="87" r="2.5" fill="#ffffff" opacity="0.4"/>
          </g>
          
          <g className="float-slow" style={{ animationDelay: '0.8s' }}>
            <circle cx="620" cy="65" r="11" fill="#ffffff" fillOpacity="0.18" stroke="#bae6fd" strokeWidth="1.5"/>
            <circle cx="615" cy="61" r="3" fill="#ffffff" opacity="0.5"/>
          </g>
          
          <circle cx="565" cy="125" r="8" fill="#ffffff" fillOpacity="0.15" stroke="#7dd3fc" strokeWidth="1.5" className="float-fast" style={{ animationDelay: '1.2s' }}/>
          <circle cx="605" cy="110" r="7" fill="#ffffff" fillOpacity="0.16" stroke="#7dd3fc" strokeWidth="1.5" className="float-element" style={{ animationDelay: '0.4s' }}/>

          <g className="float-slow" style={{ animationDelay: '1.6s' }}>
            <circle cx="560" cy="95" r="9" fill="#ffffff" fillOpacity="0.17" stroke="#bae6fd" strokeWidth="1.5"/>
            <circle cx="557" cy="92" r="2.5" fill="#ffffff" opacity="0.5"/>
          </g>
        </g>

        <g opacity="0.45">
          <g className="float-slow" style={{ animationDelay: '1.5s' }}>
            <circle cx="715" cy="110" r="14" fill="#ffffff" fillOpacity="0.22" stroke="#38bdf8" strokeWidth="2"/>
            <circle cx="709" cy="105" r="4" fill="#ffffff" opacity="0.6"/>
            <circle cx="717" cy="112" r="2" fill="#ffffff" opacity="0.45"/>
          </g>
          
          <g className="float-element" style={{ animationDelay: '0.6s' }}>
            <circle cx="740" cy="135" r="10" fill="#ffffff" fillOpacity="0.17" stroke="#7dd3fc" strokeWidth="1.5"/>
            <circle cx="736" cy="131" r="2.5" fill="#ffffff" opacity="0.5"/>
          </g>
          
          <circle cx="690" cy="75" r="7" fill="#ffffff" fillOpacity="0.14" stroke="#38bdf8" strokeWidth="1.5" className="float-fast" style={{ animationDelay: '1.8s' }}/>
          <circle cx="670" cy="145" r="9" fill="#ffffff" fillOpacity="0.13" stroke="#7dd3fc" strokeWidth="1.5" className="float-slow" style={{ animationDelay: '0.3s' }}/>
          <circle cx="755" cy="90" r="6" fill="#ffffff" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1" className="float-element" style={{ animationDelay: '1.1s' }}/>
        </g>

        <g opacity="0.6">
          <g className="float-fast" style={{ animationDelay: '0.8s' }}>
            <circle cx="845" cy="145" r="13" fill="#ffffff" fillOpacity="0.28" stroke="#e0f2fe" strokeWidth="2"/>
            <circle cx="839" cy="140" r="4" fill="#ffffff" opacity="0.7"/>
            <circle cx="847" cy="147" r="2.5" fill="#ffffff" opacity="0.5"/>
          </g>
          
          <g className="float-element" style={{ animationDelay: '1.3s' }}>
            <circle cx="810" cy="105" r="10" fill="#ffffff" fillOpacity="0.23" stroke="#bae6fd" strokeWidth="1.5"/>
            <circle cx="806" cy="102" r="2.5" fill="#ffffff" opacity="0.6"/>
          </g>

          <circle cx="875" cy="125" r="7" fill="#ffffff" fillOpacity="0.2" stroke="#e0f2fe" strokeWidth="1.5" className="float-slow" style={{ animationDelay: '0.5s' }}/>

          <g className="float-fast" style={{ animationDelay: '1.7s' }}>
            <circle cx="825" cy="165" r="9" fill="#ffffff" fillOpacity="0.25" stroke="#bae6fd" strokeWidth="1.5"/>
            <circle cx="822" cy="162" r="2" fill="#ffffff" opacity="0.6"/>
          </g>

          <circle cx="860" cy="85" r="6" fill="#ffffff" fillOpacity="0.22" stroke="#e0f2fe" strokeWidth="1" className="float-element" style={{ animationDelay: '0.9s' }}/>
          <circle cx="795" cy="130" r="8" fill="#ffffff" fillOpacity="0.24" stroke="#bae6fd" strokeWidth="1.5" className="float-slow" style={{ animationDelay: '1.9s' }}/>
        </g>

        <g opacity="0.35">
          <circle cx="635" cy="155" r="7" fill="#ffffff" fillOpacity="0.12" stroke="#38bdf8" strokeWidth="1" className="float-element" style={{ animationDelay: '2s' }}/>
          <circle cx="680" cy="62" r="6" fill="#ffffff" fillOpacity="0.15" stroke="#7dd3fc" strokeWidth="1" className="float-slow" style={{ animationDelay: '0.9s' }}/>
          <circle cx="770" cy="160" r="8" fill="#ffffff" fillOpacity="0.18" stroke="#38bdf8" strokeWidth="1" className="float-fast" style={{ animationDelay: '1.4s' }}/>
        </g>

        {/* ICONOS MÉDICOS FLOTANTES */}
        
        {/* Termómetro */}
        <g transform="translate(595, 130)" opacity="0.6">
          <g className="float-element">
            <rect x="8" y="0" width="4" height="25" rx="2" fill="#0ea5e9"/>
            <circle cx="10" cy="28" r="5" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5"/>
            <rect x="9" y="8" width="2" height="18" fill="#ef4444"/>
            <line x1="6" y1="6" x2="8" y2="6" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="6" y1="12" x2="8" y2="12" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="6" y1="18" x2="8" y2="18" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
        </g>

        {/* Pastilla/Cápsula */}
        <g transform="translate(660, 105)" opacity="0.55">
          <g className="float-slow" style={{ animationDelay: '1.2s' }}>
            <ellipse cx="10" cy="10" rx="8" ry="12" fill="#0ea5e9" stroke="#0284c7" strokeWidth="2" transform="rotate(45 10 10)"/>
            <rect x="4" y="4" width="12" height="12" fill="#22d3ee" opacity="0.6" transform="rotate(45 10 10)"/>
          </g>
        </g>

        {/* Estetoscopio */}
        <g transform="translate(745, 130)" opacity="0.6">
          <g className="float-element" style={{ animationDelay: '0.7s' }}>
            <path d="M 10,5 Q 5,8 5,15" stroke="#0ea5e9" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M 10,5 Q 15,8 15,15" stroke="#0ea5e9" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <circle cx="5" cy="18" r="3" fill="#0284c7" stroke="#0ea5e9" strokeWidth="1.5"/>
            <circle cx="15" cy="18" r="3" fill="#0284c7" stroke="#0ea5e9" strokeWidth="1.5"/>
            <path d="M 10,5 L 10,25 Q 10,30 15,32" stroke="#0ea5e9" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <circle cx="16" cy="33" r="4" fill="#0284c7" stroke="#0ea5e9" strokeWidth="2"/>
          </g>
        </g>

        {/* Cruz médica pequeña */}
        <g transform="translate(705, 85)" opacity="0.6">
          <g className="float-fast" style={{ animationDelay: '0.4s' }}>
            <rect x="6" y="0" width="4" height="14" rx="1" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1"/>
            <rect x="0" y="5" width="16" height="4" rx="1" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1"/>
          </g>
        </g>

        {/* Jeringa */}
        <g transform="translate(785, 155)" opacity="0.65">
          <g className="float-slow" style={{ animationDelay: '1.6s' }}>
            <rect x="0" y="8" width="18" height="6" rx="1" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1.5"/>
            <rect x="18" y="10" width="8" height="2" fill="#22d3ee"/>
            <path d="M 26,11 L 30,11" stroke="#0284c7" strokeWidth="2" strokeLinecap="round"/>
            <line x1="4" y1="6" x2="4" y2="8" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="4" cy="5" r="1.5" fill="#0284c7"/>
          </g>
        </g>

        {/* Corazón con pulso */}
        <g transform="translate(835, 105)" opacity="0.7">
          <g className="float-element" style={{ animationDelay: '1s' }}>
            <path d="M 10,18 Q 3,12 3,8 Q 3,5 5,3 Q 7,2 9,4 Q 9.5,4.5 10,6 Q 10.5,4.5 11,4 Q 13,2 15,3 Q 17,5 17,8 Q 17,12 10,18 Z" 
                  fill="#0ea5e9" stroke="#0284c7" strokeWidth="1.5"/>
            <path d="M 5,14 L 7,14 L 8,12 L 9,16 L 10,14 L 12,14" 
                  stroke="#e0f2fe" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </g>

        {/* Botiquín */}
        <g transform="translate(860, 135)" opacity="0.7">
          <g className="float-slow" style={{ animationDelay: '0.5s' }}>
            <rect x="0" y="5" width="20" height="18" rx="2" fill="#ffffff" fillOpacity="0.9" stroke="#0284c7" strokeWidth="2"/>
            <rect x="3" y="0" width="14" height="6" rx="2" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1.5"/>
            <rect x="7" y="10" width="2" height="8" rx="0.5" fill="#ef4444"/>
            <rect x="4" y="13" width="12" height="2" rx="0.5" fill="#ef4444"/>
          </g>
        </g>

        {/* Vendaje */}
        <g transform="translate(630, 155)" opacity="0.5">
          <g className="float-element" style={{ animationDelay: '1.8s' }}>
            <rect x="0" y="5" width="18" height="8" rx="1.5" fill="#fef3c7" stroke="#fbbf24" strokeWidth="1.5"/>
            <line x1="6" y1="5" x2="6" y2="13" stroke="#fbbf24" strokeWidth="1" opacity="0.4"/>
            <line x1="12" y1="5" x2="12" y2="13" stroke="#fbbf24" strokeWidth="1" opacity="0.4"/>
            <rect x="7" y="7" width="4" height="4" fill="#fbbf24" opacity="0.3"/>
          </g>
        </g>

        {/* Molécula/Medicina */}
        <g transform="translate(815, 160)" opacity="0.6">
          <g className="float-fast" style={{ animationDelay: '0.9s' }}>
            <circle cx="5" cy="5" r="3" fill="#22d3ee" stroke="#0284c7" strokeWidth="1.5"/>
            <circle cx="15" cy="5" r="3" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1.5"/>
            <circle cx="10" cy="13" r="3" fill="#22d3ee" stroke="#0284c7" strokeWidth="1.5"/>
            <line x1="7" y1="6" x2="13" y2="6" stroke="#0284c7" strokeWidth="1.5"/>
            <line x1="7" y1="8" x2="9" y2="11" stroke="#0284c7" strokeWidth="1.5"/>
            <line x1="13" y1="8" x2="11" y2="11" stroke="#0284c7" strokeWidth="1.5"/>
          </g>
        </g>

        {/* Gráfico de salud */}
        <g transform="translate(685, 150)" opacity="0.55">
          <g className="float-slow" style={{ animationDelay: '1.4s' }}>
            <rect x="0" y="0" width="22" height="18" rx="2" fill="#ffffff" fillOpacity="0.85" stroke="#0ea5e9" strokeWidth="1.5"/>
            <path d="M 3,12 L 6,12 L 8,8 L 10,14 L 12,10 L 14,10 L 16,6 L 19,6" 
                  stroke="#0ea5e9" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </g>

        {/* Reloj/Reposo */}
        <g transform="translate(740, 125) scale(0.85)">
          <g stroke="#0ea5e9" strokeWidth="2.5" fill="none" filter="url(#shadowLicencias)">
            <circle cx="21" cy="21" r="20" fill="#ffffff" fillOpacity="0.95"/>
            <circle cx="21" cy="21" r="3" fill="#0ea5e9"/>
            <line x1="21" y1="21" x2="21" y2="8" strokeLinecap="round" strokeWidth="2.5"/>
            <line x1="21" y1="21" x2="32" y2="21" strokeLinecap="round" strokeWidth="2"/>
            {/* Zzz */}
            <text x="34" y="12" fontFamily="Arial" fontSize="8" fill="#0284c7" fontWeight="bold">Z</text>
            <text x="38" y="8" fontFamily="Arial" fontSize="6" fill="#22d3ee" fontWeight="bold">z</text>
          </g>
        </g>

      </svg>
    </div>
  );
};

export default BannerLicencias;
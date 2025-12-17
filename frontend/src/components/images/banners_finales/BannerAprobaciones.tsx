import React from 'react';

const BannerAprobaciones: React.FC = () => {
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
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        /* Optimización de rendering */
        .float-element,
        .float-slow,
        .float-fast,
        .wave-layer {
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Animación suave de las olas */
        .wave-layer {
          transform-origin: center;
          animation: floatWave 6s ease-in-out infinite alternate;
        }
        .wave-layer:nth-child(odd) { animation-duration: 7s; }
        .wave-layer:nth-child(even) { animation-duration: 9s; animation-direction: alternate-reverse; }

        /* Animación flotante para decorativos */
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
          {/* Usamos un ID único para evitar conflictos si hay varios banners */}
          <linearGradient id="calipsoGradientVacaciones" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="shadowVacaciones" filterUnits="userSpaceOnUse" x="0" y="0" width="900" height="250">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
          </filter>

          <filter id="iconShadowVacaciones" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0ea5e9" floodOpacity="0.4"/>
          </filter>

          <filter id="softBlurVacaciones">
            <feGaussianBlur stdDeviation="1.5"/>
          </filter>
        </defs>

        <rect width="900" height="250" fill="#ffffff"/>

        {/* === TEXTOS === */}
        <g transform="translate(160, 35)">
          <text x="0" y="70" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0f172a" letterSpacing="-0.5">
            Aprobación de
          </text>
          <text x="0" y="105" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#0284c7" letterSpacing="-0.5">
            Solicitudes
          </text>
          
          <text x="0" y="135" fontFamily="Arial, sans-serif" fontSize="14" fill="#64748b">
            Gestiona las solicitudes
          </text>
        </g>

        {/* === ICONO PRINCIPAL: Calendario Grande === */}
        <g transform="translate(40, 80)">
          <rect width="90" height="90" rx="20" fill="url(#calipsoGradientVacaciones)" filter="url(#iconShadowVacaciones)"/>
          
          <g transform="translate(20, 20)" stroke="white" strokeWidth="2.5" fill="none">
            <rect x="0" y="5" width="50" height="50" rx="3"/>
            <line x1="37" y1="0" x2="37" y2="10"/>
            <line x1="13" y1="0" x2="13" y2="10"/>
            <line x1="0" y1="18" x2="50" y2="18"/>
            <rect x="8" y="27" width="5" height="5" fill="white"/>
            <rect x="23" y="27" width="5" height="5" fill="white"/>
            <rect x="37" y="27" width="5" height="5" fill="white"/>
            <circle cx="40" cy="40" r="10" strokeWidth="2" fill="none" opacity="0.5"/>
          </g>
        </g>

        {/* === OLAS DINÁMICAS === */}
        <g opacity="0.95">
          <path className="wave-layer" d="M 550,0 C 600,60 520,120 580,250 L 900,250 L 900,0 Z" fill="#bae6fd" opacity="0.3"/>
          <path className="wave-layer" d="M 620,0 C 600,50 660,130 630,250 L 900,250 L 900,0 Z" fill="#7dd3fc" opacity="0.4"/>
          <path className="wave-layer" d="M 690,0 C 740,50 650,120 710,250 L 900,250 L 900,0 Z" fill="#38bdf8" opacity="0.5"/>
          <path className="wave-layer" d="M 760,0 C 730,60 800,110 770,250 L 900,250 L 900,0 Z" fill="#0ea5e9" opacity="0.6"/>
          <path className="wave-layer" d="M 820,0 C 860,60 780,120 830,250 L 900,250 L 900,0 Z" fill="#0284c7" opacity="0.7"/>
        </g>

        {/* === DECORACIONES (Burbujas) === */}
        <g opacity="0.5">
          <g className="float-element">
            <circle cx="585" cy="100" r="16" fill="#ffffff" fillOpacity="0.2" stroke="#7dd3fc" strokeWidth="2"/>
            <circle cx="579" cy="95" r="5" fill="#ffffff" opacity="0.6"/>
            <circle cx="589" cy="102" r="2.5" fill="#ffffff" opacity="0.4"/>
          </g>
          <g className="float-slow" style={{ animationDelay: '0.8s' }}>
            <circle cx="620" cy="80" r="11" fill="#ffffff" fillOpacity="0.18" stroke="#bae6fd" strokeWidth="1.5"/>
            <circle cx="615" cy="76" r="3" fill="#ffffff" opacity="0.5"/>
          </g>
          <circle cx="565" cy="140" r="8" fill="#ffffff" fillOpacity="0.15" stroke="#7dd3fc" strokeWidth="1.5" className="float-fast" style={{ animationDelay: '1.2s' }}/>
          <circle cx="605" cy="125" r="7" fill="#ffffff" fillOpacity="0.16" stroke="#7dd3fc" strokeWidth="1.5" className="float-element" style={{ animationDelay: '0.4s' }}/>
          <g className="float-slow" style={{ animationDelay: '1.6s' }}>
            <circle cx="560" cy="110" r="9" fill="#ffffff" fillOpacity="0.17" stroke="#bae6fd" strokeWidth="1.5"/>
            <circle cx="557" cy="107" r="2.5" fill="#ffffff" opacity="0.5"/>
          </g>
        </g>

        <g opacity="0.45">
          <g className="float-slow" style={{ animationDelay: '1.5s' }}>
            <circle cx="715" cy="125" r="14" fill="#ffffff" fillOpacity="0.22" stroke="#38bdf8" strokeWidth="2"/>
            <circle cx="709" cy="120" r="4" fill="#ffffff" opacity="0.6"/>
            <circle cx="717" cy="127" r="2" fill="#ffffff" opacity="0.45"/>
          </g>
          <g className="float-element" style={{ animationDelay: '0.6s' }}>
            <circle cx="740" cy="150" r="10" fill="#ffffff" fillOpacity="0.17" stroke="#7dd3fc" strokeWidth="1.5"/>
            <circle cx="736" cy="146" r="2.5" fill="#ffffff" opacity="0.5"/>
          </g>
          <circle cx="690" cy="90" r="7" fill="#ffffff" fillOpacity="0.14" stroke="#38bdf8" strokeWidth="1.5" className="float-fast" style={{ animationDelay: '1.8s' }}/>
          <circle cx="670" cy="160" r="9" fill="#ffffff" fillOpacity="0.13" stroke="#7dd3fc" strokeWidth="1.5" className="float-slow" style={{ animationDelay: '0.3s' }}/>
          <circle cx="755" cy="105" r="6" fill="#ffffff" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1" className="float-element" style={{ animationDelay: '1.1s' }}/>
        </g>

        <g opacity="0.6">
          <g className="float-fast" style={{ animationDelay: '0.8s' }}>
            <circle cx="845" cy="160" r="13" fill="#ffffff" fillOpacity="0.28" stroke="#e0f2fe" strokeWidth="2"/>
            <circle cx="839" cy="155" r="4" fill="#ffffff" opacity="0.7"/>
            <circle cx="847" cy="162" r="2.5" fill="#ffffff" opacity="0.5"/>
          </g>
          <g className="float-element" style={{ animationDelay: '1.3s' }}>
            <circle cx="810" cy="120" r="10" fill="#ffffff" fillOpacity="0.23" stroke="#bae6fd" strokeWidth="1.5"/>
            <circle cx="806" cy="117" r="2.5" fill="#ffffff" opacity="0.6"/>
          </g>
          <circle cx="875" cy="140" r="7" fill="#ffffff" fillOpacity="0.2" stroke="#e0f2fe" strokeWidth="1.5" className="float-slow" style={{ animationDelay: '0.5s' }}/>
          <g className="float-fast" style={{ animationDelay: '1.7s' }}>
            <circle cx="825" cy="180" r="9" fill="#ffffff" fillOpacity="0.25" stroke="#bae6fd" strokeWidth="1.5"/>
            <circle cx="822" cy="177" r="2" fill="#ffffff" opacity="0.6"/>
          </g>
          <circle cx="860" cy="100" r="6" fill="#ffffff" fillOpacity="0.22" stroke="#e0f2fe" strokeWidth="1" className="float-element" style={{ animationDelay: '0.9s' }}/>
          <circle cx="795" cy="145" r="8" fill="#ffffff" fillOpacity="0.24" stroke="#bae6fd" strokeWidth="1.5" className="float-slow" style={{ animationDelay: '1.9s' }}/>
        </g>

        <g opacity="0.35">
          <circle cx="635" cy="170" r="7" fill="#ffffff" fillOpacity="0.12" stroke="#38bdf8" strokeWidth="1" className="float-element" style={{ animationDelay: '2s' }}/>
          <circle cx="680" cy="77" r="6" fill="#ffffff" fillOpacity="0.15" stroke="#7dd3fc" strokeWidth="1" className="float-slow" style={{ animationDelay: '0.9s' }}/>
          <circle cx="770" cy="175" r="8" fill="#ffffff" fillOpacity="0.18" stroke="#38bdf8" strokeWidth="1" className="float-fast" style={{ animationDelay: '1.4s' }}/>
        </g>

        {/* === ELEMENTOS VEGETALES === */}

        {/* Planta 1 */}
        <g transform="translate(575, 155)" opacity="0.4">
          <g className="float-element">
            <path d="M 0,40 Q -2,25 -3,15 Q -2,8 0,0" stroke="#0ea5e9" strokeWidth="2" fill="none" opacity="0.5"/>
            <ellipse cx="-8" cy="10" rx="5" ry="9" fill="#7dd3fc" fillOpacity="0.3" transform="rotate(-25 -8 10)"/>
            <ellipse cx="8" cy="18" rx="6" ry="10" fill="#38bdf8" fillOpacity="0.25" transform="rotate(20 8 18)"/>
            <ellipse cx="-5" cy="28" rx="4" ry="7" fill="#7dd3fc" fillOpacity="0.3" transform="rotate(-35 -5 28)"/>
          </g>
        </g>

        {/* Arbusto pequeño */}
        <g transform="translate(555, 130)" opacity="0.35">
          <g className="float-slow" style={{ animationDelay: '1.6s' }}>
            <ellipse cx="0" cy="0" rx="10" ry="14" fill="#7dd3fc" fillOpacity="0.2" transform="rotate(10)"/>
            <ellipse cx="-8" cy="-5" rx="7" ry="10" fill="#38bdf8" fillOpacity="0.18" transform="rotate(-20 -8 -5)"/>
            <ellipse cx="8" cy="3" rx="8" ry="11" fill="#7dd3fc" fillOpacity="0.2" transform="rotate(25 8 3)"/>
          </g>
        </g>

        {/* Planta ramificada */}
        <g transform="translate(610, 170)" opacity="0.4">
          <g className="float-element" style={{ animationDelay: '0.7s' }}>
            <path d="M 0,30 Q -1,20 0,10 Q 1,5 0,0" stroke="#0ea5e9" strokeWidth="1.8" fill="none" opacity="0.5"/>
            <path d="M 0,15 Q -5,12 -8,10" stroke="#0ea5e9" strokeWidth="1.5" fill="none" opacity="0.4"/>
            <path d="M 0,20 Q 5,17 8,15" stroke="#0ea5e9" strokeWidth="1.5" fill="none" opacity="0.4"/>
            <ellipse cx="-8" cy="10" rx="4" ry="6" fill="#7dd3fc" fillOpacity="0.3" transform="rotate(-30 -8 10)" />
            <ellipse cx="8" cy="15" rx="4" ry="6" fill="#38bdf8" fillOpacity="0.25" transform="rotate(30 8 15)" />
          </g>
        </g>

        {/* Planta 2 */}
        <g transform="translate(720, 85)" opacity="0.5">
          <g className="float-slow" style={{ animationDelay: '2s' }}>
            <path d="M 0,50 Q -3,30 -4,20 Q -2,10 0,0" stroke="#0284c7" strokeWidth="2.5" fill="none" opacity="0.4"/>
            <ellipse cx="-10" cy="12" rx="7" ry="12" fill="#38bdf8" fillOpacity="0.25" transform="rotate(-28 -10 12)"/>
            <ellipse cx="10" cy="22" rx="8" ry="14" fill="#0ea5e9" fillOpacity="0.2" transform="rotate(22 10 22)"/>
            <ellipse cx="-7" cy="35" rx="6" ry="10" fill="#38bdf8" fillOpacity="0.25" transform="rotate(-38 -7 35)"/>
          </g>
        </g>

        {/* Arbusto denso */}
        <g transform="translate(670, 150)" opacity="0.4">
          <g className="float-element" style={{ animationDelay: '1.1s' }}>
            <ellipse cx="0" cy="0" rx="12" ry="16" fill="#38bdf8" fillOpacity="0.22"/>
            <ellipse cx="-10" cy="-6" rx="9" ry="12" fill="#0ea5e9" fillOpacity="0.2" transform="rotate(-25 -10 -6)"/>
            <ellipse cx="10" cy="4" rx="10" ry="13" fill="#38bdf8" fillOpacity="0.22" transform="rotate(30 10 4)"/>
            <ellipse cx="0" cy="-10" rx="7" ry="9" fill="#7dd3fc" fillOpacity="0.18" transform="rotate(5)"/>
          </g>
        </g>

        {/* Ramitas finas */}
        <g transform="translate(695, 115)" opacity="0.35">
          <g className="float-fast" style={{ animationDelay: '0.5s' }}>
            <path d="M 0,25 Q 2,15 0,0" stroke="#0284c7" strokeWidth="1.5" fill="none" opacity="0.4"/>
            <path d="M 0,12 Q -4,10 -6,8" stroke="#0284c7" strokeWidth="1.2" fill="none" opacity="0.35"/>
            <ellipse cx="-6" cy="8" rx="3" ry="5" fill="#38bdf8" fillOpacity="0.25" transform="rotate(-35 -6 8)"/>
          </g>
        </g>

        {/* Planta Grande */}
        <g transform="translate(800, 65)" opacity="0.8">
          <g className="float-element">
            <path d="M 0,80 Q -5,50 -6,35 Q -4,20 0,0" stroke="#e0f2fe" strokeWidth="2" fill="none" opacity="0.6"/>
            <ellipse cx="-12" cy="20" rx="8" ry="14" fill="#ffffff" fillOpacity="0.3" stroke="#bae6fd" strokeWidth="1.5" transform="rotate(-30 -12 20)"/>
            <ellipse cx="12" cy="30" rx="9" ry="16" fill="#ffffff" fillOpacity="0.2" stroke="#bae6fd" strokeWidth="1.5" transform="rotate(25 12 30)"/>
            <ellipse cx="-8" cy="45" rx="7" ry="12" fill="#ffffff" fillOpacity="0.3" stroke="#bae6fd" strokeWidth="1.5" transform="rotate(-40 -8 45)"/>
          </g>
        </g>

        {/* Arbusto tropical */}
        <g transform="translate(770, 135)" opacity="0.5">
          <g className="float-slow" style={{ animationDelay: '1.4s' }}>
            <ellipse cx="0" cy="0" rx="14" ry="18" fill="#0ea5e9" fillOpacity="0.25" stroke="#0284c7" strokeWidth="1"/>
            <ellipse cx="-12" cy="-8" rx="10" ry="14" fill="#38bdf8" fillOpacity="0.22" transform="rotate(-30 -12 -8)"/>
            <ellipse cx="12" cy="5" rx="11" ry="15" fill="#0ea5e9" fillOpacity="0.25" transform="rotate(35 12 5)"/>
          </g>
        </g>

        {/* Helechos pequeños */}
        <g transform="translate(845, 95)" opacity="0.45">
          <g className="float-element" style={{ animationDelay: '0.9s' }}>
            <path d="M 0,35 Q 1,20 0,0" stroke="#bae6fd" strokeWidth="1.8" fill="none" opacity="0.5"/>
            <ellipse cx="-5" cy="8" rx="4" ry="7" fill="#ffffff" fillOpacity="0.25" transform="rotate(-25 -5 8)"/>
            <ellipse cx="5" cy="15" rx="4" ry="7" fill="#e0f2fe" fillOpacity="0.2" transform="rotate(25 5 15)"/>
            <ellipse cx="-4" cy="22" rx="3" ry="6" fill="#ffffff" fillOpacity="0.25" transform="rotate(-30 -4 22)"/>
            <ellipse cx="4" cy="28" rx="3" ry="6" fill="#e0f2fe" fillOpacity="0.2" transform="rotate(30 4 28)"/>
          </g>
        </g>

        {/* Grupo de hojas bajas */}
        <g transform="translate(865, 180)" opacity="0.4">
          <g className="float-slow" style={{ animationDelay: '1.8s' }}>
            <ellipse cx="0" cy="0" rx="8" ry="6" fill="#bae6fd" fillOpacity="0.3" transform="rotate(15)"/>
            <ellipse cx="-7" cy="3" rx="6" ry="5" fill="#e0f2fe" fillOpacity="0.25" transform="rotate(-20 -7 3)"/>
            <ellipse cx="7" cy="2" rx="7" ry="5" fill="#bae6fd" fillOpacity="0.3" transform="rotate(25 7 2)"/>
          </g>
        </g>

        {/* === HOJAS FLOTANTES INDIVIDUALES === */}
        <g opacity="0.35">
          <g transform="translate(600, 75) rotate(15)">
            <g className="float-slow">
              <ellipse cx="0" cy="0" rx="8" ry="14" fill="#38bdf8" fillOpacity="0.2" stroke="#0ea5e9" strokeWidth="1"/>
              <line x1="0" y1="-8" x2="0" y2="8" stroke="#0284c7" strokeWidth="1" opacity="0.4"/>
            </g>
          </g>
          <g transform="translate(565, 100) rotate(-25)">
            <g className="float-element" style={{ animationDelay: '0.6s' }}>
              <ellipse cx="0" cy="0" rx="6" ry="10" fill="#7dd3fc" fillOpacity="0.18" stroke="#38bdf8" strokeWidth="1"/>
              <line x1="0" y1="-6" x2="0" y2="6" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.4"/>
            </g>
          </g>
          <g transform="translate(625, 140) rotate(60)">
            <g className="float-fast" style={{ animationDelay: '1.3s' }}>
              <ellipse cx="0" cy="0" rx="9" ry="5" fill="#38bdf8" fillOpacity="0.16" stroke="#0ea5e9" strokeWidth="0.8"/>
              <line x1="0" y1="-3" x2="0" y2="3" stroke="#0284c7" strokeWidth="0.7" opacity="0.3"/>
            </g>
          </g>
          <g transform="translate(590, 155) rotate(-40)">
            <g className="float-slow" style={{ animationDelay: '0.9s' }}>
              <ellipse cx="0" cy="0" rx="7" ry="11" fill="#7dd3fc" fillOpacity="0.19" stroke="#38bdf8" strokeWidth="1"/>
              <line x1="0" y1="-7" x2="0" y2="7" stroke="#0ea5e9" strokeWidth="0.9" opacity="0.4"/>
            </g>
          </g>
          <g transform="translate(555, 85) rotate(35)">
            <g className="float-element" style={{ animationDelay: '1.6s' }}>
              <ellipse cx="0" cy="0" rx="5" ry="9" fill="#38bdf8" fillOpacity="0.17" stroke="#0ea5e9" strokeWidth="0.9"/>
              <line x1="0" y1="-6" x2="0" y2="6" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.35"/>
            </g>
          </g>
          <g transform="translate(615, 110) rotate(-10)">
            <g className="float-fast" style={{ animationDelay: '0.3s' }}>
              <ellipse cx="0" cy="0" rx="6" ry="12" fill="#7dd3fc" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1"/>
              <line x1="0" y1="-8" x2="0" y2="8" stroke="#0ea5e9" strokeWidth="0.9" opacity="0.4"/>
            </g>
          </g>
          <g transform="translate(750, 170) rotate(-20)">
            <g className="float-element" style={{ animationDelay: '1.2s' }}>
              <ellipse cx="0" cy="0" rx="6" ry="11" fill="#0ea5e9" fillOpacity="0.18" stroke="#0284c7" strokeWidth="1"/>
              <line x1="0" y1="-7" x2="0" y2="7" stroke="#0284c7" strokeWidth="0.8" opacity="0.5"/>
            </g>
          </g>
          <g transform="translate(735, 105) rotate(35)">
            <g className="float-slow" style={{ animationDelay: '0.4s' }}>
              <ellipse cx="0" cy="0" rx="9" ry="15" fill="#38bdf8" fillOpacity="0.2" stroke="#0ea5e9" strokeWidth="1.2"/>
              <line x1="0" y1="-10" x2="0" y2="10" stroke="#0284c7" strokeWidth="1" opacity="0.45"/>
            </g>
          </g>
          <g transform="translate(710, 185) rotate(-45)">
            <g className="float-element" style={{ animationDelay: '1.7s' }}>
              <ellipse cx="0" cy="0" rx="7" ry="12" fill="#0ea5e9" fillOpacity="0.17" stroke="#0284c7" strokeWidth="1"/>
              <line x1="0" y1="-8" x2="0" y2="8" stroke="#0284c7" strokeWidth="0.9" opacity="0.4"/>
            </g>
          </g>
          <g transform="translate(680, 130) rotate(20)">
            <g className="float-fast" style={{ animationDelay: '0.7s' }}>
              <ellipse cx="0" cy="0" rx="8" ry="13" fill="#38bdf8" fillOpacity="0.19" stroke="#0ea5e9" strokeWidth="1"/>
              <line x1="0" y1="-9" x2="0" y2="9" stroke="#0284c7" strokeWidth="0.9" opacity="0.4"/>
            </g>
          </g>
          <g transform="translate(665, 90) rotate(-30)">
            <g className="float-slow" style={{ animationDelay: '1.4s' }}>
              <ellipse cx="0" cy="0" rx="6" ry="10" fill="#7dd3fc" fillOpacity="0.18" stroke="#38bdf8" strokeWidth="0.9"/>
              <line x1="0" y1="-6" x2="0" y2="6" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.4"/>
            </g>
          </g>
          <g transform="translate(700, 150) rotate(50)">
            <g className="float-element" style={{ animationDelay: '0.5s' }}>
              <ellipse cx="0" cy="0" rx="7" ry="11" fill="#0ea5e9" fillOpacity="0.2" stroke="#0284c7" strokeWidth="1"/>
              <line x1="0" y1="-7" x2="0" y2="7" stroke="#0284c7" strokeWidth="0.8" opacity="0.45"/>
            </g>
          </g>
          <g transform="translate(760, 135) rotate(-15)">
            <g className="float-fast" style={{ animationDelay: '1.9s' }}>
              <ellipse cx="0" cy="0" rx="5" ry="9" fill="#38bdf8" fillOpacity="0.16" stroke="#0ea5e9" strokeWidth="0.9"/>
              <line x1="0" y1="-6" x2="0" y2="6" stroke="#0ea5e9" strokeWidth="0.7" opacity="0.35"/>
            </g>
          </g>
          <g transform="translate(865, 120) rotate(35)">
            <g className="float-fast" style={{ animationDelay: '0.5s' }}>
              <ellipse cx="0" cy="0" rx="7" ry="12" fill="#ffffff" fillOpacity="0.25" stroke="#e0f2fe" strokeWidth="1.2"/>
              <line x1="0" y1="-8" x2="0" y2="8" stroke="#bae6fd" strokeWidth="1" opacity="0.6"/>
            </g>
          </g>
          <g transform="translate(825, 85) rotate(-15)">
            <g className="float-slow" style={{ animationDelay: '1.5s' }}>
              <ellipse cx="0" cy="0" rx="5" ry="9" fill="#e0f2fe" fillOpacity="0.22" stroke="#bae6fd" strokeWidth="1"/>
              <line x1="0" y1="-6" x2="0" y2="6" stroke="#bae6fd" strokeWidth="0.8" opacity="0.55"/>
            </g>
          </g>
          <g transform="translate(855, 165) rotate(70)">
            <g className="float-element" style={{ animationDelay: '0.8s' }}>
              <ellipse cx="0" cy="0" rx="10" ry="6" fill="#ffffff" fillOpacity="0.28" stroke="#e0f2fe" strokeWidth="1"/>
              <line x1="0" y1="-4" x2="0" y2="4" stroke="#bae6fd" strokeWidth="0.9" opacity="0.6"/>
            </g>
          </g>
          <g transform="translate(790, 175) rotate(10)">
            <g className="float-slow" style={{ animationDelay: '2.1s' }}>
              <ellipse cx="0" cy="0" rx="6" ry="13" fill="#bae6fd" fillOpacity="0.24" stroke="#e0f2fe" strokeWidth="1.1"/>
              <line x1="0" y1="-9" x2="0" y2="9" stroke="#e0f2fe" strokeWidth="0.9" opacity="0.5"/>
            </g>
          </g>
          <g transform="translate(805, 150) rotate(-35)">
            <g className="float-element" style={{ animationDelay: '0.6s' }}>
              <ellipse cx="0" cy="0" rx="7" ry="11" fill="#ffffff" fillOpacity="0.26" stroke="#e0f2fe" strokeWidth="1.1"/>
              <line x1="0" y1="-7" x2="0" y2="7" stroke="#bae6fd" strokeWidth="0.9" opacity="0.55"/>
            </g>
          </g>
          <g transform="translate(840, 100) rotate(25)">
            <g className="float-fast" style={{ animationDelay: '1.3s' }}>
              <ellipse cx="0" cy="0" rx="6" ry="10" fill="#e0f2fe" fillOpacity="0.23" stroke="#bae6fd" strokeWidth="1"/>
              <line x1="0" y1="-6" x2="0" y2="6" stroke="#bae6fd" strokeWidth="0.8" opacity="0.5"/>
            </g>
          </g>
          <g transform="translate(875, 130) rotate(-25)">
            <g className="float-slow" style={{ animationDelay: '0.9s' }}>
              <ellipse cx="0" cy="0" rx="8" ry="14" fill="#ffffff" fillOpacity="0.27" stroke="#e0f2fe" strokeWidth="1.2"/>
              <line x1="0" y1="-9" x2="0" y2="9" stroke="#bae6fd" strokeWidth="1" opacity="0.6"/>
            </g>
          </g>
          <g transform="translate(810, 105) rotate(45)">
            <g className="float-element" style={{ animationDelay: '1.8s' }}>
              <ellipse cx="0" cy="0" rx="5" ry="8" fill="#bae6fd" fillOpacity="0.21" stroke="#e0f2fe" strokeWidth="0.9"/>
              <line x1="0" y1="-5" x2="0" y2="5" stroke="#bae6fd" strokeWidth="0.7" opacity="0.5"/>
            </g>
          </g>
          <g transform="translate(770, 90) rotate(-50)">
            <g className="float-fast" style={{ animationDelay: '0.4s' }}>
              <ellipse cx="0" cy="0" rx="6" ry="11" fill="#0ea5e9" fillOpacity="0.2" stroke="#0284c7" strokeWidth="1"/>
              <line x1="0" y1="-7" x2="0" y2="7" stroke="#0284c7" strokeWidth="0.9" opacity="0.45"/>
            </g>
          </g>
        </g>

        {/* Estrellas brillantes */}
        <g opacity="0.4">
          <g transform="translate(635, 60)">
            <g className="float-element">
              <path d="M 0,-5 L 1,0 L 6,1 L 1.5,3 L 2,8 L 0,5 L -2,8 L -1.5,3 L -6,1 L -1,0 Z" fill="#22d3ee" opacity="0.6"/>
            </g>
          </g>
          <g transform="translate(775, 180)">
            <g className="float-slow" style={{ animationDelay: '1.8s' }}>
              <path d="M 0,-4 L 0.8,0 L 5,0.8 L 1.2,2.5 L 1.5,6.5 L 0,4 L -1.5,6.5 L -1.2,2.5 L -5,0.8 L -0.8,0 Z" fill="#0ea5e9" opacity="0.5"/>
            </g>
          </g>
          <g transform="translate(820, 90)">
            <g className="float-fast" style={{ animationDelay: '0.3s' }}>
              <path d="M 0,-6 L 1.2,0 L 7,1.2 L 2,4 L 2.5,10 L 0,6 L -2.5,10 L -2,4 L -7,1.2 L -1.2,0 Z" fill="#e0f2fe" opacity="0.7"/>
            </g>
          </g>
        </g>

        {/* Puntos y burbujas adicionales */}
        <g opacity="0.3">
          <circle cx="565" cy="90" r="2.5" fill="#38bdf8" className="float-element"/>
          <circle cx="595" cy="145" r="3" fill="#0ea5e9" className="float-slow" style={{ animationDelay: '1s' }}/>
          <circle cx="655" cy="115" r="2" fill="#7dd3fc" className="float-fast" style={{ animationDelay: '0.5s' }}/>
          <circle cx="705" cy="70" r="2.5" fill="#22d3ee" className="float-element" style={{ animationDelay: '1.5s' }}/>
          <circle cx="785" cy="135" r="3" fill="#bae6fd" className="float-slow" style={{ animationDelay: '0.8s' }}/>
          <circle cx="840" cy="80" r="2" fill="#e0f2fe" className="float-fast"/>
          <circle cx="870" cy="155" r="2.5" fill="#ffffff" className="float-element" style={{ animationDelay: '1.2s' }}/>
        </g>

        <g transform="translate(660, 145)">
          <g className="float-element" style={{ animationDelay: '1s' }}>
            <circle cx="40" cy="40" r="16" fill="#ffffff" fillOpacity="0.15" stroke="#e0f2fe" strokeWidth="1.5"/>
            <circle cx="34" cy="34" r="3" fill="#ffffff" opacity="0.6"/>
            <circle cx="65" cy="25" r="8" fill="#ffffff" fillOpacity="0.1" stroke="#e0f2fe" strokeWidth="1"/>
          </g>
        </g>

        <g opacity="0.2" strokeWidth="1.5" fill="none" strokeLinecap="round">
          <path d="M 560,180 Q 580,175 600,180" stroke="#7dd3fc" className="float-element"/>
          <path d="M 690,95 Q 710,90 730,95" stroke="#38bdf8" className="float-slow" style={{ animationDelay: '1.3s' }}/>
          <path d="M 810,130 Q 830,125 850,130" stroke="#bae6fd" className="float-fast" style={{ animationDelay: '0.7s' }}/>
        </g>

        {/* === ICONOS FLOTANTES (Calendario Pequeño y Reloj) === */}

        {/* Calendario pequeño */}
        <g transform="translate(680, 60)">
          <g stroke="#0284c7" strokeWidth="2.5" fill="none" filter="url(#shadowVacaciones)">
            <rect x="0" y="8" width="46" height="38" rx="4" fill="#ffffff" fillOpacity="0.95"/>
            <line x1="13" y1="5" x2="13" y2="15" strokeLinecap="round"/>
            <line x1="33" y1="5" x2="33" y2="15" strokeLinecap="round"/>
            <line x1="0" y1="20" x2="46" y2="20" strokeWidth="2"/>
            <polyline points="12,32 19,39 34,24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </g>

        {/* Reloj */}
        <g transform="translate(740, 155)">
          <g stroke="#0ea5e9" strokeWidth="2.5" fill="none" filter="url(#shadowVacaciones)">
            <circle cx="21" cy="21" r="20" fill="#ffffff" fillOpacity="0.95"/>
            <circle cx="21" cy="21" r="3" fill="#0ea5e9"/>
            <line x1="21" y1="21" x2="21" y2="8" strokeLinecap="round" strokeWidth="2.5"/>
            <line x1="21" y1="21" x2="32" y2="21" strokeLinecap="round" strokeWidth="2"/>
          </g>
        </g>

      </svg>
    </div>
  );
};

export default BannerAprobaciones;
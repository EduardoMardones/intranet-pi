import React from 'react';

const BannerArchivos: React.FC = () => {
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

        .banner-content-svg {
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
        className="banner-content-svg"
        viewBox="0 0 900 250" 
        xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="calipsoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="shadow" filterUnits="userSpaceOnUse" x="0" y="0" width="900" height="250">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
          </filter>

          <filter id="iconShadow" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0ea5e9" floodOpacity="0.4"/>
          </filter>

          <filter id="softBlur">
            <feGaussianBlur stdDeviation="1.5"/>
          </filter>
        </defs>

        {/* Fondo blanco */}
        <rect width="900" height="250" fill="#ffffff"/>

        {/* TEXTOS */}
        <g transform="translate(160, 35)">
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
        <g transform="translate(40, 80)">
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
          <path className="wave-layer" d="M 550,0 C 600,80 520,160 580,250 L 900,250 L 900,0 Z" fill="#bae6fd" opacity="0.3"/>
          <path className="wave-layer" d="M 620,0 C 600,70 660,170 630,250 L 900,250 L 900,0 Z" fill="#7dd3fc" opacity="0.4"/>
          <path className="wave-layer" d="M 690,0 C 740,70 650,160 710,250 L 900,250 L 900,0 Z" fill="#38bdf8" opacity="0.5"/>
          <path className="wave-layer" d="M 760,0 C 730,80 800,150 770,250 L 900,250 L 900,0 Z" fill="#0ea5e9" opacity="0.6"/>
          <path className="wave-layer" d="M 820,0 C 860,80 780,160 830,250 L 900,250 L 900,0 Z" fill="#0284c7" opacity="0.7"/>
        </g>

        {/* BURBUJAS */}
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

        {/* PLANTAS Y ARBUSTOS */}
        <g transform="translate(575, 155)" opacity="0.4">
            <g className="float-element">
                <path d="M 0,40 Q -2,25 -3,15 Q -2,8 0,0" stroke="#0ea5e9" strokeWidth="2" fill="none" opacity="0.5"/>
                <ellipse cx="-8" cy="10" rx="5" ry="9" fill="#7dd3fc" fillOpacity="0.3" transform="rotate(-25 -8 10)"/>
                <ellipse cx="8" cy="18" rx="6" ry="10" fill="#38bdf8" fillOpacity="0.25" transform="rotate(20 8 18)"/>
                <ellipse cx="-5" cy="28" rx="4" ry="7" fill="#7dd3fc" fillOpacity="0.3" transform="rotate(-35 -5 28)"/>
            </g>
        </g>

        <g transform="translate(555, 130)" opacity="0.35">
            <g className="float-slow" style={{ animationDelay: '1.6s' }}>
                <ellipse cx="0" cy="0" rx="10" ry="14" fill="#7dd3fc" fillOpacity="0.2" transform="rotate(10)"/>
                <ellipse cx="-8" cy="-5" rx="7" ry="10" fill="#38bdf8" fillOpacity="0.18" transform="rotate(-20 -8 -5)"/>
                <ellipse cx="8" cy="3" rx="8" ry="11" fill="#7dd3fc" fillOpacity="0.2" transform="rotate(25 8 3)"/>
            </g>
        </g>

        <g transform="translate(610, 170)" opacity="0.4">
            <g className="float-element" style={{ animationDelay: '0.7s' }}>
                <path d="M 0,30 Q -1,20 0,10 Q 1,5 0,0" stroke="#0ea5e9" strokeWidth="1.8" fill="none" opacity="0.5"/>
                <path d="M 0,15 Q -5,12 -8,10" stroke="#0ea5e9" strokeWidth="1.5" fill="none" opacity="0.4"/>
                <path d="M 0,20 Q 5,17 8,15" stroke="#0ea5e9" strokeWidth="1.5" fill="none" opacity="0.4"/>
                <ellipse cx="-8" cy="10" rx="4" ry="6" fill="#7dd3fc" fillOpacity="0.3" transform="rotate(-30 -8 10)"/>
                <ellipse cx="8" cy="15" rx="4" ry="6" fill="#38bdf8" fillOpacity="0.25" transform="rotate(30 8 15)"/>
            </g>
        </g>

        <g transform="translate(720, 85)" opacity="0.5">
            <g className="float-slow" style={{ animationDelay: '2s' }}>
                <path d="M 0,50 Q -3,30 -4,20 Q -2,10 0,0" stroke="#0284c7" strokeWidth="2.5" fill="none" opacity="0.4"/>
                <ellipse cx="-10" cy="12" rx="7" ry="12" fill="#38bdf8" fillOpacity="0.25" transform="rotate(-28 -10 12)"/>
                <ellipse cx="10" cy="22" rx="8" ry="14" fill="#0ea5e9" fillOpacity="0.2" transform="rotate(22 10 22)"/>
                <ellipse cx="-7" cy="35" rx="6" ry="10" fill="#38bdf8" fillOpacity="0.25" transform="rotate(-38 -7 35)"/>
            </g>
        </g>

        <g transform="translate(670, 150)" opacity="0.4">
            <g className="float-element" style={{ animationDelay: '1.1s' }}>
                <ellipse cx="0" cy="0" rx="12" ry="16" fill="#38bdf8" fillOpacity="0.22"/>
                <ellipse cx="-10" cy="-6" rx="9" ry="12" fill="#0ea5e9" fillOpacity="0.2" transform="rotate(-25 -10 -6)"/>
                <ellipse cx="10" cy="4" rx="10" ry="13" fill="#38bdf8" fillOpacity="0.22" transform="rotate(30 10 4)"/>
                <ellipse cx="0" cy="-10" rx="7" ry="9" fill="#7dd3fc" fillOpacity="0.18" transform="rotate(5)"/>
            </g>
        </g>

        <g transform="translate(695, 115)" opacity="0.35">
            <g className="float-fast" style={{ animationDelay: '0.5s' }}>
                <path d="M 0,25 Q 2,15 0,0" stroke="#0284c7" strokeWidth="1.5" fill="none" opacity="0.4"/>
                <path d="M 0,12 Q -4,10 -6,8" stroke="#0284c7" strokeWidth="1.2" fill="none" opacity="0.35"/>
                <ellipse cx="-6" cy="8" rx="3" ry="5" fill="#38bdf8" fillOpacity="0.25" transform="rotate(-35 -6 8)"/>
            </g>
        </g>

        <g transform="translate(800, 65)" opacity="0.8">
            <g className="float-element">
                <path d="M 0,80 Q -5,50 -6,35 Q -4,20 0,0" stroke="#e0f2fe" strokeWidth="2" fill="none" opacity="0.6"/>
                <ellipse cx="-12" cy="20" rx="8" ry="14" fill="#ffffff" fillOpacity="0.3" stroke="#bae6fd" strokeWidth="1.5" transform="rotate(-30 -12 20)"/>
                <ellipse cx="12" cy="30" rx="9" ry="16" fill="#ffffff" fillOpacity="0.2" stroke="#bae6fd" strokeWidth="1.5" transform="rotate(25 12 30)"/>
                <ellipse cx="-8" cy="45" rx="7" ry="12" fill="#ffffff" fillOpacity="0.3" stroke="#bae6fd" strokeWidth="1.5" transform="rotate(-40 -8 45)"/>
            </g>
        </g>

        <g transform="translate(770, 135)" opacity="0.5">
            <g className="float-slow" style={{ animationDelay: '1.4s' }}>
                <ellipse cx="0" cy="0" rx="14" ry="18" fill="#0ea5e9" fillOpacity="0.25" stroke="#0284c7" strokeWidth="1"/>
                <ellipse cx="-12" cy="-8" rx="10" ry="14" fill="#38bdf8" fillOpacity="0.22" transform="rotate(-30 -12 -8)"/>
                <ellipse cx="12" cy="5" rx="11" ry="15" fill="#0ea5e9" fillOpacity="0.25" transform="rotate(35 12 5)"/>
            </g>
        </g>

        <g transform="translate(845, 95)" opacity="0.45">
            <g className="float-element" style={{ animationDelay: '0.9s' }}>
                <path d="M 0,35 Q 1,20 0,0" stroke="#bae6fd" strokeWidth="1.8" fill="none" opacity="0.5"/>
                <ellipse cx="-5" cy="8" rx="4" ry="7" fill="#ffffff" fillOpacity="0.25" transform="rotate(-25 -5 8)"/>
                <ellipse cx="5" cy="15" rx="4" ry="7" fill="#e0f2fe" fillOpacity="0.2" transform="rotate(25 5 15)"/>
                <ellipse cx="-4" cy="22" rx="3" ry="6" fill="#ffffff" fillOpacity="0.25" transform="rotate(-30 -4 22)"/>
                <ellipse cx="4" cy="28" rx="3" ry="6" fill="#e0f2fe" fillOpacity="0.2" transform="rotate(30 4 28)"/>
            </g>
        </g>

        <g transform="translate(865, 180)" opacity="0.4">
            <g className="float-slow" style={{ animationDelay: '1.8s' }}>
                <ellipse cx="0" cy="0" rx="8" ry="6" fill="#bae6fd" fillOpacity="0.3" transform="rotate(15)"/>
                <ellipse cx="-7" cy="3" rx="6" ry="5" fill="#e0f2fe" fillOpacity="0.25" transform="rotate(-20 -7 3)"/>
                <ellipse cx="7" cy="2" rx="7" ry="5" fill="#bae6fd" fillOpacity="0.3" transform="rotate(25 7 2)"/>
            </g>
        </g>

        {/* ICONOS DE ARCHIVOS FLOTANTES */}
        
        {/* Documento PDF */}
        <g transform="translate(590, 135)" opacity="0.6">
            <g className="float-element">
                <rect x="0" y="0" width="14" height="18" rx="1.5" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5"/>
                <text x="7" y="12" fontFamily="Arial" fontSize="6" fontWeight="bold" fill="white" textAnchor="middle">PDF</text>
            </g>
        </g>

        {/* Excel */}
        <g transform="translate(625, 100)" opacity="0.6">
            <g className="float-slow" style={{ animationDelay: '1.2s' }}>
                <rect x="0" y="0" width="14" height="18" rx="1.5" fill="#10b981" stroke="#059669" strokeWidth="1.5"/>
                <line x1="3" y1="6" x2="11" y2="6" stroke="white" strokeWidth="0.8"/>
                <line x1="3" y1="9" x2="11" y2="9" stroke="white" strokeWidth="0.8"/>
                <line x1="3" y1="12" x2="11" y2="12" stroke="white" strokeWidth="0.8"/>
                <line x1="7" y1="4" x2="7" y2="14" stroke="white" strokeWidth="0.8"/>
            </g>
        </g>

        {/* Documento Word */}
        <g transform="translate(710, 165)" opacity="0.6">
            <g className="float-element" style={{ animationDelay: '0.7s' }}>
                <rect x="0" y="0" width="14" height="18" rx="1.5" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5"/>
                <line x1="3" y1="6" x2="11" y2="6" stroke="white" strokeWidth="0.8"/>
                <line x1="3" y1="9" x2="11" y2="9" stroke="white" strokeWidth="0.8"/>
                <line x1="3" y1="12" x2="10" y2="12" stroke="white" strokeWidth="0.8"/>
            </g>
        </g>

        {/* Carpeta */}
        <g transform="translate(680, 110)" opacity="0.6">
            <g className="float-fast" style={{ animationDelay: '0.4s' }}>
                <path d="M 0,5 L 0,15 Q 0,17 2,17 L 16,17 Q 18,17 18,15 L 18,7 Q 18,5 16,5 L 12,5 L 10,3 L 2,3 Q 0,3 0,5 Z" 
                        fill="#0ea5e9" stroke="#0284c7" strokeWidth="1.5"/>
            </g>
        </g>

        {/* Imagen JPG */}
        <g transform="translate(745, 130)" opacity="0.6">
            <g className="float-slow" style={{ animationDelay: '1.6s' }}>
                <rect x="0" y="0" width="16" height="16" rx="1.5" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="1.5"/>
                <circle cx="5" cy="5" r="2" fill="white" opacity="0.8"/>
                <path d="M 2,12 L 6,8 L 10,12 L 14,6" stroke="white" strokeWidth="1.5" fill="none" opacity="0.8"/>
            </g>
        </g>

        {/* ZIP/Comprimido */}
        <g transform="translate(815, 175)" opacity="0.7">
            <g className="float-element" style={{ animationDelay: '1s' }}>
                <rect x="0" y="0" width="14" height="18" rx="1.5" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5"/>
                <rect x="5" y="3" width="4" height="2" fill="white" opacity="0.8"/>
                <rect x="5" y="6" width="4" height="2" fill="white" opacity="0.6"/>
                <rect x="5" y="9" width="4" height="2" fill="white" opacity="0.8"/>
                <rect x="5" y="12" width="4" height="2" fill="white" opacity="0.6"/>
            </g>
        </g>

        {/* PowerPoint */}
        <g transform="translate(850, 115)" opacity="0.7">
            <g className="float-fast" style={{ animationDelay: '0.6s' }}>
                <rect x="0" y="0" width="14" height="18" rx="1.5" fill="#dc2626" stroke="#b91c1c" strokeWidth="1.5"/>
                <rect x="3" y="5" width="8" height="5" rx="0.5" fill="white" opacity="0.9"/>
                <line x1="3" y1="12" x2="11" y2="12" stroke="white" strokeWidth="0.8" opacity="0.8"/>
                <line x1="3" y1="14" x2="9" y2="14" stroke="white" strokeWidth="0.8" opacity="0.8"/>
            </g>
        </g>

        {/* CSV */}
        <g transform="translate(790, 90)" opacity="0.65">
            <g className="float-slow" style={{ animationDelay: '1.8s' }}>
                <rect x="0" y="0" width="14" height="18" rx="1.5" fill="#14b8a6" stroke="#0d9488" strokeWidth="1.5"/>
                <line x1="3" y1="5" x2="11" y2="5" stroke="white" strokeWidth="0.6"/>
                <line x1="3" y1="8" x2="11" y2="8" stroke="white" strokeWidth="0.6"/>
                <line x1="3" y1="11" x2="11" y2="11" stroke="white" strokeWidth="0.6"/>
                <line x1="3" y1="14" x2="11" y2="14" stroke="white" strokeWidth="0.6"/>
            </g>
        </g>

        {/* TXT Simple */}
        <g transform="translate(565, 110)" opacity="0.55">
            <g className="float-fast" style={{ animationDelay: '1.4s' }}>
                <rect x="0" y="0" width="12" height="16" rx="1" fill="#64748b" stroke="#475569" strokeWidth="1.5"/>
                <line x1="2" y1="4" x2="10" y2="4" stroke="white" strokeWidth="0.6"/>
                <line x1="2" y1="7" x2="10" y2="7" stroke="white" strokeWidth="0.6"/>
                <line x1="2" y1="10" x2="10" y2="10" stroke="white" strokeWidth="0.6"/>
            </g>
        </g>
      </svg>
    </div>
  );
};

export default BannerArchivos;
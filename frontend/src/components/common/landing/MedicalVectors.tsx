// ======================================================
// COMPONENTE: MedicalVectors
// Ubicación: src/components/common/MedicalVectors.tsx
// Descripción: Vectores médicos decorativos para landing
// ======================================================

'use client';

import React from 'react';

export const MedicalVectors: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blobs de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#4DFFF3]/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tl from-[#009DDC]/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-br from-[#52FFB8]/20 to-transparent rounded-full blur-2xl"></div>

      {/* Cruz médica superior derecha */}
      <div className="absolute top-12 right-16 animate-float">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <rect x="20" y="10" width="20" height="40" fill="#009DDC" opacity="0.8" rx="2"/>
          <rect x="10" y="20" width="40" height="20" fill="#009DDC" opacity="0.8" rx="2"/>
          <circle cx="30" cy="30" r="28" stroke="#009DDC" strokeWidth="2" opacity="0.3"/>
        </svg>
      </div>

      {/* Corazón con latido */}
      <div className="absolute top-32 right-40 animate-pulse">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#52FFB8" opacity="0.9"/>
          <path d="M12 7v10M8 12h8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Estetoscopio */}
      <div className="absolute top-1/4 right-24 animate-sway">
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
          <circle cx="35" cy="55" r="8" fill="#4DFFF3" opacity="0.9"/>
          <path d="M35 47 L 35 25" stroke="#009DDC" strokeWidth="3" strokeLinecap="round"/>
          <path d="M35 25 Q 25 15, 15 15" stroke="#009DDC" strokeWidth="3" strokeLinecap="round" fill="none"/>
          <path d="M35 25 Q 45 15, 55 15" stroke="#009DDC" strokeWidth="3" strokeLinecap="round" fill="none"/>
          <circle cx="15" cy="15" r="6" fill="#52FFB8" opacity="0.8"/>
          <circle cx="55" cy="15" r="6" fill="#52FFB8" opacity="0.8"/>
        </svg>
      </div>

      {/* Píldora/Cápsula */}
      <div className="absolute top-1/2 right-32 animate-float-delayed">
        <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
          <rect x="5" y="5" width="30" height="50" rx="15" fill="#009DDC" opacity="0.85"/>
          <rect x="5" y="5" width="30" height="25" rx="15" fill="#4DFFF3" opacity="0.9"/>
          <line x1="5" y1="30" x2="35" y2="30" stroke="white" strokeWidth="2"/>
        </svg>
      </div>

      {/* DNA Helix */}
      <div className="absolute bottom-32 right-20 animate-pulse">
        <svg width="50" height="80" viewBox="0 0 50 80" fill="none">
          <path d="M10 10 Q 25 20, 40 10 T 10 30 T 40 50 T 10 70" stroke="#52FFB8" strokeWidth="3" fill="none" opacity="0.8"/>
          <path d="M40 10 Q 25 20, 10 10 T 40 30 T 10 50 T 40 70" stroke="#4DFFF3" strokeWidth="3" fill="none" opacity="0.8"/>
          <circle cx="10" cy="10" r="3" fill="#52FFB8"/>
          <circle cx="40" cy="10" r="3" fill="#4DFFF3"/>
          <circle cx="40" cy="30" r="3" fill="#52FFB8"/>
          <circle cx="10" cy="30" r="3" fill="#4DFFF3"/>
          <circle cx="10" cy="50" r="3" fill="#52FFB8"/>
          <circle cx="40" cy="50" r="3" fill="#4DFFF3"/>
          <circle cx="40" cy="70" r="3" fill="#52FFB8"/>
          <circle cx="10" cy="70" r="3" fill="#4DFFF3"/>
        </svg>
      </div>

      {/* Jeringa */}
      <div className="absolute bottom-1/4 right-48 animate-float">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <rect x="35" y="10" width="8" height="35" fill="#009DDC" opacity="0.8" rx="1"/>
          <rect x="33" y="45" width="12" height="8" fill="#4DFFF3" opacity="0.9" rx="2"/>
          <line x1="39" y1="20" x2="39" y2="40" stroke="#52FFB8" strokeWidth="2"/>
          <polygon points="36,8 42,8 39,3" fill="#009DDC" opacity="0.8"/>
        </svg>
      </div>

      {/* Termómetro */}
      <div className="absolute top-2/3 right-12 animate-sway">
        <svg width="30" height="70" viewBox="0 0 30 70" fill="none">
          <rect x="10" y="5" width="10" height="45" fill="#009DDC" opacity="0.7" rx="5"/>
          <circle cx="15" cy="60" r="8" fill="#52FFB8" opacity="0.9"/>
          <line x1="15" y1="15" x2="15" y2="52" stroke="#52FFB8" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Átomos/Moléculas decorativas */}
      <div className="absolute top-1/3 right-60">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="25" r="4" fill="#4DFFF3" opacity="0.9"/>
          <circle cx="10" cy="15" r="3" fill="#52FFB8" opacity="0.8"/>
          <circle cx="40" cy="20" r="3" fill="#009DDC" opacity="0.8"/>
          <circle cx="15" cy="40" r="3" fill="#4DFFF3" opacity="0.8"/>
          <circle cx="38" cy="38" r="3" fill="#52FFB8" opacity="0.8"/>
          <line x1="25" y1="25" x2="10" y2="15" stroke="#009DDC" strokeWidth="1" opacity="0.5"/>
          <line x1="25" y1="25" x2="40" y2="20" stroke="#009DDC" strokeWidth="1" opacity="0.5"/>
          <line x1="25" y1="25" x2="15" y2="40" stroke="#009DDC" strokeWidth="1" opacity="0.5"/>
          <line x1="25" y1="25" x2="38" y2="38" stroke="#009DDC" strokeWidth="1" opacity="0.5"/>
        </svg>
      </div>

      {/* Partículas flotantes pequeñas */}
      <div className="absolute top-20 right-52 w-3 h-3 bg-[#52FFB8] rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-48 right-28 w-2 h-2 bg-[#4DFFF3] rounded-full animate-pulse opacity-50"></div>
      <div className="absolute bottom-48 right-36 w-4 h-4 bg-[#009DDC] rounded-full animate-pulse opacity-40"></div>
      <div className="absolute bottom-60 right-64 w-3 h-3 bg-[#52FFB8] rounded-full animate-pulse opacity-50"></div>
      <div className="absolute top-40 right-16 w-2 h-2 bg-white rounded-full animate-pulse opacity-60"></div>

    </div>
  );
};

export default MedicalVectors;
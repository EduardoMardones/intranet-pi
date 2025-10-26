// ======================================================
// COMPONENTE: FuncionarioCard
// Ubicación: src/components/common/FuncionarioCard.tsx
// Descripción: Tarjeta individual de funcionario
// ======================================================

'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { Employee } from '@/types/employee';
import { ROLE_CONFIG, AREA_CONFIG } from '@/types/employee';
import { Mail, Phone, User } from 'lucide-react';

// ======================================================
// INTERFACES
// ======================================================

interface FuncionarioCardProps {
  employee: Employee;
}

// ======================================================
// FUNCIÓN PARA GENERAR INICIALES
// ======================================================

const getInitials = (nombre: string, apellidos: string): string => {
  const firstInitial = nombre.charAt(0).toUpperCase();
  const lastInitial = apellidos.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};

// ======================================================
// FUNCIÓN PARA GENERAR COLOR DE AVATAR BASADO EN NOMBRE
// ======================================================

const getAvatarColor = (nombre: string): string => {
  const colors = [
    'bg-blue-500',
    'bg-cyan-500',
    'bg-teal-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-violet-500'
  ];
  
  const charCode = nombre.charCodeAt(0);
  return colors[charCode % colors.length];
};

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const FuncionarioCard: React.FC<FuncionarioCardProps> = ({ employee }) => {
  const roleConfig = ROLE_CONFIG[employee.role];
  const areaConfig = AREA_CONFIG[employee.area];
  const initials = getInitials(employee.nombre, employee.apellidos);
  const avatarColor = getAvatarColor(employee.nombre);

  return (
    <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 shadow-md">
      <CardContent className="p-6">
        {/* ======================================================
            AVATAR Y NOMBRE
            ====================================================== */}
        <div className="flex flex-col items-center mb-4">
          {/* Avatar circular */}
          <div className="relative mb-4">
            {employee.avatar ? (
              <img
                src={employee.avatar}
                alt={`${employee.nombre} ${employee.apellidos}`}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className={`
                w-24 h-24 rounded-full ${avatarColor}
                flex items-center justify-center
                border-4 border-white shadow-lg
                group-hover:scale-110 transition-transform duration-300
              `}>
                <span className="text-3xl font-bold text-white">
                  {initials}
                </span>
              </div>
            )}
            
            {/* Indicador de disponibilidad (para futura funcionalidad) */}
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white"></div>
          </div>

          {/* Nombre completo */}
          <h3 className="text-lg font-bold text-gray-900 text-center leading-tight mb-1">
            {employee.nombre}
          </h3>
          <p className="text-base font-semibold text-gray-700 text-center">
            {employee.apellidos}
          </p>
        </div>

        {/* ======================================================
            BADGES DE ROL Y ÁREA
            ====================================================== */}
        <div className="flex flex-col gap-2 mb-4">
          {/* Badge de Rol */}
          <div className={`
            px-3 py-1.5 rounded-lg text-xs font-semibold
            text-center border ${roleConfig.badge}
            flex items-center justify-center gap-1
          `}>
            <User className="w-3 h-3" />
            {roleConfig.label}
          </div>

          {/* Badge de Área */}
          <div className={`
            px-3 py-1.5 rounded-lg text-xs font-semibold
            text-center bg-gray-50 border border-gray-200
            flex items-center justify-center gap-1 ${areaConfig.color}
          `}>
            <span>{areaConfig.icon}</span>
            <span>{areaConfig.label}</span>
          </div>
        </div>

        {/* ======================================================
            INFORMACIÓN DE CONTACTO
            ====================================================== */}
        <div className="space-y-3 pt-4 border-t border-gray-200">
          {/* Email */}
          <div className="flex items-start gap-2">
            <Mail className="w-4 h-4 text-[#009DDC] mt-0.5 flex-shrink-0" />
            <a
              href={`mailto:${employee.email}`}
              className="text-sm text-gray-600 hover:text-[#009DDC] hover:underline transition-colors break-all"
            >
              {employee.email}
            </a>
          </div>

          {/* Teléfono y extensión */}
          {(employee.telefono || employee.extension) && (
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-[#52FFB8] mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-600">
                {employee.telefono && (
                  <div>{employee.telefono}</div>
                )}
                {employee.extension && (
                  <div className="text-xs text-gray-500">
                    Ext. {employee.extension}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ======================================================
            ÁREA PARA FUTURAS FUNCIONALIDADES
            ====================================================== */}
        {/* 
        Funcionalidades futuras:
        
        1. Botón de acción rápida:
        <button className="w-full mt-4 py-2 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white rounded-lg font-medium hover:shadow-lg transition-all">
          Contactar
        </button>
        
        2. Horario de atención:
        <div className="mt-4 p-2 bg-blue-50 rounded text-xs text-center text-gray-600">
          📅 Lunes a Viernes: 08:00 - 17:00
        </div>
        
        3. Especialidad o certificaciones:
        <div className="mt-2 flex flex-wrap gap-1">
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
            Medicina Familiar
          </span>
        </div>
        
        4. Estado en línea:
        <div className="flex items-center gap-2 mt-2 text-xs">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-600">Disponible</span>
        </div>
        */}
      </CardContent>
    </Card>
  );
};

export default FuncionarioCard;
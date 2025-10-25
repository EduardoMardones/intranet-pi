// ======================================================
// COMPONENTE: AreaSection
// Ubicación: src/components/common/AreaSection.tsx
// Descripción: Sección que agrupa funcionarios por área
// ======================================================

'use client';

import React from 'react';
import type { Employee, AreaType } from '@/types/employee';
import { AREA_CONFIG } from '@/types/employee';
import FuncionarioCard from './FuncionarioCard';
import { Users } from 'lucide-react';

// ======================================================
// INTERFACES
// ======================================================

interface AreaSectionProps {
  area: AreaType;
  employees: Employee[];
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const AreaSection: React.FC<AreaSectionProps> = ({ area, employees }) => {
  const areaConfig = AREA_CONFIG[area];

  // Si no hay empleados en esta área, no renderizar la sección
  if (employees.length === 0) return null;

  return (
    <section className="mb-12 animate-fadeIn">
      {/* ======================================================
          ENCABEZADO DE LA SECCIÓN
          ====================================================== */}
      <div className="mb-6">
        {/* Separador con título del área */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`flex items-center gap-3 ${areaConfig.color}`}>
            <span className="text-3xl">{areaConfig.icon}</span>
            <h2 className="text-2xl font-bold">{areaConfig.label}</h2>
          </div>
          <div className="flex-1 h-1 bg-gradient-to-r from-[#009DDC] to-transparent rounded-full"></div>
        </div>

        {/* Contador de funcionarios en el área */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4 text-[#009DDC]" />
          <span className="font-medium">
            {employees.length} {employees.length === 1 ? 'funcionario' : 'funcionarios'}
          </span>
        </div>
      </div>

      {/* ======================================================
          CUADRÍCULA DE TARJETAS DE FUNCIONARIOS
          ====================================================== */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-6
      ">
        {employees.map((employee, index) => (
          <div
            key={employee.id}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <FuncionarioCard employee={employee} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AreaSection;
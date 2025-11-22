// ======================================================
// COMPONENTE: PermissionGate
// Ubicación: frontend/src/components/common/PermissionGate.tsx
// Descripción: Componente para renderizado condicional basado en permisos
// ======================================================

import React from 'react';
import { usePermissions } from '@/hooks/userPermissions';
import { type Permisos } from '@/hooks/userPermissions';
// ======================================================
// TIPOS
// ======================================================

interface PermissionGateProps {
  children: React.ReactNode;
  
  // Opciones de verificación
  requiredPermission?: keyof Permisos;
  requiredLevel?: number;
  customCheck?: (permisos: Permisos) => boolean;
  
  // Contenido alternativo
  fallback?: React.ReactNode;
  showFallbackMessage?: boolean;
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

/**
 * PermissionGate
 * 
 * Componente que renderiza children solo si el usuario tiene los permisos requeridos
 * 
 * @example
 * // Verificar permiso específico
 * <PermissionGate requiredPermission="puedeCrearActividades">
 *   <Button>Crear Actividad</Button>
 * </PermissionGate>
 * 
 * @example
 * // Verificar nivel mínimo
 * <PermissionGate requiredLevel={3}>
 *   <AdminPanel />
 * </PermissionGate>
 * 
 * @example
 * // Verificación custom
 * <PermissionGate customCheck={(p) => p.esJefatura && p.area === 'Enfermería'}>
 *   <JefaturaEnfermeriaPanel />
 * </PermissionGate>
 * 
 * @example
 * // Con fallback
 * <PermissionGate 
 *   requiredPermission="puedeEditarCalendario"
 *   fallback={<p>No tienes permiso para editar el calendario</p>}
 * >
 *   <CalendarioEditor />
 * </PermissionGate>
 */
export const PermissionGate: React.FC<PermissionGateProps> = ({
  children,
  requiredPermission,
  requiredLevel,
  customCheck,
  fallback = null,
  showFallbackMessage = false,
}) => {
  const permisos = usePermissions();

  // Verificar nivel mínimo requerido
  if (requiredLevel !== undefined) {
    if (permisos.nivel < requiredLevel) {
      return (
        <>
          {showFallbackMessage && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                Necesitas nivel {requiredLevel} o superior para acceder a este contenido.
              </p>
            </div>
          )}
          {fallback}
        </>
      );
    }
  }

  // Verificar permiso específico
  if (requiredPermission) {
    const hasPermission = permisos[requiredPermission];
    
    if (typeof hasPermission === 'boolean' && !hasPermission) {
      return (
        <>
          {showFallbackMessage && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                No tienes permiso para acceder a este contenido.
              </p>
            </div>
          )}
          {fallback}
        </>
      );
    }
  }

  // Verificación personalizada
  if (customCheck) {
    if (!customCheck(permisos)) {
      return (
        <>
          {showFallbackMessage && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                No cumples con los requisitos para acceder a este contenido.
              </p>
            </div>
          )}
          {fallback}
        </>
      );
    }
  }

  // Usuario tiene los permisos requeridos
  return <>{children}</>;
};

// ======================================================
// VARIANTES ESPECIALIZADAS
// ======================================================

/**
 * Solo para Dirección (nivel 4)
 */
export const DirectorOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ 
  children, 
  fallback = null 
}) => {
  return (
    <PermissionGate requiredLevel={4} fallback={fallback}>
      {children}
    </PermissionGate>
  );
};

/**
 * Para Subdirección y superior (nivel 3+)
 */
export const SubdirectorOrAbove: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ 
  children, 
  fallback = null 
}) => {
  return (
    <PermissionGate requiredLevel={3} fallback={fallback}>
      {children}
    </PermissionGate>
  );
};

/**
 * Para Jefatura y superior (nivel 2+)
 */
export const JefaturaOrAbove: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ 
  children, 
  fallback = null 
}) => {
  return (
    <PermissionGate requiredLevel={2} fallback={fallback}>
      {children}
    </PermissionGate>
  );
};

/**
 * Para crear/editar contenido
 */
export const CanEdit: React.FC<{ 
  children: React.ReactNode; 
  creatorId?: string;
  fallback?: React.ReactNode 
}> = ({ children, creatorId, fallback = null }) => {
  return (
    <PermissionGate 
      customCheck={(permisos) => {
        if (!creatorId) return permisos.puedeEditarCalendario;
        return permisos.puedeEditarContenido(creatorId);
      }}
      fallback={fallback}
    >
      {children}
    </PermissionGate>
  );
};

/**
 * Para eliminar contenido
 */
export const CanDelete: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ 
  children, 
  fallback = null 
}) => {
  return (
    <PermissionGate requiredPermission="puedeEliminarContenido" fallback={fallback}>
      {children}
    </PermissionGate>
  );
};

// ======================================================
// EXPORT DEFAULT
// ======================================================

export default PermissionGate;
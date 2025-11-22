// ======================================================
// AUTH CONTEXT - VERSIÓN CORREGIDA Y COMPLETA
// Ubicación: frontend/src/api/contexts/AuthContext.tsx
// ======================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../../api';
import type { Usuario } from '../services/authService';


// ======================================================
// TIPOS - INTERFAZ DE CONTEXTO
// ======================================================

interface AuthContextType {
  user: Usuario | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (rut: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// ======================================================
// CONTEXTO
// ======================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ======================================================
// PROVIDER
// ======================================================

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Inicializar autenticación al cargar
  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('🔍 Verificando autenticación...');
        
        if (authService.isAuthenticated()) {
          console.log('✅ Token encontrado, obteniendo usuario...');
          const currentUser = await authService.getCurrentUser();
          
          // Debug: mostrar todos los campos del usuario
          console.log('✅ Usuario cargado completo:', currentUser);
          console.log('📊 Campos verificados:', {
            nombre_completo: currentUser.nombre_completo,
            es_jefe_de_area: currentUser.es_jefe_de_area,
            fecha_ingreso: currentUser.fecha_ingreso,
            fecha_nacimiento: currentUser.fecha_nacimiento,
            direccion: currentUser.direccion,
            contacto_emergencia: currentUser.contacto_emergencia_nombre,
            dias_vacaciones_anuales: currentUser.dias_vacaciones_anuales,
            dias_administrativos_anuales: currentUser.dias_administrativos_anuales
          });
          
          setUser(currentUser);
        } else {
          console.log('ℹ️ No hay token, usuario no autenticado');
        }
      } catch (error) {
        console.error('❌ Error al inicializar autenticación:', error);
        // Limpiar si hay error
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (rut: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('🔐 Intentando login...');
      const response = await authService.login({ rut, password });
      
      console.log('✅ Login exitoso:', response.user.nombre_completo);
      console.log('📊 Datos del usuario recibidos:', response.user);
      
      // Importante: obtener el usuario completo después del login
      const fullUser = await authService.getCurrentUser();
      setUser(fullUser);
    } catch (error) {
      console.error('❌ Error en login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 Cerrando sesión...');
      
      // 1. Llamar al servicio de logout (limpia localStorage)
      await authService.logout();
      
      // 2. Limpiar el estado del usuario (IMPORTANTE)
      setUser(null);
      
      console.log('✅ Sesión cerrada exitosamente');
      
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);
      // Incluso si hay error, limpiar todo
      setUser(null);
      localStorage.clear();
    }
  };

  const refreshUser = async () => {
    try {
      console.log('🔄 Refrescando datos del usuario...');
      const currentUser = await authService.getCurrentUser();
      
      console.log('✅ Usuario actualizado:', currentUser);
      setUser(currentUser);
    } catch (error) {
      console.error('❌ Error al refrescar usuario:', error);
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ======================================================
// HOOK
// ======================================================

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}

// ======================================================
// RE-EXPORTAR TIPO Usuario PARA USO EN OTROS COMPONENTES
// ======================================================

export type { Usuario };
// ======================================================
// AUTH CONTEXT - CORREGIDO CON LOGOUT FUNCIONAL
// Ubicación: frontend/src/contexts/AuthContext.tsx
// ======================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../../api';

// ======================================================
// TIPOS
// ======================================================

export interface Usuario {
  id: string;
  rut: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombre_completo: string;
  email: string;
  telefono?: string;
  cargo: string;
  area: string;
  area_nombre: string;
  rol: string;
  rol_nombre: string;
  dias_vacaciones_disponibles: number;
  dias_administrativos_disponibles: number;
  avatar?: string;
  is_active: boolean;
}

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
          setUser(currentUser as Usuario);
          console.log('✅ Usuario cargado:', currentUser.nombre_completo);
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
      setUser(response.user as Usuario);
      console.log('✅ Login exitoso:', response.user.nombre_completo);
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
      
      // 3. Opcional: recargar la página para asegurar que todo se limpie
      // window.location.href = '/login';
      
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
      setUser(currentUser as Usuario);
      console.log('✅ Usuario actualizado');
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
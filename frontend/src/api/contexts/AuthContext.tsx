// ======================================================
// AUTH CONTEXT - Contexto de Autenticación
// Ubicación: frontend/src/contexts/AuthContext.tsx
// ======================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../../api';

// ======================================================
// TIPOS
// ======================================================

// Tipo Usuario simplificado (puedes ajustarlo según tu necesidad)
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
        if (authService.isAuthenticated()) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser as Usuario);
        }
      } catch (error) {
        console.error('Error al inicializar autenticación:', error);
        // Limpiar si hay error
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (rut: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ rut, password });
      setUser(response.user as Usuario);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser as Usuario);
    } catch (error) {
      console.error('Error al refrescar usuario:', error);
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
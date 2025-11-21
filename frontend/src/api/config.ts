// ======================================================
// API CONFIGURATION
// Ubicación: frontend/src/api/config.ts
// ======================================================

// Base URL del backend
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

// Configuración por defecto para fetch
export const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Helper para construir URLs
export const buildUrl = (endpoint: string): string => {
  // Asegurar que el endpoint comience con /
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

// Helper para obtener headers con autenticación
export const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    return {
      ...defaultHeaders,
      'Authorization': `Bearer ${token}`,
    };
  }
  
  return defaultHeaders;
};

// Helper para manejar respuestas
export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || `HTTP Error: ${response.status}`);
  }
  
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  
  return response.text() as Promise<any>;
};

// Helper para manejar errores
export const handleError = (error: any): never => {
  console.error('API Error:', error);
  throw error;
};

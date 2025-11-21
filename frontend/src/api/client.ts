// ======================================================
// API CLIENT
// Ubicación: frontend/src/api/client.ts
// ======================================================

import { buildUrl, getAuthHeaders, handleResponse, handleError } from './config';

export class ApiClient {
  /**
   * GET request
   */
  static async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    try {
      const url = new URL(buildUrl(endpoint));
      
      // Agregar parámetros de query
      if (params) {
        Object.keys(params).forEach(key => {
          if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, String(params[key]));
          }
        });
      }
      
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: getAuthHeaders(),
        credentials: 'include', // Para cookies de sesión
      });
      
      return handleResponse<T>(response);
    } catch (error) {
      return handleError(error);
    }
  }

  /**
   * POST request
   */
  static async post<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await fetch(buildUrl(endpoint), {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(data),
      });
      
      return handleResponse<T>(response);
    } catch (error) {
      return handleError(error);
    }
  }

  /**
   * PUT request
   */
  static async put<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await fetch(buildUrl(endpoint), {
        method: 'PUT',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(data),
      });
      
      return handleResponse<T>(response);
    } catch (error) {
      return handleError(error);
    }
  }

  /**
   * PATCH request
   */
  static async patch<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await fetch(buildUrl(endpoint), {
        method: 'PATCH',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(data),
      });
      
      return handleResponse<T>(response);
    } catch (error) {
      return handleError(error);
    }
  }

  /**
   * DELETE request
   */
  static async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(buildUrl(endpoint), {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      
      return handleResponse<T>(response);
    } catch (error) {
      return handleError(error);
    }
  }

  /**
   * Upload file
   */
  static async uploadFile<T>(endpoint: string, file: File, fieldName: string = 'file'): Promise<T> {
    try {
      const formData = new FormData();
      formData.append(fieldName, file);
      
      const token = localStorage.getItem('auth_token');
      const headers: HeadersInit = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(buildUrl(endpoint), {
        method: 'POST',
        headers,
        credentials: 'include',
        body: formData,
      });
      
      return handleResponse<T>(response);
    } catch (error) {
      return handleError(error);
    }
  }
}

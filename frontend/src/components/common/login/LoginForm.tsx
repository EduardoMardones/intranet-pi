// ==========================
// LoginForm - VERSIÓN CORREGIDA CON REDIRECCIÓN
// Ubicación: src/components/common/login/LoginForm.tsx
// ==========================

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/api/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  rut: string;
  password: string;
}

interface LoginFormErrors {
  rut?: string;
  password?: string;
  general?: string;
}

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    rut: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const validateRut = (rut: string): boolean => {
    const rutRegex = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9Kk]$|^[0-9]{7,8}-[0-9Kk]$/;
    return rutRegex.test(rut);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 3; // Reducido para desarrollo
  };

  // ======================================================
  // FORMATEO AUTOMÁTICO DE RUT
  // ======================================================
  const formatRut = (value: string): string => {
    // Eliminar todo lo que no sea número o K
    const cleanValue = value.replace(/[^0-9kK]/g, '');
    
    if (cleanValue.length === 0) return '';
    
    // Separar cuerpo y dígito verificador
    const body = cleanValue.slice(0, -1);
    const dv = cleanValue.slice(-1).toUpperCase();
    
    if (body.length === 0) return dv;
    
    // Formatear el cuerpo con puntos
    const reversedBody = body.split('').reverse().join('');
    const formattedBody = reversedBody.match(/.{1,3}/g)?.join('.') || '';
    const finalBody = formattedBody.split('').reverse().join('');
    
    // Retornar formato completo
    return `${finalBody}-${dv}`;
  };

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Si el usuario está borrando, permitir borrar libremente
    if (inputValue.length < formData.rut.length) {
      setFormData(prev => ({
        ...prev,
        rut: inputValue,
      }));
      return;
    }
    
    // Formatear el RUT
    const formatted = formatRut(inputValue);
    
    setFormData(prev => ({
      ...prev,
      rut: formatted,
    }));

    if (errors.rut) {
      setErrors(prev => ({
        ...prev,
        rut: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.rut) {
      newErrors.rut = 'El RUT es requerido';
    } else if (!validateRut(formData.rut)) {
      newErrors.rut = 'Ingresa un RUT válido (Ej: 12.345.678-9)';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos 3 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof LoginFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors(prev => ({ ...prev, general: undefined }));

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('🔐 Intentando login con:', formData.rut);
      
      // Llamar a login del contexto
      await login(formData.rut, formData.password);
      
      console.log('✅ Login completado exitosamente');
      console.log('🔄 Redirigiendo a /home...');
      
      // ✅ REDIRECCIÓN INMEDIATA DESPUÉS DEL LOGIN
      navigate('/home', { replace: true });
      
    } catch (error: any) {
      console.error('❌ Error en login:', error);
      
      let errorMessage = 'RUT o contraseña incorrectos. Por favor, intenta de nuevo.';
      
      // Mensajes de error más específicos
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'RUT o contraseña incorrectos';
        } else if (error.response.status === 400) {
          errorMessage = 'Datos de login inválidos';
        } else if (error.response.status === 500) {
          errorMessage = 'Error del servidor. Intenta más tarde';
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setErrors({ general: errorMessage });
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Iniciar Sesión
        </CardTitle>
        <CardDescription className="text-center">
          Ingresa tu RUT y contraseña para acceder
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {errors.general}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="rut">RUT</Label>
            <Input
              id="rut"
              name="rut"
              type="text"
              placeholder="12.345.678-9"
              value={formData.rut}
              onChange={handleRutChange}
              className={errors.rut ? 'border-red-500' : ''}
              disabled={isSubmitting}
              autoComplete="username"
              autoFocus
              maxLength={12}
            />
            {errors.rut && (
              <p className="text-sm text-red-600">{errors.rut}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'border-red-500' : ''}
              disabled={isSubmitting}
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              disabled={isSubmitting}
            />
            <Label 
              htmlFor="rememberMe" 
              className="text-sm font-normal cursor-pointer"
            >
              Recordarme
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                    fill="none"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Iniciando sesión...
              </span>
            ) : (
              'Iniciar Sesión'
            )}
          </Button>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>¿Olvidaste tu contraseña? Contacta a soporte técnico</p>
          </div>

          {/* Credenciales de prueba (solo en desarrollo) */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-xs text-blue-800 font-semibold mb-2">
              🔧 Credenciales de prueba:
            </p>
            <div className="space-y-1">
              <p className="text-xs text-blue-700">
                <strong>Directora:</strong> 12.345.678-9 / admin123123
              </p>
              <p className="text-xs text-blue-700">
                <strong>Subdirector:</strong> 14.567.890-1 / subadmin123
              </p>
              <p className="text-xs text-blue-700">
                <strong>Jefatura:</strong> 15.678.901-2 / jefatura123
              </p>
              <p className="text-xs text-blue-700">
                <strong>Funcionario:</strong> 16.789.012-3 / funcionario123
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
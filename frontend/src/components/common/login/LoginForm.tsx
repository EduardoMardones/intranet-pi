// ==========================
// LoginForm - CON REDIRECCIÓN MEJORADA
// Ubicación: src/components/common/login/LoginForm.tsx
// ==========================

import React, { useState, useEffect } from 'react';
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
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    rut: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // Redirigir automáticamente cuando el usuario se autentique
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      console.log('✅ Usuario autenticado, redirigiendo a home...');
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const validateRut = (rut: string): boolean => {
    const rutRegex = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9Kk]$|^[0-9]{7,8}-[0-9Kk]$/;
    return rutRegex.test(rut);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
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
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
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
      
      await login(formData.rut, formData.password);
      
      console.log('✅ Login exitoso');
      // La redirección se maneja en el useEffect
      
    } catch (error: any) {
      console.error('❌ Error en login:', error);
      
      setErrors({
        general: error.message || 'RUT o contraseña incorrectos. Por favor, intenta de nuevo.',
      });
    } finally {
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
              onChange={handleInputChange}
              className={errors.rut ? 'border-red-500' : ''}
              disabled={isSubmitting}
              autoComplete="username"
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
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>¿Olvidaste tu contraseña? Contacta a soporte técnico</p>
          </div>

          {import.meta.env.VITE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-xs text-blue-800 font-semibold mb-1">
                Credenciales de prueba:
              </p>
              <p className="text-xs text-blue-700">
                <strong>Directora:</strong> 12.345.678-9 / admin123
              </p>
              <p className="text-xs text-blue-700">
                <strong>Subdirector:</strong> 13.456.789-0 / admin123
              </p>
              <p className="text-xs text-blue-700">
                <strong>Jefatura:</strong> 15.678.901-2 / jefe123
              </p>
              <p className="text-xs text-blue-700">
                <strong>Funcionario:</strong> 16.789.012-3 / user123
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
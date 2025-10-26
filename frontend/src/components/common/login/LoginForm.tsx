// ==========================
// Componente: LoginForm
// Ubicación: src/components/LoginForm.tsx
// Descripción: Formulario de inicio de sesión con validaciones
// ==========================

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// ==========================
// Interfaces y Tipos
// ==========================

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
}

// ==========================
// Componente Principal
// ==========================

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  // ==========================
  // Estados del Componente
  // ==========================
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // ==========================
  // Funciones de Validación
  // ==========================

  /**
   * Valida el formato del email
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Valida la contraseña (mínimo 6 caracteres)
   */
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  /**
   * Valida todo el formulario
   */
  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    // Validar email
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ==========================
  // Manejadores de Eventos
  // ==========================

  /**
   * Maneja los cambios en los inputs
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo al escribir
    if (errors[name as keyof LoginFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar formulario
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulación de llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Callback personalizado si existe
      if (onSubmit) {
        onSubmit(formData);
      }

      console.log('Login exitoso:', formData);
      console.log('Recordar usuario:', rememberMe);
    } catch (error) {
      console.error('Error en login:', error);
      setErrors({ email: 'Error al iniciar sesión. Verifica tus credenciales.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================
  // Renderizado del Componente
  // ==========================

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Bienvenido
        </CardTitle>
        <CardDescription className="text-center">
          Ingresa tus credenciales para acceder al sistema médico
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ==========================
              Campo: Email
              ========================== */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="ejemplo@hospital.com"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* ==========================
              Campo: Contraseña
              ========================== */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Contraseña
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password}
              </p>
            )}
          </div>

          

          {/* ==========================
              Botón de Envío
              ========================== */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>

          {/* ==========================
              Enlaces Adicionales
              ========================== */}
          <div className="text-center space-y-2">
            <a
              href="#"
              className="text-sm text-blue-600 hover:underline block"
            >
              ¿Olvidaste tu contraseña?
            </a>
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Regístrate aquí
              </a>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// ==========================
// Export por Defecto
// ==========================

export default LoginForm;
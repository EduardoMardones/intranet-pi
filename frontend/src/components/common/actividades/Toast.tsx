// ======================================================
// SISTEMA DE NOTIFICACIONES TOAST
// Ubicación: src/components/common/Toast.tsx
// Descripción: Sistema de notificaciones para feedback de acciones
// ======================================================

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

// ======================================================
// INTERFACES
// ======================================================

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (type: ToastType, message: string, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
}

// ======================================================
// CONFIGURACIÓN DE ESTILOS POR TIPO
// ======================================================

const TOAST_STYLES: Record<ToastType, {
  bg: string;
  border: string;
  text: string;
  icon: React.ReactNode;
}> = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-400',
    text: 'text-green-800',
    icon: <CheckCircle className="w-5 h-5 text-green-600" />
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-400',
    text: 'text-red-800',
    icon: <XCircle className="w-5 h-5 text-red-600" />
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-400',
    text: 'text-blue-800',
    icon: <Info className="w-5 h-5 text-blue-600" />
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-400',
    text: 'text-amber-800',
    icon: <AlertTriangle className="w-5 h-5 text-amber-600" />
  }
};

// ======================================================
// CONTEXTO
// ======================================================

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe usarse dentro de un ToastProvider');
  }
  return context;
};

// ======================================================
// PROVEEDOR
// ======================================================

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  /**
   * Agrega un nuevo toast
   */
  const showToast = useCallback((
    type: ToastType,
    message: string,
    duration: number = 4000
  ) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const newToast: Toast = {
      id,
      type,
      message,
      duration
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-remover después de la duración
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  /**
   * Remueve un toast específico
   */
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  /**
   * Métodos de conveniencia
   */
  const success = useCallback((message: string, duration?: number) => {
    showToast('success', message, duration);
  }, [showToast]);

  const error = useCallback((message: string, duration?: number) => {
    showToast('error', message, duration);
  }, [showToast]);

  const info = useCallback((message: string, duration?: number) => {
    showToast('info', message, duration);
  }, [showToast]);

  const warning = useCallback((message: string, duration?: number) => {
    showToast('warning', message, duration);
  }, [showToast]);

  const value: ToastContextType = {
    showToast,
    success,
    error,
    info,
    warning
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Contenedor de toasts */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// ======================================================
// COMPONENTE DE TOAST INDIVIDUAL
// ======================================================

interface ToastComponentProps {
  toast: Toast;
  onClose: () => void;
}

const ToastComponent: React.FC<ToastComponentProps> = ({ toast, onClose }) => {
  const styles = TOAST_STYLES[toast.type];

  return (
    <div
      className={`
        ${styles.bg} ${styles.border} ${styles.text}
        border-l-4 rounded-lg shadow-lg p-4 
        flex items-start gap-3
        animate-in slide-in-from-right duration-300
        pointer-events-auto
      `}
    >
      {/* Icono */}
      <div className="shrink-0 mt-0.5">
        {styles.icon}
      </div>

      {/* Mensaje */}
      <div className="flex-1 text-sm font-medium leading-snug">
        {toast.message}
      </div>

      {/* Botón de cerrar */}
      <button
        onClick={onClose}
        className="shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
        aria-label="Cerrar notificación"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// ======================================================
// EJEMPLO DE USO EN COMPONENTE
// ======================================================

/*
import { useToast } from '../components/common/Toast';

const TableroActividadesAdmin = () => {
  const toast = useToast();

  const handleSave = async (data: Omit<Activity, 'id'>) => {
    try {
      if (editingActivity) {
        await updateActivity(editingActivity.id, data);
        toast.success('✅ Actividad actualizada correctamente');
      } else {
        await createActivity(data);
        toast.success('✨ Actividad creada exitosamente');
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('❌ Error al guardar la actividad. Intenta nuevamente.');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta actividad?')) {
      return;
    }

    try {
      await deleteActivity(id);
      toast.success('🗑️ Actividad eliminada correctamente');
    } catch (error) {
      toast.error('❌ Error al eliminar la actividad');
      console.error(error);
    }
  };

  return (
    // ... componente
  );
};
*/

// ======================================================
// INSTALACIÓN EN APP
// ======================================================

/*
import { ToastProvider } from './components/common/Toast';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* ... tus rutas ... *\/}
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
*/

// ======================================================
// ALTERNATIVAS POPULARES
// ======================================================

/*
Si prefieres usar una librería externa bien mantenida:

1. REACT-HOT-TOAST (Recomendado - Simple y ligero)
   npm install react-hot-toast
   
   import toast, { Toaster } from 'react-hot-toast';
   
   // En App.tsx
   <Toaster position="top-right" />
   
   // Uso
   toast.success('Actividad creada');
   toast.error('Error al guardar');
   toast.loading('Guardando...');

2. SONNER (Moderna y elegante)
   npm install sonner
   
   import { Toaster, toast } from 'sonner';
   
   // En App.tsx
   <Toaster position="top-right" />
   
   // Uso
   toast.success('Actividad creada');
   toast.error('Error al guardar');
   toast.promise(promise, {
     loading: 'Guardando...',
     success: 'Guardado!',
     error: 'Error'
   });

3. REACT-TOASTIFY (Muy popular - Más features)
   npm install react-toastify
   
   import { ToastContainer, toast } from 'react-toastify';
   import 'react-toastify/dist/ReactToastify.css';
   
   // En App.tsx
   <ToastContainer position="top-right" autoClose={4000} />
   
   // Uso
   toast.success('Actividad creada');
   toast.error('Error al guardar');
*/

// ======================================================
// MENSAJES SUGERIDOS PARA EL SISTEMA
// ======================================================

export const TOAST_MESSAGES = {
  // CREATE
  createSuccess: '✨ Actividad creada exitosamente',
  createError: '❌ Error al crear la actividad. Por favor, intenta nuevamente.',
  
  // UPDATE
  updateSuccess: '✅ Actividad actualizada correctamente',
  updateError: '❌ Error al actualizar la actividad. Por favor, intenta nuevamente.',
  
  // DELETE
  deleteSuccess: '🗑️ Actividad eliminada correctamente',
  deleteError: '❌ Error al eliminar la actividad',
  deleteConfirm: '⚠️ Esta acción no se puede deshacer',
  
  // VALIDACIÓN
  validationError: '⚠️ Por favor, completa todos los campos obligatorios',
  invalidUrl: '⚠️ La URL de la imagen no es válida',
  invalidDate: '⚠️ La fecha no puede ser anterior a hoy',
  
  // AUTH
  loginSuccess: '👋 Bienvenido de vuelta',
  loginError: '❌ Credenciales inválidas',
  logoutSuccess: '👋 Sesión cerrada correctamente',
  unauthorized: '🔒 No tienes permisos para realizar esta acción',
  
  // GENERAL
  loadingError: '❌ Error al cargar los datos',
  networkError: '📡 Error de conexión. Verifica tu internet.',
  unexpectedError: '❌ Ocurrió un error inesperado'
};

// ======================================================
// EXPORT DEFAULT
// ======================================================

export default ToastProvider;
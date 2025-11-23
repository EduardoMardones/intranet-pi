// ==========================
// App.tsx - CORREGIDO PARA LOGIN
// ==========================

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { AuthProvider, useAuth } from "@/api/contexts/AuthContext"
import { useEffect } from "react"
import HomePage from "@/pages/general/HomePage"
import ArchivosAdminPage from "./pages/admin/ArchivosAdminPage"
import VacacionesPage  from "@/pages/general/VacacionesPage"
import { ActividadesAdminPage } from "./pages/admin/ActividadesAdminPage"
import { AnunciosAdminPage } from "./pages/admin/AnunciosAdminPage"
import DirectorioAdminPage from "./pages/admin/DirectorioAdminPage"
import { PerfilUsuarioPage } from "@/pages/general/PerfilUsuarioPage"
import LoginPage from "@/pages/general/LoginPage"
import LandingPage from "./pages/general/LandingPage"
import { SoporteTecnicoPage } from "./pages/general/SoporteTecnicoPage"
import { SolicitarDiasPage } from "./pages/general/SolicitarDiasPage"

// ✅ PÁGINAS ADMIN UNIFICADAS (con permisos internos)
import { CalendarioAdminPage } from "./pages/admin/CalendarioAdminPage"
import { LicenciasMedicasPage } from "./pages/admin/LicenciasMedicasPage"
import { AprobacionesAdminPage } from "./pages/admin/AprobacionesAdminPage"

import ToastProvider from "./components/common/actividades/Toast"

// Componente de Loading
function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Cargando...</p>
      </div>
    </div>
  );
}

// Componente para Rutas Protegidas
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// ✅ COMPONENTE MEJORADO: PublicRoute sin bloqueo
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Debug
  useEffect(() => {
    console.log('PublicRoute - Estado:', { 
      isAuthenticated, 
      isLoading, 
      path: location.pathname 
    });
  }, [isAuthenticated, isLoading, location.pathname]);

  // ✅ IMPORTANTE: No bloquear mientras está cargando
  if (isLoading) {
    console.log('PublicRoute - Mostrando loading...');
    return <LoadingScreen />;
  }

  // ✅ Solo redirigir si está autenticado Y la carga terminó
  if (isAuthenticated && !isLoading) {
    console.log('PublicRoute - Usuario autenticado, redirigiendo a /home');
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}

// Rutas de la aplicación
function AppRoutes() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />

      {/* Rutas Protegidas - Generales */}
      <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/repositorio" element={<ProtectedRoute><ArchivosAdminPage /></ProtectedRoute>} />
      <Route path="/vacaciones" element={<ProtectedRoute><VacacionesPage /></ProtectedRoute>} />
      <Route path="/actividades" element={<ProtectedRoute><ActividadesAdminPage /></ProtectedRoute>} />      
      <Route path="/anuncios" element={<ProtectedRoute><AnunciosAdminPage /></ProtectedRoute>} />
      <Route path="/directorio" element={<ProtectedRoute><DirectorioAdminPage /></ProtectedRoute>} />
      <Route path="/perfil" element={<ProtectedRoute><PerfilUsuarioPage /></ProtectedRoute>} />
      <Route path="/soporte" element={<ProtectedRoute><SoporteTecnicoPage /></ProtectedRoute>} />
      <Route path="/solicitar-dias" element={<ProtectedRoute><SolicitarDiasPage /></ProtectedRoute>} />

      {/* ✅ CALENDARIO UNIFICADO - Una sola ruta para todos */}
      <Route path="/calendario" element={<ProtectedRoute><CalendarioAdminPage /></ProtectedRoute>} />

      {/* Rutas Admin Exclusivas (sin versión general) */}
      <Route path="/aprobaciones" element={<ProtectedRoute><AprobacionesAdminPage /></ProtectedRoute>} />
      <Route path="/licencias" element={<ProtectedRoute><LicenciasMedicasPage /></ProtectedRoute>} />

      {/* Ruta 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// App principal
function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
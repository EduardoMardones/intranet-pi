// ==========================
// App.tsx - ACTUALIZADO CON AUTENTICACIÓN
// ==========================

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "@/api/contexts/AuthContext"
import HomePage from "@/pages/general/HomePage"
import { ArchivosPage } from "@/pages/general/ArchivosPage"
import VacacionesPage  from "@/pages/general/VacacionesPage"
import CalendarioPage from "@/pages/general/CalendarioPage"
import { ActividadesPage } from "@/pages/general/ActividadesPage"
import { AnunciosPage } from "@/pages/general/AnunciosPage"
import { DirectorioPage } from "@/pages/general/DirectorioPage"
import { LicenciasMedicasPage } from "@/pages/admin/LicenciasMedicasPage"
import { PerfilUsuarioPage } from "@/pages/general/PerfilUsuarioPage"
import LoginPage from "@/pages/general/LoginPage"
import LandingPage from "./pages/general/LandingPage"
import { SoporteTecnicoPage } from "./pages/general/SoporteTecnicoPage"
import { CalendarioAdminPage } from "./pages/admin/CalendarioAdminPage"
import { AnunciosAdminPage } from "./pages/admin/AnunciosAdminPage"
import CrearUsuarioPage from "./pages/admin/CrearUsuarioPage"
import { DirectorioAdminPage } from "./pages/admin/DirectorioAdminPage"
import { ActividadesAdminPage } from "./pages/admin/ActividadesAdminPage"
import { AprobacionesAdminPage } from "./pages/admin/AprobacionesAdminPage"
import { ArchivosAdminPage } from "./pages/admin/ArchivosAdminPage"
import { SolicitarDiasPage } from "./pages/general/SolicitarDiasPage"
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

// Componente para Rutas Públicas (redirige al home si ya está autenticado)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
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
      <Route path="/repositorio" element={<ProtectedRoute><ArchivosPage /></ProtectedRoute>} />
      <Route path="/vacaciones" element={<ProtectedRoute><VacacionesPage /></ProtectedRoute>} />
      <Route path="/calendario" element={<ProtectedRoute><CalendarioPage /></ProtectedRoute>} />
      <Route path="/actividades" element={<ProtectedRoute><ActividadesPage /></ProtectedRoute>} />
      <Route path="/anuncios" element={<ProtectedRoute><AnunciosPage /></ProtectedRoute>} />
      <Route path="/directorio" element={<ProtectedRoute><DirectorioPage /></ProtectedRoute>} />
      <Route path="/perfil" element={<ProtectedRoute><PerfilUsuarioPage /></ProtectedRoute>} />
      <Route path="/soporte" element={<ProtectedRoute><SoporteTecnicoPage /></ProtectedRoute>} />
      <Route path="/solicitar-dias" element={<ProtectedRoute><SolicitarDiasPage /></ProtectedRoute>} />

      {/* Rutas Protegidas - Admin */}
      <Route path="/licencias" element={<ProtectedRoute><LicenciasMedicasPage /></ProtectedRoute>} />
      <Route path="/calendarioadmin" element={<ProtectedRoute><CalendarioAdminPage /></ProtectedRoute>} />
      <Route path="/anunciosadmin" element={<ProtectedRoute><AnunciosAdminPage /></ProtectedRoute>} />
      <Route path="/crearusuarioadmin" element={<ProtectedRoute><CrearUsuarioPage /></ProtectedRoute>} />
      <Route path="/directorioadmin" element={<ProtectedRoute><DirectorioAdminPage /></ProtectedRoute>} />
      <Route path="/actividadesadmin" element={<ProtectedRoute><ActividadesAdminPage /></ProtectedRoute>} />
      <Route path="/aprobacionesadmin" element={<ProtectedRoute><AprobacionesAdminPage /></ProtectedRoute>} />
      <Route path="/archivosadmin" element={<ProtectedRoute><ArchivosAdminPage /></ProtectedRoute>} />

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
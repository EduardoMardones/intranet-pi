import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
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
import ToastProvider from "./components/common/actividades/Toast"


function App() {
  return (
    <ToastProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/repositorio" element={<ArchivosPage />} />
        <Route path="/vacaciones" element={<VacacionesPage />} />
        <Route path="/calendario" element={<CalendarioPage />} />
        <Route path="/actividades" element={<ActividadesPage />} />
        <Route path="/anuncios" element={<AnunciosPage />} />
        <Route path="/directorio" element={<DirectorioPage />} />
        <Route path="/licencias" element={<LicenciasMedicasPage />} />
        <Route path="/perfil" element={<PerfilUsuarioPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/soporte" element={<SoporteTecnicoPage />} />
        <Route path="/calendarioadmin" element={<CalendarioAdminPage />} />
        <Route path="/anunciosadmin" element={<AnunciosAdminPage />} />
        <Route path="/crearusuarioadmin" element={<CrearUsuarioPage />} />
        <Route path="/directorioadmin" element={<DirectorioAdminPage />} />
        <Route path="/actividadesadmin" element={<ActividadesAdminPage />} />
        <Route path="/aprobacionesadmin" element={<AprobacionesAdminPage />} />



      </Routes>
    </Router>
    </ToastProvider>
  )
}

export default App
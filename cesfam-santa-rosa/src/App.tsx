import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "@/pages/general/HomePage"
import { RepositorioPage } from "@/pages/general/RepositorioPage"
import VacacionesPage  from "@/pages/general/VacacionesPage"
import CalendarioPage from "@/pages/general/CalendarioPage"
import { ActividadesPage } from "@/pages/general/ActividadesPage"
import { AnunciosPage } from "@/pages/general/AnunciosPage"
import { DirectorioPage } from "@/pages/general/DirectorioPage"
import { LicenciasMedicasPage } from "@/pages/administrador/LicenciasMedicasPage"
import { PerfilUsuarioPage } from "@/pages/general/PerfilUsuarioPage"
import LoginPage from "@/pages/general/LoginPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/repositorio" element={<RepositorioPage />} />
        <Route path="/vacaciones" element={<VacacionesPage />} />
        <Route path="/calendario" element={<CalendarioPage />} />
        <Route path="/actividades" element={<ActividadesPage />} />
        <Route path="/anuncios" element={<AnunciosPage />} />
        <Route path="/directorio" element={<DirectorioPage />} />
        <Route path="/licencias" element={<LicenciasMedicasPage />} />
        <Route path="/perfil" element={<PerfilUsuarioPage />} />
        <Route path="/login" element={<LoginPage />} />

      </Routes>
    </Router>
  )
}

export default App

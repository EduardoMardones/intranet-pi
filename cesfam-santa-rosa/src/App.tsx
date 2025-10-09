import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "@/pages/HomePage"
import { RepositorioPage } from "@/pages/RepositorioPage"
import VacacionesPage  from "@/pages/VacacionesPage"
import CalendarioPage from "@/pages/CalendarioPage"
import { ActividadesPage } from "@/pages/ActividadesPage"
import { AnunciosPage } from "./pages/AnunciosPage"

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


      </Routes>
    </Router>
  )
}

export default App

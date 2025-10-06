import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VacacionesPage from './pages/VacacionesPage'
import { RepositorioPage } from './pages/RepositorioPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VacacionesPage/>
  </StrictMode>,
)

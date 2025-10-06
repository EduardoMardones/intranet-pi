import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VacacionesPage from './pages/VacacionesPage'
import { RepositorioPage } from './pages/RepositorioPage'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RepositorioPage/>
  </StrictMode>,
)

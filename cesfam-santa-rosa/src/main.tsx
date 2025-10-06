import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VacacionesPage from './pages/vacacionespage'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VacacionesPage/>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ArchivePage from './ArchivePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ArchivePage />
  </StrictMode>,
)

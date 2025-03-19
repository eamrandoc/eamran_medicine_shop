import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter} from 'react-router-dom'
import AuthProvider from './provider/AuthProvider.jsx'
import Root from './layouts/Root.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Root></Root>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)

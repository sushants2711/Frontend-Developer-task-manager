// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { AuthcontextProvider } from './context/Authcontext.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <AuthcontextProvider>
      <App />
    </AuthcontextProvider>
  </BrowserRouter>
  // </StrictMode>,
)

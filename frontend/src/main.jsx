import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import { UserProvider } from './Providers/Users/UserProvider';

import './library.css'
import './root.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>,
)

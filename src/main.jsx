import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import Providers from './components/Providers.jsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </Providers>
  </React.StrictMode>,
)

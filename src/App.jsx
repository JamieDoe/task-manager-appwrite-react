import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/authenticated/Home'
import LoginPage from './pages/unauthenticated/LoginPage'
import './style.scss'
import { AuthProvider } from './userContextProvider'
import PrivateRoutes from './components/PriviateRoutes'

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            {/* <Route element={<PrivateRoutes />}> */}
            <Route path="/" element={<Home />} />
            {/* </Route> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Home />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App

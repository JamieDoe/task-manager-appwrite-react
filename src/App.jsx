import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/authenticated/Home'
import LoginPage from './pages/unauthenticated/LoginPage'
import './style.scss'
import { useAuth } from './userContextProvider'
import PrivateRoutes from './components/PriviateRoutes'
import { useEffect, useState } from 'react'
import { Loader } from './components'
import RegisterAccountPage from './pages/unauthenticated/RegisterAccountPage'
import UnauthenticatedRoutes from './components/UnauthenticatedRoutes'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { checkUserStatus } = useAuth()

  useEffect(() => {
    checkUserStatus().then(() => {
      setIsLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<UnauthenticatedRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterAccountPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App

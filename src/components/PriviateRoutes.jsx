import { Outlet, Navigate } from 'react-router-dom'

import { useAuth } from '../userContextProvider'

export default function PrivateRoutes() {
  const { user } = useAuth()

  return user ? <Outlet /> : <Navigate to="/login" />
}

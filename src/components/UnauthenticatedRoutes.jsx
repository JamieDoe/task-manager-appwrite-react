import { Outlet, Navigate } from 'react-router-dom'

import { useAuth } from '../userContextProvider'

export default function UnauthenticatedRoutes() {
  const { user } = useAuth()

  console.log('private route', user)

  return !user ? <Outlet /> : <Navigate to="/" />
}

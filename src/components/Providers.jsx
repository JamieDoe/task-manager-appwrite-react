import { AuthProvider } from '../userContextProvider'

export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>
}

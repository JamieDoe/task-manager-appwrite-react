import { useContext, useState, useEffect, createContext } from 'react'
import { useAppwriteUtils } from './utils/appwriteConfig'

import { Loader } from './components'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const { account } = useAppwriteUtils()

  useEffect(() => {
    async function fetchUserStatus() {
      try {
        checkUserStatus()
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserStatus()
  }, [])

  const registerUser = (userInfo) => {}

  const loginUser = async (userInfo) => {
    setIsLoading(true)
    try {
      await account.createEmailSession(
        userInfo.emailInput,
        userInfo.passwordInput,
      )
      setIsAuth(true)
      const accountDetails = await account.get()
      setUser(accountDetails)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const logoutUser = () => {
    try {
      account.deleteSession('current')
      setUser(null)
      setIsAuth(false)
    } catch (error) {
      console.log(error)
    }
  }

  const checkUserStatus = async () => {
    try {
      setIsLoading(true)
      const response = await account?.get()
      setUser(response)
    } catch (error) {
      if (error.type === 'general_unauthorized_scope') {
        console.log(error)
      }
    }
    setIsLoading(false)
  }

  const contextData = {
    user,
    registerUser,
    loginUser,
    logoutUser,
    checkUserStatus,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthContext

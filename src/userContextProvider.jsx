import { useContext, useState, useEffect, createContext } from 'react'
import { useAppwriteUtils } from './utils/appwriteConfig'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const { account } = useAppwriteUtils()
  const [isAuth, setIsAuth] = useState(false)

  const registerUser = (userInfo) => {}

  const loginUser = async (userInfo) => {
    try {
      await account.createEmailSession(
        userInfo.emailInput,
        userInfo.passwordInput,
      )
      const accountDetails = await account.get()
      setUser(accountDetails)
      setIsAuth(true)
    } catch (error) {
      console.log(error)
    }
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
      const response = await account?.get()
      setUser(response)
    } catch (error) {
      if (error.type === 'general_unauthorized_scope') {
        console.log(error)
      }
    }
  }

  console.log('the user', user)

  const contextData = {
    user,
    isAuth,
    registerUser,
    loginUser,
    logoutUser,
    checkUserStatus,
  }

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthContext

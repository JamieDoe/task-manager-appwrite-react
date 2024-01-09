import { useContext, useState, createContext } from 'react'
import { ID } from 'appwrite'

import { appwriteUtils } from './utils/appwriteConfig'
import registerValidationSchema from './schemas/registerValidationSchema'
import toast from 'react-hot-toast'
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const { account } = appwriteUtils()

  const registerUser = async (userInfo) => {
    try {
      registerValidationSchema.validateSync(userInfo, { abortEarly: false })
      const response = await account.create(
        ID.unique(),
        userInfo.emailInput,
        userInfo.passwordInput,
        userInfo.nameInput,
      )
      setUser(response)
      toast.success(`Welcome to the TaskManager ${response.name}!`)
    } catch (error) {
      console.log(error)
    }
  }

  const loginUser = async (userInfo) => {
    try {
      await account.createEmailSession(
        userInfo.emailInput,
        userInfo.passwordInput,
      )
      const accountDetails = await account.get()
      setUser(accountDetails)
      toast.success(`Welcome back ${accountDetails.name}`)
    } catch (error) {
      console.log(error)
    }
  }

  const logoutUser = () => {
    try {
      account.deleteSession('current')
      setUser(null)
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

  const contextData = {
    user,
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

import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { signUp as authSignUp, login as authLogin } from '../utils/authUtils'

export function useAuth() {
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)

  const handleLogin = (email: string, password: string): void => {
    const user = authLogin(email, password)
    setUser(user)
    navigate('/')
  }

  const handleSignUp = (email: string, password: string, nickname: string): void => {
    authSignUp(email, password, nickname)
    navigate('/login')
  }

  return { handleLogin, handleSignUp }
}

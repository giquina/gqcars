import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'

export const useAuth = () => {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      if (result?.error) {
        throw new Error(result.error)
      }
      return result
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await signOut({ redirect: false })
    } finally {
      setLoading(false)
    }
  }

  return {
    user: session?.user,
    isAuthenticated: !!session,
    isLoading: status === 'loading' || loading,
    login,
    logout,
  }
}
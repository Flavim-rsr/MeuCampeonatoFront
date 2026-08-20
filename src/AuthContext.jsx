import { createContext, useContext, useEffect, useState } from 'react'
import { api, setUnauthorizedHandler } from './api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // On mount, if we have a token, fetch the current user.
  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }
    api
      .get('auth/me', token)
      .then((data) => setUser(data.data))
      .catch(() => logout())
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Whenever the api wrapper sees a 401, clear the session.
  useEffect(() => {
    setUnauthorizedHandler(() => logout())
  }, [])

  function saveToken(newToken) {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  async function login(email, password) {
    const data = await api.post('auth/login', { email, password })
    saveToken(data.access_token)
    const me = await api.get('auth/me', data.access_token)
    setUser(me.data)
  }

  async function register(name, email, password, passwordConfirmation) {
    await api.post('auth/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    })
    // Registration doesn't return a token, so log in right after.
    await login(email, password)
  }

  function logout() {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  const value = { token, user, loading, login, register, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import ErrorBanner from '../components/ErrorBanner'

export default function LoginPage() {
  const { token, login, register } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('login')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  if (token) return <Navigate to="/championships" replace />

  async function handleLogin(e) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(loginForm.email, loginForm.password)
      navigate('/championships')
    } catch (err) {
      setError(err)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleRegister(e) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await register(
        registerForm.name,
        registerForm.email,
        registerForm.password,
        registerForm.password_confirmation,
      )
      navigate('/championships')
    } catch (err) {
      setError(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <h1>Meu Campeonato</h1>

      <div className="tabs">
        <button className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>
          Login
        </button>
        <button className={tab === 'register' ? 'active' : ''} onClick={() => setTab('register')}>
          Registro
        </button>
      </div>

      <ErrorBanner error={error} />

      {tab === 'login' ? (
        <form onSubmit={handleLogin} className="form">
          <label>
            Email
            <input
              type="email"
              required
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              required
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />
          </label>
          <button type="submit" disabled={submitting}>
            Entrar
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="form">
          <label>
            Nome
            <input
              type="text"
              required
              value={registerForm.name}
              onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              required
              value={registerForm.email}
              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              required
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
            />
          </label>
          <label>
            Confirmar senha
            <input
              type="password"
              required
              value={registerForm.password_confirmation}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, password_confirmation: e.target.value })
              }
            />
          </label>
          <button type="submit" disabled={submitting}>
            Criar conta
          </button>
        </form>
      )}
    </div>
  )
}

import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { AuthProvider, useAuth } from './AuthContext'
import LoginPage from './pages/LoginPage'
import TeamsPage from './pages/TeamsPage'
import ChampionshipsPage from './pages/ChampionshipsPage'
import ChampionshipDetailPage from './pages/ChampionshipDetailPage'
import RankingsPage from './pages/RankingsPage'

// Blocks a route until we know there's a logged-in user.
function RequireAuth({ children }) {
  const { token, loading } = useAuth()

  if (loading) return <p className="page-loading">Carregando...</p>
  if (!token) return <Navigate to="/login" replace />

  return children
}

function Navbar() {
  const { token, logout } = useAuth()
  if (!token) return null

  return (
    <nav className="navbar">
      <Link to="/teams">Times</Link>
      <Link to="/championships">Campeonatos</Link>
      <Link to="/rankings">Ranking</Link>
      <button className="link-button" onClick={logout}>
        sair
      </button>
    </nav>
  )
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/teams"
            element={
              <RequireAuth>
                <TeamsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/championships"
            element={
              <RequireAuth>
                <ChampionshipsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/championships/:id"
            element={
              <RequireAuth>
                <ChampionshipDetailPage />
              </RequireAuth>
            }
          />
          <Route
            path="/rankings"
            element={
              <RequireAuth>
                <RankingsPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/championships" replace />} />
        </Routes>
      </main>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

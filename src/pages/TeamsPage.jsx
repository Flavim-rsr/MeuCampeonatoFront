import { useEffect, useState } from 'react'
import { api } from '../api'
import { useAuth } from '../AuthContext'
import ErrorBanner from '../components/ErrorBanner'

export default function TeamsPage() {
  const { token } = useAuth()
  const [teams, setTeams] = useState([])
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  function loadTeams() {
    setLoading(true)
    api
      .get('teams', token)
      .then((data) => setTeams(data.data))
      .catch(setError)
      .finally(() => setLoading(false))
  }

  useEffect(loadTeams, [token])

  async function handleCreate(e) {
    e.preventDefault()
    setError(null)
    try {
      await api.post('teams', { name }, token)
      setName('')
      loadTeams()
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div>
      <h1>Times</h1>

      <ErrorBanner error={error} />

      <form onSubmit={handleCreate} className="form form-inline">
        <input
          type="text"
          placeholder="Nome do time"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="list">
          {teams.map((team) => (
            <li key={team.id}>{team.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

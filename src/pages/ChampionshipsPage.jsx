import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { useAuth } from '../AuthContext'
import ErrorBanner from '../components/ErrorBanner'

const STATUS_LABEL = {
  draft: 'rascunho',
  quarter_finals: 'quartas de final',
  semi_finals: 'semifinais',
  finals: 'final',
  finished: 'finalizado',
}

export default function ChampionshipsPage() {
  const { token } = useAuth()
  const [championships, setChampionships] = useState([])
  const [status, setStatus] = useState('')
  const [name, setName] = useState('')
  const [tiebreakerMode, setTiebreakerMode] = useState('default')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  function loadChampionships() {
    setLoading(true)
    const query = status ? `championships?status=${status}` : 'championships'
    api
      .get(query, token)
      .then((data) => setChampionships(data.data))
      .catch(setError)
      .finally(() => setLoading(false))
  }

  useEffect(loadChampionships, [token, status])

  async function handleCreate(e) {
    e.preventDefault()
    setError(null)
    try {
      await api.post('championships', { name, tiebreaker_mode: tiebreakerMode }, token)
      setName('')
      setTiebreakerMode('default')
      loadChampionships()
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div>
      <h1>Campeonatos</h1>

      <ErrorBanner error={error} />

      <form onSubmit={handleCreate} className="form form-inline">
        <input
          type="text"
          placeholder="Nome do campeonato"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={tiebreakerMode} onChange={(e) => setTiebreakerMode(e.target.value)}>
          <option value="default">Desempate padrão</option>
          <option value="penalties">Pênaltis</option>
        </select>
        <button type="submit">Criar</button>
      </form>

      <div className="filter-bar">
        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Todos</option>
            {Object.entries(STATUS_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : championships.length === 0 ? (
        <p className="empty-state">Nenhum campeonato por aqui ainda.</p>
      ) : (
        <ul className="list">
          {championships.map((champ) => (
            <li key={champ.id}>
              <Link to={`/championships/${champ.id}`}>{champ.name}</Link>
              <span className="status-tag">{STATUS_LABEL[champ.status] || champ.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

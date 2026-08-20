import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api'
import { useAuth } from '../AuthContext'
import ErrorBanner from '../components/ErrorBanner'
import PhaseSection from '../components/PhaseSection'
import StandingsTable from '../components/StandingsTable'
import Podium from '../components/Podium'

const PHASE_ORDER = ['quarter_finals', 'semi_finals', 'third_place', 'final']
const MAX_TEAMS = 8

export default function ChampionshipDetailPage() {
  const { id } = useParams()
  const { token } = useAuth()
  const [championship, setChampionship] = useState(null)
  const [myTeams, setMyTeams] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)

  function loadChampionship() {
    return api.get(`championships/${id}`, token).then((data) => setChampionship(data.data))
  }

  useEffect(() => {
    setLoading(true)
    Promise.all([loadChampionship(), api.get('teams', token).then((data) => setMyTeams(data.data))])
      .catch(setError)
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token])

  function toggleTeam(teamId) {
    setSelectedIds((prev) => {
      if (prev.includes(teamId)) return prev.filter((t) => t !== teamId)
      if (prev.length >= MAX_TEAMS) return prev
      return [...prev, teamId]
    })
  }

  async function runAction(action) {
    setError(null)
    setBusy(true)
    try {
      await action()
      await loadChampionship()
    } catch (err) {
      setError(err)
    } finally {
      setBusy(false)
    }
  }

  function handleRegisterTeams() {
    runAction(() => api.post(`championships/${id}/teams`, { team_ids: selectedIds }, token))
  }

  function handleStart() {
    runAction(() => api.post(`championships/${id}/start`, {}, token))
  }

  function handleSimulatePhase() {
    runAction(() => api.post(`championships/${id}/phases/simulate`, {}, token))
  }

  function handleSimulateAll() {
    runAction(() => api.post(`championships/${id}/simulate`, {}, token))
  }

  if (loading) return <p className="page-loading">Carregando...</p>
  if (!championship) return <ErrorBanner error={error} />

  const isDraft = championship.status === 'draft'
  const isFinished = championship.status === 'finished'
  const gamesByPhase = PHASE_ORDER.map((phase) => ({
    phase,
    games: championship.games.filter((g) => g.phase === phase),
  }))

  return (
    <div>
      <h1>{championship.name}</h1>
      <p className="subtitle">
        Status: {championship.status} · Desempate: {championship.tiebreaker_mode}
      </p>

      <ErrorBanner error={error} />

      {isDraft && (
        <section className="registration">
          <h2>Inscrever times (máx. {MAX_TEAMS})</h2>
          <div className="team-checkboxes">
            {myTeams.map((team) => (
              <label key={team.id} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(team.id)}
                  onChange={() => toggleTeam(team.id)}
                  disabled={!selectedIds.includes(team.id) && selectedIds.length >= MAX_TEAMS}
                />
                {team.name}
              </label>
            ))}
          </div>
          <div className="actions">
            <button disabled={busy || selectedIds.length === 0} onClick={handleRegisterTeams}>
              Inscrever selecionados
            </button>
            <button disabled={busy} onClick={handleStart}>
              Iniciar campeonato
            </button>
          </div>

          {championship.teams.length > 0 && (
            <>
              <h3>Times inscritos</h3>
              <ul className="list">
                {championship.teams.map((team) => (
                  <li key={team.id}>{team.name}</li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}

      {!isDraft && !isFinished && (
        <section className="actions">
          <button disabled={busy} onClick={handleSimulatePhase}>
            Simular fase
          </button>
          <button disabled={busy} onClick={handleSimulateAll}>
            Simular tudo
          </button>
        </section>
      )}

      {gamesByPhase.map(({ phase, games }) => (
        <PhaseSection key={phase} phase={phase} games={games} />
      ))}

      {championship.standings.length > 0 && (
        <section>
          <h2>Classificação</h2>
          <StandingsTable standings={championship.standings} />
        </section>
      )}

      {isFinished && championship.classification && (
        <section>
          <h2>Pódio</h2>
          <Podium classification={championship.classification} />
        </section>
      )}
    </div>
  )
}

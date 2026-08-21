import { useEffect, useState } from 'react'
import { api } from '../api'
import { useAuth } from '../AuthContext'
import ErrorBanner from '../components/ErrorBanner'

export default function RankingsPage() {
  const { token } = useAuth()
  const [rankings, setRankings] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('rankings', token)
      .then((data) => setRankings(data.data))
      .catch(setError)
      .finally(() => setLoading(false))
  }, [token])

  return (
    <div>
      <h1>Ranking</h1>

      <ErrorBanner error={error} />

      {loading ? (
        <p>Carregando...</p>
      ) : rankings.length === 0 ? (
        <p className="empty-state">Nenhum campeonato finalizado ainda — o ranking aparece aqui depois do primeiro título.</p>
      ) : (
        <div className="table-wrap">
          <table className="rankings-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Campeonatos</th>
                <th>Títulos</th>
                <th>Vices</th>
                <th>3º lugares</th>
                <th>Gols pró</th>
                <th>Gols contra</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((row) => (
                <tr key={row.team.id}>
                  <td>{row.team.name}</td>
                  <td>{row.championships_played}</td>
                  <td>{row.titles}</td>
                  <td>{row.runner_ups}</td>
                  <td>{row.third_places}</td>
                  <td>{row.goals_for}</td>
                  <td>{row.goals_against}</td>
                  <td>{row.goal_difference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

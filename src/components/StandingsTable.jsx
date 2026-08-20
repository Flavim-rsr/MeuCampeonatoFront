export default function StandingsTable({ standings }) {
  if (!standings || standings.length === 0) return null

  // Already ranked by the API, but sort defensively by points just in case.
  const sorted = [...standings].sort((a, b) => b.points - a.points)

  return (
    <table className="standings-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Time</th>
          <th>Pontos</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((row, i) => (
          <tr key={row.team_id}>
            <td>{i + 1}</td>
            <td>{row.name}</td>
            <td>{row.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

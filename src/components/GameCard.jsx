// decided_by tells us how the winner was determined; color-code it per the spec.
const DECIDED_BY_LABEL = {
  score: 'placar',
  points: 'pontos',
  penalties: 'pênaltis',
  registration_order: 'ordem de inscrição',
}

export default function GameCard({ game }) {
  const hasPenalties = game.penalty_home != null && game.penalty_away != null
  const homeWon = game.winner_team_id === game.home_team.id
  const awayWon = game.winner_team_id === game.away_team.id

  return (
    <div className="game-card">
      <div className="game-teams">
        <span className={`team ${homeWon ? 'winner' : ''}`}>{game.home_team.name}</span>
        <span className="score">
          {game.home_score ?? '-'} x {game.away_score ?? '-'}
        </span>
        <span className={`team ${awayWon ? 'winner' : ''}`}>{game.away_team.name}</span>
      </div>

      {hasPenalties && (
        <div className="penalties">
          pênaltis: {game.penalty_home} x {game.penalty_away}
        </div>
      )}

      {game.decided_by && (
        <span className={`badge badge-${game.decided_by}`}>
          {DECIDED_BY_LABEL[game.decided_by] || game.decided_by}
        </span>
      )}
    </div>
  )
}

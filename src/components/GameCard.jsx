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
        <span className={`team team-home ${homeWon ? 'winner' : ''}`}>{game.home_team.name}</span>

        <div className="scoreboard">
          <span className="score-value">{game.home_score ?? '-'}</span>
          <span className="score-sep">x</span>
          <span className="score-value">{game.away_score ?? '-'}</span>
          {hasPenalties && (
            <span className="score-penalties">
              ({game.penalty_home}-{game.penalty_away} pên.)
            </span>
          )}
        </div>

        <span className={`team team-away ${awayWon ? 'winner' : ''}`}>{game.away_team.name}</span>
      </div>

      {game.decided_by && (
        <span className={`badge badge-${game.decided_by}`}>
          {DECIDED_BY_LABEL[game.decided_by] || game.decided_by}
        </span>
      )}
    </div>
  )
}

import GameCard from './GameCard'

const PHASE_LABEL = {
  quarter_finals: 'Quartas de final',
  semi_finals: 'Semifinais',
  third_place: 'Disputa de 3º lugar',
  final: 'Final',
}

export default function PhaseSection({ phase, games }) {
  if (games.length === 0) return null

  // Games within a phase are ordered by their bracket position.
  const sorted = [...games].sort((a, b) => a.position - b.position)

  return (
    <section className="phase-section">
      <h3 className="phase-title">{PHASE_LABEL[phase] || phase}</h3>
      <div className="game-list">
        {sorted.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  )
}

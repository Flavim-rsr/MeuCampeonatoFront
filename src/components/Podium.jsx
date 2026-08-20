const PLACES = [
  { key: 'first', label: '1º lugar' },
  { key: 'second', label: '2º lugar' },
  { key: 'third', label: '3º lugar' },
  { key: 'fourth', label: '4º lugar' },
]

export default function Podium({ classification }) {
  if (!classification) return null

  return (
    <div className="podium">
      {PLACES.map(({ key, label }) => (
        <div key={key} className={`podium-place podium-${key}`}>
          <span className="podium-label">{label}</span>
          <span className="podium-team">{classification[key]?.name ?? '-'}</span>
        </div>
      ))}
    </div>
  )
}

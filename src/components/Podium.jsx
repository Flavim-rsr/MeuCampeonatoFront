const PLACES = [
  { key: 'first', label: '1º lugar' },
  { key: 'second', label: '2º lugar' },
  { key: 'third', label: '3º lugar' },
  { key: 'fourth', label: '4º lugar' },
]

export default function Podium({ classification }) {
  if (!classification) return null

  // Pedestals are displayed in stadium order (2nd - 1st - 3rd); 4th place has
  // no physical pedestal and is listed separately below.
  const pedestalPlaces = PLACES.filter((p) => p.key !== 'fourth')
  const fourthPlace = PLACES.find((p) => p.key === 'fourth')

  return (
    <div className="podium">
      <div className="podium-pedestals">
        {pedestalPlaces.map(({ key, label }) => (
          <div key={key} className={`podium-place podium-${key}`}>
            {key === 'first' && <span className="podium-crown" aria-hidden="true">👑</span>}
            <span className="podium-team">{classification[key]?.name ?? '-'}</span>
            <span className="podium-block">
              <span className="podium-label">{label}</span>
            </span>
          </div>
        ))}
      </div>
      {fourthPlace && (
        <div className="podium-fourth">
          <span className="podium-label">{fourthPlace.label}</span>
          <span className="podium-team">{classification[fourthPlace.key]?.name ?? '-'}</span>
        </div>
      )}
    </div>
  )
}

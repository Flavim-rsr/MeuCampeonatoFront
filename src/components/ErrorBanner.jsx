// Shows an API error: the top-level message plus any field validation errors (422).
export default function ErrorBanner({ error }) {
  if (!error) return null

  const fieldErrors = error.errors ? Object.values(error.errors).flat() : []

  return (
    <div className="error-banner">
      <strong>{error.message}</strong>
      {fieldErrors.length > 0 && (
        <ul>
          {fieldErrors.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

// Small fetch wrapper around the Laravel API.
// Injects the JWT token, parses JSON, and throws a structured error
// so pages can show { status, message, errors } easily.

const BASE_URL = 'http://localhost:8000/api/v1'

// Called by AuthContext when a 401 comes back, so we can log the user out.
let onUnauthorized = () => {}
export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler
}

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}/${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  // 204 No Content or empty body: nothing to parse.
  const text = await res.text()
  const data = text ? JSON.parse(text) : null

  if (!res.ok) {
    if (res.status === 401) onUnauthorized()
    const error = {
      status: res.status,
      message: data?.message || 'Request failed',
      errors: data?.errors,
    }
    throw error
  }

  return data
}

export const api = {
  get: (path, token) => request(path, { method: 'GET', token }),
  post: (path, body, token) => request(path, { method: 'POST', body, token }),
}

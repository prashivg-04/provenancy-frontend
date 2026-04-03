import toast from 'react-hot-toast'

/**
 * Central error handler for all API errors.
 * Shows a toast notification and returns the error detail.
 *
 * @param {object} error - Axios error object
 * @returns {string|array} Error detail string, or errors array for 422
 */
export function handleError(error) {
  if (!error.response) {
    // Network error / server unreachable
    toast.error('Unable to reach server. Check your connection.')
    return 'Network error'
  }

  const { status, data } = error.response

  if (status === 422) {
    // Validation errors — show the first field error as toast
    const firstError = data?.errors?.[0]
    const msg = firstError
      ? `${firstError.field}: ${firstError.message}`
      : 'Validation error'
    toast.error(msg)
    // Return full errors array for optional per-field display
    return data?.errors ?? []
  }

  if (status === 401) {
    // Clear token on any 401
    localStorage.removeItem('provenancy_token')
    
    // For login failures, backend says "Incorrect email or password"
    // For expired tokens, backend says "Could not validate credentials"
    const isLoginFailure = data?.detail?.toLowerCase().includes('email') || data?.detail?.toLowerCase().includes('password')
    const msg = isLoginFailure ? 'Invalid email or password.' : 'Session expired. Please log in again.'
    
    toast.error(data?.detail ?? msg)
    return data?.detail ?? 'Unauthorized'
  }

  if (status === 403) {
    toast.error(data?.detail ?? 'Access denied.')
    return data?.detail ?? 'Forbidden'
  }

  if (status === 400) {
    toast.error(data?.detail ?? 'Request failed.')
    return data?.detail ?? 'Bad request'
  }

  if (status === 404) {
    toast.error('Resource not found. Contact support.')
    return data?.detail ?? 'Not found'
  }

  // 500 or anything else
  toast.error('Something went wrong. Please try again.')
  return 'Internal server error'
}

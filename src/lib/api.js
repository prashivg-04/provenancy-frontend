import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
})

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('provenancy_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Global 401 handler — clear token and redirect to login on session expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      localStorage.removeItem('provenancy_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ─── Engagements ─────────────────────────────────────────────────────────────

/**
 * POST /engagements — Create a new draft engagement
 * @param {{ organization_name, role, start_date, end_date?, summary?, highlights?, links?, supervisor_ref?, skills? }} data
 */
export const createEngagement = (data) => api.post('/engagements', data)

/**
 * GET /engagements — List engagements for the current user (role-aware)
 * @param {string} [status] — Optional filter: all | draft | pending | verified | rejected | edit_requested
 */
export const getEngagements = (status) =>
  api.get('/engagements', { params: status ? { status } : undefined })

/**
 * GET /engagements/:id — Get full details of a single engagement
 * @param {string} id - Engagement UUID
 */
export const getEngagement = (id) => api.get(`/engagements/${id}`)

/**
 * PUT /engagements/:id — Update a draft or edit_requested engagement
 * @param {string} id - Engagement UUID
 * @param {object} data - Partial update payload
 */
export const updateEngagement = (id, data) => api.put(`/engagements/${id}`, data)

/**
 * DELETE /engagements/:id — Permanently delete a non-verified engagement
 * @param {string} id - Engagement UUID
 */
export const deleteEngagement = (id) => api.delete(`/engagements/${id}`)

/**
 * POST /engagements/:id/submit — Submit a draft engagement for supervisor verification
 * @param {string} id - Engagement UUID
 */
export const submitEngagement = (id) => api.post(`/engagements/${id}/submit`)


export const searchSkills = (query) =>
  api.get(`/skills/search?q=${encodeURIComponent(query)}`)

/** GET /skills → { declared: [], verified: [] } */
export const getUserSkills = () => api.get('/skills')

/** POST /skills → Add multiple declared skills */
export const addDeclaredSkills = (skills) => api.post('/skills', { skills })

/** DELETE /skills/{skillId} → Remove a declared skill */
export const deleteDeclaredSkill = (skillId) => api.delete(`/skills/${skillId}`)

// ─── Student ─────────────────────────────────────────────────────────────────

/** GET /student/me → { message, profile, profile_complete, ledger_id } */
export const getStudentMe = () => api.get('/student/me')

/**
 * PUT /student/me
 * @param {{ full_name?, title?, bio?, linkedin_url?, institution? }} data
 */
export const updateStudentMe = (data) => api.put('/student/me', data)

/**
 * GET /student/{studentId}/public — no auth required
 * @param {string} studentId - Profile UUID (StudentProfile.id)
 */
export const getStudentPublic = (studentId) =>
  api.get(`/student/${studentId}/public`)

// ─── Supervisor ───────────────────────────────────────────────────────────────

/** GET /supervisor/me → { message, profile, profile_complete, ledger_id } */
export const getSupervisorMe = () => api.get('/supervisor/me')

/**
 * PUT /supervisor/me
 * @param {{ full_name?, designation?, organization?, bio?, linkedin_url? }} data
 */
export const updateSupervisorMe = (data) => api.put('/supervisor/me', data)

/**
 * GET /supervisor/{supervisorId}/public — no auth required
 * @param {string} supervisorId - Profile UUID (SupervisorProfile.id)
 */
export const getSupervisorPublic = (supervisorId) =>
  api.get(`/supervisor/${supervisorId}/public`)

// ─── Supervisor Engagements ───────────────────────────────────────────────────

/**
 * GET /engagements/supervisor/engagements/requests
 * List all engagements assigned to the logged-in supervisor.
 * @param {string} [status] — Optional: all | pending | verified | rejected | edit_requested
 */
export const getSupervisorEngagements = (status) =>
  api.get('/engagements/supervisor/engagements/requests', {
    params: status && status !== 'all' ? { status } : undefined,
  })

/**
 * POST /engagements/:id/approve — Approve a pending engagement (no body)
 * @param {string} id - Engagement UUID
 */
export const approveEngagement = (id) => api.post(`/engagements/${id}/approve`)

/**
 * POST /engagements/:id/reject — Reject a pending engagement
 * @param {string} id - Engagement UUID
 * @param {string} reason - Required human-readable rejection reason
 */
export const rejectEngagement = (id, reason) =>
  api.post(`/engagements/${id}/reject`, { reason })

/**
 * POST /engagements/:id/request-edit — Request student to make changes
 * @param {string} id - Engagement UUID
 * @param {string} reason - Required explanation of what needs to change
 */
export const requestEditEngagement = (id, reason) =>
  api.post(`/engagements/${id}/request-edit`, { reason })

export default api

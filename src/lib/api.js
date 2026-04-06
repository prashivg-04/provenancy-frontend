import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
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

/** GET /skills/search → array of objects { id, name } */
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

export default api

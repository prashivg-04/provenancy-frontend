import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getSupervisorMe, getSupervisorEngagements, getStudentPublic } from '../lib/api'

// ──────────────────────────────────────────────────────────
// Global Data Hooks — Cached & Shared Across Supervisor Pages
// ──────────────────────────────────────────────────────────

/**
 * Get supervisor profile — cached globally for 5 minutes.
 * Dashboard, Requests, Profile all share this single cache entry.
 */
export function useSupervisorProfile() {
  return useQuery({
    queryKey: ['supervisor', 'profile'],
    queryFn: async () => {
      const res = await getSupervisorMe()
      return res.data
    },
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Get ALL supervisor engagements — cached globally.
 * This is the master data source. Dashboard and Requests both
 * derive their view from this single cached list.
 * Filter by tab locally — never hits the server for tab switches.
 */
export function useSupervisorEngagements() {
  return useQuery({
    queryKey: ['supervisor', 'engagements'],
    queryFn: async () => {
      const res = await getSupervisorEngagements('all')
      return res.data || []
    },
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Get a single student's public profile — cached by student ID.
 * Used to resolve student names on engagement cards.
 * Each student is fetched once and cached permanently for the session.
 * @param {string|null} studentProfileId
 */
export function useStudentPublic(studentProfileId) {
  return useQuery({
    queryKey: ['student', 'public', studentProfileId],
    queryFn: async () => {
      const res = await getStudentPublic(studentProfileId)
      return res.data
    },
    staleTime: Infinity, // Student public profile rarely changes — never re-fetch
    enabled: Boolean(studentProfileId),
  })
}

/**
 * Hook: Returns a function to invalidate the supervisor engagements cache.
 * Call this after approve/reject/edit-request so the Dashboard and Requests
 * pages reflect the new status immediately.
 */
export function useInvalidateSupervisorEngagements() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: ['supervisor', 'engagements'] })
}

/**
 * Hook: Returns a function to invalidate the supervisor profile cache.
 * Call this after saving profile changes.
 */
export function useInvalidateSupervisorProfile() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: ['supervisor', 'profile'] })
}

/**
 * Utility: Prefetch supervisor engagements using an existing queryClient.
 * Call from Sidebar onMouseEnter to pre-load data before navigation.
 * @param {import('@tanstack/react-query').QueryClient} queryClient
 */
export function prefetchSupervisorEngagementsUtil(queryClient) {
  queryClient.prefetchQuery({
    queryKey: ['supervisor', 'engagements'],
    queryFn: async () => {
      const res = await getSupervisorEngagements('all')
      return res.data || []
    },
  })
}

/**
 * Utility: Prefetch supervisor profile using an existing queryClient.
 * @param {import('@tanstack/react-query').QueryClient} queryClient
 */
export function prefetchSupervisorProfileUtil(queryClient) {
  queryClient.prefetchQuery({
    queryKey: ['supervisor', 'profile'],
    queryFn: async () => {
      const res = await getSupervisorMe()
      return res.data
    },
  })
}

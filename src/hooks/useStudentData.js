import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getStudentMe, getUserSkills, getEngagements } from '../lib/api'

// ──────────────────────────────────────────────────────────
// Global Data Hooks - Cached & Shared Across Components
// ──────────────────────────────────────────────────────────

/**
 * Get student profile - uses AuthContext cache when available
 * Falls back to API call if not in context
 */
export function useStudentProfile() {
  return useQuery({
    queryKey: ['student', 'profile'],
    queryFn: async () => {
      const res = await getStudentMe()
      return res.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Get user skills - cached globally
 */
export function useUserSkills() {
  return useQuery({
    queryKey: ['student', 'skills'],
    queryFn: async () => {
      const res = await getUserSkills()
      return res.data
    },
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Get engagements - cached globally
 * This is the key optimization: fetch ONCE, filter locally
 */
export function useEngagements() {
  return useQuery({
    queryKey: ['student', 'engagements'],
    queryFn: async () => {
      const res = await getEngagements()
      return res.data || []
    },
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Hook: Returns a function to invalidate engagements cache
 * (e.g., after creating/updating an engagement)
 */
export function useInvalidateEngagements() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: ['student', 'engagements'] })
}

/**
 * Utility: Prefetch engagements using an existing queryClient instance.
 * Call this from event handlers (e.g., onMouseEnter in Sidebar).
 * @param {import('@tanstack/react-query').QueryClient} queryClient
 */
export function prefetchEngagementsUtil(queryClient) {
  queryClient.prefetchQuery({
    queryKey: ['student', 'engagements'],
    queryFn: async () => {
      const res = await getEngagements()
      return res.data || []
    },
  })
}

/**
 * Utility: Prefetch skills using an existing queryClient instance.
 * @param {import('@tanstack/react-query').QueryClient} queryClient
 */
export function prefetchSkillsUtil(queryClient) {
  queryClient.prefetchQuery({
    queryKey: ['student', 'skills'],
    queryFn: async () => {
      const res = await getUserSkills()
      return res.data
    },
  })
}
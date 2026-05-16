# Changelog

All notable changes to the Provenancy frontend are documented here.

---

## [1.1.0] — May 2026

### Performance — React Query Migration
- Installed `@tanstack/react-query` v5 and wrapped app in `QueryClientProvider`
- Created `src/hooks/useStudentData.js` — centralized student portal hooks:
  - `useStudentProfile()` — cached 5 minutes
  - `useUserSkills()` — cached 5 minutes
  - `useEngagements()` — cached 5 minutes
  - `useInvalidateEngagements()` — cache busting after mutations
  - Sidebar hover prefetch utilities for engagements and skills routes
- Created `src/hooks/useSupervisorData.js` — centralized supervisor portal hooks:
  - `useSupervisorProfile()` — cached 5 minutes
  - `useSupervisorEngagements()` — cached 5 minutes
  - `useStudentPublic()` — cached permanently (immutable within session)
  - `useInvalidateSupervisorEngagements()` and `useInvalidateSupervisorProfile()`
  - Sidebar hover prefetch utilities for supervisor routes

### Performance — Student Portal
- `StudentDashboard` — replaced `useEffect` with React Query hooks, `useMemo` for derived skill counts
- `StudentEngagements` — single fetch, all tab filtering and search done locally via `useMemo` — zero API calls on tab switch or search
- `Profile` — React Query hooks, cache invalidation on save, dashboard stays in sync
- `EngagementCreate` — cache invalidated after draft save and submit — list reflects new engagement immediately
- `EngagementEdit` — cache invalidated after save and resubmit — list reflects changes immediately
- `Sidebar` — hover prefetch warms engagements and skills cache before user clicks

### Performance — Supervisor Portal (Full Rewrite)
- `SupervisorDashboard` — dropped manual JS cache and broken retry logic, rebuilt with React Query — cold load reduced from ~17 API calls to 2
- `SupervisorRequests` — dropped N+1 cascade and manual cache, rebuilt with shared hook — zero API calls if Dashboard visited first
- `SupervisorProfile` — migrated to React Query, zero API call if Dashboard visited first, cache invalidation on save
- `EngagementDetail` — cache invalidated after approve, reject, request-edit — supervisor dashboard counts update instantly on return
- `Sidebar` — hover prefetch for supervisor dashboard and requests routes

### Performance — Results
| Scenario | Before | After |
|---|---|---|
| Supervisor dashboard cold load | ~17 API calls | 2 API calls |
| Full supervisor session (dashboard + requests) | ~28 API calls | 2 API calls |
| Tab switch in engagements/requests | 1 API call | 0 API calls |
| Navigate away and return | 1 API call | 0 API calls |
| Hover sidebar link | Nothing | Data prefetched |

### Theme
- Added light/dark mode toggle
- Created `ThemeContext.jsx` — defaults to dark, persists preference in localStorage
- Added `.light` CSS variable overrides in `index.css` — dark theme code untouched
- Toggle button added to Navbar (Sun/Moon icon via lucide-react)
- Dark theme remains default

### Error Handling
- Fixed broken retry buttons across supervisor portal — replaced `useRef` counter pattern with React Query `refetch()`
- Per-section error states in supervisor dashboard — one section failing no longer blanks out the page
- Global 401 interceptor added to `api.js` — auto-logout and redirect to `/login` on session expiry, skips redirect if already on `/login`
- `ErrorBoundary.jsx` added — catches runtime crashes, shows fallback UI with Try Again and Go Home buttons
- `NotFound.jsx` added — 404 catch-all route for unmatched URLs
- Consistent `handleError` usage across `EngagementCreate`, `EngagementEdit`, `EngagementDetail`, `StudentEngagements`

---

## [1.0.0] — April 2026

First complete release of the Provenancy frontend. Built from scratch over the course of the project.

### Infrastructure
- React 19 with Vite as the build tool
- React Router v6 for client-side routing
- Tailwind CSS v4 for styling
- shadcn/ui as the component library
- Axios for all API communication with centralized instance in `src/lib/api.js`
- JWT auth token stored in localStorage, attached to every request via Axios interceptor
- Deployed on Vercel

### Authentication
- Login page with email, password and role selection (student / supervisor)
- Signup page with full name, email, password and role selection
- Role-based route protection via `ProtectedRoute` wrapper
- Auto-redirect based on role after login (`/student/dashboard` or `/supervisor/dashboard`)
- Auto-logout on 401 response via global Axios response interceptor
- Auth state managed via `AuthContext`

### Student Pages
- **Home** — public landing page
- **Student Dashboard** — verified/pending engagement counts, recent engagement timeline, top skills panel
- **Student Engagements** — full engagement list with status filters (all, draft, pending, verified, rejected, edit_requested), search, pagination
- **Engagement Create** — multi-step form with organization, role, dates, summary, highlights, skill tagging with autocomplete search, supervisor assignment, supporting links
- **Engagement Detail** — full engagement view with scope, highlights, skills, supervisor block, location data
- **Student Skills** — verified skills with endorsement counts, declared skills management, skill search and add
- **Student Profile** — edit name, title, bio, linkedin, institution. Shows ledger ID
- **Public Student Profile** — public view with verified engagement chain, skills matrix, trust score, linked institution

### Supervisor Pages
- **Supervisor Dashboard** — pending request count, approved/rejected stats, immediate queue preview, activity feed
- **Supervisor Requests** — full verification queue with status tabs (pending, accepted, rejected), search, trust score display
- **Engagement Detail (Supervisor view)** — same detail page with approve, reject, request-edit actions and confirmation flow
- **Supervisor Profile** — edit name, designation, organization, bio, linkedin, verification domains
- **Public Supervisor Profile** — public view of supervisor identity and credentials

### Error Handling
- Central `handleError.js` utility covering 400, 401, 403, 404, 422, 500 and network errors
- Consistent usage across all pages via `handleError(error)` in catch blocks
- UI validation toasts kept as direct `toast.error()` — intentionally separate from API errors

### Other
- `vercel.json` configured for React Router — prevents 404 on page refresh
- `encodeURIComponent` on skill search queries — handles special characters like C++, C#
- Skill autocomplete search connected to backend `/skills/search` endpoint
- CORS handled via `VITE_API_URL` environment variable — no hardcoded localhost in production

---

## What's Next (Planned)

- Refresh token support for silent session renewal
- Email notifications UI (when backend adds email support)
- Mobile responsive improvements
- PDF export of public verification profile
- Recruiter-facing search dashboard
- Bundle code splitting — 839KB chunk, dynamic imports for heavy pages
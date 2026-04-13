# Changelog

All notable changes to the Provenancy frontend are documented here.

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
- Global 401 interceptor for session expiry auto-logout
- React Error Boundary wrapping entire app — catches runtime crashes with fallback UI
- 404 Not Found page for unmatched routes

### Other
- `vercel.json` configured for React Router — prevents 404 on page refresh
- `encodeURIComponent` on skill search queries — handles special characters like C++, C#
- Skill autocomplete search connected to backend `/skills/search` endpoint
- CORS handled via `VITE_API_URL` environment variable — no hardcoded localhost in production

---

## What's Next (Planned)

- Refresh token support for silent session renewal
- Email notifications UI (when backend adds email support)
- Pagination on engagement and skills lists
- Mobile responsive improvements
- Dark/light mode toggle
- PDF export of public verification profile
- Recruiter-facing search dashboard
# Provenancy — Frontend

Provenancy is a work verification platform where students log internship and freelance engagements, and supervisors verify them. This is the React frontend repo — it communicates with the FastAPI backend via Axios and handles role-based routing for both students and supervisors.

---

**Live App:** https://provenancy-frontend.vercel.app  
**Backend Repo:** https://github.com/sumeet-pi/provenancy-backend  
**API Docs:** https://provenancy-backend-1.onrender.com/docs

---

## Tech Stack

| Concern          | Technology                        |
| ---------------- | --------------------------------- |
| Framework        | React 19                          |
| Build Tool       | Vite                              |
| Routing          | React Router v6                   |
| HTTP             | Axios (centralized instance)      |
| Data Fetching    | TanStack React Query v5           |
| Styling          | Tailwind CSS v4                   |
| Components       | shadcn/ui                         |
| Notifications    | react-hot-toast                   |
| Form Validation  | react-hook-form + Zod             |
| Auth             | JWT in `localStorage`             |
| Deployment       | Vercel                            |

---

## Project Structure

```
provenancy_frontend/
├── src/
│   ├── components/
│   │   ├── profile/             # Public profile sub-components
│   │   ├── workspace/           # Shared dashboard UI primitives
│   │   ├── ErrorBoundary.jsx    # Runtime crash fallback wrapper
│   │   ├── Layout.jsx           # Public page shell
│   │   ├── AuthLayout.jsx       # Auth page shell
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Logo.jsx
│   │   └── Footer.jsx
│   ├── context/
│   │   ├── AuthContext.jsx      # Global auth state, login/logout, /me fetch
│   │   └── ThemeContext.jsx     # Light/dark mode toggle, persisted in localStorage
│   ├── hooks/
│   │   ├── useStudentData.js    # React Query hooks for student portal
│   │   └── useSupervisorData.js # React Query hooks for supervisor portal
│   ├── lib/
│   │   ├── api.js               # Centralized Axios instance + interceptors
│   │   └── handleError.js       # Central API error handler (toast + return)
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── StudentEngagements.jsx
│   │   ├── EngagementCreate.jsx
│   │   ├── EngagementDetail.jsx
│   │   ├── EngagementEdit.jsx
│   │   ├── StudentSkills.jsx
│   │   ├── Profile.jsx
│   │   ├── SupervisorDashboard.jsx
│   │   ├── SupervisorRequests.jsx
│   │   ├── SupervisorProfile.jsx
│   │   ├── PublicStudentProfile.jsx
│   │   ├── PublicSupervisorProfile.jsx
│   │   ├── PublicEngagementView.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx                  # Routes and ProtectedRoute wrappers
│   └── main.jsx                 # Entry point — QueryClientProvider + ErrorBoundary
├── vercel.json                  # SPA rewrite rule for Vercel
├── README.md
├── CHANGELOG.md
├── .env
└── .gitignore
```

---

## Prerequisites

- Node.js 18+
- npm
- Provenancy backend running locally or pointing to a deployed URL

---

## Environment Setup

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8000
```

> In production on Vercel, set `VITE_API_URL` to your deployed backend URL (e.g. `https://provenancy-api.onrender.com`).

---

## Installation & Running Locally

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173` (or whichever port Vite assigns).

---

## Building for Production

```bash
npm run build
```

Output goes to `dist/`. To preview the production build locally:

```bash
npm run preview
```

---

## Auth

| Detail         | Value                                        |
| -------------- | -------------------------------------------- |
| Storage        | `localStorage` key: `provenancy_token`       |
| Header         | `Authorization: Bearer <token>` on all requests |
| Session expiry | Global Axios `401` interceptor auto-clears token and redirects to `/login` |

### Roles

| Role         | Accessible Routes                                        |
| ------------ | -------------------------------------------------------- |
| `student`    | Dashboard, Engagements, Skills, Profile                  |
| `supervisor` | Dashboard, Engagement Requests, Profile                  |

---

## Pages Overview

| Page                     | Description                                                    |
| ------------------------ | -------------------------------------------------------------- |
| `Home`                   | Public landing page                                            |
| `Login`                  | Email + password login with role-aware redirect                |
| `Signup`                 | Account creation for students and supervisors                  |
| `StudentDashboard`       | Engagement stats, recent activity, top skills                  |
| `StudentEngagements`     | Engagement list with status filters, search, and pagination    |
| `EngagementCreate`       | Multi-step form to log a new engagement                        |
| `EngagementEdit`         | Edit a draft or edit-requested engagement                      |
| `EngagementDetail`       | Full engagement view; supervisor approval/rejection actions    |
| `StudentSkills`          | View verified and declared skills, add/remove declared skills  |
| `Profile`                | Edit student profile details                                   |
| `SupervisorDashboard`    | Pending queue count, approval stats, activity feed             |
| `SupervisorRequests`     | Full verification queue with status tabs and search            |
| `SupervisorProfile`      | Edit supervisor profile details                                |
| `PublicStudentProfile`   | Public-facing student portfolio with verified engagements      |
| `PublicSupervisorProfile`| Public-facing supervisor identity and verified records         |
| `PublicEngagementView`   | Shareable public view of a single verified engagement          |
| `NotFound`               | 404 catch-all for unmatched routes                             |

---

## Deployment

This project is deployed on **[Vercel](https://vercel.com/)**.

### `vercel.json`

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

This tells Vercel to route all paths to `index.html`, which is required for client-side routing with React Router. Without it, a direct page visit or refresh on any non-root URL returns a 404 from Vercel.

### Vercel Environment Variables

Set the following in your Vercel project settings under **Settings → Environment Variables**:

| Variable       | Value                                   |
| -------------- | --------------------------------------- |
| `VITE_API_URL` | `https://your-backend.onrender.com`     |

The backend is deployed separately on **[Render](https://render.com/)** — see the backend repo for its setup.

---

## Team

| Name            | Role       |
| --------------- | ---------- |
| Prashiv Goyal   | Frontend   |
| Aman Verma      | Database   |
| Sumeet Rawat    | Backend    |
# linwis-project-hub

`linwis-project-hub` is a B2B SaaS dashboard for managing business workflows, project data, users, and operational insights in one focused interface.

Built with Nuxt 4 and Vue 3, the project follows a feature-based architecture with typed data layers, route middleware, and a consistent dark-mode design system.

## Deploy

https://linwis-project-hub.vercel.app/

## Design

https://www.figma.com/design/B64dEf5cYnlw4TQZYCjF12/Untitled?node-id=6-7109&p=f&t=DxGghmTR1C95as6s-0

## Tech Stack

- Nuxt 4
- Vue 3 + TypeScript
- Tailwind CSS
- Pinia
- FontAwesome (via `@vesp/nuxt-fontawesome`)
- VueUse

## Getting Started

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Current State

Authentication shell and workspace dashboard are implemented as static UI with mock data.

**Auth (`/`)**
- Login and Register forms with validation checkboxes
- Social login buttons (Google, Apple)
- Guest middleware — redirects authenticated users away from `/`

**Workspace (`/app/*`)**
- Collapsible sidebar with navigation to Dashboard, Projects, Tasks, Team, Settings
- Top bar with search, notifications, share, new task, and user menu with dropdown

**Dashboard (`/app/dashboard`)**

Four tabs, each fully rendered:

| Tab | Content |
|---|---|
| Overview | Metric grid (5 KPIs with ring/sparkline charts), Kanban board, mini timeline, recent activity, project progress bars, task breakdown donut |
| Timeline | Activity log grouped by date with timeline connector, search and category filters |
| Table | Summary cards, searchable/filterable data table with pagination |
| Insights | Health score cards, project health bars, risks & alerts, team workload, suggested actions |

Other pages exist as empty shells: Projects, Tasks, Team, Settings, and project detail sub-pages (Files, Tasks, Team).

## Project Structure

```
app/
├── features/
│   ├── auth/
│   │   ├── auth.store.ts
│   │   └── components/        # AuthLayout, LoginForm, RegisterForm
│   ├── dashboard/
│   │   ├── DashboardHeader.vue
│   │   ├── dashboard.data.ts
│   │   ├── dashboard.helpers.ts
│   │   ├── dashboard.icons.ts
│   │   ├── components/        # MetricGrid, KanbanBoard, panels (Overview tab)
│   │   └── views/             # TimelineView, TableView, InsightsView (tab views)
│   └── workspace/             # Sidebar, Topbar, Header, UserMenu
├── layouts/
│   ├── default.vue
│   └── WorkspaceLayout.vue
├── middleware/
│   ├── auth.ts                # Redirects unauthenticated users to /
│   └── guest.ts               # Redirects authenticated users to /app/dashboard
├── pages/
│   ├── index.vue              # Redirects to /auth
│   ├── Auth.vue               # Login / Register
│   └── app/
│       ├── Dashboard.vue
│       ├── Projects/
│       ├── Tasks.vue
│       ├── Team.vue
│       └── Settings.vue
├── stores/
│   └── user.ts
├── plugins/
│   └── auth.client.ts
└── assets/
    └── css/                   # Tailwind base + component classes (app-panel, app-toolbar-button, etc.)
```

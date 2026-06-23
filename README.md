# Junior Workspace Prototype

Junior Workspace is a React/Vite front-end prototype for a role-aware internal workspace. The current build includes three navigable experiences inside a shared sidebar shell: `Agent`, `The Hub`, and `Daily Brief`.

## Current layout

### Agent

- Multi-role chat workspace for `Deployment`, `Sales`, `CS`, `Product`, and `Engineering`
- Role-specific suggested prompts with a simulated response flow
- Typed questions return the standard answer format without source citations

### The Hub

- Curated knowledge page for playbooks, learnings, and references
- Clickable filters for `For You`, `Deployment`, `Sales`, `CS`, `Product`, and `Engineering`
- Cross-functional `For You` view designed from a deployment and GTM perspective

### Daily Brief

- Curated briefing page for high-signal updates across Junior
- Card-based summaries for product, field, engineering, and action-oriented signals
- Quick actions row for lightweight follow-up actions

### Sidebar

- Persistent dark navy workspace sidebar
- Active-state highlighting for `Agent`, `The Hub`, and `Daily Brief`
- Integration list for `Slack`, `Linear`, `Notion`, and `GitHub`

## Tech stack

- `React 18`
- `TypeScript`
- `Vite`
- `Tailwind CSS`

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Deployment

This project is ready for static deployment platforms such as Vercel.

1. Push the project to GitHub
2. Import the repository into Vercel
3. Choose the `Vite` framework preset
4. Set the build command to `npm run build`
5. Set the output directory to `dist`
6. Deploy

## Notes

- The app is front-end only and uses hardcoded prototype data
- The current experience is designed for layout and interaction demos rather than production workflows
- Brand assets for integrations and legacy prototype branding are stored under `public/brand/`

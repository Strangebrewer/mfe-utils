# CLAUDE.md — mfe-utils

## What this is
A shared utility library for a micro-frontend (MFE) learning project. It started as JWT auth utilities and grew to include a basic React UI component library. Consumed directly from GitHub (no registry):

```json
"@bka-stuff/mfe-utils": "github:Strangebrewer/mfe-utils#main"
```

Not formally versioned — changes are picked up by dependents on next install.

## Two modules
- **`jwt-auth`** — axios-based auth client with proactive token refresh and Zustand stores
- **`react-ui`** — basic React components (buttons, form elements, modal)

Both are re-exported from a single entry point: `src/index.ts`.

## Build
```bash
pnpm build       # runs tsdown, outputs ESM + .d.mts to dist/
```

Bundler: [tsdown](https://tsdown.dev). Config in `tsdown.config.ts`. Output is ESM only. Node modules are not bundled (`skipNodeModulesBundle: true`). CSS is bundled separately as `dist/style.css`.

Consumers must import the stylesheet manually:
```ts
import "@bka-stuff/mfe-utils/style.css";
```

## No tests
There is no test setup. Don't add one unless asked.

## Conventions

### Exports
- All components and utilities use **default exports**.
- New components must be added to the relevant barrel file (`src/react-ui/index.ts` or `src/jwt-auth/index.ts`) to be part of the public API.
- `TextButton` and `TransparentButton` exist in `src/react-ui/buttons/` but are not currently exported — ask before adding them to the public API.

### Component structure
Each component lives in its own folder with two files:
```
ComponentName/
  index.tsx
  styles.css
```
Don't consolidate CSS or collapse components into single files.

### CSS
Plain CSS files, colocated with each component. No CSS modules, no Tailwind, no CSS-in-JS.

## JWT auth — how it works
`createAuthClient` returns an auth client that attaches a request interceptor to an axios instance (`axiosAuth`). Before every request, the interceptor checks if the access token is expired (via `jwt-decode`) and proactively exchanges it using the refresh token — no 401 retry loop. A single-flight guard prevents parallel refresh races.

- Tokens are stored in `localStorage` by default (configurable via `storage` option)
- Default storage keys: `access_token`, `refresh_token` (configurable via `keys` option)
- Refresh endpoint: `POST /token/exchange` — sends refresh token as `Authorization: Bearer <token>`
- Revoke endpoint: `POST /token/revoke` (used by consuming apps on logout)
- `axiosPublic` (no auth interceptor) is used for refresh calls to avoid circular interception

## Dependencies — ask first
**Always ask before adding a new dependency.** The library is intentionally lean. Existing runtime deps: `axios`, `jwt-decode`, `react-router-dom`, `zustand`. Peer deps: `react`, `react-dom`, `axios`.

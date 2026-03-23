# CLAUDE.md — mfe-utils

## What this is
A shared utility library for a micro-frontend (MFE) learning project. It started as JWT auth utilities and grew to include a basic React UI component library. Consumed directly from GitHub (no registry):

```json
"@bka-stuff/mfe-utils": "github:Strangebrewer/mfe-utils#main"
```

Not formally versioned — changes are picked up by dependents on next install.

## Three modules
- **`jwt-auth`** — axios-based auth client with proactive token refresh and Zustand stores
- **`react-ui`** — basic React components (buttons, form elements, modal)
- **`webpackConfigDefaults`** — shared webpack config factory for MFE repos

All three are re-exported from a single entry point: `src/index.ts`.

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

## webpackConfigDefaults — how it works
`createWebpackConfig(options)` returns a base webpack `Configuration` object with sensible MFE defaults (loaders, resolve aliases, devServer). Plugins (`HtmlWebpackPlugin`, `ModuleFederationPlugin`) are intentionally omitted — each MFE spreads the returned config and adds its own plugins.

`defaultShared` is exported separately for use in each MFE's `ModuleFederationPlugin` setup.

Options:
- `appName` — used for `uniqueName` and `chunkLoadingGlobal`
- `port` — devServer port (default: `3000`)
- `resolve` — pass `path.resolve` from the calling MFE
- `_dirname` — pass `__dirname` from the calling MFE (required so paths resolve relative to the MFE project, not this package)

Usage in an MFE's `webpack.config.ts`:
```ts
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { createWebpackConfig, defaultShared } from '@bka-stuff/mfe-utils';

export default {
  ...createWebpackConfig({ appName: 'my-app', port: 3001, resolve: path.resolve, _dirname: __dirname }),
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new webpack.container.ModuleFederationPlugin({
      name: 'my-app',
      filename: 'remoteEntry.js',
      exposes: { './App': './src/App' },
      shared: { ...defaultShared },
    }),
  ],
};
```

## Dependencies — ask first
**Always ask before adding a new dependency.** The library is intentionally lean. Existing runtime deps: `axios`, `jwt-decode`, `react-router-dom`, `zustand`. Peer deps: `react`, `react-dom`, `axios`.

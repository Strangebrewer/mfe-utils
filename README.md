# mfe-utils

Auth utilities and the beginning of a component library to use across different repos. I created this so I could share the logic between MFEs without needing to copy the login into each one.

To use the auth utils in a project:

`pnpm add @bka-stuff/mfe-utils@git+https://github.com/Strangebrewer/mfe-utils.git#main`

Then create an `axios.ts` file:

```
import axios from "axios";
import { createAuthClient } from "@bka-stuff/mfe-utils";

const BASE_URL = "http://localhost:8080";

export const axiosPublic = axios.create({ baseURL: BASE_URL });
export const axiosAuth = axios.create({ baseURL: BASE_URL });

createAuthClient({
  axiosPublic,
  axiosAuth,
  onLogout: () => {
    // whatever the shell should do
    console.log("Logged out");
  },
}).attach();
```

Then use `axiosPublic` and `axiosAuth` wherever you feel like. All the token refresh and all that stuff is handled by the package.

## Defaults
There are a few defaults that can be changed by adding props to `createAuthClient` options:
- `storage`: defaults to localstorage
- `keys`: defaults to `{ access: "access_token", refresh: "refresh_token" }
  - you can change one or both of these
- `refreshEndpoint`: defaults to `/token/exchange`
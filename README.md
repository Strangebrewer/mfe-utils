# mfe-utils

To load this in a project:

`pnpm add @bka-stuff/mfe-utils@git+https://github.com/Strangebrewer/mfe-utils.git#v0.1.1`

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
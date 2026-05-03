# Auth API — Frontend reference

Base URL for local development is typically **`http://localhost:5000`** (adjust per environment).

For the **machine-readable spec**, interactive **Try it out**, and exact JSON schemas, open:

**`http://localhost:5000/docs`**

Start the backend server first; this Markdown file is a **human-readable companion**. If anything disagrees with `/docs`, treat **Swagger/OpenAPI** as the source of truth.

---

## Authorization

Protected routes expect:

```http
Authorization: Bearer <accessToken>
```

- **`accessToken`** — Short-lived JWT. Send on each authenticated request.
- **`refreshToken`** — Long-lived; used only with `POST /auth/refresh` and logout endpoints that require it in the body.

Store tokens securely (e.g. memory + `httpOnly` cookie if the backend sets them, or explicit secure storage policy). Never log tokens in production.

### How this Next.js app uses it

- **Base URL:** `NEXT_PUBLIC_API_URL` → `src/lib/constants.ts` (`API_BASE_URL`; defaults to `http://localhost:5000`).
- **Persistence:** `access_token` and `refresh_token` in `localStorage` via `src/lib/auth/tokens.ts`.
- **Auth state:** `AuthProvider` (`src/providers/AuthProvider.jsx`) calls `GET /auth/me` when an access token exists; `POST /auth/login`, `/auth/register`, `/auth/verify-email` save tokens from JSON responses (supports common key names — confirm with `/docs`).
- **Axios:** `axiosSecure` attaches `Authorization` and retries once after `POST /auth/refresh` on `401` (`src/providers/AxiosSecureSetup.jsx`).
- **Firebase / legacy `/jwt`:** Removed — authentication is API-only.

---

## Primary routes

| Method | Path | Auth | Notes |
|--------|------|------|--------|
| `POST` | `/auth/register` | No | Queues verification email |
| `POST` | `/auth/verify-email` | No | OTP → returns **access** + **refresh** |
| `POST` | `/auth/resend-verification` | No | Same response message always (anti-enumeration) |
| `POST` | `/auth/login` | No | Requires **verified** email |
| `POST` | `/auth/refresh` | No* | Rotates refresh token; send refresh token per API contract |
| `POST` | `/auth/logout` | Optional | Body: `{ "refreshToken": "..." }` |
| `POST` | `/auth/logout-all` | **Bearer** | Revokes **all** refresh tokens for the user |
| `GET` | `/auth/me` | **Bearer** | Current user profile |
| `GET` | `/auth/session` | **Bearer** | JWT claims only |
| `GET` | `/auth/admin/:email` | **Bearer** | `:email` must match token’s email |

\*Refresh usually sends the refresh token in the body; confirm field names in `/docs`.

---

## Endpoint details (conceptual)

Below shapes are **typical** for email/password + OTP flows. **Confirm** property names, required fields, and status codes in **`/docs`**.

### `POST /auth/register`

Starts registration and queues a verification email.

**Request (example):**

```json
{
  "email": "user@example.com",
  "password": "…",
  "name": "…"
}
```

**Success:** `2xx` — user must complete email verification before login.

**Errors:** Validation (`400`), conflict if email taken (`409`), etc. — see OpenAPI.

---

### `POST /auth/verify-email`

Completes signup using the OTP / code from email.

**Request (example):**

```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

**Success:** Response includes **access** and **refresh** tokens (exact keys in `/docs`).

**Errors:** Invalid or expired code (`400` / `401`), etc.

---

### `POST /auth/resend-verification`

Resends verification email.

**Request:** Usually includes `email` (confirm in `/docs`).

**Behavior:** Response message is **intentionally generic** whether or not the email exists (prevents account enumeration).

---

### `POST /auth/login`

**Requires verified email.**

**Request (example):**

```json
{
  "email": "user@example.com",
  "password": "…"
}
```

**Success:** Access + refresh tokens.

**Errors:** Wrong credentials (`401`), email not verified (`403` or `401` — check `/docs`), rate limit (`429`).

---

### `POST /auth/refresh`

Issues a new **access** token (and usually a new **refresh** token rotation).

**Request (example):**

```json
{
  "refreshToken": "…"
}
```

**Success:** New tokens.

**Errors:** Invalid/expired refresh (`401`).

---

### `POST /auth/logout`

Invalidates the given refresh session.

```json
{
  "refreshToken": "…"
}
```

Optional **Bearer** may be required depending on backend — verify in `/docs`.

---

### `POST /auth/logout-all`

**Headers:** `Authorization: Bearer <accessToken>`

Revokes **all** refresh tokens for the authenticated user (sign out everywhere).

**Body:** Often empty; confirm in `/docs`.

---

### `GET /auth/me`

**Headers:** `Authorization: Bearer <accessToken>`

Returns the current user resource (profile fields as defined by the API).

---

### `GET /auth/session`

**Headers:** `Authorization: Bearer <accessToken>`

Returns **JWT claims** (decoded token payload / session summary), not necessarily full profile.

---

### `GET /auth/admin/:email`

**Headers:** `Authorization: Bearer <accessToken>`

**Constraint:** Path parameter **`email` must match** the email in the JWT (admin self-check pattern).

**Errors:** `403` if token email ≠ `:email`.

---

## Error responses (general)

Until you wire the generated client, expect common patterns:

| Status | Meaning (typical) |
|--------|-------------------|
| `400` | Bad request / validation |
| `401` | Missing/invalid token or credentials |
| `403` | Forbidden (e.g. wrong admin email, unverified) |
| `404` | Not found |
| `409` | Conflict (e.g. duplicate email) |
| `429` | Too many requests |

Response body shape is usually JSON, e.g. `{ "message": "…", "code": "…" }` — **see `/docs` for exact error schema**.

---

## Frontend integration checklist

1. **Environment variable** for API base, e.g. `NEXT_PUBLIC_API_URL=http://localhost:5000`.
2. **Register → verify-email** flow before enabling **login**.
3. **Attach** `Authorization: Bearer` to axios/fetch interceptors for protected routes.
4. **Refresh** on `401`: call `/auth/refresh`, retry once; if refresh fails, clear session and redirect to login.
5. **Logout**: call `/auth/logout` with refresh token; optional **logout-all** from settings.

---

## Exploring the live API

```bash
# From project root — start your backend (example)
# npm run dev   # or whatever starts port 5000
```

Then open **`http://localhost:5000/docs`** for paths, request bodies, response models, and **error codes** generated from the server.

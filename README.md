# 🔮 Tech Hurdle: The Whispering Realms

> A team-based coding relay race, built and hosted for **Empower Fest 2025** at **FAST University**.

Teams race through five magical, Hogwarts-themed chambers. Each chamber holds a cipher problem. Solving it (in any programming language) reveals a **baton**, a secret code that a teammate enters into the portal to unlock the next chamber. The first team to clear all five chambers and reach the final location wins.

The codebase is named `fast-relay`. The public branding is **Tech Hurdle**.

---

## Table of Contents

- [How the Game Works](#how-the-game-works)
- [The Five Chambers](#the-five-chambers)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [API Reference](#api-reference)
- [Running the Event (Organizer Guide)](#running-the-event-organizer-guide)

---

## How the Game Works

1. **Organizers create teams.** Each team gets a unique team code (e.g. `TH-A1B2C3`).
2. **A team logs in** with its code on the login page and lands on the portal dashboard.
3. **A teammate enters a baton** for the team's current step.
4. If the baton is correct, the chamber's **problem is revealed**: a cipher challenge with instructions.
5. The team writes code (in any language) to decode the cipher, which produces the **next baton**.
6. That baton is **passed to the next teammate**, who enters it in the portal to unlock the next chamber.
7. After the fifth chamber is unlocked, the team sees the **victory screen** with the final location. The first team to physically get there wins.

Every baton attempt, right or wrong, is written to a progress log so organizers can follow the race live.

> **Baton matching:** Batons are normalized before comparison. Everything except letters and digits is stripped and the text is lowercased. `Ab-12 c` and `ab12c` are treated as the same baton.

> **Hint shown to players:** All shifts wrap around. Letters use `% 26` and digits use `% 10`.

---

## The Five Chambers

| Step | Chamber | Theme |
|------|---------|-------|
| 1 | The Room of Requirement | Reverse-position cipher with case-sensitive shifting |
| 2 | The Forbidden Forest | Fibonacci cryptography with mathematical progression key generation |
| 3 | The Astronomy Tower | Atbash mirror cipher with positional backward shifts |
| 4 | The Chamber of Secrets | Case-dependent cipher with positional arithmetic |
| 5 | The Great Hall | Final chamber (problem content is defined by the organizer) |

The problem text, instructions, and expected baton for each step are stored in the database, so you can change them without redeploying.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router, API route handlers) |
| UI | React 18, inline styles, CSS animations |
| Database | [Supabase](https://supabase.com/) (PostgreSQL) via `@supabase/supabase-js` |
| Auth | Stateless JWT (`jsonwebtoken`), 8-hour expiry, kept in `sessionStorage` |
| Team codes | `nanoid` |

**Requirements:** Node.js 20 or newer (required by the Supabase client packages) and a Supabase project.

---

## Project Structure

```
fast-relay/
├── app/
│   ├── layout.js                    # Root layout and metadata
│   ├── page.js                      # Landing page (Continue / Event Rules)
│   ├── rules/page.js                # Event rules and baton system explained
│   ├── login/page.js                # Team code login
│   ├── dashboard/page.js            # Main game portal (start, checkpoint, problem, complete)
│   └── api/
│       ├── auth/login/route.js      # POST: team code -> JWT
│       ├── team/me/route.js         # GET: current team (auth required)
│       ├── baton/validate/route.js  # POST: validate baton, advance team, return problem
│       └── admin/
│           ├── create-team/route.js     # POST: create a team and generate its code
│           ├── create-problem/route.js  # POST: create or update a problem (upsert)
│           └── progress/route.js        # GET: leaderboard data and attempt logs
├── lib/
│   ├── auth.js                      # JWT sign / verify helpers
│   └── supabaseClient.js            # Public and service-role Supabase clients
├── public/
│   └── main.png                     # Background artwork (you must supply this)
├── next.config.js
└── package.json
```

---

## Getting Started

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd fast-relay

# 2. Install dependencies
npm install

# 3. Create your environment file (see below)
cp .env.example .env.local   # or create .env.local manually

# 4. Set up the database (see "Database Setup")

# 5. Run the dev server
npm run dev
```

The app runs at `http://localhost:3000`.

Other scripts:

```bash
npm run build   # production build
npm start       # run the production build
```

Place your background artwork at `public/main.png`. Every page references it.

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
JWT_SECRET=a-long-random-secret-string
```

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key |
| `SUPABASE_SERVICE_KEY` | Service-role key. **Server-side only, never expose it.** All API routes use it. |
| `JWT_SECRET` | Secret used to sign team tokens. If unset, the code falls back to an insecure development default, so **always set this in production**. |

---

## Database Setup

The code expects three tables. The schema below is inferred from the queries in the API routes. Adjust types as needed.

```sql
-- Teams
create table teams (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  code         text not null unique,
  current_step int  not null default 1,
  created_at   timestamptz default now()
);

-- Problems (one per step)
create table problems (
  step           int primary key,   -- must be unique: create-problem uses upsert
  title          text not null,
  expected_baton text not null,
  content        text,
  instructions   text,
  next_lab       text
);

-- Attempt log
create table progress_logs (
  id             bigint generated always as identity primary key,
  team_id        uuid references teams(id),
  step           int,
  baton_provided text,
  success        boolean,
  created_at     timestamptz default now()
);
```

If your `teams.id` is a different type (e.g. `bigint`), adjust `progress_logs.team_id` to match.

---

## API Reference

All responses are JSON in the shape `{ ok: boolean, ... }`.

### Player endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/login` | none | Body: `{ "code": "TH-A1B2C3" }`. Returns a JWT and basic team info. |
| `GET` | `/api/team/me` | Bearer token | Returns the logged-in team, including `current_step`. |
| `POST` | `/api/baton/validate` | Bearer token | Body: `{ "step": 1, "baton": "..." }`. Checks the baton against that step's `expected_baton`. On success the team advances one step and the problem (`title`, `content`, `instructions`) is returned. |

Validation rules:
- A team can only submit a baton for the step it is currently on.
- Every attempt is logged to `progress_logs`.
- A wrong baton returns `ok: false` and does not advance the team.

### Admin endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/admin/create-team` | Body: `{ "name": "Team Name" }`. Creates a team at step 1 and generates a code from the initials plus a random 6-character suffix. |
| `POST` | `/api/admin/create-problem` | Body: `{ step, title, expected_baton, content, instructions, next_lab }`. Creates or updates a problem. |
| `GET` | `/api/admin/progress` | Returns all teams (sorted by `current_step`, descending) and all attempt logs (newest first). |

Examples:

```bash
# Create a team
curl -X POST http://localhost:3000/api/admin/create-team \
  -H "Content-Type: application/json" \
  -d '{"name":"Code Wizards"}'

# Create / update a problem
curl -X POST http://localhost:3000/api/admin/create-problem \
  -H "Content-Type: application/json" \
  -d '{
    "step": 1,
    "title": "The Room of Requirement",
    "expected_baton": "STARTBATON",
    "content": "Cipher text goes here...",
    "instructions": "Decode the cipher to find the next baton.",
    "next_lab": "The Forbidden Forest"
  }'

# Watch the race
curl http://localhost:3000/api/admin/progress
```

---

## Running the Event (Organizer Guide)

1. **Load the problems.** Create all five problems with `/api/admin/create-problem`. For step N, `expected_baton` is the code the team must enter to *unlock* problem N. So problem N-1's cipher must decode to the `expected_baton` of step N. For step 1, hand out the starting baton yourself.
2. **Register teams** with `/api/admin/create-team` and give each team its generated code.
3. **Share the site URL.** Teams log in and pass batons between teammates.
4. **Monitor progress** using `/api/admin/progress`. Wrong attempts appear in `progress_logs` with `success = false`.
5. **Set up the finish.** Teams who clear step 5 see the victory screen telling them to head to the final location (in 2025, the *Multipurpose Block*). Edit that text in `app/dashboard/page.js` for your own venue.

To change the number of chambers, update `TOTAL_STEPS` and the step buttons in `app/dashboard/page.js`.

---

## License

Add a license of your choice (`package.json` currently lists ISC).

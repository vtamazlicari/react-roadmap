# React Roadmap — Members Dashboard

A small React + TypeScript dashboard for managing project members: pick people, assign them a role and an access level, and create new people through a validated form.

Built with [Create React App](https://github.com/facebook/create-react-app), React Context for state, [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) for forms, [react-modal](https://github.com/reactjs/react-modal) and SCSS.

## Features

- **Member list** — each row has a person, role and access level dropdown.
- **Role-based access levels** — the access options depend on the role:

  | Role     | Allowed access levels  |
  |----------|------------------------|
  | customer | read                   |
  | employee | read, write            |
  | manager  | read, write, admin     |

- **No duplicates** — a person already in the list is hidden from the other rows' dropdowns.
- **Add / remove members** — "Add new member" adds a row with the next free person; the ✕ icon removes it.
- **Save changes** — edits stay local until you click **SaveChange**, which only shows up when the list differs from the saved state.
- **Create a person** — "New member" opens a modal form (first and last name are required) and adds the person to the selectable list.

## Getting started

```bash
yarn install
yarn start
```

Then open [http://localhost:3000](http://localhost:3000).

> `node-sass@4` only builds on older Node versions — use **Node 12 or 14** (e.g. `nvm use 14`).

### Scripts

| Command      | What it does                              |
|--------------|-------------------------------------------|
| `yarn start` | Run the dev server with hot reload        |
| `yarn test`  | Run tests in watch mode                   |
| `yarn build` | Build a production bundle into `build/`   |

## Data

There is no backend. Initial data is loaded on startup from two static files in [public/](public/):

- [public/persons.json](public/persons.json) — everyone who can be added as a member
- [public/members.json](public/members.json) — the initial member list (`person_id`, `role`, `access_level`)

Changes live in memory only and are lost on page reload.

## Project structure

```
src/
├── App.tsx                          # Wraps the dashboard in the context provider
├── common/
│   ├── context/context.tsx          # AppContext: persons, members and their setters
│   └── components/remove/           # ✕ icon
└── components/dashboard/
    ├── dashboard.tsx                # Member list state, add/remove/save logic
    ├── types.ts                     # Member, Person, Roles, AccessLevel
    ├── actions/dashboardActions.tsx # Hooks that fetch the JSON files
    ├── utils/dashboardUtils.tsx     # Pushes fetched data into context
    └── components/
        ├── header/                  # Title, "New member", "SaveChange", create-person modal
        └── member-list/             # List and per-row item with dropdowns
```

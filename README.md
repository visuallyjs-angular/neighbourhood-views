# Neighbourhood Views (Angular)

Angular version of the React neighbourhood views example. Displays the organic compound hierarchy with four linked views: successors, immediate predecessors, immediate neighbours, and siblings. Clicking a node in any view selects and centres it in the main view and updates all four panels. Panels can be collapsed individually or with Show All / Hide All.

## Getting started

Use Node.js 22.12+ or 24 (Angular 21).

```sh
npm ci
npm start
```

Keep `package-lock.json` checked in: it records the verified dependency versions and avoids an npm 10 peer-resolution crash during a fresh unlocked install. `npm install` also works with this lockfile.

Open http://localhost:4200. `npm run dev` also starts the development server.

```sh
npm run build
```

The production site is generated in `dist/neighbourhood-views/browser`.

The dataset is in `src/app/assets/dataset.ts`, neighbourhood selection in `src/app/neighbourhood.ts`, and the original styling in `src/neighbourhood-views.css`. Node rendering uses Angular components extending VisuallyJs `BaseNodeComponent`; the main graph uses `vjs-surface` and the panels use `vjs-paper`.

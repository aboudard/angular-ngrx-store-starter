# Project structure

## 1. Overall architecture

This repository is a small Angular 17 frontend application built around NgRx state management and a local storage-backed counter demo. It is a single-application frontend project, not a backend or monorepo.

### Project type classification
- Project type: frontend
- Runtime: browser-based Angular SPA
- State model: NgRx Store + Effects
- Persistence: browser local storage via `@ngx-pwa/local-storage`

## 2. Top-level module/package breakdown

```text
src/
├─ app/
│  ├─ actions/                Counter action definitions
│  ├─ effects/                Side effects for storage writes
│  ├─ reducers/              Store state shape and reducer logic
│  ├─ selectors/              Selector functions
│  ├─ app.component.ts        Root view model and UI actions
│  ├─ app.component.html     Root UI template
│  ├─ app.config.ts          Global Angular/NgRx app bootstrap providers
│  ├─ app.routes.ts          Router config (empty routes)
│  ├─ hello.component.ts     Reusable presentational component
│  └─ app.component.spec.ts  Root component spec
├─ environments/             App environment config
├─ assets/                   Styling assets
├─ index.html                Browser shell
├─ main.ts                   Angular bootstrap entry point
├─ styles.css                Global styles
├─ test.ts                   Karma/Jasmine bootstrap
├─ karma.conf.js             Test config
├─ tsconfig.app.json         App compiler config
├─ tsconfig.spec.json        Test compiler config
└─ (project root)            Angular workspace config, package metadata, lint/test config
```

## 3. Layer architecture

### UI layer
- `src/app/app.component.ts`
  - Root component for the app shell
  - Injects `Store<AppState>` and `StorageMap`
  - Creates a `viewModel$` combining store count and storage value
  - Exposes `increment()`, `decrement()`, and `storeVal()` actions
- `src/app/hello.component.ts`
  - Small standalone presentational component used in the root template
- `src/app/app.component.html`
  - Renders the counter UI, buttons, and local-storage display

### State layer (NgRx)
- `src/app/actions/counter.actions.ts`
  - Defines `CounterActions` using `createActionGroup`
  - Event types: increment, decrement, store
- `src/app/reducers/counter.reducer.ts`
  - Defines `CounterState` and reducer logic
  - `count` starts at `0`
  - increment adds `2`, decrement subtracts `1`
- `src/app/reducers/index.ts`
  - Exposes the root `AppState` and `reducers` map
- `src/app/selectors/counter.selector.ts`
  - Exposes `getCount` selector to read the `count` slice
- `src/app/effects/counter.effects.ts`
  - Watches `storeCounter` actions and writes the value to `StorageMap`
  - Runs with `dispatch: false`

### Configuration / bootstrap layer
- `src/main.ts`
  - Boots Angular using `bootstrapApplication()`
- `src/app/app.config.ts`
  - Global providers for Router, NgRx Store, Effects, DevTools, and local storage
- `src/app/app.routes.ts`
  - Router config placeholder (`Routes = []`)
- `src/environments/environment.ts` and `environment.prod.ts`
  - Build-time environment flags

## 4. Entry points and runtime wiring

### Runtime entry point
- `src/main.ts` is the application bootstrap entry point.
- It loads `AppComponent` and passes `appConfig`.

### App bootstrap config
- `src/app/app.config.ts` wires the following:
  - `provideRouter(routes)`
  - `provideStore(reducers, { metaReducers, runtimeChecks })`
  - `provideEffects([CounterEffects])`
  - `provideStoreDevtools(...)`
  - `importProvidersFrom(BrowserModule, FormsModule, StorageModule.forRoot(...))`

### Browser shell
- `src/index.html` is the root browser document.
- It mounts `<app-component></app-component>`.

## 5. File counts by package/layer

Approximate counts from the current repository state:

- `src/`: 22 files total
- `src/app/`: 12 files
- `src/app/actions/`: 1 file
- `src/app/effects/`: 2 files
- `src/app/reducers/`: 2 files
- `src/app/selectors/`: 1 file
- `src/environments/`: 2 files
- `src/assets/`: 1 file

### Layer counts
- UI files: `app.component.ts`, `app.component.html`, `hello.component.ts` (3)
- State files: actions + reducers + selectors + effects (1 + 2 + 1 + 2 = 6)
- Bootstrap/configuration files: `app.config.ts`, `app.routes.ts`, `main.ts`, `environment.*` (5)

## 6. Key config files and their roles

- `angular.json`
  - Angular workspace configuration
  - Defines application build, serve, test, and lint targets
- `package.json`
  - Dependency set and npm scripts
  - Includes Angular 17, NgRx 17, Bootstrap, RxJS, and test tooling
- `tsconfig.json`
  - TypeScript compiler base config for the app
- `src/karma.conf.js`
  - Karma test runner configuration
- `.eslintrc.json`
  - Linting rules for the codebase
- `tslint.json`
  - Legacy lint configuration retained in the project setup

## 7. Major functional areas/domains

This app has a very small domain model, centered on a single feature:

- Counter feature domain
  - state: current numeric count
  - actions: increment, decrement, store
  - selector: read the current count
  - effects: persist the value to local storage

Other non-domain concerns in the app:
- UI rendering and component composition
- local storage integration
- app bootstrap and provider wiring

## 8. Architectural observations

- This is a straightforward feature-oriented Angular app with a clear separation between:
  - components (view)
  - actions (intent)
  - reducers (state transitions)
  - selectors (read access)
  - effects (side effects and external integration)
- The app does not currently include a backend, ORM, database schema, or service layer beyond browser storage integration.
- The application is intentionally lightweight and easy to understand as a starter for NgRx learning.

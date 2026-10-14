# Project structure

## Overall architecture

This is a small Angular 17 browser application using NgRx for the counter state and browser storage for an explicitly saved value. It is a single frontend application, not a backend or monorepo.

## Top-level module breakdown

```text
src/
├─ app/
│  ├─ counter/                    Counter feature implementation
│  │  ├─ counter.actions.ts
│  │  ├─ counter.effects.ts
│  │  ├─ counter.effects.spec.ts
│  │  ├─ counter-explanation.component.ts
│  │  ├─ counter-explanation.component.spec.ts
│  │  ├─ counter.facade.ts
│  │  ├─ counter.facade.spec.ts
│  │  ├─ counter.reducer.ts
│  │  ├─ counter.reducer.spec.ts
│  │  └─ counter.selectors.ts
│  ├─ reducers/
│  │  └─ index.ts                 Root state type and reducer registration
│  ├─ app.component.ts            Root app shell and startup trigger
│  ├─ app.component.html          Counter controls and displayed values
│  ├─ app.component.spec.ts
│  ├─ app.config.ts               Angular and NgRx providers
│  ├─ app.routes.ts               Router config (empty routes)
│  └─ hello.component.ts          Greeting display
├─ environments/                  Build-time environment flags
├─ assets/                        Styling assets
├─ index.html                     Browser document
├─ main.ts                        Angular bootstrap entry point
├─ styles.css                     Global styles
├─ test.ts                        Karma/Jasmine bootstrap
├─ karma.conf.js                  Test runner config
├─ tsconfig.app.json              App compiler config
└─ tsconfig.spec.json             Test compiler config
```

## Layers and module responsibilities

### App shell
- `src/main.ts` bootstraps the standalone `AppComponent` with `appConfig`.
- `src/app/app.config.ts` registers the root store, Counter effect, router, Store DevTools, and browser storage.
- `src/app/reducers/index.ts` defines `AppState` and registers the Counter reducer.
- `src/app/app.component.ts` initiates one increment at startup and routes UI operations through `CounterFacade`.
- `src/app/app.component.html` renders the counter, persistence progress/errors, and the saved value.

### Counter feature
- `counter.actions.ts` defines increment, decrement, storage request, and storage result actions.
- `counter.reducer.ts` owns the numeric count and storage-write pending/error state.
- `counter.selectors.ts` reads the feature state without depending on the root state shape.
- `counter.effects.ts` writes an explicitly submitted count to browser storage and reports success/failure.
- `counter.facade.ts` is the UI-facing interface. It exposes a single view-model stream and counter operations; NgRx and `StorageMap` remain internal.
- `counter-explanation.component.ts` explains the counter, saved-value, and display-delay behavior to the user.

## Entry points and runtime wiring

- `src/main.ts` is the runtime entry point.
- `src/index.html` contains the `<app-component>` mount element.
- `src/app/app.config.ts` wires `provideRouter`, `provideStore`, `provideEffects`, Store DevTools, `BrowserModule`, `FormsModule`, and `StorageModule`.
- `src/app/app.routes.ts` currently exports an empty route list.

## Key config files

- `angular.json`: Angular application build, serve, test, and lint targets.
- `package.json`: dependencies and npm scripts.
- `tsconfig.json`: TypeScript compiler settings.
- `src/tsconfig.app.json` and `src/tsconfig.spec.json`: app and test compilation.
- `src/karma.conf.js`: Karma configuration.
- `.eslintrc.json` and `tslint.json`: lint configuration files in the repository.
- `src/environments/environment.ts` and `environment.prod.ts`: development/production flags selected by Angular build configuration.

## Functional areas

The only domain feature is the Counter:
- A live in-memory numeric value starts at `0`; the app increments it once on startup.
- Increment adds `2`; Decrement subtracts `1`.
- Store explicitly persists the value currently displayed by the UI.
- The stored value is displayed separately and does not initialize the live counter.
- Both displayed values update through a stream delayed by 1.2 seconds.

## Project type classification

- Type: frontend
- Runtime: browser-based Angular application
- State: NgRx Store and Effects
- Persistence: browser storage through `@ngx-pwa/local-storage`
- No backend, database, or ORM is present.

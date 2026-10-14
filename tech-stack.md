# Tech stack

## Runtime and language
- Language: TypeScript
- Runtime: Angular 17 SPA running in the browser
- Module system: ES modules (`module: "es2020"`)
- Target JavaScript: ES2022
- UI framework: Angular
- State library: NgRx Store and NgRx Effects

## Core framework versions
From `package.json`:
- `@angular/core`: 17.3.12
- `@angular/common`: 17.3.12
- `@angular/compiler`: 17.3.12
- `@angular/platform-browser`: 17.3.12
- `@angular/platform-browser-dynamic`: 17.3.12
- `@angular/router`: 17.3.12
- `@angular/cli`: ^17.3.11
- `@angular/compiler-cli`: ^17.3.12
- `@angular-devkit/build-angular`: ^17.3.11

## State and async dependencies
- `@ngrx/store`: 17.2.0
- `@ngrx/effects`: 17.2.0
- `@ngrx/entity`: 17.2.0
- `@ngrx/store-devtools`: 17.2.0
- `rxjs`: ^7.8.0

## UI and styling dependencies
- `bootstrap`: ^5.2.3
- `@ng-bootstrap/ng-bootstrap`: ^16.0.0
- `@popperjs/core`: ^2.11.8
- `zone.js`: ^0.14.10

## Persistence and browser integration
- `@ngx-pwa/local-storage`: ^17.0.0

## Tooling and build
- TypeScript: ^5.4.5
- Karma: ~6.4.2
- Jasmine: via `@types/jasmine` and `karma-jasmine`
- ESLint: ^8.57.0
- Prettier: ^3.4.2
- TSLint: ~6.1.0
- Protractor: ~7.0.0
- http-server: ^14.1.1

## Config and runtime requirements
- TypeScript compiler options target `ES2022`.
- Angular build uses the browser builder with `zone.js` polyfill.
- The app is configured for `strictInjectionParameters` and `fullTemplateTypeCheck`.
- Local storage is used as the persistence mechanism and is configured with `StorageModule.forRoot({ IDBNoWrap: true })`.

## Notable stack characteristics
- This is a frontend-only project with no backend service layer.
- There is no database or ORM layer in the application code.
- The project is using the Angular standalone component style (`standalone: true`) together with NgRx and `@Injectable` effects.
- The repository includes both legacy TSLint and current ESLint configuration, indicating a transition or mixed-tooling setup.

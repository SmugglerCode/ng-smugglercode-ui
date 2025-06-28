# SmugglercodeUiSandbox

This repository contains a demo Angular application together with the **Smugglercode UI** component library. Both were generated with [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Repository structure

- `src/` – contains the demo application where the library components are showcased.
- `projects/smugglercode-ui/` – the reusable component library. All public components and services are exported via `projects/smugglercode-ui/src/public-api.ts`.
- `public/` – global assets such as the `dark-theme.css` file that provides the default styling for the demo.

## Development server

Start a local development server with:

```bash
ng serve
```

Navigate to `http://localhost:4200/` to see the demo application. The server reloads automatically when source files change.

## Building the demo

To build the demo application run:

```bash
ng build
```

The build output is stored in the `dist/` folder. Production builds are optimized for speed and performance.

## Building the library

Inside the `projects/smugglercode-ui` folder resides the component library. Build it with:

```bash
ng build smugglercode-ui
```

After building you can publish the library by navigating to `dist/smugglercode-ui` and running `npm publish`.

## Code scaffolding

Generate new components or services using Angular CLI schematics. For example:

```bash
ng generate component component-name
```

List all available schematics with `ng generate --help`.

## Running unit tests

Execute unit tests with [Karma](https://karma-runner.github.io):

```bash
ng test
```

## Running end-to-end tests

```bash
ng e2e
```

Angular CLI does not include an e2e framework by default. Choose one that fits your project.

## Next steps

If you're new to Angular or library development, consider exploring the following topics:

1. **Angular CLI fundamentals** – understanding commands like `ng generate` and `ng build`.
2. **Building component libraries** – how to package and publish reusable Angular components.
3. **TypeScript and SCSS** – dive into how components combine templates, styling and logic.
4. **Testing with Jasmine and Karma** – write unit tests for your components and services.

For detailed CLI documentation see the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

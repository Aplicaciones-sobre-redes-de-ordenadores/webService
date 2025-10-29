# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


**Github**: https://github.com/PaulleDemon/awesome-landing-pages

## Usage

* This template uses tailwind css every tailwind class are prefixed with `tw-`, to help differentiate
  between tailwind classes and other classes  

During development add the following to head tag

```html
<link rel="stylesheet" href="tailwind-runtime.css"><!--replace with path to your tailwind runtime-->
```
During production use

```html
<link rel="stylesheet" href="tailwind-build.css"><!--replace with path to your tailwind build-->
```

To start Tailwind during development use
```html
npm run start:tailwind
```

To create a build file use
```html
npm run build:tailwind
```
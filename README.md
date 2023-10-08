# electron-react-vite-app

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

## Comandos

npm create @quick-start/electron

npm install react-router-dom localforage match-sorter sort-by

npm install @mui/material @mui/icons-material @emotion/react @emotion/styled @mui/x-data-grid

npm install react-hook-form

npm install moment

npm i yup @hookform/resolvers

npm install @reduxjs/toolkit
npm install react-redux

npm install --save react-dropzone

npm i axios -E

npm install cross-env -D


## Notas
"dev": "electron-vite dev" = (... dev) por defecto carga el archivo de variables .env.development
"build": "npm run typecheck && electron-vite build" = (... build) por defecto carga el archivo de variables .env.production

By default, variables prefixed with MAIN_VITE_ are exposed to the main process, PRELOAD_VITE_ to preload scripts and RENDERER_VITE_ to renderers.

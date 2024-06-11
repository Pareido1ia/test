Red Energy Vue 3 component library.

## Usage

First install the library using your prefered package manager

```bash
yarn add  //Todo: git library install
```

then you can import the available components like so

```vue
import { Button } from 're-ui-library'
```

## Available commands

Here is a list of all available npm commands.

**Starting the dev environment**
We use VitePress to hold our component documentation and examples

```bash
npm run dev
```

**Building the documentation**

```bash
npm run build
```

**Serving the documentation**

```bash
npm run serve
```

**Building the library bundle**

Generates the js bundle to be imported by our apps

```bash
npm run build:library
```

**Analyzing bundle sizes with [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)**

```bash
npm run analyze
```

**Lint all files**

```bash
npm run lint
```

**Format all files**
```bash
npm run format
```

## Creating new components

Adding new components

- Add the component in a folder of the same name
- Ensure you add documentation for the component inside /docs follow the `index.md`

```
src/
├── components/
│   ├── [componentName]/
│   │   └── [componentName].vue
```

You can rebuild the docs by running `npm run build:library` and see them by running `npm run serve`.

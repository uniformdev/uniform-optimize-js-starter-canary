# Uniform Optimize Javascript Starter

This is a pure JavaScript starter for Uniform Optimize that demonstrates how to use it with no JS framework.

## Setup

Copy `.env.example` to `.env` and set your Uniform API key. This will enable you to acquire intent data from a Uniform site.

## Architecture

On build (or dev), the Uniform CLI downloads intent and signal data from Uniform using the API key set up in environment variables.

This intent data is used to cause personalization using local hardcoded content (no CMS, for simplicity).

The starter was built using `create-snowpack-app` and uses TypeScript. TypeScript is not required to use Uniform.

## Available Scripts

### npm run dev

Runs the app in the development mode.
Open <http://localhost:8080> to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like [@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/master/plugins/plugin-webpack) or [snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle) to your `snowpack.config.json` config file.

### Q: What about Eject

No eject needed! Snowpack guarantees zero lock-in, and CSA strives for the same.

webpack2-typescript2-react base project
====

This is a stub project with a good base config to a Webpack 2 + TypeScript 2 + React stack.

Created after my frustration trying to find something equivalent that had good-to-go defaults and wasn't a total mess, something I discovered to be incredible hard to find.

The structure of the project is:

- `scripts/` - build scripts and configs
- `src/` - project source code

When building, generated files will go to `build/` under a sub-directory `dev/` or `prod/` accordingly to the built product.


How to use it
----

First install all dependencies using:

`yarn`

To build a development version and launch de client and server:

`yarn dev`

To build a production release:

`yarn prod`

To debug configuration errors or compilation errors:

`yarn compile`

----

This project uses React and react-color and reactcss as a sample importing third-party modules.

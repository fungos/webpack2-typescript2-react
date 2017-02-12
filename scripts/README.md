Build Scripts
====

Here are the project scripts used during development and deployment.

I've tried to let them organized in a easy way but there may be something missing to cleanup or add (ie. scripts for testing environments).

They are:

- `config/index.js` - general configuration (ie. static files path, document root path, routes, etc.)
- `build-prod.js` - script to build the production release code (use: yarn prod)
- `check-versions.js` - helper script
- `dev-client.js` - client reload for development
- `dev-server.js` - server for development (use: yarn dev)
- `webpack.base.conf.js` - common base webpack configuration for both dev and prod configs
- `webpack.dev.conf.js` - development specific webpack configuration
- `webpack.prod.conf.js` - production specific webpack configuration


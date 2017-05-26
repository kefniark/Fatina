# SPEAR.JS - CONTRIBUTORS GUIDE

## Requirement and Installation
Node.js version 0.10 or up. We recommend that you use [NVM](https://github.com/creationix/nvm) for managing your Node.js versions.

```
npm install
```

## To test/try out examples
Run a node server:
```
node server.js
```
Then go to the address [http://localhost:3000/test/](http://localhost:3000/test/)

## Test, Build & Documentation
All those tasks are done automatically when committing/merging code.
But they can be done manually when necessary:

To test, run the command:
```bash
npm run test
```

To build, run the command:
```bash
npm run build
```
The build will be output in build/trey.js and build/trey.min.js, respectively unminimified and minimified versions of TREY.js.

To create the documentation, run the command:
```bash
npm run doc
```
You can view the generated document by opening the file ```docs/index.html```.

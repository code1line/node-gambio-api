## Contribution Guide

Pull requests are always welcome!

To see a structured dependency list of this module please refer to the [dependencies docs](/DEPENDENCIES.md).

Before you start developing you must do `npm install` to install all necessary dependencies.

Don't forget to lint your code and run the tests by doing `npm test` during development.

### Directory structure

- `src` contains the source code.
- `docs` contains documentation files.
- `example` contains demo scripts for example usage.
- `lib` contains the compiled code.
- `test` contains test specs.

## Commands

`$ npm start` to start developing. This command compiles the scripts and watches for file changes.

`$ npm test` to lint the scripts and run unit tests.


### Rules

- This project follows [semantic versioning](http://semver.org/).
- Code must be written in [ES6 syntax](https://babeljs.io/docs/learn-es2015).
- Code must be formatted according to [AirBnb's coding guidelines](https://github.com/airbnb/javascript).
- Code must be documented with [JSDoc](http://usejsdoc.org).
- Always write [tests](https://mochajs.org)! It's better to develop in the test-driven way.
- Code must pass lint and test procedure in `npm test`.

### How this module works

**Module structure**
- Gambio API
  - Providers
  - RequestDispatcher
  - Helpers

**Example request sequence**

Example API command: `API.customers.getById(5)`

```
1. GambioApi -> calls -> CustomerApi
2. CustomerApi -> opens method -> CustomerApi#getById
3. CustomerApi#getById -> prepares request by calling -> RequestDispatcher#get
5. RequestDispatcher#get -> sends GET request -> returns -> Promise
```

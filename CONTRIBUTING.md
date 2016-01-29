## Contribution Guide

Pull requests are always welcome!

To see a structured dependency list of this module please refer to the [dependencies docs](/DEPENDENCIES.md).

Before you start developing you must do `npm install` to install all necessary dependencies.

Don't forget to lint your code and run the tests by doing `npm test` during development.

### Directory structure

- `docs` contains documentation files.
- `example` contains demo scripts for example usage.
- `lib` contains library core files.
  - `api` contains API classes.
  - `provider` contains provider objects.
- `test` contains test specs.

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
  - APIs
    - API base class
      - Address API
      - Country API
      - Customer API
      - E-Mail API
      - Zone API
  - Requester
  - Validator
  - Errors
  - Providers

**Example request sequence**

Example API command: `API.customers.getById(5)`

```
1. GambioApi -> calls -> CustomerApi
2. CustomerApi -> opens method -> CustomerApi#getById()
3. CustomerApi#getById() -> validates parameter by calling -> Validator#checkInteger()
4. CustomerApi#getById() -> prepares request by calling -> Requester#get()
5. Requester#get() -> sends GET request using -> request (Node library)
6. Requester#get() -> returns -> Promise

```

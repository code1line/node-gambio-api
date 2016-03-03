# Changelog

## 2.0.0
- Usage of [Gulp-ES6-Module-Generator](https://github.com/ronaldloyko/generator-gulp-es6-module)
- Refactored code to use complete ES6 syntax (usage of `import`, `export`, ...).
- Removed custom error classes, used native `Error` instead.
- Renamed sub APIs to providers.
- Completely refactored unit tests.
- Refactored providers.
- Removed request sorting and limiting feature.
- Added CategoryProvider
<!-- - Added `EmailProvider#uploadAttachment` -->
<!-- - Added OrderProvider -->
<!-- - Added ProductProvider -->

## 1.2.0
- Added `getVersion` static method.
- Fixed `index.js` by prepending `module.exports`.
- Changed require path in example script.
- Installed development dependency package `semver`.

## 1.0.0
- Refactored Validator.
  - Methods are static now.
  - Removed method `checkUser`.
  - Removed method `checkPassword`.
  - Removed method `checkVersion`.
  - Removed method `checkId`.
  - Added method `checkInteger`.
  - Added method `checkArray`.
  - Added method `checkTypedArray`.
- Refactored Requester.
  - Methods are static now.
  - Changed error response handling.
- Created providers
  - Moved message container `lib/messageContainer.js` to `lib/provider/messages.js`.
  - Created default request headers provider `lib/provider/headers.js`
  - Created default parameters provider `lib/provider/parameters.js`
- Added dependencies
  - Added `http-status-codes` package.
  - Added `common-errors` package.
- Refactored errors
  - Removed custom error classes, used pre-built error classes from package `common-errors` instead.
- Refactored API base class `Api`.
  - Removed unnecessary boilerplate code.
  - Added possibility to limit returned fields.
- Refactored sub API classes.
  - All general `get*` methods now have two optional arguments to sort and minimize the server response.
- Refactored unit tests.
- Updated the documentation.

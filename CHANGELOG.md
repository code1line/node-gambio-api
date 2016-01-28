# Changelog

## 1.0.0
- Refactored `Validator`.
  - Removed `checkUser`.
  - Removed `checkPassword`.
  - Removed `checkVersion`.
  - Removed `checkId`.
  - Added `checkInteger`.
- Removed custom error classes, used error classes from package `common-errors` instead.
- Moved message container `lib/messageContainer.js` to `lib/provider/messages.js`.
- Created default request headers provider `lib/provider/headers.js`
- Added `http-status-codes` package as dependency.
- Added `common-errors` package as dependency.
- Refactored API base class `Api`.

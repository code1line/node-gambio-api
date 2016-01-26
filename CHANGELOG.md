# Changelog

## 1.0.0
- Refactored `Validator`.
  - Removed `checkUser`.
  - Removed `checkPassword`.
  - Removed `checkVersion`.
  - Removed `checkId`.
  - Added `checkInteger`.
- Refactored error classes.
  - Removed `InvalidArgumentError`.
  - Removed `NoArgumentError`.
  - Removed `ClientError`.
  - Added `ArgumentError`.
  - Modified `ServerError.`
    - Modified constructor parameter list.
- Moved message container `lib/messageContainer.js` to `lib/provider/messages.js`.
- Created default header provider `lib/provider/headers.js`
- Moved API base class `lib/api/Api.js` to `lib/base/Api.js`.
- Moved Error base class `lib/error/ExtendableError.js` to `lib/base/ExtendableError.js`.
- Created `Helper`.

# node-gambio-api [![Build Status](https://travis-ci.org/ronaldloyko/node-gambio-api.svg?branch=master)](https://travis-ci.org/ronaldloyko/node-gambio-api)

This library provides a simple low-level API class for Node.js that talks to the REST-API of a Gambio web shop.

**Note: Minimum Node version required: 4.0**

## Installation
`npm install gambio-api`

## Usage
```js
// Require module.
const GambioApi = require('gambio-api');

// Instantiation options.
const options = {
  url: 'http://myshop.com',
  user: 'admin@myshop.de',
  pass: '12345',
}

// Instantiation.
const API = new GambioApi(options);

// Get all customers.
const request = API.customers.get();

// Request returns a promise.
request
  .then(console.log)
  .catch(console.error);

```

## Instantiation
These options are available for instantiating:

- `url` (required) - *String* - Path to Gambio shop, without trailing slash.
- `user` (required) - *String* - Login user.
- `pass` (required) - *String* - Login password.
- `version` (optional) - *String* - API version - Default: 'v2'.

## API

### Countries

#### Get Country

Returns a country entity, selected by the ID.

Method: `API.countries.getById(id)`

Parameter: `id` - Country ID {number}

**Example**:
```js
const API = new GambioApi({ ... })

API.countries.getById(28)
  .then(console.log)
  .catch((console.error);
```
#### Get Zones From A Country
Returns the related zones from a country, selected by the Country ID.

Method: `API.countries.getZonesByCountryId()`

Parameter: `id` - Country ID {number}

**Example**:
```js
const API = new GambioApi({ ... })

API.countries.getZonesByCountryId(28)
  .then(console.log)
  .catch((console.error);
```

Zones

- Get Zone - getById()

Addresses

- Get Address - getById()
- Create Address - create()
- Delete Address - deleteById()
- Update Address - updateById()

Customers
- Get
  - Get All Customers - get()
  - Get All Guest Customers - getGuests()
  - Get Customer - getById()
  - Get Addresses From Customer getAddressByCustomerId()
- Search For Customers - search()
- Create Customer - create()
- Delete Customer - deleteById()
- Update Customer - updateById()

Emails

- Get
  - Get All E-Mails - get()
  - Get Pending E-Mails - getPending()
  - Get Sent E-Mails - getSent()
  - Get E-Mail - getById()
- Search For E-Mails - search()
- Delete E-Mail - deleteById()
- Queue E-Mail - queue()
- Send E-Mail - send()
- TODO: Upload Attachment - uploadAttachment()

# GambioApi [![Build Status](https://travis-ci.org/ronaldloyko/node-gambio-api.svg?branch=master)](https://travis-ci.org/ronaldloyko/node-gambio-api)

Simple API for Node, that talks to the integrated REST-API in Gambio web shops.

## Content
- Installation


## Installation
`npm install gambio-api`

** This library only works with newer node versions - minimum version required: 4.0 **

## Usage
```js
// Require module.
const GambioApi = require('gambio-api');

// Instantiation.
const API = new GambioApi({
  url: 'http://myshop.com',
  user: 'admin@myshop.de',
  pass: '12345',
});

// Get all customers.
const request = API.customers.get();

// Request returns a promise.
request
  .then(console.log)
  .catch(console.error);

```

## Options
These instantiation options are available:

- `url` *String* - Path to Gambio shop, without trailing slash (String).
- `user` *String* - Login user.
- `pass` *String* - Login password.
- `version` *String* - optional - API version (default: `v2`).

## API

### Countries - Get Country

**Description**
- Returns a country, selected by the country ID.

**Method**:
- `API.countries.getById(id)`

**Parameters**
- `id` *Integer* - Country ID

**Example**:
```js
const API = new GambioApi({ ... })

API.countries.getById(28)
  .then(console.log)
  .catch((console.error);
```

### Countries - Get Zones From A Country

**Description**
- Returns the related zones from a country, selected by the country ID.

**Method**
- `API.countries.getZonesByCountryId()`

**Parameters**
- `id` *Integer* - Country ID

**Example**:
```js
const API = new GambioApi({ ... })

API.countries.getZonesByCountryId(28)
  .then(console.log)
  .catch((console.error);
```

---

### Zones - Get Zone

**Description**
- Returns a zone, selected by the zone ID.

**Method**
- `API.zones.getById()`

**Parameters**
- `id` *Integer* - Zone ID

**Example**:
```js
const API = new GambioApi({ ... })

API.zones.getById(2)
  .then(console.log)
  .catch((console.error);
```

---

### Addresses - Get Address

**Description**
- Returns an address, selected by the address ID.

**Method**
- `API.addresses.getById()`

**Parameters**
- `id` *Integer* - Address ID

**Example**:
```js
const API = new GambioApi({ ... })

API.addresses.getById(7)
  .then(console.log)
  .catch((console.error);
```

### Addresses - Create Address

**Description**
- Creates a new address.

**Method**
- `API.addresses.create()`

**Parameters**
- `data` *Object* - Address data.


**Example**:
```js
const API = new GambioApi({ ... })

const data = {
  customerId: 1,
  gender: 'm',
  company: 'Test Company',
  firstname: 'John',
  lastname: 'Doe',
  street: 'Test Street 1',
  suburb: 'Test Suburb',
  postcode: '23983',
  city: 'Test City',
  countryId: 81,
  zoneId: 84,
  class: null,
  b2bStatus: false,
};

API.addresses.create(data)
  .then(console.log)
  .catch((console.error);
```

### Addresses - Delete Address

**Description**
- Deletes an address.

**Method**
- `API.addresses.deleteById()`

**Parameters**
- `id` *Integer* - Address ID.


**Example**:
```js
const API = new GambioApi({ ... })

API.addresses.deleteById(9)
  .then(console.log)
  .catch((console.error);
```

### Addresses - Update Address

**Description**
- Updates an address.

**Method**
- `API.addresses.updateById()`

**Parameters**
- `id` *Integer* - Address ID.
- `data` *Object* - Address data.

**Example**:
```js
const API = new GambioApi({ ... })

const data = {
  customerId: 1,
  gender: 'f',
  company: 'Test Company',
  firstname: 'John',
  lastname: 'Doe',
  street: 'Test Street 1',
  suburb: 'Test Suburb',
  postcode: '23983',
  city: 'Test City',
  countryId: 81,
  zoneId: 84,
  class: null,
  b2bStatus: false,
};

API.addresses.updateById(9, data)
  .then(console.log)
  .catch((console.error);
```

---

### Customers - Get All Customers

**Description**
- Returns all customers.
- Optionally you can request a sorted result by passing the `sorting` argument.
- If provided, `sorting` should be a hash with the field name as key and `asc` or `desc` as value.  

**Method**
- `API.addresses.get()`

**Parameters**
- `sorting` *Object* Sorting criteria (optional).

**Example**:
```js
const API = new GambioApi({ ... })

// Get all customers.
API.addresses.get()
  .then(console.log)
  .catch((console.error);

// With sorting criteria (sort by ID in descending order).
API.addresses.get({ id : 'desc' })
  .then(console.log)
  .catch((console.error);

// With multiple sorting criteria (sort by ID in descending order and first name in ascending order).
API.addresses.get({ id : 'desc', firstname: 'asc'})
  .then(console.log)
  .catch((console.error);
```

Customers
- Get
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

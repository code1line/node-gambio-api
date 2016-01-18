# GambioApi [![Build Status](https://travis-ci.org/ronaldloyko/node-gambio-api.svg?branch=master)](https://travis-ci.org/ronaldloyko/node-gambio-api)

Simple API for Node, that performs requests to the integrated REST-API of Gambio web shops.

## Table of contents
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [API](#api)
  - [Countries](#countries-get)
  - Zones
  - Addresses
  - Customers
  - E-Mails
- Contributing
- License

## Installation
`npm install gambio-api`

**This library works with newer node versions only - minimum version required: 4.0**

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
  .then((result) => {
    // Will log the result.
    console.log(result);
  })
  .catch((error) => {
    // Will log error stack trace to console.
    console.error(error);
  });

```

[back to top](#table-of-contents)

## Options
These instantiation options are available:

- `url` *String* - Path to Gambio shop, without trailing slash (String).
- `user` *String* - Login user.
- `pass` *String* - Login password.
- `version` *String* - optional - API version (default: `v2`).

[back to top](#table-of-contents)

## API

### Countries - Get

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
  .catch(console.error);
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
  .catch(console.error);
```

[back to top](#table-of-contents)

---

### Zones - Get

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
  .catch(console.error);
```

[back to top](#table-of-contents)

---

### Addresses - Get

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
  .catch(console.error);
```

### Addresses - Create

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
  .catch(console.error);
```

### Addresses - Delete

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
  .catch(console.error);
```

### Addresses - Update

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
  .catch(console.error);
```

[back to top](#table-of-contents)

---

### Customers - Get All

**Description**
- Returns all customers.
- Optionally you can request a sorted result by passing a `sorting` argument.
- If provided, `sorting` should be a hash with the field name as key and `asc` or `desc` as value.  

**Method**
- `API.customers.get()`

**Parameters**
- `sorting` *Object* Sorting criteria (optional).

**Example**:
```js
const API = new GambioApi({ ... })

// Get all customers.
API.customers.get()
  .then(console.log)
  .catch(console.error);

// With sorting criteria (sort by ID in descending order).
API.customers.get({ id : 'desc' })
  .then(console.log)
  .catch(console.error);

// With multiple sorting criteria (sort by ID in descending order and first name in ascending order).
API.customers.get({ id : 'desc', firstname: 'asc'})
  .then(console.log)
  .catch(console.error);
```

### Customers - Get All Guests

**Description**
- Returns all customers, that are guests.

**Method**
- `API.customers.getGuests()`

**Example**:
```js
const API = new GambioApi({ ... })

// Get all guest customers.
API.customers.getGuests()
  .then(console.log)
  .catch(console.error);
```

### Customers - Get

**Description**
- Returns a customer, selected by the customer ID.

**Method**
- `API.customers.getById()`

**Parameters**
- `id` *Integer* Customer ID.


**Example**:
```js
const API = new GambioApi({ ... })

API.customers.getById(4)
  .then(console.log)
  .catch(console.error);
```

### Customers - Get Addresses From Customer

**Description**
- Returns related addresses to a customer, selected by the customer ID.

**Method**
- `API.customers.getAddressesByCustomerId()`

**Parameters**
- `id` *Integer* Customer ID.


**Example**:
```js
const API = new GambioApi({ ... })

API.customers.getAddressesByCustomerId(6)
  .then(console.log)
  .catch(console.error);
```

### Customers - Search

**Description**
- Searches for specific term in customers.

**Method**
- `API.customers.search()`

**Parameters**
- `term` *String* Search term.


**Example**:
```js
const API = new GambioApi({ ... })

API.customers.search('John')
  .then(console.log)
  .catch(console.error);
```

### Customers - Create

**Description**
- Creates a new customer.

**Method**
- `API.customers.create()`

**Parameters**
- `data` *Object* Customer data.


**Example**:
```js
const API = new GambioApi({ ... });

const data = {
  gender: 'm',
  firstname: 'John',
  lastname: 'Doe',
  dateOfBirth: '1985-02-13',
  vatNumber: '0923429837942',
  telephone: '2343948798345',
  fax: '2093049283',
  email: 'hello@email.com',
  password: '0123456789',
  type: 'registree',
  address: {
    company: 'Test Company',
    street: 'Test Street',
    suburb: 'Test Suburb',
    postcode: '23983',
    city: 'Test City',
    countryId: 81,
    zoneId: 84,
    b2bStatus: true,
  },
};

API.customers.create(data)
  .then(console.log)
  .catch(console.error);
```

### Customers - Delete

**Description**
- Deletes a customer.

**Method**
- `API.customers.deleteById()`

**Parameters**
- `id` *Integer* Customer ID.


**Example**:
```js
const API = new GambioApi({ ... });

API.customers.deleteById(6)
  .then(console.log)
  .catch(console.error);
```

### Customers - Update

**Description**
- Updates a customer.

**Method**
- `API.customers.updateById()`

**Parameters**
- `id` *Integer* Customer ID.
- `data` *Object* Customer data.


**Example**:
```js
const API = new GambioApi({ ... });

const data = {
  gender: 'm',
  firstname: 'John',
  lastname: 'Doe',
  dateOfBirth: '1985-02-13',
  vatNumber: '0923429837942',
  telephone: '2343948798345',
  fax: '2093049283',
  email: hello@email.com,
  password: '0123456789',
  type: 'registree',
  address: {
    company: 'Test Company',
    street: 'Test Street',
    suburb: 'Test Suburb',
    postcode: '23983',
    city: 'Test City',
    countryId: 81,
    zoneId: 84,
    b2bStatus: true,
  },
};

API.customers.updateById(98, data)
  .then(console.log)
  .catch(console.error);
```

[back to top](#table-of-contents)

---

### E-Mails - Get All

**Description**
- Returns all E-Mails.
- Optionally you can request a sorted result by passing a `sorting` argument.
- If provided, `sorting` should be a hash with the field name as key and `asc` or `desc` as value.  

**Method**
- `API.emails.get()`

**Parameters**
- `sorting` *Object* Sorting criteria (optional).

**Example**:
```js
const API = new GambioApi({ ... })

// Get all E-Mails.
API.emails.get()
  .then(console.log)
  .catch(console.error);

// With sorting criteria (sort by ID in descending order).
API.emails.get({ id : 'desc' })
  .then(console.log)
  .catch(console.error);

// With multiple sorting criteria (sort by ID in descending order and first name in ascending order).
API.emails.get({ id : 'desc', firstname: 'asc'})
  .then(console.log)
  .catch(console.error);
```

### E-Mails - Get All Pending

**Description**
- Returns all pending E-Mails.

**Method**
- `API.emails.getPending()`

**Example**:
```js
const API = new GambioApi({ ... });

API.emails.getPending()
  .then(console.log)
  .catch(console.error);
```

### E-Mails - Get All Sent

**Description**
- Returns all sent E-Mails.

**Method**
- `API.emails.getSent()`

**Example**:
```js
const API = new GambioApi({ ... });

API.emails.getSent()
  .then(console.log)
  .catch(console.error);
```

### E-Mails - Get

**Description**
- Returns an E-Mail, selected by the E-Mail ID.

**Method**
- `API.emails.getById()`

**Parameters**
- `id` *Integer* E-Mail ID.

**Example**:
```js
const API = new GambioApi({ ... });

API.emails.getById(4)
  .then(console.log)
  .catch(console.error);
```

### E-Mails - Search

**Description**
- Searches for a specific term in E-Mails.

**Method**
- `API.emails.search()`

**Parameters**
- `term` *String* Search term.

**Example**:
```js
const API = new GambioApi({ ... });

API.emails.search('hello@test.com')
  .then(console.log)
  .catch(console.error);
```

### E-Mails - Delete

**Description**
- Delete an E-Mails.

**Method**
- `API.emails.deleteById()`

**Parameters**
- `id` *Integer* E-Mail ID.

**Example**:
```js
const API = new GambioApi({ ... });

API.emails.deleteById(82)
  .then(console.log)
  .catch(console.error);
```

### E-Mails - Queue

**Description**
- Queues a new E-Mail, so that it can be sent later.

**Method**
- `API.emails.queue()`

**Parameters**
- `data` *Object* E-Mail data.

**Example**:
```js
const API = new GambioApi({ ... });

const data = {
  subject: 'Test Subject',
  sender: {
    emailAddress: 'sender@email.de',
    contactName: 'John Doe',
  },
  recipient: {
    emailAddress: 'recipient@email.de',
    contactName: 'Jane Doe',
  },
  replyTo: {
    emailAddress: 'reply_to@email.de',
    contactName: 'John Doe (Reply To)',
  },
  contentHtml: '<strong>HTML Content</content>',
  contentPlain: 'Plain Content',
  bcc: [
    {
      emailAddress: 'bcc@email.de',
      contactName: 'Chris Doe',
    },
  ],
  cc: [
    {
      emailAddress: 'cc@email.de',
      contactName: 'Chloe Doe',
    },
  ],
};

API.emails.queue(data)
  .then(console.log)
  .catch(console.error);
```

### E-Mails - Send

**Description**
- Sends a new or existing E-Mail.
- Providing `id` only will send an existing one.
- Skipping `id` with `null` or `undefined` while passing in `data` will create and send a new E-Mail.

**Method**
- `API.emails.send()`

**Parameters**
- `id` *Integer* E-Mail ID (optional).
- `data` *Object* E-Mail data (optional).

**Example**:
```js
const API = new GambioApi({ ... });

const data = {
  subject: 'Test Subject',
  sender: {
    emailAddress: 'sender@email.de',
    contactName: 'John Doe',
  },
  recipient: {
    emailAddress: 'recipient@email.de',
    contactName: 'Jane Doe',
  },
  replyTo: {
    emailAddress: 'reply_to@email.de',
    contactName: 'John Doe (Reply To)',
  },
  contentHtml: '<strong>HTML Content</content>',
  contentPlain: 'Plain Content',
  bcc: [
    {
      emailAddress: 'bcc@email.de',
      contactName: 'Chris Doe',
    },
  ],
  cc: [
    {
      emailAddress: 'cc@email.de',
      contactName: 'Chloe Doe',
    },
  ],
};

// Send queued E-Mail by ID.
API.emails.send(17)
  .then(console.log)
  .catch(console.error);

// Send new E-Mail.
API.emails.send(null, data)
  .then(console.log)
  .catch(console.error);
```

[back to top](#table-of-contents)

## Contributing

Feel free to send your pull requests!

Tasks:

- Install all necessary dependencies: `npm install`
- Lint and run tests: `npm test`

Directory structure:

- `demo` contains demo credentials and some executable node files for demonstration.
- `lib` contains the library core files.
  - `api` contains API classes for each endpoint.
  - `error` contains custom error classes.
- `test` contains the test specs.

Coding guidelines:

- Code has to be written in ES6.
- Code must pass through the linter - Refer to AirBnb's Coding Guidelines.
- Test first, then write your code - TDD!

[back to top](#table-of-contents)

## License

The MIT License (MIT)

Copyright (c) 2016 Ronald Loyko

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[back to top](#table-of-contents)

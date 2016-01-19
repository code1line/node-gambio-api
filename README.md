# GambioApi [![Build Status](https://travis-ci.org/ronaldloyko/node-gambio-api.svg?branch=master)](https://travis-ci.org/ronaldloyko/node-gambio-api)

[![NPM](https://nodei.co/npm/gambio-api.png)](https://nodei.co/npm/gambio-api)

Simple API for Node, that performs requests to the integrated REST-API of Gambio web shops.

## Table of contents
- [Installation](#installation)
- [Usage](#usage)
- [Making requests](#making-requests)
- [Options](#options)
- [API](#api)
  - [Countries](#countries-get)
    - [Get](#countries---get)
    - [Get Zones From A Country](#countries---get-zones-from-a-country)
  - [Zones](#zones---get)
    - [Get](#zones---get)
  - [Addresses](#addresses---get)
    - [Get](#addresses---get)
    - [Create](#addresses---create)
    - [Delete](#addresses---delete)
    - [Update](#addresses---update)
  - [Customers](#customers---get-all)
    - [Get All](#customers---get-all)
    - [Get All Guests](#customers---get-all-guests)
    - [Get](#customers---get)
    - [Get Addresses From Customer](#customers---get-addresses-from-customer)
    - [Search](#customers---search)
    - [Create](#customers---create)
    - [Delete](#customers---delete)
    - [Update](#customers---update)
  - [E-Mails](#e-mails---get-all)
    - [Get All](#e-mails---get-all)
    - [Get All Pending](e-mails---get-all-pending)
    - [Get All Sent](e-mails---get-all-sent)
    - [Get](e-mails---get)
    - [Search](e-mails---search)
    - [Delete](e-mails---delete)
    - [Queue](e-mails---queue)
    - [Send](e-mails---send)
- [Contributing](#contributing)
- [License](#license)

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
    console.log('Showing all customers:');
    console.log(result);
  })
  .catch(function (error) {
    console.log('Oh no! An error occured!');
    console.error(error);
  });

```

[back to top](#table-of-contents)

## Making requests

Every request returns a promise which gets resolved on successful response returned from server or it gets rejected if an error has been thrown.

If JSON is returned from server, the resolved promise contains the parsed JSON response as plain JS object.

```js
const API = new GambioApi({ ... });

API.customers.getById(7)

  /**
   * 'then' is always called on successful response returned from server.
   *
   * Console output:
   * {
   *   id: 38,
   *   number: '38',
   *   gender: 'm',
   *   firstname: 'John',
   *   lastname: 'Doe',
   *   dateOfBirth: '1985-02-13',
   *   vatNumber: '0923429837942',
   *   vatNumberStatus: 8,
   *   telephone: '2343948798345',
   *   fax: '2093049283',
   *   email: 'gambio.test.emai.from.node.api@test.com',
   *   statusId: 2,
   *   isGuest: false,
   *   addressId: 41,
   *   _links: {
   *     address: 'https://www.gambio-shop.de/shop1/api.php/v2/addresses/41'
   *   }
   * }
   */
  .then(console.log)

  /**
   * 'catch' is called if any error has been thrown.
   *
   * In this example, the resource could not be found.
   *
   * Console output:
   * { [ClientError: Customer record could not be found.]
   *   name: 'ClientError',
   *   code: 404,
   *   data: {
   *     response: {
   *         statusCode: 404,
   *         body: '...',
   *       headers: {},
   *     request: {}
   *     }
   *   }
   * }
   */
  .catch(console.log);

```

**To see a working example you can run the [demo script](/demo/CreateGetUpdateDeleteCustomer.js) inside the `demo` folder!**

Please note, that this module uses custom error classes.

Meaning, that the thrown error could be an instance of:
- `RequestError` if there was an error while sending request to server
- `ClientError` if the server returned a 4xx status code, mostly an error caused by the requesting client
- `ServerError` if the server returned a 5xx status code, mostly a server-side error

[back to top](#table-of-contents)

## Options
These instantiation options are available:

- `url` *String* - Path to Gambio shop, without trailing slash.
- `user` *String* - Login user.
- `pass` *String* - Login password.
- `version` *String* - optional - API version (default: `v2`).

[back to top](#table-of-contents)

## API

### Countries - Get

**Description**:
- Returns a country, selected by the country ID.

**Method**:
- `API.countries.getById(id)`

**Parameters**:
- `id` *Integer* - Country ID

**Example**:
```js
const API = new GambioApi({ ... });

API.countries.getById(28)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**:
```js
{
  id: 81,
  name: "Germany",
  iso2: "DE",
  iso3: "DEU",
  addressFormatId: 5,
  status: true
}
```

### Countries - Get Zones From A Country

**Description**:
- Returns the related zones from a country, selected by the country ID.

**Method**:
- `API.countries.getZonesByCountryId(id)`

**Parameters**:
- `id` *Integer* - Country ID

**Example**:
```js
const API = new GambioApi({ ... });

API.countries.getZonesByCountryId(28)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**:
```js
[
    {
        id: 80,
        name: "Baden-W\u00fcrttemberg",
        iso: "BAW"
    },
    {
        id: 81,
        name: "Bayern",
        iso: "BAY"
    },
    {
        id: 82,
        name: "Berlin",
        iso: "BER"
    },
    {
        id: 84,
        name: "Bremen",
        iso: "BRE"
    },
    {
        id: 83,
        name: "Brandenburg",
        iso: "BRG"
    },
    {
        id: 85,
        name: "Hamburg",
        iso: "HAM"
    }
]
```

[back to top](#table-of-contents)

---

### Zones - Get

**Description**:
- Returns a zone, selected by the zone ID.

**Method**:
- `API.zones.getById(id)`

**Parameters**:
- `id` *Integer* - Zone ID

**Example**:
```js
const API = new GambioApi({ ... });

API.zones.getById(2)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**:
```js
{
    id: 84,
    name: "Bremen",
    iso: "BRE"
}
```

[back to top](#table-of-contents)

---

### Addresses - Get

**Description**:
- Returns an address, selected by the address ID.

**Method**:
- `API.addresses.getById(id)`

**Parameters**:
- `id` *Integer* - Address ID

**Example**:
```js
const API = new GambioApi({ ... });

API.addresses.getById(7)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**:
```js

```

### Addresses - Create

**Description**:
- Creates a new address.

**Method**:
- `API.addresses.create(data)`

**Parameters**:
- `data` *Object* - Address data.


**Example**:
```js
const API = new GambioApi({ ... });

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

**Returns in resolved promise**:
```js

```

### Addresses - Delete

**Description**:
- Deletes an address.

**Method**:
- `API.addresses.deleteById(id)`

**Parameters**:
- `id` *Integer* - Address ID.


**Example**:
```js
const API = new GambioApi({ ... });

API.addresses.deleteById(9)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**:
```js

```

### Addresses - Update

**Description**:
- Updates an address.

**Method**:
- `API.addresses.updateById(id, data)`

**Parameters**:
- `id` *Integer* - Address ID.
- `data` *Object* - Address data.

**Example**:
```js
const API = new GambioApi({ ... });

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

**Returns in resolved promise**:
```js

```

[back to top](#table-of-contents)

---

### Customers - Get All

**Description**:
- Returns all customers.
- Optionally you can request a sorted result by passing a `sorting` argument.
- If provided, `sorting` should be a hash with the field name as key and `asc` or `desc` as value.  

**Method**:
- `API.customers.get(sorting)`

**Parameters**:
- `sorting` *Object* - Sorting criteria (optional).

**Example**:
```js
const API = new GambioApi({ ... });

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

**Returns in resolved promise**:
```js

```

### Customers - Get All Guests

**Description**:
- Returns all customers, that are guests.

**Method**:
- `API.customers.getGuests()`

**Example**:
```js
const API = new GambioApi({ ... });

// Get all guest customers.
API.customers.getGuests()
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**:
```js

```

### Customers - Get

**Description**:
- Returns a customer, selected by the customer ID.

**Method**:
- `API.customers.getById(id)`

**Parameters**:
- `id` *Integer* - Customer ID.


**Example**:
```js
const API = new GambioApi({ ... });

API.customers.getById(4)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**:
```js

```

### Customers - Get Addresses From Customer

**Description**:
- Returns related addresses to a customer, selected by the customer ID.

**Method**:
- `API.customers.getAddressesByCustomerId(id)`

**Parameters**:
- `id` *Integer* - Customer ID.


**Example**:
```js
const API = new GambioApi({ ... });

API.customers.getAddressesByCustomerId(6)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**:
```js

```

### Customers - Search

**Description**:
- Searches for specific term in customers.

**Method**:
- `API.customers.search(term)`

**Parameters**:
- `term` *String* - Search term.


**Example**:
```js
const API = new GambioApi({ ... });

API.customers.search('John')
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**:
```js

```

### Customers - Create

**Description**:
- Creates a new customer.

**Method**:
- `API.customers.create(data)`

**Parameters**:
- `data` *Object* - Customer data.


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

**Returns in resolved promise**:
```js

```

### Customers - Delete

**Description**:
- Deletes a customer.

**Method**:
- `API.customers.deleteById(id)`

**Parameters**:
- `id` *Integer* - Customer ID.


**Example**:
```js
const API = new GambioApi({ ... });

API.customers.deleteById(6)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**:
```js

```

### Customers - Update

**Description**:
- Updates a customer.

**Method**:
- `API.customers.updateById(id, data)`

**Parameters**:
- `id` *Integer* - Customer ID.
- `data` *Object* - Customer data.


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

**Returns in resolved promise**:
```js

```

[back to top](#table-of-contents)

---

### E-Mails - Get All

**Description**:
- Returns all E-Mails.
- Optionally you can request a sorted result by passing a `sorting` argument.
- If provided, `sorting` should be a hash with the field name as key and `asc` or `desc` as value.  

**Method**:
- `API.emails.get(sorting)`

**Parameters**:
- `sorting` *Object* - Sorting criteria (optional).

**Example**:
```js
const API = new GambioApi({ ... });

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

**Returns in resolved promise**:
```js

```

### E-Mails - Get All Pending

**Description**:
- Returns all pending E-Mails.

**Method**:
- `API.emails.getPending()`

**Example**:
```js
const API = new GambioApi({ ... });

API.emails.getPending()
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**:
```js

```

### E-Mails - Get All Sent

**Description**:
- Returns all sent E-Mails.

**Method**:
- `API.emails.getSent()`

**Example**:
```js
const API = new GambioApi({ ... });

API.emails.getSent()
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**:
```js

```

### E-Mails - Get

**Description**:
- Returns an E-Mail, selected by the E-Mail ID.

**Method**:
- `API.emails.getById(id)`

**Parameters**:
- `id` *Integer* - E-Mail ID.

**Example**:
```js
const API = new GambioApi({ ... });

API.emails.getById(4)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**:
```js

```

### E-Mails - Search

**Description**:
- Searches for a specific term in E-Mails.

**Method**:
- `API.emails.search(term)`

**Parameters**:
- `term` *String* - Search term.

**Example**:
```js
const API = new GambioApi({ ... });

API.emails.search('hello@test.com')
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**:
```js

```

### E-Mails - Delete

**Description**:
- Delete an E-Mails.

**Method**:
- `API.emails.deleteById(id)`

**Parameters**:
- `id` *Integer* - E-Mail ID.

**Example**:
```js
const API = new GambioApi({ ... });

API.emails.deleteById(82)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**:
```js

```

### E-Mails - Queue

**Description**:
- Queues a new E-Mail, so that it can be sent later.

**Method**:
- `API.emails.queue(data)`

**Parameters**:
- `data` *Object* - E-Mail data.

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

**Returns in resolved promise**:
```js

```

### E-Mails - Send

**Description**:
- Sends a new or existing E-Mail.
- Providing `id` only will send an existing one.
- Skipping `id` with `null` or `undefined` while passing in `data` will create and send a new E-Mail.

**Method**:
- `API.emails.send(id, data)`

**Parameters**:
- `id` *Integer* - E-Mail ID (optional).
- `data` *Object* - E-Mail data (optional).

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

**Returns in resolved promise**:
```js

```

[back to top](#table-of-contents)

## Contributing

Feel free to send your pull requests!

Read [contributing docs](/CONTRIBUTING.md) for more information about contributing to this project.

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

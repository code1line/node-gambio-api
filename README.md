# GambioApi [![Build Status](https://travis-ci.org/ronaldloyko/node-gambio-api.svg?branch=master)](https://travis-ci.org/ronaldloyko/node-gambio-api) [![NPM](https://nodei.co/npm/gambio-api.png?mini=true)](https://nodei.co/npm/gambio-api/)

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

**Minimum node version required: 4.0**

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

**To see a working example you can run the [example script](https://github.com/ronaldloyko/node-gambio-api/blob/master/demo/CreateGetUpdateDeleteCustomer.js) inside the `demo` folder!**

Every request returns a promise which
- gets resolved on successful response returned from server
- gets rejected if an error has been thrown/returned from server

```js
const API = new GambioApi({ ... });

API.customers.get()

  // 'then' is called, if a response is returned from server.
  .then()

  //'catch' is called if any error has been thrown.
  .catch();

```

#### Response

Every successful response gets parsed from JSON to a JavaScript object/array.

```js
// Create instance.
const API = new GambioApi({ ... });

// Perform request.
API.customers.getById(1).then(console.log);

// Console output:
{
  id: 1,
  number: '',
  gender: 'm',
  firstname: 'Tester',
  lastname: 'Tester',
  dateOfBirth: '0000-00-00',
  vatNumber: '',
  vatNumberStatus: 0,
  telephone: '0123456789',
  fax: '',
  email: 'admin@shop.de',
  statusId: 0,
  isGuest: false,
  addressId: 1
}

```

#### Error

Note, that this module uses custom error classes which means, that the thrown error in a rejected promise could be an instance of:
- `RequestError` if there was an error while sending request to server.
- `ClientError` if the server returned a 4xx status code, mostly an error caused by the requesting client.
- `ServerError` if the server returned a 5xx status code, mostly an internal server-side error.

```js
// Create instance.
const API = new GambioApi({ ... });

// Perform request (assuming that customer with ID 9999999 does not exist ).
API.customers.getById(9999999).catch(console.log);

// Console output:
{ [ClientError: Customer record could not be found.]
  name: 'ClientError',
  code: 404,
  data: {
    response: {
        statusCode: 404,
        body: '...',
      headers: {},
    request: {}
    }
  }
}
```

The thrown error object contains additional properties like
- `code` Status code sent from server
- `data` raw request and response data

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

**Returns in resolved promise**: *Object*
```js
{
  id: 28,
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

**Returns in resolved promise**: *Array*
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

**Returns in resolved promise**: *Object*
```js
{
    id: 2,
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

**Returns in resolved promise**: *Object*
```js
{
  id: 7,
  customerId: 1,
  gender: "",
  company: "Testfirma",
  firstname: "Tester",
  lastname: "Tester",
  street: "Teststr. 1",
  suburb: "",
  postcode: "12345",
  city: "Testort",
  countryId: 81,
  zoneId: 84,
  class: null,
  b2bStatus: false
}

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

**Returns in resolved promise**: *Object*
```js
{
  id: 44,
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
  b2bStatus: false
}

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

API.addresses.deleteById(2)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Object*
```js
{
  code: 200,
  status: 'success',
  action: 'delete',
  addressId: 2
}

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
  gender: 'f'
};

API.addresses.updateById(9, data)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Object*
```js
{
  id: 1,
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
  b2bStatus: false
}

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

**Returns in resolved promise**: *Array*
```js
// API.customers.get();
[{
  id: 1,
  number: '',
  gender: 'm',
  firstname: 'Tester',
  lastname: 'Tester',
  dateOfBirth: '0000-00-00',
  vatNumber: '',
  vatNumberStatus: 0,
  telephone: '0123456789',
  fax: '',
  email: 'admin@shop.de',
  statusId: 0,
  isGuest: false,
  addressId: 1
}, {
  id: 2,
  number: '2',
  gender: 'm',
  firstname: 'Testbestellung',
  lastname: 'Testbestellung',
  dateOfBirth: '0000-00-00',
  vatNumber: '',
  vatNumberStatus: 0,
  telephone: '',
  fax: '',
  email: 'Testbestellung@gambio.de',
  statusId: 2,
  isGuest: false,
  addressId: null
}]

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

**Returns in resolved promise**: *Array*
```js
[{
  id: 11,
  number: '11',
  gender: 'f',
  firstname: 'Hannah',
  lastname: 'Montana',
  dateOfBirth: '0000-00-00',
  vatNumber: '',
  vatNumberStatus: 0,
  telephone: '',
  fax: '',
  email: 'hannah@gmail.com',
  statusId: 0,
  isGuest: true,
  addressId: 11
}, {
  id: 12,
  number: '12',
  gender: 'm',
  firstname: 'ssssssssssssssss',
  lastname: 'ssssssssssssssss',
  dateOfBirth: '0000-00-00',
  vatNumber: '',
  vatNumberStatus: 0,
  telephone: '',
  fax: '',
  email: 'chrispaul@email.de',
  statusId: 1,
  isGuest: true,
  addressId: 14
}]

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

API.customers.getById(1)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Object*
```js
{
  id: 1,
  number: '',
  gender: 'm',
  firstname: 'Tester',
  lastname: 'Tester',
  dateOfBirth: '0000-00-00',
  vatNumber: '',
  vatNumberStatus: 0,
  telephone: '0123456789',
  fax: '',
  email: 'admin@shop.de',
  statusId: 0,
  isGuest: false,
  addressId: 1
}
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

**Returns in resolved promise**: *Array*
```js
[{
  id: 1,
  customerId: 1,
  gender: '',
  company: 'Testfirma',
  firstname: 'Tester',
  lastname: 'Tester',
  street: 'Teststr. 1',
  suburb: '',
  postcode: '12345',
  city: 'Testort',
  countryId: 81,
  zoneId: 84,
  class: null,
  b2bStatus: false
}]

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

API.customers.search('Otto')
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Array*
```js
[{
  id: 35,
  number: '35',
  gender: 'm',
  firstname: 'Otto',
  lastname: 'Oltmann',
  dateOfBirth: '0000-00-00',
  vatNumber: '',
  vatNumberStatus: 0,
  telephone: '',
  fax: '',
  email: 'oltmann@test.de',
  statusId: 2,
  isGuest: false,
  addressId: 38
}]
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

**Returns in resolved promise**: *Object*
```js
{
  id: 38,
  number: '38',
  gender: 'm',
  firstname: 'John',
  lastname: 'Doe',
  dateOfBirth: '1985-02-13',
  vatNumber: '0923429837942',
  vatNumberStatus: 8,
  telephone: '2343948798345',
  fax: '2093049283',
  email: 'hello@email.com',
  statusId: 2,
  isGuest: false,
  addressId: 41
}

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

API.customers.deleteById(38)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Object*
```js
{
  code: 200,
  status: 'success',
  action: 'delete',
  customerId: 38
}

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
  gender: 'f'
};

API.customers.updateById(1, data)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Object*
```js
{
  id: 1,
  number: '',
  gender: 'm',
  firstname: 'Tester',
  lastname: 'Tester',
  dateOfBirth: '0000-00-00',
  vatNumber: '',
  vatNumberStatus: 0,
  telephone: '0123456789',
  fax: '',
  email: 'admin@shop.de',
  statusId: 0,
  isGuest: false,
  addressId: 1
}

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

**Returns in resolved promise**: *Array*
```js
// API.emails.get()
[{
  id: 14,
  subject: 'Ihre Bestellung 400310, am Donnerstag, 02. Juli 2015',
  sender: {
    emailAddress: 'admin@shop.de',
    contactName: 'Tester Tester'
  },
  recipient: {
    emailAddress: 'testshop1@gambio.de',
    contactName: 'Testshop'
  },
  replyTo: {
    emailAddress: 'admin@shop.de',
    contactName: 'Tester Tester'
  },
  contentHtml: '...',
  contentPlain: '...',
  isPending: false,
  creationDate: '2015-07-02 13:56:07',
  sentDate: '2015-07-02 13:56:08',
  bcc: [],
  cc: [],
  attachments: []
}]
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

**Returns in resolved promise**: *Array*
```js
[{
  id: 18,
  subject: 'Test-Mail',
  sender: {
    emailAddress: 'admin@shop.de',
    contactName: 'Tester Tester'
  },
  recipient: {
    emailAddress: 'testshop1@gambio.de',
    contactName: 'Testshop'
  },
  replyTo: {
    emailAddress: 'admin@shop.de',
    contactName: 'Tester Tester'
  },
  contentHtml: '...',
  contentPlain: '...',
  isPending: true,
  creationDate: '2015-07-02 14:00:07',
  bcc: [],
  cc: [],
  attachments: []
}]
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

**Returns in resolved promise**: *Array*
```js
[{
  id: 28,
  subject: 'Test-Mail',
  sender: {
    emailAddress: 'admin@shop.de',
    contactName: 'Tester Tester'
  },
  recipient: {
    emailAddress: 'testshop1@gambio.de',
    contactName: 'Testshop'
  },
  replyTo: {
    emailAddress: 'admin@shop.de',
    contactName: 'Tester Tester'
  },
  contentHtml: '...',
  contentPlain: '...',
  isPending: false,
  creationDate: '2015-07-02 14:00:07',
  sentDate: '2015-07-02 14:10:38',
  bcc: [],
  cc: [],
  attachments: []
}]
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

**Returns in resolved promise**: *Object*
```js
{
  id: 4,
  subject: 'Test-Mail',
  sender: {
    emailAddress: 'admin@shop.de',
    contactName: 'Tester Tester'
  },
  recipient: {
    emailAddress: 'testshop1@gambio.de',
    contactName: 'Testshop'
  },
  replyTo: {
    emailAddress: 'admin@shop.de',
    contactName: 'Tester Tester'
  },
  contentHtml: '...',
  contentPlain: '...',
  isPending: false,
  creationDate: '2015-07-02 14:00:07',
  sentDate: '2015-07-02 14:10:38',
  bcc: [],
  cc: [],
  attachments: []
}

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

API.emails.search('admin@shop.de')
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Array*
```js
[{
  id: 4,
  subject: 'Test-Mail',
  sender: {
    emailAddress: 'admin@shop.de',
    contactName: 'Tester Tester'
  },
  recipient: {
    emailAddress: 'testshop1@gambio.de',
    contactName: 'Testshop'
  },
  replyTo: {
    emailAddress: 'admin@shop.de',
    contactName: 'Tester Tester'
  },
  contentHtml: '...',
  contentPlain: '...',
  isPending: false,
  creationDate: '2015-07-02 14:00:07',
  sentDate: '2015-07-02 14:10:38',
  bcc: [],
  cc: [],
  attachments: []
}]

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

API.emails.deleteById(15)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Object*
```js
{
  code: 200,
  status: 'success',
  action: 'delete',
  emailId: 15
}

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

**Returns in resolved promise**: *Object*
```js
{
  id: 16,
  subject: 'Eine kurze Test-Mail',
  sender: {
    emailAddress: 'sender@email.de',
    contactName: 'John Doe'
  },
  recipient: {
    emailAddress: 'recipient@email.de',
    contactName: 'Jane Doe'
  },
  replyTo: null,
  contentHtml: null,
  contentPlain: 'Its me, John!',
  isPending: true,
  creationDate: '2016-01-19 20:10:08',
  sentDate: null,
  bcc: [],
  cc: [],
  attachments: []
}

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

**Returns in resolved promise**: *Object*
```js
// API.emails.send(16);
{
  id: 16,
  subject: 'Eine kurze Test-Mail',
  sender: {
    emailAddress: 'sender@email.de',
    contactName: 'John Doe'
  },
  recipient: {
    emailAddress: 'recipient@email.de',
    contactName: 'Jane Doe'
  },
  replyTo: null,
  contentHtml: null,
  contentPlain: 'Its me, John!',
  isPending: false,
  creationDate: '2016-01-19 20:10:08',
  sentDate: '2016-01-19 20:11:11',
  bcc: [],
  cc: [],
  attachments: []
}

```

[back to top](#table-of-contents)

## Contributing

Feel free to send your pull requests!

Read [contributing docs](https://github.com/ronaldloyko/node-gambio-api/blob/master/CONTRIBUTING.md) for more information about contributing to this project.

[back to top](#table-of-contents)

## License

Copyright (c) 2016 Ronald Loyko

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

For the complete terms of the GNU General Public License, please see this URL:
http://www.gnu.org/licenses/gpl-2.0.html

[back to top](#table-of-contents)

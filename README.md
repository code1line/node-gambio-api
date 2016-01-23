# GambioApi [![Build Status](https://travis-ci.org/ronaldloyko/node-gambio-api.svg?branch=master)](https://travis-ci.org/ronaldloyko/node-gambio-api) [![NPM](https://nodei.co/npm/gambio-api.png?mini=true)](https://nodei.co/npm/gambio-api/)

Simple API for Node, that performs requests to the integrated REST-API of Gambio web shops.

## Table of contents
- [Installation](#installation)
- [Usage](#usage)
- [Making requests](#making-requests)
- [Options](#options)
- [API](#api)
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

#### Countries

- [Get all countries](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/countries/get.md) - *API.countries.get()*
- [Get zones from a specific country](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/countries/getZonesByCountryId.md) - *API.countries.getZonesByCountryId(id)*

#### Zones

- [Get all zones](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/zones/get.md) - *API.zones.get()*


#### Addresses

- [Get a specific address](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/addresses/getById.md) - *API.addresses.getById(id)*
- [Create a new address](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/addresses/create.md) - *API.addresses.create(data)*
- [Delete an address](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/addresses/deleteById.md) - *API.addresses.deleteById(id)*
- [Update an address](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/addresses/updateById.md) - *API.addresses.updateById(id, data)*

#### Customers

- [Get all customers](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/customers/get.md) - *API.customers.get()*
- [Get all customers, that are guests](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/customers/getGuests.md) - *API.customers.getGuests()*
- [Get a specific customer](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/customers/getById.md) - *API.customers.getById(id)*
- [Get addresses from a specific customer](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/customers/getAddressesByCustomerId.md) - *API.customers.getAddressesByCustomerId(id)*
- [Search in customers](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/customers/search.md) - *API.customers.search(term)*
- [Create a new customer](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/customers/create.md) - *API.customers.create(data)*
- [Delete a customer](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/customers/deleteById.md) - *API.customers.deleteById(id)*
- [Update a customer](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/customers/updateById.md) - *API.customers.updateById(id, data)*

#### E-Mails

- [Get all E-Mails](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/emails/get.md) - *API.emails.get()*
- [Get all pending E-Mails](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/emails/getPending.md) - *API.emails.getPending()*
- [Get all sent E-Mails](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/emails/getSent.md) - - *API.emails.getSent()*
- [Get a specific E-Mail](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/emails/getById.md) - *API.emails.getById(id)*
- [Search in E-Mails](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/emails/search.md) - *API.emails.search(term)*
- [Delete an E-Mail](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/emails/deleteById.md) - *API.emails.deleteById(id)*
- [Queue an E-Mail](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/emails/queue.md) - *API.emails.queue(data)*
- [Send an E-Mail](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/emails/send.md) - *API.emails.send(id, data)*


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

[*^ back to top*](#table-of-contents)

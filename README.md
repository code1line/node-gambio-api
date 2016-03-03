![Logo](https://github.com/ronaldloyko/node-gambio-api/raw/master/logo.png)

# Gambio API Client for Node.js

[![Build Status](https://travis-ci.org/ronaldloyko/node-gambio-api.svg?branch=master)](https://travis-ci.org/ronaldloyko/node-gambio-api) [![NPM](https://nodei.co/npm/gambio-api.png?mini=true)](https://nodei.co/npm/gambio-api/)

Simple API client for Node, that performs requests to the integrated REST-API of Gambio.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Sending requests](#sending-requests)
- [API reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Installation

```sh
npm install gambio-api
```

## Usage

```js
const GambioApi = require('gambio-api');

const API = new GambioApi({
  url: 'http://myshop.com',
  user: 'admin@myshop.com',
  pass: '12345',
});

API.customers.getById(6)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

You may also [read an article](https://ronaldloyko.wordpress.com/2016/01/21/how-to-use-the-gambio-rest-api-in-node-js/) on how to use this module.

## Sending requests

#### Creating a new instance

```js
const API = new GambioApi({
  // Path to Gambio shop (without trailing slash).
  url: 'http://myshop.com',
  // Login user.
  user: 'admin@myshop.com',
  // Login password.
  pass: '12345',
});
```

#### Perform a request

The methods always return a promise.

```js
API.customers.get()
  // 'then' is called, if a response is returned from server.
  .then()

  // 'catch' is called if an error has been thrown.
  .catch();
```

#### Response

Every successful response is parsed from JSON to a JavaScript object/array.

```js
// Example request.
API.customers.getById(1).then(console.log);
```

Example console output could be:

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

#### Error

If an error code between 300 and 600 is returned the promise will be rejected with an error.

All error objects have a `data` property that contains the raw request and response data.

## API reference

This is a quick overview of all methods available.

#### Countries

- [Get a specific country](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/countries/getById.md) - *API.countries.getById(id)*
- [Get zones from a specific country](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/countries/getZonesByCountryId.md) - *API.countries.getZonesByCountryId(id)*

#### Zones

- [Get a specific zone](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/zones/getById.md) - *API.zones.getById(id)*

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
- [Send an E-Mail](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/emails/send.md) - *API.emails.send([id], [data])*

#### Categories
- [Create a new category](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/categories/create.md) - *API.categories.create(data)*
- [Delete category icon](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/categories/deleteIcon.md) - *API.categories.deleteIcon(file)*
- [Delete category image](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/categories/deleteImage.md) - *API.categories.deleteImage(file)*
- [Delete a category](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/categories/deleteById.md) - *API.categories.deleteById(id)*
- [Get all categories](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/categories/get.md) - *API.categories.get()*
- [Get a specific category](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/categories/getById.md) - *API.categories.getById(id)*
- [Search in categories](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/categories/search.md) - *API.categories.search(term)*
- [Rename category icon](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/categories/renameIcon.md) - *API.categories.renameIcon(oldName, newName)*
- [Rename category image](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/categories/renameImage.md) - *API.categories.renameImage(oldName, newName)*
- [Update a category](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/categories/updateById.md) - *API.categories.updateById(id, data)*
- [Upload a category icon](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/categories/uploadIcon.md) - *API.categories.uploadIcon(path, name)*
- [Upload a category image](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/categories/uploadImage.md) - *API.categories.uploadImage(path, name)*

#### API
- [Get module version](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/api/getVersion.md) - *API.getVersion()*

## Contributing

Pull requests are always welcome!

Read [contribution docs](https://github.com/ronaldloyko/node-gambio-api/blob/master/CONTRIBUTING.md) for more information about contributing to this project.

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

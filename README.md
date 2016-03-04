![Logo](https://github.com/ronaldloyko/node-gambio-api/raw/master/logo.png)

# Gambio API Client for Node.js

[![Build Status](https://travis-ci.org/ronaldloyko/node-gambio-api.svg?branch=master)](https://travis-ci.org/ronaldloyko/node-gambio-api) [![NPM](https://nodei.co/npm/gambio-api.png?mini=true)](https://nodei.co/npm/gambio-api/)

Simple API client for Node, that performs requests to the integrated REST-API of Gambio.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [API reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Installation

```sh
npm install gambio-api
```

## Usage

```js
import GambioApi from 'gambio-api';

const API = new GambioApi({
  url: 'https://myshop.com',
  user: 'admin@myshop.com',
  pass: '12345',
});

API.customers.getById(6)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

You may also [read an article](https://ronaldloyko.wordpress.com/2016/01/21/how-to-use-the-gambio-rest-api-in-node-js/) on how to use this module.

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

#### Performing a request

The methods always return a promise.

```js
API.customers.get()
  // 'then' is called, if a response is returned from server.
  .then()

  // 'catch' is called if an error has been thrown.
  .catch();
```

#### Response

Every successful response is parsed from JSON to a plain JavaScript object/array.

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

If an HTTP status code between 300 and 600 is returned from server, the promise will be rejected with an error.

All reject error objects have a `data` property which contains the raw request and response data.

## API reference

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

#### Orders
- [Create a new order item attribute](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/createItemAttribute.md) - *API.orders.createItemAttribute(orderId, itemId, data)*
- [Create a new order item](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/createItem.md) - *API.orders.createItem(orderId, data)*
- [Create a new order total](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/createTotal.md) - *API.orders.createTotal(orderId, data)*
- [Create a new order](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/create.md) - *API.orders.create(data)*
- [Delete order item attribute](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/deleteItemAttributeById.md) - *API.orders.deleteItemAttributeById(data)*
- [Delete order item](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/deleteItemById.md) - *API.orders.deleteItemById(orderId, itemId)*
- [Delete order total](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/deleteTotalById.md) - *API.orders.deleteTotalById(orderId, totalId)*
- [Delete order](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/deleteById.md) - *API.orders.deleteById(id)*
- [Get order status history records](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/getHistory.md) - *API.orders.getHistory(orderId)*
- [Get an order status history record](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/getHistoryById.md) - *API.orders.getHistoryById(orderId, historyId)*
- [Search in order status history](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/searchHistory.md) - *API.orders.searchHistory(orderId, term)*
- [Get order item attributes](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/getItemAttributes.md) - *API.orders.getItemAttributes(orderId, itemId)*
- [Get an order item attribute](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/getItemAttributeById.md) - *API.orders.getItemAttributeById(orderId, itemId, attributeId)*
- [Search in order item attributes](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/searchItemAttributes.md) - *API.orders.searchItemAttributes(orderId, itemId, term)*
- [Get order items](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/getItems.md) - *API.orders.getItems(orderId)*
- [Get an order item](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/getItemById.md) - *API.orders.getItemById(orderId, itemId)*
- [Search in order items](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/searchItems.md) - *API.orders.searchItems(orderId, term)*
- [Get order totals](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/getTotals.md) - *API.orders.getTotals(orderId)*
- [Get an order total](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/getTotalById.md) - *API.orders.getTotalById(orderId, totalId)*
- [Search in order totals](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/searchTotals.md) - *API.orders.searchTotals(orderId, term)*
- [Get all orders](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/get.md) - *API.orders.get()*
- [Get an order](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/getById.md) - *API.orders.getById(id)*
- [Search in orders](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/search.md) - *API.orders.search(term)*
- [Update an order item attribute](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/updateItemAttributeById.md) - *API.orders.updateItemAttributeById(orderId, itemId, attributeId, data)*
- [Update an order item](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/updateItemById.md) - *API.orders.updateItemById(orderId, itemId, data)*
- [Update an order status](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/updateStatus.md) - *API.orders.updateStatus(orderId, data)*
- [Update an order total](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/updateTotalById.md) - *API.orders.updateTotalById(orderId, totalId, data)*
- [Update an order](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/orders/updateById.md) - *API.orders.updateById(id, data)*

#### Products
- [Change product to category link](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/products/changeCategoryLink.md) - *API.products.changeCategoryLink(id, oldCategoryId, newCategoryId)*
- [Create a new product](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/products/create.md) - *API.products.create(data)*
- [Delete a product image](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/products/deleteImage.md) - *API.products.deleteImage(file)*
- [Delete a product](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/products/deleteById.md) - *API.products.deleteById(id)*
- [Get product to category links](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/products/getCategoryLinks.md) - *API.products.getCategoryLinks(id)*
- [Get products](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/products/get.md) - *API.products.get()*
- [Get a product](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/products/getById.md) - *API.products.getById(id)*
- [Search in products](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/products/search.md) - *API.products.search(term)*
- [Rename a product image](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/products/renameImage.md) - *API.products.renameImage(oldName, newName)*
- [Update a product](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/products/updateById.md) - *API.products.updateById(id, data)*
- [Upload a new product image](https://github.com/ronaldloyko/node-gambio-api/blob/master/docs/products/uploadImage.md) - *API.products.uploadImage(path, name)*


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

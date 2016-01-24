# Update a customer

### Description

Updates a customer.

### Method

```js
API.customers.updateById(id, data)
```

### Parameters

`id` - *integer* - Customer ID

`data` - *object* - Customer data

### Example

```js
const data = {
  gender: 'f'
};

API.customers.updateById(1, data);
```

### Return value in resolved promise

```js
// Object.
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

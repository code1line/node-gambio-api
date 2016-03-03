# Get a specific customer

### Description

Returns a customer, selected by the customer ID.

### Method

```js
API.customers.getById(id)
```

### Parameters
`id` - *Number* - Customer ID

### Example

```js
API.customers.getById(1);
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

# Get all customers

### Description

Returns all customers.

### Method

```js
API.customers.get()
```

### Return value in resolved promise

```js
// Array.
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

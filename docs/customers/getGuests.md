# Get all customers, that are guests

### Description

Returns all customers, that are guests.

### Method

```js
API.customers.getGuests()
```

### Return value in resolved promise

```js
// Array.
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

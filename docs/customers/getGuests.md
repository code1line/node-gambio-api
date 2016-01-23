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

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

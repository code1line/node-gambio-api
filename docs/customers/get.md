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

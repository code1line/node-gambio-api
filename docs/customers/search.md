### Customers - Search

**Description**:
- Searches for specific term in customers.

**Method**:
- `API.customers.search(term)`

**Parameters**:
- `term` *String* - Search term.

**Example**:
```js
const API = new GambioApi({ ... });

API.customers.search('Otto')
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Array*
```js
[{
  id: 35,
  number: '35',
  gender: 'm',
  firstname: 'Otto',
  lastname: 'Oltmann',
  dateOfBirth: '0000-00-00',
  vatNumber: '',
  vatNumberStatus: 0,
  telephone: '',
  fax: '',
  email: 'oltmann@test.de',
  statusId: 2,
  isGuest: false,
  addressId: 38
}]
```

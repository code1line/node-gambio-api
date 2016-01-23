### Customers - Get Addresses From Customer

**Description**:
- Returns related addresses to a customer, selected by the customer ID.

**Method**:
- `API.customers.getAddressesByCustomerId(id)`

**Parameters**:
- `id` *Integer* - Customer ID.

**Example**:
```js
const API = new GambioApi({ ... });

API.customers.getAddressesByCustomerId(6)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Array*
```js
[{
  id: 1,
  customerId: 1,
  gender: '',
  company: 'Testfirma',
  firstname: 'Tester',
  lastname: 'Tester',
  street: 'Teststr. 1',
  suburb: '',
  postcode: '12345',
  city: 'Testort',
  countryId: 81,
  zoneId: 84,
  class: null,
  b2bStatus: false
}]

```

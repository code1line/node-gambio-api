### Addresses - Get

**Description**:
- Returns an address, selected by the address ID.

**Method**:
- `API.addresses.getById(id)`

**Parameters**:
- `id` *Integer* - Address ID

**Example**:
```js
const API = new GambioApi({ ... });

API.addresses.getById(7)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Object*
```js
{
  id: 7,
  customerId: 1,
  gender: "",
  company: "Testfirma",
  firstname: "Tester",
  lastname: "Tester",
  street: "Teststr. 1",
  suburb: "",
  postcode: "12345",
  city: "Testort",
  countryId: 81,
  zoneId: 84,
  class: null,
  b2bStatus: false
}

```

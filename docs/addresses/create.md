### Addresses - Create

**Description**:
- Creates a new address.

**Method**:
- `API.addresses.create(data)`

**Parameters**:
- `data` *Object* - Address data.

**Example**:
```js
const API = new GambioApi({ ... });

const data = {
  customerId: 1,
  gender: 'm',
  company: 'Test Company',
  firstname: 'John',
  lastname: 'Doe',
  street: 'Test Street 1',
  suburb: 'Test Suburb',
  postcode: '23983',
  city: 'Test City',
  countryId: 81,
  zoneId: 84,
  class: null,
  b2bStatus: false,
};

API.addresses.create(data)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Object*
```js
{
  id: 44,
  customerId: 1,
  gender: 'm',
  company: 'Test Company',
  firstname: 'John',
  lastname: 'Doe',
  street: 'Test Street 1',
  suburb: 'Test Suburb',
  postcode: '23983',
  city: 'Test City',
  countryId: 81,
  zoneId: 84,
  class: null,
  b2bStatus: false
}

```

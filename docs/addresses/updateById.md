### Addresses - Update

**Description**:
- Updates an address.

**Method**:
- `API.addresses.updateById(id, data)`

**Parameters**:
- `id` *Integer* - Address ID.
- `data` *Object* - Address data.

**Example**:
```js
const API = new GambioApi({ ... });

const data = {
  gender: 'f'
};

API.addresses.updateById(9, data)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Object*
```js
{
  id: 1,
  customerId: 1,
  gender: 'f',
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

### Customers - Create

**Description**:
- Creates a new customer.

**Method**:
- `API.customers.create(data)`

**Parameters**:
- `data` *Object* - Customer data.

**Example**:
```js
const API = new GambioApi({ ... });

const data = {
  gender: 'm',
  firstname: 'John',
  lastname: 'Doe',
  dateOfBirth: '1985-02-13',
  vatNumber: '0923429837942',
  telephone: '2343948798345',
  fax: '2093049283',
  email: 'hello@email.com',
  password: '0123456789',
  type: 'registree',
  address: {
    company: 'Test Company',
    street: 'Test Street',
    suburb: 'Test Suburb',
    postcode: '23983',
    city: 'Test City',
    countryId: 81,
    zoneId: 84,
    b2bStatus: true,
  },
};

API.customers.create(data)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Object*
```js
{
  id: 38,
  number: '38',
  gender: 'm',
  firstname: 'John',
  lastname: 'Doe',
  dateOfBirth: '1985-02-13',
  vatNumber: '0923429837942',
  vatNumberStatus: 8,
  telephone: '2343948798345',
  fax: '2093049283',
  email: 'hello@email.com',
  statusId: 2,
  isGuest: false,
  addressId: 41
}

```

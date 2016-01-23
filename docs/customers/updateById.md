### Customers - Update

**Description**:
- Updates a customer.

**Method**:
- `API.customers.updateById(id, data)`

**Parameters**:
- `id` *Integer* - Customer ID.
- `data` *Object* - Customer data.

**Example**:
```js
const API = new GambioApi({ ... });

const data = {
  gender: 'f'
};

API.customers.updateById(1, data)
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

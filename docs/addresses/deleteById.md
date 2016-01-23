### Addresses - Delete

**Description**:
- Deletes an address.

**Method**:
- `API.addresses.deleteById(id)`

**Parameters**:
- `id` *Integer* - Address ID.

**Example**:
```js
const API = new GambioApi({ ... });

API.addresses.deleteById(2)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Object*
```js
{
  code: 200,
  status: 'success',
  action: 'delete',
  addressId: 2
}

```

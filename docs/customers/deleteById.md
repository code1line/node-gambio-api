### Customers - Delete

**Description**:
- Deletes a customer.

**Method**:
- `API.customers.deleteById(id)`

**Parameters**:
- `id` *Integer* - Customer ID.

**Example**:
```js
const API = new GambioApi({ ... });

API.customers.deleteById(38)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Object*
```js
{
  code: 200,
  status: 'success',
  action: 'delete',
  customerId: 38
}

```

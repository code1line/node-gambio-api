# Delete a customer

### Description

Deletes a customer entry.

### Method

```js
API.customers.deleteById(id)
```

### Parameters
`id` - *integer* - Customer ID

### Example

```js
API.customers.deleteById(38);
```

### Return value in resolved promise

```js
// Object.
{
  code: 200,
  status: 'success',
  action: 'delete',
  customerId: 38
}
```

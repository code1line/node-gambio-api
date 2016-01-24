# Delete an address

### Description

Deletes an address entry.

### Method

```js
API.addresses.deleteById(id)
```

### Parameters

`id` - *integer* - Address ID

### Example

```js
API.addresses.deleteById(2);
```

### Return value in resolved promise

```js
// Object.
{
  code: 200,
  status: 'success',
  action: 'delete',
  addressId: 2
}

```

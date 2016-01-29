# Get all customers

### Description

Returns all customers.

Optionally you can request a sorted and minimized result by passing `sorting` and `limitedFields` arguments.

If provided, `sorting` must be an object containing the field name as key and `asc` or `desc` as value.

If provided, `limitedFields` must be an array of strings containing the field names you want to request.

### Method

```js
API.customers.get()
```

### Parameters

`sorting` - *object* - Sorting criteria **(optional)**.

`limitedFields` - *array* - Field names to be returned **(optional)**.

### Example

```js
// Get all customers.
API.customers.get();

// With sorting criteria.
API.customers.get({ id : 'desc', firstname: 'asc' });

// With multiple sorting criteria and minimized result (only the first name).
API.customers.get({ id : 'desc', firstname: 'asc'}, ['firstname']);
```

### Return value in resolved promise

```js
// Array.
[{
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
}, {
  id: 2,
  number: '2',
  gender: 'm',
  firstname: 'Testbestellung',
  lastname: 'Testbestellung',
  dateOfBirth: '0000-00-00',
  vatNumber: '',
  vatNumberStatus: 0,
  telephone: '',
  fax: '',
  email: 'Testbestellung@gambio.de',
  statusId: 2,
  isGuest: false,
  addressId: null
}]

```

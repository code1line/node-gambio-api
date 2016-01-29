# Get all customers, that are guests

### Description

Returns all customers, that are guests.

Optionally you can request a sorted and minimized result by passing `sorting` and `limitedFields` arguments.

If provided, `sorting` must be an object containing the field name as key and `asc` or `desc` as value.

If provided, `limitedFields` must be an array of strings containing the field names you want to request.

### Method

```js
API.customers.getGuests()
```

### Parameters

`sorting` - *object* - Sorting criteria **(optional)**.

`limitedFields` - *array* - Field names to be returned **(optional)**.

### Example
```js
// Get all guest customers.
API.customers.getGuests();

// With sorting criteria.
API.customers.getGuests({ id : 'desc', firstname: 'asc' });

// With multiple sorting criteria and minimized result (only the first name).
API.customers.getGuests({ id : 'desc', firstname: 'asc'}, ['firstname']);
```

### Return value in resolved promise

```js
// Array.
[{
  id: 11,
  number: '11',
  gender: 'f',
  firstname: 'Hannah',
  lastname: 'Montana',
  dateOfBirth: '0000-00-00',
  vatNumber: '',
  vatNumberStatus: 0,
  telephone: '',
  fax: '',
  email: 'hannah@gmail.com',
  statusId: 0,
  isGuest: true,
  addressId: 11
}, {
  id: 12,
  number: '12',
  gender: 'm',
  firstname: 'ssssssssssssssss',
  lastname: 'ssssssssssssssss',
  dateOfBirth: '0000-00-00',
  vatNumber: '',
  vatNumberStatus: 0,
  telephone: '',
  fax: '',
  email: 'chrispaul@email.de',
  statusId: 1,
  isGuest: true,
  addressId: 14
}]

```

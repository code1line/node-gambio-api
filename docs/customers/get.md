# Get all customers

### Description

Returns all customers.


Optionally you can request a sorted result by passing a `sorting` argument.

If provided, `sorting` must be a hash with the field name as key and `asc` or `desc` as value.  

### Method

```js
API.customers.get(sorting)
```

### Parameters
`sorting` - *object* - Sorting criteria **(optional)**.

### Example

```js
// Get all customers.
API.customers.get();

// With sorting criteria (sort by ID in descending order).
API.customers.get({ id : 'desc' });

// With multiple sorting criteria (sort by ID in descending order and first name in ascending order).
API.customers.get({ id : 'desc', firstname: 'asc'});
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

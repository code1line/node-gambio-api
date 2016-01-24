# Update an address

### Description

Updates an address entry.

### Method

```js
API.addresses.updateById(id, data)
```

### Parameters

`id` - *integer* - Address ID

`data` - *object* - Address data

### Example

```js
// Update address data.
const data = {
  gender: 'f'
};

// Update address entry.
API.addresses.updateById(9, data);
```

### Return value in resolved promise

```js
// Object.
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

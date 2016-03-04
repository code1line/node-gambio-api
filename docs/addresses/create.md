# Create a new address

### Description

Creates a new address entry.

### Method

```js
API.addresses.create(data)
```

### Parameters

`data` - *Object* - Address data

### Example

```js
// Address data.
const data = {
  customerId: 1,
  gender: 'm',
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
  b2bStatus: false,
};

// Create address.
API.addresses.create(data);
```

### Return value in resolved promise

```js
// Object.
{
  id: 44,
  customerId: 1,
  gender: 'm',
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

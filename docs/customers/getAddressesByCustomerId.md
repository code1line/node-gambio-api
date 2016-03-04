# Get addresses from a specific customer

### Description

Returns related addresses to a customer, selected by the customer ID.

### Method

```js
API.customers.getAddressesByCustomerId(id)
```

### Parameters

`id` - *Number* - Customer ID

### Example

```js
API.customers.getAddressesByCustomerId(6);
```

### Return value in resolved promise
```js
// Array.
[{
  id: 1,
  customerId: 1,
  gender: '',
  company: 'Testfirma',
  firstname: 'Tester',
  lastname: 'Tester',
  street: 'Teststr. 1',
  suburb: '',
  postcode: '12345',
  city: 'Testort',
  countryId: 81,
  zoneId: 84,
  class: null,
  b2bStatus: false
}]

```

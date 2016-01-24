# Get a specific address

### Description

Returns an address, selected by the address ID.

### Method

```js
API.addresses.getById(id)
```

### Parameters

`id` - *integer* - Address ID

### Example

```js
API.addresses.getById(7);
```

### Return value in resolved promise

```js
// Object.
{
  id: 7,
  customerId: 1,
  gender: "",
  company: "Testfirma",
  firstname: "Tester",
  lastname: "Tester",
  street: "Teststr. 1",
  suburb: "",
  postcode: "12345",
  city: "Testort",
  countryId: 81,
  zoneId: 84,
  class: null,
  b2bStatus: false
}

```

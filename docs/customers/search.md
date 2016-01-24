# Search in customers

### Description

Searches for specific term in customers.

### Method

```js
API.customers.search(term)
```

### Parameters

`term` - *string* - Search term

### Example

```js
API.customers.search('Otto');
```

### Return value in resolved promise

```js
// Array.
[{
  id: 35,
  number: '35',
  gender: 'm',
  firstname: 'Otto',
  lastname: 'Oltmann',
  dateOfBirth: '0000-00-00',
  vatNumber: '',
  vatNumberStatus: 0,
  telephone: '',
  fax: '',
  email: 'oltmann@test.de',
  statusId: 2,
  isGuest: false,
  addressId: 38
}]
```

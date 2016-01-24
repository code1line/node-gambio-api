# Get a specific country

### Description

Returns a country, selected by the country ID.

### Method
```js
API.countries.getById(id)
```

### Parameters

`id` - *integer* - Country ID

### Example

```js
API.countries.getById(28);
```

### Return value in resolved promise

```js
// Object.
{
  id: 28,
  name: "Germany",
  iso2: "DE",
  iso3: "DEU",
  addressFormatId: 5,
  status: true
}
```

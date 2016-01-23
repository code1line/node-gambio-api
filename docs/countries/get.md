### Countries - Get

**Description**:
- Returns a country, selected by the country ID.

**Method**:
- `API.countries.getById(id)`

**Parameters**:
- `id` *Integer* - Country ID

**Example**:
```js
const API = new GambioApi({ ... });

API.countries.getById(28)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Object*
```js
{
  id: 28,
  name: "Germany",
  iso2: "DE",
  iso3: "DEU",
  addressFormatId: 5,
  status: true
}
```

### Countries - Get Zones From A Country

**Description**:
- Returns the related zones from a country, selected by the country ID.

**Method**:
- `API.countries.getZonesByCountryId(id)`

**Parameters**:
- `id` *Integer* - Country ID

**Example**:
```js
const API = new GambioApi({ ... });

API.countries.getZonesByCountryId(28)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Array*
```js
[
    {
        id: 80,
        name: "Baden-W\u00fcrttemberg",
        iso: "BAW"
    },
    {
        id: 81,
        name: "Bayern",
        iso: "BAY"
    },
    {
        id: 82,
        name: "Berlin",
        iso: "BER"
    },
    {
        id: 84,
        name: "Bremen",
        iso: "BRE"
    },
    {
        id: 83,
        name: "Brandenburg",
        iso: "BRG"
    },
    {
        id: 85,
        name: "Hamburg",
        iso: "HAM"
    }
]
```

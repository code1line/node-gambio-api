# Get zones from a specific country

### Description

Returns the related zones from a country, selected by the country ID.

## Method

```js
API.countries.getZonesByCountryId(id)
```

### Parameters

`id` - *integer* - Country ID

### Example

```js
API.countries.getZonesByCountryId(28);
```

### Return value in resolved promise

```js
// Array.
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
    },

    // ...
]
```

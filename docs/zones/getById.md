# Get a specific zone

### Description

Returns a zone, selected by the zone ID.

### Method

```js
API.zones.getById(id)
```

### Parameters
`id` - *integer* - Zone ID

### Example

```js
API.zones.getById(2);
```

### Return value in resolved promise
```js
// Object.
{
    id: 2,
    name: "Bremen",
    iso: "BRE"
}
```

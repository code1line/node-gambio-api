### Zones - Get

**Description**:
- Returns a zone, selected by the zone ID.

**Method**:
- `API.zones.getById(id)`

**Parameters**:
- `id` *Integer* - Zone ID

**Example**:
```js
const API = new GambioApi({ ... });

API.zones.getById(2)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Object*
```js
{
    id: 2,
    name: "Bremen",
    iso: "BRE"
}
```

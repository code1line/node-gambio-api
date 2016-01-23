### E-Mails - Delete

**Description**:
- Delete an E-Mails.

**Method**:
- `API.emails.deleteById(id)`

**Parameters**:
- `id` *Integer* - E-Mail ID.

**Example**:
```js
const API = new GambioApi({ ... });

API.emails.deleteById(15)
  .then(console.log)
  .catch(console.error);
```

**Returns in resolved promise**: *Object*
```js
{
  code: 200,
  status: 'success',
  action: 'delete',
  emailId: 15
}

```

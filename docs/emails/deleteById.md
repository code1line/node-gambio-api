# Delete an E-Mail

### Description

Delete an E-Mail entry.

### Method

```js
API.emails.deleteById(id)
```

### Parameters

`id` - *integer* - E-Mail ID

### Example

```js
API.emails.deleteById(15);
```

### Return value in resolved promise

```js
// Object.
{
  code: 200,
  status: 'success',
  action: 'delete',
  emailId: 15
}
```

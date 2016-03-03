# Delete a category icon

### Description

Deletes a category icon by its filename.

### Method

```js
API.categories.deleteIcon(file)
```

### Parameters
`file` - *String* - Category icon filename.

### Example

```js
API.categories.deleteIcon('my_file.jpg');
```

### Return value in resolved promise

```js
// Object.
{
  code: 200,
  status: 'success',
  action: 'delete',
  filename: 'my_file.jpg'
}
```

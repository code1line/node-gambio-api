# Delete a category image

### Description

Deletes a category image by its filename.

### Method

```js
API.categories.deleteImage(file)
```

### Parameters
`file` - *String* - Category image filename.

### Example

```js
API.categories.deleteImage('my_file.jpg');
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

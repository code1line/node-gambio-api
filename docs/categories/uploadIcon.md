# Upload a category icon

### Description

Uploads a category icon.

### Method

```js
API.categories.uploadIcon(path, name)
```

### Parameters

`path` - *String* - Path to file, which should be uploaded

`name` - *String* - Custom filename

### Example

```js
API.categories.uploadIcon(__dirname + '/image.jpg', 'marcus.jpg');
```

### Return value in resolved promise

```js
// Object.
{
  code: 201,
  status: 'success',
  action: 'upload',
  filename: 'marcus.jpg'
}
```

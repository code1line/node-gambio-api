# Upload a category image

### Description

Uploads a category image.

### Method

```js
API.categories.uploadImage(path, name)
```

### Parameters

`path` - *String* - Path to file, which should be uploaded

`name` - *String* - Custom filename

### Example

```js
API.categories.uploadImage(__dirname + '/image.jpg', 'marcus.jpg');
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

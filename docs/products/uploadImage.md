# Upload a new product image

### Description

Uploads a new product image.

### Method

```js
API.products.uploadImage(path, name)
```

### Parameters

`path` - *String* - Path to file, which should be uploaded

`name` - *String* - Custom filename

### Example

```js
API.products.uploadImage(__dirname + '/logo.png', 'marcus.png');
```

### Return value in resolved promise

```js
// Object.
{
	code: 201,
	status: 'success',
	action: 'upload',
	filename: 'marcus.png'
}

```

# Delete a product image

### Description

Removes a product image.

### Method

```js
API.products.deleteImage(file)
```

### Parameters

`file` - *String* - Filename

### Example

```js
API.products.deleteImage('this_file_is_old.jpg');
```

### Return value in resolved promise

```js
// Object.
{
	code: 200,
	status: 'success',
	action: 'delete',
	filename: 'this_file_is_old.jpg'
}

```

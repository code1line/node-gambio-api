# Rename product image

### Description

Renames an existing products image filename.

### Method

```js
API.products.renameImage(oldName, newName)
```

### Parameters

`oldName` - *Number* - Old image name

`newName` - *Number* - New image name

### Example

```js
API.products.renameImage('old.jpg', 'new.jpg');
```

### Return value in resolved promise

```js
// Object.
{
	code: 200,
	status: 'success',
	action: 'rename',
	oldFilename: 'old.jpg',
	newFilename: 'new.jpg'
}

```

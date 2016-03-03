# Rename a category image

### Description

Renames a category image file on the server.

### Method

```js
API.categories.renameImage(oldName, newName)
```

### Parameters

`oldName` - *String* - Old filename

`newName` - *String* - New filename

### Example

```js
API.categories.renameImage('old.jpg', 'new.jpg');
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

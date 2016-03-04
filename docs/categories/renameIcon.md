# Rename a category icon

### Description

Renames a category icon file on the server.

### Method

```js
API.categories.renameIcon(oldName, newName)
```

### Parameters

`oldName` - *String* - Old filename

`newName` - *String* - New filename

### Example

```js
API.categories.renameIcon('old.jpg', 'new.jpg');
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

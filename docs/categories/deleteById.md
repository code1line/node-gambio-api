# Delete a category

### Description

Deletes a category entry.

### Method

```js
API.categories.deleteById(id)
```

### Parameters
`id` - *Integer* - Category ID

### Example

```js
API.categories.deleteById(38);
```

### Return value in resolved promise

```js
// Object.
{
  code: 200,
  status: 'success',
  action: 'delete',
  resource: 'Category',
  categoryId: 38
}
```

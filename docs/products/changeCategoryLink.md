# Change link to category

### Description

Changes an existing 'Product -> Category' link.

### Method

```js
API.products.changeCategoryLink(id, oldCategoryId, newCategoryId)
```

### Parameters

`id` - *Object* - Product ID

`oldCategoryId` - *Number* - Old category ID

`newCategoryId` - *Number* - New category ID

### Example

```js
API.products.changeCategoryLink(1335, 1, 2);
```

### Return value in resolved promise

```js
// Object.
{
	code: 200,
	status: 'success',
	action: 'update',
	resource: 'ProductLink',
	productId: 1335,
	oldCategoryId: 1,
	newCategoryId: 2
}

```

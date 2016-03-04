# Delete a product

### Description

Removes a product.

### Method

```js
API.products.deleteById(id)
```

### Parameters

`id` - *Number* - Product ID

### Example

```js
API.products.deleteById(1337);
```

### Return value in resolved promise

```js
// Object.
{
	code: 200,
	status: 'success',
	action: 'delete',
	resource: 'Product',
	productId: 1337
}

```

# Delete order

### Description

Deletes an order by its ID.

### Method

```js
API.orders.deleteById(id)
```

### Parameters

`id` - *Number* - Order ID.

### Example

```js
API.orders.deleteById(402119);
```

### Return value in resolved promise

```js
// Object.
{
	code: 200,
	status: 'success',
	action: 'delete',
	resource: 'Order',
	orderId: 402119
}
```

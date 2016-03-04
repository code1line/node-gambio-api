# Delete order item

### Description

Deletes an order item by its ID.

### Method

```js
API.orders.deleteItemById(orderId, itemId, attributeId)
```

### Parameters

`orderId` - *Number* - Order ID.

`itemId` - *Number* - Order item ID.


### Example

```js
API.orders.deleteItemById(400212, 3764);
```

### Return value in resolved promise

```js
// Object.
{
	code: 200,
	status: 'success',
	action: 'delete',
	resource: 'Order',
	orderId: 400212,
	orderItemId: 3764
}
```

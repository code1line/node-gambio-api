# Delete order item attribute

### Description

Deletes an order item attribute by its ID.

### Method

```js
API.orders.deleteItemAttributeById(orderId, itemId, attributeId)
```

### Parameters

`orderId` - *Number* - Order ID.

`itemId` - *Number* - Order item ID.

`attributeId` - *Number* - Order item attribute ID.

### Example

```js
API.orders.deleteItemAttributeById(400212, 3766, 1787);
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
	orderItemId: 3766,
	orderItemAttributeId: 1787
}
```

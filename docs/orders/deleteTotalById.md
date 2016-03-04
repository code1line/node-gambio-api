# Delete order total

### Description

Deletes an order total by its ID.

### Method

```js
API.orders.deleteTotalById(orderId, totalId)
```

### Parameters

`orderId` - *Number* - Order ID.

`totalId` - *Number* - Order total ID.


### Example

```js
API.orders.deleteTotalById(400212, 1);
```

### Return value in resolved promise

```js
// Object.
{
	code: 200,
	status: 'success',
	action: 'delete',
	resource: 'OrderTotal',
	orderId: 400212,
	orderTotalId: 1
}
```

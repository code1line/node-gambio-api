# Update an order status

### Description

Updates status of a specific order.

### Method

```js
API.orders.updateStatus(orderId, data)
```

### Parameters

`orderId` - *Number* - Order ID.

`data` - *Object* - Order status data.

### Example

```js
const updateData = {
  statusId: 1,
  comment: 'This is a comment.',
  customerNotified: false,
};
API.orders.updateStatus(400212, updateData);
```

### Return value in resolved promise

```js
// Object.
{
	id: 1963,
	statusId: 1,
	dateAdded: '2016-03-04 11:46:55',
	comment: 'This is a test comment.',
	customerNotified: false
}
```

# Get specific order status history record

### Description

Returns a detailed order status history record of a specific order.

### Method

```js
API.orders.getHistoryById(orderId, historyId)
```

### Parameters

`orderId` - *Number* - Order ID.

`historyId` - *Number* - Order status history record ID.

### Example

```js
API.orders.getHistoryById(402122, 1961);
```

### Return value in resolved promise

```js
// Object.
{
	id: 1961,
	statusId: 1,
	dateAdded: '2016-03-04 11:11:38',
	comment: 'This is a test comment.',
	customerNotified: true,
	_links: []
}
```

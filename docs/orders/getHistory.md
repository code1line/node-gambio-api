# Get order status history records

### Description

Returns all status history records from a specific order.

### Method

```js
API.orders.getHistory(orderId)
```

### Parameters

`orderId` - *Number* - Order ID.

### Example

```js
API.orders.getHistory(402122);
```

### Return value in resolved promise

```js
// Array.
[
  {
  	id: 1961,
  	statusId: 1,
  	dateAdded: '2016-03-04 11:11:38',
  	comment: 'This is a test comment.',
  	customerNotified: true,
  	_links: []
  }
]
```

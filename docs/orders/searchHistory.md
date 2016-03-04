# Search in order status history

### Description

Searches in order status history.

### Method

```js
API.orders.searchHistory(orderId, term)
```

### Parameters

`orderId` - *Number* - Order ID.

`term` - *Number* - Search term.

### Example

```js
API.orders.searchHistory(402122, 'payment');
```

### Return value in resolved promise

```js
// Array.
[{
	id: 1961,
	statusId: 1,
	dateAdded: '2016-03-04 11:11:38',
	comment: 'This is a test comment.',
	customerNotified: true,
	_links: []
}]
```

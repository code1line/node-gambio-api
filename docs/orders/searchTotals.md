# Search in order totals

### Description

Searches in order totals.

### Method

```js
API.orders.searchTotals(orderId, term)
```

### Parameters

`orderId` - *Number* - Order ID.

`term` - *Number* - Search term.

### Example

```js
API.orders.searchTotals(402122, 'test');
```

### Return value in resolved promise

```js
// Array.
[{
	id: 2682,
	title: 'Test Title',
	value: 99,
	valueText: 'Test Value Text',
	class: 'Test Class',
	sortOrder: 1,
	_links: []
}]
```

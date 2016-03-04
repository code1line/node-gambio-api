# Get order totals

### Description

Returns all order totals.

### Method

```js
API.orders.getTotals(orderId)
```

### Parameters

`orderId` - *Number* - Order ID.

### Example

```js
API.orders.getTotals(402122);
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

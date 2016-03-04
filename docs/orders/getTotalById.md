# Get specific order total

### Description

Returns a total from a specific order.

### Method

```js
API.orders.getTotalById(orderId, totalId)
```

### Parameters

`orderId` - *Number* - Order ID.

`totalId` - *Number* - Order total ID.


### Example

```js
API.orders.getTotalById(402122, 1961);
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

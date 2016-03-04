# Update an order total

### Description

Updates an order total by its ID.

### Method

```js
API.orders.updateTotalById(orderId, totalId, data)
```

### Parameters

`orderId` - *Number* - Order ID.

`totalId` - *Number* - Order item ID.

`data` - *Object* - Order total data.

### Example

```js
const updateData = { title: 'Testtitle' };
API.orders.updateTotalById(400212, 2682, updateData);
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

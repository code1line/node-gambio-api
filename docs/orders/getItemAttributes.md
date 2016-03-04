# Get order item attributes

### Description

Returns all item attributes from a specific order.

### Method

```js
API.orders.getItemAttributes(orderId, itemId)
```

### Parameters

`orderId` - *Number* - Order ID.

`itemId` - *Number* - Order item ID.

### Example

```js
API.orders.getItemAttributes(402122, 3768);
```

### Return value in resolved promise

```js
// Array.
[{
	id: 1789,
	name: 'Test Attr',
	value: 'Test Value',
	price: 99,
	priceType: 'Test Typ',
	optionId: null,
	optionValueId: null,
	combisId: 1,
	_links: []
}]
```

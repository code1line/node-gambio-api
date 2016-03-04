# Search in order item attributes

### Description

Searches in order item attributes.

### Method

```js
API.orders.searchItemAttributes(orderId, itemId, term)
```

### Parameters

`orderId` - *Number* - Order ID.

`itemId` - *Number* - Order item ID.

`term` - *Number* - Search term.

### Example

```js
API.orders.searchItemAttributes(402122, 3768, 'test');
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

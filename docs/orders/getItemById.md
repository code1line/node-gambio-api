# Get specific order item

### Description

Returns an item from a specific order.

### Method

```js
API.orders.getItemById(orderId, itemId)
```

### Parameters

`orderId` - *Number* - Order ID.

`itemId` - *Number* - Order item ID.


### Example

```js
API.orders.getItemById(400212, 2);
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

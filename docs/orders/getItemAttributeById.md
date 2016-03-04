# Get specific order item attributes

### Description

Returns an item attribute from a specific order.

### Method

```js
API.orders.getItemAttributeById(orderId, itemId, attributeId)
```

### Parameters

`orderId` - *Number* - Order ID.

`itemId` - *Number* - Order item ID.

`attributeId` - *Number* - Order item attribute ID.

### Example

```js
API.orders.getItemAttributeById(400212, 2, 1003);
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

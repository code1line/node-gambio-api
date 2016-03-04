# Get order items

### Description

Returns all order items.

### Method

```js
API.orders.getItems(orderId)
```

### Parameters

`orderId` - *Number* - Order ID.

### Example

```js
API.orders.getItems(400212);
```

### Return value in resolved promise

```js
// Array.
[{
	id: 3768,
	model: 'Test Model',
	name: 'Test Name',
	quantity: 1,
	price: 100,
	finalPrice: 100,
	tax: 19,
	isTaxAllowed: true,
	discount: 0,
	shippingTimeInformation: '',
	checkoutInformation: 'Test Checkout Information',
	attributes: [
		[Object]
	],
	downloadInformation: {
		filename: 'filename.pdf',
		maxDaysAllowed: 7,
		countAvailable: 5
	},
	addonValues: {
		productId: '1'
	},
	_links: []
}]
```

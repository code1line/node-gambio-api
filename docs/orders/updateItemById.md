# Update order item

### Description

Updates an order item by its ID.

### Method

```js
API.orders.updateItemById(orderId, itemId, data)
```

### Parameters

`orderId` - *Number* - Order ID.

`itemId` - *Number* - Order item ID.

`data` - *Object* - Order item data.

### Example

```js
const updateData = { name: 'Testname' };
API.orders.updateItemById(402122, 3768, updateData);
```

### Return value in resolved promise

```js
// Object.
{
	id: 3768,
	model: 'Test Model',
	name: 'Testname',
	quantity: 1,
	price: 100,
	finalPrice: 100,
	tax: 19,
	isTaxAllowed: true,
	discount: 0,
	shippingTimeInformation: '',
	checkoutInformation: 'Test Checkout Information',
	attributes: [{
		id: 1789,
		name: 'Test Attr',
		value: 'Test Value',
		price: 99,
		priceType: 'Test Typ',
		optionId: null,
		optionValueId: null,
		combisId: 1
	}],
	downloadInformation: {
		filename: 'filename.pdf',
		maxDaysAllowed: 7,
		countAvailable: 5
	},
	addonValues: {
		productId: '1'
	},
	_links: []
}
```

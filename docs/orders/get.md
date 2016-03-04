# Get all orders

### Description

Returns all orders.

### Method

```js
API.orders.get()
```
### Example

```js
API.orders.get();
```

### Return value in resolved promise

```js
// Array.
[{
	id: 402122,
	customerId: 0,
	customerName: 'John Doe',
	totalSum: 99,
	paymentType: {
		title: 'Payment Title',
		module: 'Payment Module'
	},
	shippingType: {
		title: 'Shipping Title',
		module: 'Shipping Module'
	},
	purchaseDate: '2016-03-04 11:11:38',
	statusId: 1,
	statusName: 'Pending',
	_links: {
		customer: 'https://www.gambio-shop.de/shop4/api.php/v2/customers/0'
	}
}, {
	id: 402123,
	customerId: 0,
	customerName: 'John Doe',
	totalSum: 99,
	paymentType: {
		title: 'Payment Title',
		module: 'Payment Module'
	},
	shippingType: {
		title: 'Shipping Title',
		module: 'Shipping Module'
	},
	purchaseDate: '2016-03-04 11:11:57',
	statusId: 1,
	statusName: 'Pending',
	_links: {
		customer: 'https://www.gambio-shop.de/shop4/api.php/v2/customers/0'
	}
}]
```

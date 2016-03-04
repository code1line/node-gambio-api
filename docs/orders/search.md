# Search in orders

### Description

Searches in orders.

### Method

```js
API.orders.search(term)
```

### Parameters

`term` - *Number* - Search term.

### Example

```js
API.orders.search('test');
```

### Return value in resolved promise

```js
// Array.
[{
	id: 400336,
	customerId: 107,
	customerName: 'David Test',
	totalSum: 10.89,
	paymentType: {
		title: 'moneyorder',
		module: 'moneyorder'
	},
	shippingType: {
		title: 'Versicherter Versand (Versand na',
		module: 'zonese_zonese'
	},
	purchaseDate: '2016-02-19 20:12:23',
	statusId: 1,
	statusName: 'Pending',
	_links: {
		customer: 'https://www.gambio-shop.de/shop4/api.php/v2/customers/107'
	}
}, {
	id: 400345,
	customerId: 118,
	customerName: 'Test Testfrau',
	totalSum: 39.95,
	paymentType: {
		title: 'moneyorder',
		module: 'moneyorder'
	},
	shippingType: {
		title: 'Selbstabholung (Selbstabholung d',
		module: 'selfpickup_selfpickup'
	},
	purchaseDate: '2016-03-01 09:02:43',
	statusId: 1,
	statusName: 'Pending',
	_links: {
		customer: 'https://www.gambio-shop.de/shop4/api.php/v2/customers/118'
	}
}]
```

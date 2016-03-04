# Update an order

### Description

Updates an order by its ID.

### Method

```js
API.orders.updateById(orderId, data)
```

### Parameters

`orderId` - *Number* - Order ID.

`data` - *Object* - Order data.

### Example

```js
const updateData = { comment: 'This is my new comment!' };
API.orders.updateById(402122, updateData);
```

### Return value in resolved promise

```js
// Object.
{
	id: 402122,
	statusId: 1,
	purchaseDate: '2016-03-04 11:11:38',
	currencyCode: 'EUR',
	languageCode: 'DE',
	comment: 'This is my new comment!',
	paymentType: {
		title: 'Payment Title',
		module: 'Payment Module'
	},
	shippingType: {
		title: 'Shipping Title',
		module: 'Shipping Module'
	},
	customer: {
		id: 0,
		number: '2387928374',
		email: 'admin@shop.de',
		phone: '1298127983',
		vatId: '39487293874',
		status: {
			id: 1,
			name: '',
			image: '',
			discount: 0,
			isGuest: true
		}
	},
	addresses: {
		customer: {
			gender: 'm',
			firstname: 'John',
			lastname: 'Doe',
			company: 'Test Company',
			street: 'Test Street',
			suburb: 'Test Suburb',
			postcode: '12345',
			city: 'Test City',
			countryId: 81,
			zoneId: 0,
			b2bStatus: false
		},
		billing: {
			gender: 'm',
			firstname: 'John',
			lastname: 'Doe',
			company: 'Test Company',
			street: 'Test Street',
			suburb: 'Test Suburb',
			postcode: '12345',
			city: 'Test City',
			countryId: 81,
			zoneId: 0,
			b2bStatus: false
		},
		delivery: {
			gender: 'm',
			firstname: 'John',
			lastname: 'Doe',
			company: 'Test Company',
			street: 'Test Street',
			suburb: 'Test Suburb',
			postcode: '12345',
			city: 'Test City',
			countryId: 81,
			zoneId: 0,
			b2bStatus: false
		}
	},
	items: [{
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
		attributes: [Object],
		downloadInformation: [Object],
		addonValues: [Object]
	}],
	totals: [{
		id: 2682,
		title: 'Test Title',
		value: 99,
		valueText: 'Test Value Text',
		class: 'Test Class',
		sortOrder: 1
	}],
	statusHistory: [{
		id: 1961,
		statusId: 1,
		dateAdded: '2016-03-04 11:11:38',
		comment: 'This is a test comment.',
		customerNotified: true
	}],
	addonValues: {
		customerIp: '',
		downloadAbandonmentStatus: '0',
		serviceAbandonmentStatus: '0',
		ccType: null,
		ccOwner: null,
		ccNumber: null,
		ccExpires: null,
		ccStart: null,
		ccIssue: null,
		ccCvv: null,
		test_key: 'test_value'
	},
	_links: []
}
```

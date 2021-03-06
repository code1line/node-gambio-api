# Create order

### Description

Creates a new order.

### Method

```js
API.orders.create(data)
```

### Parameters
`data` - *Object* - Order data.

### Example

```js
const data = {
  statusId: 1,
  purchaseDate: '2015-01-01 00:00:00',
  currencyCode: 'EUR',
  languageCode: 'de',
  comment: 'This is a test comment.',
  paymentType: {
    title: 'Payment Title',
    module: 'Payment Module',
  },
  shippingType: {
    title: 'Shipping Title',
    module: 'Shipping Module',
  },
  customer: {
    number: '2387928374',
    email: 'admin@shop.de',
    phone: '1298127983',
    vatId: '39487293874',
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
      zoneId: 84,
      b2bStatus: false,
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
      zoneId: 84,
      b2bStatus: false,
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
      zoneId: 84,
      b2bStatus: false,
    },
  },
  items: [
    {
      model: 'Test Model',
      name: 'Test Name',
      quantity: 1,
      price: 100.0,
      finalPrice: 120.0,
      tax: 19.0,
      isTaxAllowed: true,
      discount: 0.00,
      shippingTimeInformation: 'Test Shipping Time Information',
      checkoutInformation: 'Test Checkout Information',
      attributes: [
        {
          name: 'Test Attr',
          value: 'Test Value',
          price: 99.00,
          priceType: 'Test Type',
          optionId: null,
          optionValueId: null,
          combisId: 1,
        },
      ],
      downloadInformation: {
        filename: 'filename.pdf',
        maxDaysAllowed: 7,
        countAvailable: 5,
      },
      addonValues: {
        productId: '1',
      },
    },
  ],
  totals: [
    {
      title: 'Test Title',
      value: 99.0,
      valueText: 'Test Value Text',
      class: 'Test Class',
      sortOrder: 1,
    },
  ],
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
    test_key: 'test_value',
  },
};

API.orders.create(data);
```

### Return value in resolved promise

```js
// Object.
{
	id: 402119,
	statusId: 1,
	purchaseDate: '2016-03-04 10:57:13',
	currencyCode: 'EUR',
	languageCode: 'DE',
	comment: 'This is a test comment.',
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
		id: 3764,
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
		id: 2678,
		title: 'Test Title',
		value: 99,
		valueText: 'Test Value Text',
		class: 'Test Class',
		sortOrder: 1
	}],
	statusHistory: [{
		id: 1958,
		statusId: 1,
		dateAdded: '2016-03-04 10:57:14',
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

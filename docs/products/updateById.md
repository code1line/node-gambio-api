# Update a product

### Description

Updates a product based on the product data and product ID provided.

### Method

```js
API.products.updateById(id, data)
```

### Parameters

`id` - *Number* - Product ID

`data` - *Object* - Product data

### Example

```js
const data = { productModel: 'blubb' };
API.products.updateById(1338, data);
```

### Return value in resolved promise

```js
// Object.
{
	id: 1338,
	isActive: true,
	sortOrder: 1,
	dateAdded: '2016-03-04 13:37:50',
	dateAvailable: '0000-00-00 00:00:00',
	lastModified: '2016-03-04 13:43:44',
	orderedCount: 1,
	productModel: 'blubb',
	ean: '',
	price: 16.7983,
	discountAllowed: 0,
	taxClassId: 1,
	quantity: 998,
	weight: 0,
	shippingCosts: 0,
	shippingTimeId: 1,
	productTypeId: 1,
	manufacturerId: 0,
	isFsk18: false,
	isVpeActive: true,
	vpeId: 2,
	vpeValue: 6,
	name: {
		en: 'test article',
		de: 'Testartikel'
	},
	description: {
		en: '[TAB:Page 1] Test Product Description (Page 1) [TAB: Page 2] Test Product Description (Page 2)',
		de: '[TAB:Seite 1] Testartikel Beschreibung (Seite 1) [TAB:Seite 2] Testartikel Beschreibung (Seite 2)'
	},
	shortDescription: {
		en: '<p>Test product short description.</p>',
		de: '<p>Testartikel Kurzbeschreibung</p>'
	},
	keywords: {
		en: '',
		de: ''
	},
	metaTitle: {
		en: '',
		de: ''
	},
	metaDescription: {
		en: '',
		de: ''
	},
	metaKeywords: {
		en: '',
		de: ''
	},
	url: {
		en: '',
		de: ''
	},
	urlKeywords: {
		en: 'test-article',
		de: 'Testartikel'
	},
	checkoutInformation: {
		en: '',
		de: ''
	},
	viewedCount: {
		en: 0,
		de: 32
	},
	images: [{
		filename: 'artikelbild.jpg',
		isPrimary: true,
		isVisible: true,
		imageAltText: [Object]
	}, {
		filename: 'artikelbild_1_1.jpg',
		isPrimary: false,
		isVisible: true,
		imageAltText: [Object]
	}, {
		filename: 'artikelbild_1_2.jpg',
		isPrimary: false,
		isVisible: true,
		imageAltText: [Object]
	}, {
		filename: 'artikelbild_1_3.jpg',
		isPrimary: false,
		isVisible: true,
		imageAltText: [Object]
	}],
	settings: {
		detailsTemplate: 'standard.html',
		optionsDetailsTemplate: 'product_options_dropdown.html',
		optionsListingTemplate: 'product_options_dropdown.html',
		showOnStartpage: false,
		showQuantityInfo: true,
		showWeight: false,
		showPriceOffer: true,
		showAddedDateTime: false,
		priceStatus: 0,
		minOrder: 1,
		graduatedQuantity: 1,
		onSitemap: true,
		sitemapPriority: '0.5',
		sitemapChangeFrequency: 'daily',
		propertiesDropdownMode: 'dropdown_mode_1',
		startpageSortOrder: 0,
		showPropertiesPrice: true,
		propertiesCombisQuantityCheckMode: 3,
		usePropertiesCombisShippingTime: true,
		usePropertiesCombisWeight: false,
		groupPermissions: [
			[Object],
			[Object],
			[Object],
			[Object]
		]
	},
	addonValues: {
		codeIsbn: null,
		codeUpc: null,
		codeMpn: null,
		codeJan: null,
		googleExportCondition: 'neu',
		googleExportAvailabilityId: '0',
		brandName: '',
		identifierExists: '1',
		gender: '',
		ageGroup: '',
		expirationDate: '0000-00-00',
		productsImageWidth: '0',
		productsImageHeight: '0',
		test_key: 'test_value'
	},
	_links: []
}

```

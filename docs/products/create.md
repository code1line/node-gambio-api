# Create a new product

### Description

Creates a new product.

### Method

```js
API.products.create(data)
```

### Parameters

`data` - *Object* - Product data

### Example

```js
const data = {
  isActive: true,
  sortOrder: 1,
  orderedCount: 1,
  productModel: 'ABC123',
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
    de: 'Testartikel',
  },
  description: {
    en: '[TAB:Page 1] Test Product Description (Page 1) [TAB: Page 2] Test Product Description (Page 2)',
    de: '[TAB:Seite 1] Testartikel Beschreibung (Seite 1) [TAB:Seite 2] Testartikel Beschreibung (Seite 2)',
  },
  shortDescription: {
    en: '<p>Test product short description.</p>',
    de: '<p>Testartikel Kurzbeschreibung</p>',
  },
  keywords: {
    en: '',
    de: '',
  },
  metaTitle: {
    en: '',
    de: '',
  },
  metaDescription: {
    en: '',
    de: '',
  },
  metaKeywords: {
    en: '',
    de: '',
  },
  url: {
    en: '',
    de: '',
  },
  urlKeywords: {
    en: 'test-article',
    de: 'Testartikel',
  },
  checkoutInformation: {
    en: '',
    de: '',
  },
  viewedCount: {
    en: 0,
    de: 32,
  },
  images: [
    {
      filename: 'artikelbild.jpg',
      isPrimary: true,
      isVisible: true,
      imageAltText: {
        en: 'product image',
        de: 'Artikelbild',
      },
    },
    {
      filename: 'artikelbild_1_1.jpg',
      isPrimary: false,
      isVisible: true,
      imageAltText: {
        en: '',
        de: '',
      },
    },
    {
      filename: 'artikelbild_1_2.jpg',
      isPrimary: false,
      isVisible: true,
      imageAltText: {
        en: '',
        de: '',
      },
    },
    {
      filename: 'artikelbild_1_3.jpg',
      isPrimary: false,
      isVisible: true,
      imageAltText: {
        en: '',
        de: '',
      },
    },
  ],
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
      {
        id: '0',
        isPermitted: false,
      },
      {
        id: '1',
        isPermitted: false,
      },
      {
        id: '2',
        isPermitted: true,
      },
      {
        id: '3',
        isPermitted: true,
      },
    ],
  },
  addonValues: {
    test_key: 'test_value',
  },
};

API.products.create(data);
```

### Return value in resolved promise

```js
// Object.
{
	id: 1336,
	isActive: true,
	sortOrder: 1,
	dateAdded: '2016-03-04 13:33:18',
	dateAvailable: '0000-00-00 00:00:00',
	lastModified: '2016-03-04 13:33:18',
	orderedCount: 1,
	productModel: 'ABC123',
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

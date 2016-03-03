# Create a new category

### Description

Creates a new category.

### Method

```js
API.categories.create(data)
```

### Parameters

`data` - *Object* - Category data

### Example

```js
// Category data used for creation.
const data = {
  parentId: 0,
  isActive: true,
  sortOrder: 0,
  name: {
    en: 'test category',
    de: 'Testkategorie',
  },
  headingTitle: {
    en: 'test category',
    de: 'Testkategorie',
  },
  description: {
    en: '<p>test category description</p>',
    de: '<p>Testkategorie Beschreibung</p>',
  },
  settings: {
    categoryListingTemplate: 'categorie_listing.html',
    productListingTemplate: 'product_listing_v1.html',
    sortColumn: 'p.products_price',
    sortDirection: 'ASC',
    onSitemap: true,
    groupPermissions: [
      {
        id: 0,
        isPermitted: false,
      },
      {
        id: 1,
        isPermitted: false,
      },
      {
        id: 2,
        isPermitted: true,
      },
      {
        id: 3,
        isPermitted: true,
      },
    ],
  },
  addonValues: { test_key: 'test_value' },
  icon: 'my_name.jpg',
};

// Create category.
API.categories.create(data);
```

### Return value in resolved promise

```js
// Object.
{
  id: 591,
  parentId: 0,
  isActive: true,
  sortOrder: 0,
  dateAdded: '2016-03-03 11:36:33',
  lastModified: '2016-03-03 11:36:33',
  name: { en: 'test category', de: 'Testkategorie' },
  headingTitle: { en: 'test category', de: 'Testkategorie' },
  description:
   { en: '<p>test category description</p>',
     de: '<p>Testkategorie Beschreibung</p>' },
  metaTitle: { en: '', de: '' },
  metaDescription: { en: '', de: '' },
  metaKeywords: { en: '', de: '' },
  urlKeywords: { en: '', de: '' },
  icon: 'my_name.jpg',
  image: '',
  imageAltText: { en: '', de: '' },
  settings:
   { categoryListingTemplate: 'categorie_listing.html',
     productListingTemplate: 'product_listing_v1.html',
     sortColumn: 'p.products_price',
     sortDirection: 'ASC',
     onSitemap: true,
     sitemapPriority: '',
     sitemapChangeFrequency: '',
     showAttributes: false,
     showGraduatedPrice: false,
     showQuantity: false,
     showQuantityInfo: false,
     showSubCategories: false,
     showSubCategoryImages: false,
     showSubCategoryNames: false,
     showSubCategoryProducts: false,
     isViewModeTiled: false,
     groupPermissions: [ [Object], [Object], [Object], [Object] ] },
  addonValues: { test_key: 'test_value' },
  _links: [],
}

```

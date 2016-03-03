# Update a category

### Description

Updates a category.

### Method

```js
API.categories.updateById(id, data)
```

### Parameters

`id` - *Integer* - Category ID

`data` - *Object* - Category data

### Example

```js
const data = {
  icon: 'new_file.jpg'
};

API.categories.updateById(500, data);
```

### Return value in resolved promise

```js
// Object.
{
  id: 500,
  parentId: 0,
  isActive: true,
  sortOrder: 0,
  dateAdded: '2016-03-03 01:51:25',
  lastModified: '2016-03-03 11:55:40',
  name: { en: 'test category', de: 'Testkategorie' },
  headingTitle: { en: 'test category', de: 'Testkategorie' },
  description:
   { en: '<p>test category description</p>',
     de: '<p>Testkategorie Beschreibung</p>' },
  metaTitle: { en: '', de: '' },
  metaDescription: { en: '', de: '' },
  metaKeywords: { en: '', de: '' },
  urlKeywords: { en: '', de: '' },
  icon: 'new_file.jpg',
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
  _links: []
}

```

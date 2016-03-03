// Category data.
export default {
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

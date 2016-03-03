# Search in categories

### Description

Searches for a specific term in categories.

### Method

```js
API.categories.search(term)
```

### Parameters

`term` - *string* - Search term

### Example

```js
API.categories.search('Otto');
```

### Return value in resolved promise

```js
// Array.
[
  {
    id: 598,
    parentId: 0,
    isActive: true,
    name: 'Testkategorie',
    headingTitle: 'Testkategorie',
    description: '<p>Testkategorie Beschreibung</p>',
    urlKeywords: '',
    icon: 'my_name.jpg',
    image: '',
    imageAltText: '',
    _links: []
  },
  {
    id: 600,
    parentId: 0,
    isActive: true,
    name: 'Testkategorie',
    headingTitle: 'Testkategorie',
    description: '<p>Testkategorie Beschreibung</p>',
    urlKeywords: '',
    icon: 'new_icon.jpg',
    image: '',
    imageAltText: '',
    _links: []
  },
]

```

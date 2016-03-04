# Search in products

### Description

Searches in products.

### Method

```js
API.products.search(term)
```

### Parameters

`term` - *String* - Search term

### Example

```js
API.products.search('test');
```

### Return value in resolved promise

```js
// Array.
[{
	id: 1336,
	isActive: true,
	name: 'Testartikel',
	image: 'artikelbild.jpg',
	imageAltText: 'Artikelbild',
	urlKeywords: '',
	_links: []
}, {
	id: 1338,
	isActive: true,
	name: 'Testartikel',
	image: 'artikelbild.jpg',
	imageAltText: 'Artikelbild',
	urlKeywords: '',
	_links: []
}]

```

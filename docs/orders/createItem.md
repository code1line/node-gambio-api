# Create order item

### Description

Creates an order item.

### Method

```js
API.orders.createItem(orderId, data)
```

### Parameters

`orderId` - *Number* - Order ID.

`data` - *Object* - Order item data.

### Example

```js
const data = {
  model: '12345-s-black',
  name: 'Ein Artikel',
  quantity: 1,
  price: 11,
  finalPrice: 11,
  tax: 19,
  isTaxAllowed: true,
  discount: 0,
  shippingTimeInformation: 'Some shipping time info',
  checkoutInformation: 'Checkout information goes here ...',
  attributes: [
    {
      id: 1,
      name: 'Farbe',
      value: 'rot',
      price: 0,
      priceType: '+',
      optionId: 1,
      optionValueId: 1,
      combisId: null,
    },
  ],
  downloadInformation: {
    filename: 'Dokument.pdf',
    maxDaysAllowed: 5,
    countAvailable: 14,
  },
  addonValues: {
    productId: '2',
  },
};

API.orders.createItem(400212, data);
```

### Return value in resolved promise

```js
// Object.
{}
```

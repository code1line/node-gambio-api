# Create order item attribute

### Description

Creates an order item attribute.

### Method

```js
API.orders.createItemAttribute(orderId, itemId, data)
```

### Parameters

`orderId` - *Integer* - Order ID.

`itemId` - *Integer* - Order item ID.

`data` - *Object* - Order item attribute data.

### Example

```js
const data = {
  name: 'Color',
  value: 'blue',
  price: 0.00,
  priceType: '+',
  optionId: 1,
  optionValueId: 1,
  combisId: null,
};

API.orders.createItemAttribute(400212, 3319, data);
```

### Return value in resolved promise

```js
// Object.
{
  id: 719,
  name: 'Color',
  value: 'blue',
  price: 0,
  priceType: '+',
  optionId: 1,
  optionValueId: 1,
  combisId: null
}

```

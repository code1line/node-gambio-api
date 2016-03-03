# Create order item attribute

### Description

Creates an order item attribute.

### Method

```js
API.orders.createItemAttribute(orderId, itemId, data)
```

### Parameters

`orderId` - *Number* - Order ID.

`itemId` - *Number* - Order item ID.

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

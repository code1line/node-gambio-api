# Update order item attribute

### Description

Updates an order item attribute by its ID.

### Method

```js
API.orders.updateItemAttributeById(orderId, itemId, attributeId, data)
```

### Parameters

`orderId` - *Number* - Order ID.

`itemId` - *Number* - Order item ID.

`attributeId` - *Number* - Order item attribute ID.

`data` - *Object* - Order item attribute data.

### Example

```js
const updateData = { name: 'Size' };
API.orders.updateItemAttributeById(402122, 3768, 1789, updateData);
```

### Return value in resolved promise

```js
// Object.
{
  name: 'Size',
  value: 'blue',
  price: 0.00,
  optionId: 1,
  optionValueId: 1,
  combisId: null
}
```

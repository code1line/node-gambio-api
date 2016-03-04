# Create order total

### Description

Creates an order total.

### Method

```js
API.orders.createTotal(orderId, data)
```

### Parameters

`orderId` - *Number* - Order ID.

`data` - *Object* - Order total data.

### Example

```js
const data = {
  title: 'Zwischensumme:',
  value: 50,
  valueText: '50,00 EUR',
  class: 'ot_subtotal',
  sortOrder: 10,
};

API.orders.createTotal(402119, data);
```

### Return value in resolved promise

```js
// Object.
{
	id: 2679,
	title: 'Zwischensumme:',
	value: 50,
	valueText: '50,00 EUR',
	class: 'ot_subtotal',
	sortOrder: 10
}
```

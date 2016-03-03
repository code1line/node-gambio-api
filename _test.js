const GambioApi = require('.');

const API = new GambioApi({
  url: 'https://www.gambio-shop.de/shop4',
  user: 'admin@shop.de',
  pass: 'gambioTest',
});

const data = {
  name: 'Color',
  value: 'blue',
  price: 0.00,
  priceType: '+',
  optionId: 1,
  optionValueId: 1,
  combisId: null,
};


API.orders
  .createItemAttribute(400212, 3319, data)
  .then(console.log)
  .catch(console.log);

/**
 * Example implementation of the Gambio JavaScript API
 * using the integrated REST-API of the official Gambio test shop.
 *
 * You can run this file by typing `node CreateGetUpdateDeleteCustomer.js` in terminal.
 *
 * Please make sure, that you have installed all dependencies
 * by running `npm install` before running this script.
 *
 * @author Ronald Loyko
 */

// Gambio demo shop credentials.
const credentials = require('./../test/_credentials');

// Gambio API class.
const GambioApi = require('./../lib/GambioApi');

// Create a new Gambio API instance with demo credentials.
const API = new GambioApi({
  url: credentials.url,
  user: credentials.user,
  pass: credentials.pass,
});

// Whitespace for console output.
const whiteSpace = '\n';

// Data used for new customer creation.
const data = {
  gender: 'm',
  firstname: 'John',
  lastname: 'Doe',
  dateOfBirth: '1985-02-13',
  vatNumber: '0923429837942',
  telephone: '2343948798345',
  fax: '2093049283',
  email: `gambio.js.api.${Math.random() * (100000 - 100) + 100}@test.com`,
  password: '0123456789',
  type: 'registree',
  address: {
    company: 'Test Company',
    street: 'Test Street',
    suburb: 'Test Suburb',
    postcode: '23983',
    city: 'Test City',
    countryId: 81,
    zoneId: 84,
    b2bStatus: true,
  },
};

// Perform requests.
API.customers.create(data)
  .then((response) => {
    // Log created customer.
    console.log(whiteSpace);
    console.log('Customer created:');
    console.log(response);

    // Perform GET request with received ID from result object.
    return API.customers.getById(response.id);
  })
  .then((response) => {
    // Log fetched customer.
    console.log(whiteSpace);
    console.log('Customer fetched:');
    console.log(response);

    // Log UPDATE request.
    console.log(whiteSpace);
    console.log('Now we want to change John\'s firstname to Marcus...');

    // Perform UPDATE request.
    return API.customers.updateById(response.id, { firstname: 'Marcus' });
  })
  .then((response) => {
    // Log changed customer.
    console.log(whiteSpace);
    console.log('Changed customer:');
    console.log(response);

    // Log DELETE request.
    console.log(whiteSpace);
    console.log('Lets delete him from the database...');

    // Perform DELETE request.
    return API.customers.deleteById(response.id);
  })
  .then((response) => {
    // Log deleted customer.
    console.log(whiteSpace);
    console.log('Customer has been deleted:');
    console.log(response);

    // Exiting program notice.
    console.log(whiteSpace);
    console.log('Everything worked! Exiting program...');
    process.exit(0);
  })

  // Log errors to console.
  .catch(console.error);

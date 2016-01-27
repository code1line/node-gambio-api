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
const credentials = require('./credentials');

// Gambio API class.
const GambioApi = require('./../lib/GambioApi');

// Create a new Gambio API instance with demo credentials.
const API = new GambioApi(credentials);

// Some whitespace shortcut for console.
const whiteSpace = '\n\n';

// Customer data used for new customer creation.
const data = {
  gender: 'm',
  firstname: 'John',
  lastname: 'Doe',
  dateOfBirth: '1985-02-13',
  vatNumber: '0923429837942',
  telephone: '2343948798345',
  fax: '2093049283',
  email: 'gambio.test.emai.from.node.api@test.com',
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

// Log creation process.
console.log('Creating customer...');

// Perform reqeust.
const createRequest = API.customers.create(data);

// Handle promise.
createRequest

  // Creation request promise.
  .then((response) => {
    // Log created customer to console.
    console.log(whiteSpace);
    console.log('Customer created:');
    console.log(response);

    // Save ID from created customer in variable.
    const newCustomerId = response.id;

    // Log GET request process to console.
    console.log(whiteSpace);
    console.log('Fetching customer...');

    // Perform get request.
    return API.customers.getById(newCustomerId);
  })

  // Get request promise.
  .then((response) => {
    // Log fetched customer to console.
    console.log(whiteSpace);
    console.log('Customer fetched:');
    console.log(response);

    // Save ID from fetched customer in variable.
    const fetchedCustomerId = response.id;

    // Log update request process to console.
    console.log(whiteSpace);
    console.log('Now we want to change John\'s firstname to Marcus!');
    console.log('Updating customer...');

    // Data to change.
    const dataToChange = {
      firstname: 'Marcus',
    };

    // Perform update request.
    return API.customers.updateById(fetchedCustomerId, dataToChange);
  })

  // Update request promise.
  .then((response) => {
    // Log changed customer to console.
    console.log(whiteSpace);
    console.log('Customer firstname should be Marcus now.');
    console.log('Changed customer:');
    console.log(response);

    // Save ID from changed customer in variable.
    const changedCustomerId = response.id;

    // Log delete request process to console.
    console.log(whiteSpace);
    console.log('Lets delete him from the database');
    console.log('Deleting customer...');

    // Perform delete request.
    return API.customers.deleteById(changedCustomerId);
  })

  // Delete request promise.
  .then((response) => {
    // Log deleted customer to console.
    console.log(whiteSpace);
    console.log('Customer has been deleted:');
    console.log(response);

    // Exiting program notice.
    console.log(whiteSpace);
    console.log('Everything worked! Exiting program...');
  })

  // Log errors to console.
  .catch(console.error);

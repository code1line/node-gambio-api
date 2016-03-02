/**
 * Returns customer data with a random email address.
 * @return {Object}
 */
function getData() {
  return {
    gender: 'm',
    firstname: 'John',
    lastname: 'Doe',
    dateOfBirth: '1985-02-13',
    vatNumber: '0923429837942',
    telephone: '2343948798345',
    fax: '2093049283',
    email: `test.${Math.random() * (100000 - 100) + 100}@example.com`,
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
}

export default getData;

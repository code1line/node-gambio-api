/**
 * @name Helper
 *
 * @description Provides various helper methods.
 *
 * @example
 * 	const Helper = require('./Helper');
 * 	const UrlParams = Helper.convertSortingObject({ id: 'asc' });
 */

'use strict';

const check = require('check-types');

/**
 * Class representing a helper.
 */
class Helper {

  /**
   * Converts a provided hash of sorting order directives to URL parameters.
   *
   * @example
   * 	const UrlParams = Helper.convertSortingObject({ id: 'desc' });
   *  console.log(urlParams); // outputs 'sort=-id'.
   *
   * @param {object} sorting Sorting criteria hash.
   *
   * @return {string} Composed URL parameters.
   *
   * @static
   * @private
   */
  static convertSortingObject(sorting) {
    // Composed URL.
    let url = 'sort=';

    // Object containing the signs for sorting order.
    const signHash = {
      asc: '+',
      desc: '-',
    };

    // Iterate over each entry in sorting object
    // and try to append the respective sign '+'/'-' and field name to the URL.
    for (const fieldName in sorting) {
      if (sorting.hasOwnProperty(fieldName)) {
        // Shortcut to value.
        const value = sorting[fieldName];

        // Check if field value is 'asc' or 'desc' and append sign and field name to URL.
        if (check.contains(value, 'asc') || check.contains(value, 'desc')) {
          // Composed parameter (sign and field name).
          const parameter = `${signHash[value]}${fieldName},`;

          // Append composed parameter to URL.
          url += parameter;
        }
      }
    }

    // Return composed url.
    return url;
  }
}

module.exports = Helper;

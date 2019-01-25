const services = require('../util/services');

/**
 * A service made to communicate with notification service
 * @module services/MapService
 */

module.exports = {
    /**
     * Object containing function for communicating with Map Service
     * @exports services/location
     * @namespace location
     */
    location: {
        /**
         * @function
         * Function that creates a location instance
         *
         * @param {Object} location Object containing ltn/lng data for the position
         * @returns {Object} returns the data values created by location instance
         * @memberof location
         */
        async create(location) {
            const r = await services.fetch.post(
                'map',
                'location',
                {},
                {
                    location: location,
                }
            );
            return r.json();
        },

        /**
         * @function
         * Function that retrieves location info based on id
         *
         * @param {UUID} id locationId
         * @returns {Object} returns the data values found by Map Service
         * @memberof location
         */
        async retrieveOne(id) {
            const r = await services.fetch.get('map', `location/${id}`, {});
            return r.json();
        },

        /**
         * @function
         * Function that retrieves map info based on filters
         *
         * @param {Object} filters
         * @returns {Object} returns the info found with the filters
         * @memberof location
         */
        async retrieve(filters) {
            const r = await services.fetch.get('map', 'location', filters);
            return r.json();
        },
    },
};
{
    municipality: 'uuid';
}

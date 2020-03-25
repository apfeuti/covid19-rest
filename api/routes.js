'use strict';
module.exports = function(app) {
    var controller = require('./controller');

    const openZHV1 = '/api/openzh/v1';

    app.route('/api/doc')
        .get(controller.doc);

    app.route(openZHV1 + '/all')
        .get(controller.allData);

    app.route(openZHV1 + '/country/:country')
        .get(controller.findByCountry);

    app.route(openZHV1 + '/country/:country/area/:area')
        .get(controller.findByArea);

};
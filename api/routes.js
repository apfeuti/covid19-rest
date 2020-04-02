'use strict';
module.exports = function(app) {
    var controller = require('./controllerOpenZH');
    var controllerJUH = require('./controllerJHU');

    const openZHV1 = '/api/openzh/v1';
    const jhuV1 = '/api/jhu/v1';

    app.route('/api/doc')
        .get(controller.doc);

    app.route(openZHV1 + '/all')
        .get(controller.allData);

    app.route(openZHV1 + '/country/:country')
        .get(controller.findByCountry);

    app.route(openZHV1 + '/country/:country/area/:area')
        .get(controller.findByArea);


    app.route(jhuV1 + '/all')
        .get(controllerJUH.allData);

    app.route(jhuV1 + '/country/:country')
        .get(controllerJUH.findByCountry);

    app.route(jhuV1 + '/country/:country/area/:area')
        .get(controllerJUH.findByArea);

    app.route(jhuV1 + '/country/:country/area/:area/admin/:admin')
        .get(controllerJUH.findByAdmin);

};
'use strict';
module.exports = function(app) {
    var controller = require('./controller');

    const openZHV1 = '/api/openzh/v1';

    app.route('/api/doc')
        .get(controller.doc);

    app.route(openZHV1)
        .get(controller.allData);

    app.route(openZHV1 + '/date/:date')
        .get(controller.findByDate);

    app.route(openZHV1 + '/area/:area')
        .get(controller.findByArea);

    app.route(openZHV1 + '/date/:date/area/:area')
        .get(controller.findByDateAndArea);

};
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());


var routes = require('./api/routes');
routes(app);

app.use(express.static('static'));

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found. This API is work in progress and backward-compatibility is not guaranteed yet. Please consult the api-doc frequently: https://github.com/apfeuti/covid_19/tree/rest-api/rest'})
});

app.listen(port);

console.log('openZH-covid19 RESTful API server started on port: ' + port);
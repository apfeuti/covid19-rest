var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

app.use(require('cors')());

var routes = require('./api/routes');
routes(app);

app.use(express.static('static'));

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found. This API is work in progress and backward-compatibility is not guaranteed yet. Please consult the api-docs frequently: https://github.com/apfeuti/covid19-rest'})
});

app.listen(port, function() {
    console.log('openZH-covid19 RESTful API server started on port: ' + port);
});
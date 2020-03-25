'use strict';

const csv = require('csvtojson');
const {Parser} = require('json2csv');
const request = require('request');
const cron = require('node-cron');

var allDataCH;
var allDataFL;

// initial load
loadData();

// reaload each minute
cron.schedule('* * * * *', function () {
    loadData();
});

exports.doc = function (req, res) {
  res.redirect('https://github.com/apfeuti/covid19-rest');
};

exports.allData = function (req, res) {
    var data = applyFilters(allDataCH.concat(allDataFL), req.query);
    makeOutput(data, req.query, res);

};

exports.findByCountry = function (req, res) {
    var data = [] ;

    if (req.params.country.toUpperCase() === 'CH') {
        data = allDataCH;
    }  else if (req.params.country.toUpperCase() === 'FL') {
        data = allDataFL;
    }
    data = applyFilters(data, req.query);
    makeOutput(data, req.query, res);

};


exports.findByArea = function (req, res) {
    var data = [];

    // no area support for FL
    if (req.params.country.toUpperCase() === 'CH') {
        data = allDataCH.filter(row => row.abbreviation_canton_and_fl.toUpperCase() === req.params.area.toUpperCase());
    }
    data = applyFilters(data, req.query);
    makeOutput(data, req.query, res);
};

function loadData() {
    allDataCH = [];
    const areas = ['AG', 'AI', 'AR', 'BE', 'BL', 'BS', 'FR', 'GE', 'GL', 'GR', 'JU', 'LU', 'NE', 'NW', 'OW', 'SH', 'SZ', 'SO', 'SG', 'TG', 'TI', 'UR', 'VS', 'VD', 'ZG', 'ZH'];
    const promises = [];

    areas.forEach((area, index) => {
        var dataLocation = 'https://raw.githubusercontent.com/openZH/covid_19/master/fallzahlen_kanton_total_csv/COVID19_Fallzahlen_Kanton_' + area + '_total.csv';

        promises.push(
            csv({
                checkType: true
            })
                .fromStream(request.get(dataLocation))
                .then(dataAsJson => {
                    // the merge to 'allData' must be done, when all data from all resources are loaded, otherwise the concat has race-conditions -> use Promise to do async.
                    return new Promise((resolve, reject) => {
                        console.log(new Date().toISOString() + ': data-load from: ' + areas[index] + '. Records: ' + dataAsJson.length);
                        try {
                            resolve(dataAsJson);
                        } catch (e) {
                            console.error(new Date().toISOString() + ': error by data-load from: ' + areas[index] + '. ' + e);
                            reject(e);
                        }
                    });
                })
        );

        csv({
            checkType: true
        })
            .fromStream(request.get('https://raw.githubusercontent.com/openZH/covid_19/master/fallzahlen_kanton_total_csv/COVID19_Fallzahlen_FL_total.csv'))
            .then(dataAsJson => allDataFL = dataAsJson);

    });

   Promise.all(promises)
       .then(jsonPerArea => allDataCH = allDataCH.concat(jsonPerArea).flat());

}

function applyFilters(data, query) {
    return query.date ? data.filter(row => row.date === query.date) : data;

}

function makeOutput(data, query, res) {
    if (query.output && query.output.toLowerCase() === 'csv') {

        res.set('Content-Type', 'text/plain');
        if (data && data.length > 0) {
            const opts = {"quote": ''};
            const jsonParser = new Parser(opts);
            res.send(jsonParser.parse(data));
        } else {
            res.send('');
        }
    } else {
        res.json(data);
    }
}
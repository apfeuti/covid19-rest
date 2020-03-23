'use strict';

const csv = require('csvtojson');
const {Parser} = require('json2csv');
const request = require('request');
const cron = require('node-cron');

var allData;

// initial load
loadData();

// reaload each minute
cron.schedule('* * * * *', function () {
    loadData();
});

exports.doc = function (req, res) {
  res.redirect('https://github.com/apfeuti/covid_19/tree/rest-api/rest');
};

exports.allData = function (req, res) {
    makeOutput(allData, req.query, res);

};

exports.findByDate = function (req, res) {
    var data = allData.filter(row => row.date === req.params.date);
    makeOutput(data, req.query, res);

};

exports.findByArea = function (req, res) {
    var data = allData.filter(row => row.abbreviation_canton_and_fl.toUpperCase() === req.params.area.toUpperCase());
    makeOutput(data, req.query, res);
};

exports.findByDateAndArea = function (req, res) {
    var data = allData.filter(row => row.date === req.params.date
        && row.abbreviation_canton_and_fl.toUpperCase() === req.params.area.toUpperCase()
    );
    makeOutput(data, req.query, res);
};

function loadData() {
    allData = [];
    const areas = ['AG', 'AI', 'AR', 'BE', 'BL', 'BS', 'FR', 'GE', 'GL', 'GR', 'JU', 'LU', 'NE', 'NW', 'OW', 'SH', 'SZ', 'SO', 'SG', 'TG', 'TI', 'UR', 'VS', 'VD', 'ZG', 'ZH', 'FL'];
    const promises = [];

    areas.forEach((area, index) => {
        var dataLocation;
        if (area === 'FL') {
            dataLocation = 'https://raw.githubusercontent.com/openZH/covid_19/master/fallzahlen_kanton_total_csv/COVID19_Fallzahlen_' + area + '_total.csv';
        } else {
            dataLocation = 'https://raw.githubusercontent.com/openZH/covid_19/master/fallzahlen_kanton_total_csv/COVID19_Fallzahlen_Kanton_' + area + '_total.csv';
        }

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
    });

   Promise.all(promises)
       .then(jsonPerArea => allData = allData.concat(jsonPerArea).flat());

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
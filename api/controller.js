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
    var outputData = {};
    outputData['totals'] = calculateTotalsIfJson(data, req);
    outputData['records'] = data;
    makeOutput(outputData, req.query, res);

};

exports.findByCountry = function (req, res) {
    var data = [] ;

    if (req.params.country.toUpperCase() === 'CH') {
        data = allDataCH;
    }  else if (req.params.country.toUpperCase() === 'FL') {
        data = allDataFL;
    }

    var filteredData = applyFilters(data, req.query);
    var outputData = {};
    outputData['totals'] = calculateTotalsIfJson(filteredData, req);
    outputData['records'] = filteredData;
    makeOutput(outputData, req.query, res);

};


exports.findByArea = function (req, res) {
    var data = [];

    // no area support for FL
    if (req.params.country.toUpperCase() === 'CH') {
        data = allDataCH.filter(row => row.abbreviation_canton_and_fl.toUpperCase() === req.params.area.toUpperCase());
    }
    var filteredData = applyFilters(data, req.query);
    var outputData = {};
    outputData['records'] = filteredData;
    makeOutput(outputData, req.query, res);
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
        if (data.records && data.records.length > 0) {
            const opts = {"quote": ''};
            const jsonParser = new Parser(opts);
            res.send(jsonParser.parse(data.records));
        } else {
            res.send('');
        }
    } else {
        res.json(data);
    }
}

function calculateTotalsIfJson(data, req) {
    if ((req.query.output && req.query.output.toLowerCase() === 'csv') || data.length === 0) {
        return null;
    }

    var groupedByArea = groupBy(data, 'abbreviation_canton_and_fl');
    var mostRecentOfEachArea = [];
    Object.entries(groupedByArea).forEach(([key, value]) => {
        // from each area-array, we take only the last-entry (this is the most recent record, since the data are already sorted by date)
        mostRecentOfEachArea.push(value.slice(-1));
    });

    mostRecentOfEachArea = mostRecentOfEachArea.flat();


    return  {
        ncumul_tested: mostRecentOfEachArea.map(row => parseInt(row.ncumul_tested) || 0).reduce((acc, value) => acc + value),
        ncumul_conf: mostRecentOfEachArea.map(row => parseInt(row.ncumul_conf) || 0).reduce((acc, value) => acc + value),
        ncumul_hosp: mostRecentOfEachArea.map(row => parseInt(row.ncumul_hosp) || 0).reduce((acc, value) => acc + value),
        ncumul_ICU: mostRecentOfEachArea.map(row => parseInt(row.ncumul_ICU) || 0).reduce((acc, value) => acc + value),
        ncumul_vent: mostRecentOfEachArea.map(row => parseInt(row.ncumul_vent) || 0).reduce((acc, value) => acc + value),
        ncumul_released: mostRecentOfEachArea.map(row => parseInt(row.ncumul_released) || 0).reduce((acc, value) => acc + value),
        ncumul_deceased: mostRecentOfEachArea.map(row => parseInt(row.ncumul_deceased) || 0).reduce((acc, value) => acc + value)
    };
}

// credits goes to https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
var groupBy = function(data, key) { // `data` is an array of objects, `key` is the key (or property accessor) to group by
                                    // reduce runs this anonymous function on each element of `data` (the `item` parameter,
                                    // returning the `storage` parameter at the end
    return data.reduce(function(storage, item) {
        // get the first instance of the key by which we're grouping
        var group = item[key];

        // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
        storage[group] = storage[group] || [];

        // add this item to its group within `storage`
        storage[group].push(item);

        // return the updated storage to the reduce function, which will then loop through the next
        return storage;
    }, {}); // {} is the initial value of the storage
};

//console.log(groupBy(['one', 'two', 'three'], 'length'));

// => {3: ["one", "two"], 5: ["three"]}
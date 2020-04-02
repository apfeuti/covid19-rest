'use strict';

const csv = require('csvtojson');
const {Parser} = require('json2csv');
const request = require('request');
const cron = require('node-cron');
const _ = require('lodash/lang');
const countryMapping = require('./countryMapping');

var allDataWorld = new Map();

// initial load
loadData();

// reaload each 30 minutes (half hourly)
// JHU updates daily-reports only once a day on the Github-Repo.
cron.schedule('*/30 * * * *', function () {
     loadData();
});


exports.allData = function (req, res) {
    var data = allDataWorld;

    data = applyFilters(data, req, dateFilter);
    postProcess(data, req, res);
};

exports.findByCountry = function (req, res) {
    var data = allDataWorld;

    data = applyFilters(data, req, countryFilter, dateFilter);
    postProcess(data, req, res);
};

exports.findByArea = function (req, res) {
    var data = allDataWorld;

    data = applyFilters(data, req, countryFilter, areaFilter, dateFilter);
    postProcess(data, req, res);
};

exports.findByAdmin = function (req, res) {
    var data = allDataWorld;

    data = applyFilters(data, req, countryFilter, areaFilter, adminFilter, dateFilter);
    postProcess(data, req, res);
};


function loadData() {
    var start = new Date();
    const promises = [];

    const dates = getDates(new Date(2020, 0, 22), new Date());
    dates.forEach((date, index) => {

        var dataLocation = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/' + formatDate_mm_dd_yyyy(date) + '.csv';

        promises.push(
            csv({
                checkType: true
            })
                .fromStream(request.get(dataLocation))
                .then(dataAsJson => {
                    // the merge to 'allData' must be done, when all data from all resources are loaded, otherwise the concat has race-conditions -> use Promise to do async.
                    return new Promise((resolve, reject) => {
                        console.log(new Date().toISOString() + ': data-load from: ' +formatDate_mm_dd_yyyy(dates[index]) + '. Records: ' + dataAsJson.length);
                        try {
                            resolve({data: dataAsJson, date: formatDate_yyyy_mm_dd(dates[index])});
                        } catch (e) {
                            console.error(new Date().toISOString() + ': error by data-load from: ' + dates[index] + '. ' + e);
                            reject(e);
                        }
                    });
                })
        );
    });


    Promise.all(promises)
        .then(jsonPerDay => {
            addAndMapFields(jsonPerDay);
            var allDataFlat = jsonPerDay.map(dataDateObj => dataDateObj.data).flat();
            buildStructuredMap(allDataFlat);
            var stop = new Date();
            console.log('Time to download JHU-data and build map: ' + (stop - start));
        });
}

function countryFromRow(row) {
    var country;
    if (row['Country/Region']) {
        country = row['Country/Region']
    } else if (row.Country_Region) {
        country = row.Country_Region
    } else {
        console.error('No country-field found for row: ' + JSON.stringify(row));
        country = 'undefined';
    }
    return country;
}

function addAndMapFields(jsonPerDay) {
    // Add date to each row, because this is missing in original-data.
    // The date is only implicitly given through the filename.
    // Map also country-name to ISO3166 alpha-3
    jsonPerDay.forEach(day => {
        day.data.forEach(row => {
            row['date'] = day.date;

            var country = countryFromRow(row, country);
            var alpha3 = countryMapping.getAlpha3(country);
            if (alpha3) {
                row['countryISO'] = alpha3;
            } else {
                console.error('No alpha3-ISO found for country: ' + country)
            }
        })
    });
}

function buildStructuredMap(allDataFlat) {
    // each entry in the array is for a country
    // a country has areas
    // a area has admins
    // and a admin has rows
    allDataWorld = new Map();

    allDataFlat.forEach(flatEntry => {
        // country
        var countryISO = flatEntry.countryISO;
        var countryObj = allDataWorld.get(countryISO);
        if (!countryObj) {
            countryObj = {country: countryISO, areas: new Map()};
            allDataWorld.set(countryISO, countryObj);
        }

        // // area
        var area;
        if ('Province/State' in flatEntry){
            area = flatEntry['Province/State'];
        } else if ('Province_State' in flatEntry) {
            area = flatEntry.Province_State;
        } else {
            console.error("No area-field found for row: " + JSON.stringify(flatEntry));
            area = 'undefined'
        }
        if (area.trim().length === 0) {
            // no area defined for this row -> use main
            area = 'main';
        }
        var areaKey = area.replace(/ /g, '').toUpperCase();  // remove all spaces and upper-case
        var areaObj = countryObj.areas.get(areaKey);
        if (!areaObj) {
            areaObj = {area: areaKey, admins: new Map()};
            countryObj.areas.set(areaKey, areaObj);
        }

        // // admin (city)
        var admin = flatEntry.Admin2;
        if (!admin || admin.length === 0) {
            // no admin defined for this row -> use main
            admin = 'main';
        }
        var adminKey = admin.replace(/ /g, '').toUpperCase();  // remove all spaces and upper-case
        var adminObj = areaObj.admins.get(adminKey);
        if (!adminObj) {
            adminObj = {admin: adminKey, rows: []};
            areaObj.admins.set(adminKey, adminObj);
        }

        // payload fields
        var lastUpdate;
        if ('Last Update' in flatEntry){
            lastUpdate = flatEntry['Last Update'];
        } else if ('Last_Update' in flatEntry) {
            lastUpdate = flatEntry.Last_Update;
        } else {
            console.error("No last-update-field found for row: " + JSON.stringify(flatEntry));
            lastUpdate = null;
        }

        var latitude;
        if ('Latitude' in flatEntry){
            latitude = flatEntry['Latitude'];
        } else if ('Lat' in flatEntry) {
            latitude = flatEntry.Lat;
        } else {
            latitude = null;
        }

        var longitude;
        if ('Longitude' in flatEntry){
            longitude = flatEntry['Longitude'];
        } else if ('Long_' in flatEntry) {
            longitude = flatEntry.Long_;
        } else {
            longitude = null;
        }

        var confirmed;
        if ('Confirmed' in flatEntry){
            confirmed = flatEntry['Confirmed'];
        } else {
            console.error("No confirmed-field found for row: " + JSON.stringify(flatEntry));
            confirmed = 0;
        }

        var released;
        if ('Recovered' in flatEntry){
            released = flatEntry['Recovered'];
        } else {
            console.error("No recovered-field found for row: " + JSON.stringify(flatEntry));
            released = 0;
        }

        var deceased;
        if ('Deaths' in flatEntry){
            deceased = flatEntry['Deaths'];
        } else {
            console.error("No deaths-field found for row: " + JSON.stringify(flatEntry));
            deceased = 0;
        }

        var fips;
        if ('FIPS' in flatEntry) {
            fips = flatEntry['FIPS'];
        } else {
            fips = null;
        }

        // add record with payload-data
        adminObj.rows.push({
            date: flatEntry.date,
            country: countryFromRow(flatEntry),
            countryISO: flatEntry.countryISO,
            area: area,
            admin: admin,
            fips: fips,
            lastUpdate: lastUpdate,
            latitude: latitude,
            longitude: longitude,
            ncumul_conf: confirmed !== '' ? confirmed : 0,
            ncumul_released: released !== '' ? released: 0,
            ncumul_deceased: deceased !== '' ? deceased: 0,
        });
    });

    // verify if all rows are ordered by date
    allDataWorld.forEach(country => {
        country.areas.forEach(area => {
            area.admins.forEach(admin => {
                var previousDate = '1900-01-01';
                admin.rows.forEach(row => {
                    if (row.date <= previousDate) {
                        console.error("Rows not correctly ordered: Country: " + country.country + ". Area: " + area.area + ". Admin: " + admin.admin + ". Current-Row-Date: " + row.date + ". Previous-Row-Date:" + previousDate);
                        previousDate = row.date;
                    }
                })
            })
        })
    });

}



function countryFilter(data, req) {
    var filteredData = data.get(req.params.country.toUpperCase());
    var filteredMap = new Map();

    if (!filteredData) {
        // no data found
        return filteredMap; // empty map
    }

    // rebuild whole structure with country as root
    filteredMap.set(filteredData.country, {country: filteredData.country, areas: filteredData.areas});
    return filteredMap;
}

function areaFilter(data, req) {
    // there's only one country, because country-filter was already applied. So the first key of the map is taken.
    var country = data.keys().next().value;
    var filteredData = data.get(country).areas.get(req.params.area.toUpperCase());
    var filteredMap = new Map();

    if (!filteredData) {
        // no data found
        return filteredMap; // empty map
    }

    // rebuild whole structure with country as root
    var areaMap = new Map();
    areaMap.set(filteredData.area, {area: filteredData.area, admins: filteredData.admins});
    filteredMap.set(country, {country: country, areas: areaMap});
    return filteredMap;

}

function adminFilter(data, req) {
    // there's only one country, because country-filter was already applied. So the first key of the map is taken.
    var country = data.keys().next().value;

    // there's only one area, because area-filter was already applied. So the first key of the map is taken.
    var area = data.get(country).areas.keys().next().value;
    var filteredData = data.get(country).areas.get(area).admins.get(req.params.admin.toUpperCase());
    var filteredMap = new Map();

    if (!filteredData) {
        // no data found
        return filteredMap; // empty map
    }

    // rebuild whole structure with country as root
    var areaMap = new Map();
    var adminMap = new Map();
    adminMap.set(filteredData.admin, {admin: filteredData.admin, rows: filteredData.rows});
    areaMap.set(area, {area: area, admins: adminMap});
    filteredMap.set(country, {country: country, areas: areaMap});
    return filteredMap;

}

function dateFilter(data, req) {
    if (req.query.date) {
        // very important to deep-clone, otherwise the allDataWorld-data-holder is mutated!
        var dataClone = _.cloneDeep(data);
        dataClone.forEach(country => {
            country.areas.forEach(area => {
                area.admins.forEach(admin => {
                    // reasign filtered rows
                    admin.rows = admin.rows.filter(row => row.date === req.query.date);
                })
            })
        });
    }
    return dataClone || data;
}

function applyFilters() {
    // call all filter-functions (arguments beginning at position 3
    var filterFunctions = Array.from(arguments);
    filterFunctions.splice(0, 2); // remove data- and req-parameter

    // arguments[0] = data, arguments[1] = req
    var data = arguments[0];
    filterFunctions.forEach(filterFunction => {
        data = filterFunction(data, arguments[1])
    });
    return data;
}

function postProcess(data, req, res) {
    var outputData = {};
    outputData['totals'] = calculateTotalsIfJson(data, req);
    outputData['records'] = mapToOutput(data);
    makeOutput(outputData, req.query, res);
}

function calculateTotalsIfJson(data, req) {
    if ((req.query.output && req.query.output.toLowerCase() === 'csv') || data.length === 0) {
        return null;
    }

    var mostRecentOfEachAdmin = [];
    data.forEach(country => {
        country.areas.forEach(area => {
            area.admins.forEach(admin => {
                mostRecentOfEachAdmin.push(admin.rows.slice(-1));
            })
        })
    });

    mostRecentOfEachAdmin = mostRecentOfEachAdmin.flat();

    if (mostRecentOfEachAdmin.length === 0) {
        // filters returned no data
        return null;
    }

    return {
        ncumul_conf: mostRecentOfEachAdmin.map(row => parseInt(row.ncumul_conf) || 0).reduce((acc, value) => acc + value),
        ncumul_released: mostRecentOfEachAdmin.map(row => parseInt(row.ncumul_released) || 0).reduce((acc, value) => acc + value),
        ncumul_deceased: mostRecentOfEachAdmin.map(row => parseInt(row.ncumul_deceased) || 0).reduce((acc, value) => acc + value)
    };
}

function mapToOutput(data) {
    var records = [];
    data.forEach(country => {
        country.areas.forEach(area => {
            area.admins.forEach(admin => {
                admin.rows.forEach(row => {
                    records.push({
                        date: row.date,
                        country: row.country,
                        countryISO: row.countryISO,
                        area: row.area !== 'main' ? row.area : null,
                        admin: row.admin !== 'main' ? row.admin : null,
                        fips: row.fips,
                        lastUpdate: row.lastUpdate,
                        latitude: row.latitude,
                        longitude: row.longitude,
                        ncumul_conf: row.ncumul_conf,
                        ncumul_released: row.ncumul_released,
                        ncumul_deceased: row.ncumul_deceased
                    })
                })
            })
        })
    });

    return records;
}

function makeOutput(data, query, res) {
    if (query.output && query.output.toLowerCase() === 'csv') {

        res.set('Content-Type', 'text/plain');
        if (data.records && data.records.length > 0) {
            const jsonParser = new Parser();
            res.send(jsonParser.parse(data.records));
        } else {
            res.send('');
        }
    } else {
        res.json(data);
    }
}


function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(currentDate);
        currentDate = new Date(currentDate.valueOf());
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
}

function formatDate_mm_dd_yyyy(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return mm + '-' + dd + '-' + yyyy;
}

function formatDate_yyyy_mm_dd(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
}

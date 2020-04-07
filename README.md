# COVID19 REST-API
This is a REST-API to get data about COVID19 (new corona-virus) cases.
Data sources are
[Open Data Kanton Zürich (openZH)](https://github.com/openZH/covid_19/tree/master/fallzahlen_kanton_total_csv)
(for **detailed figures about Switzerland**) and
[Johns Hopkins University](https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports)
(for figures about the world - **including detailed data on city-level
for the United States of America (USA)**).

The data can be filtered by country, area, (city/admin on JHU-data) and
date. Aggregated sums are available on each filter level. Output is
available in json and csv.


## Usage
### Server
[https://covid19-rest.herokuapp.com]

### API for openZH-data (Switzerland)
|Method | API                                                     | Remark                                                                                                                                                                                           | Example call                                                            |
|-------|---------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| GET   | /api/doc                                                | currently a redirect to this github-readme                                                                                                                                                       | [https://covid19-rest.herokuapp.com/api/doc]                            |
| GET   | /api/openzh/v1/all                                      | read all data                                                                                                                                                                                    | [https://covid19-rest.herokuapp.com/api/openzh/v1/all]                  |
| GET   | /api/openzh/v1/country/\<country>                       | read all data for the given country. <br> <li> CH (Switzlerand) <li> FL (Fürstentum Liechtenstein)                                                                                               | [https://covid19-rest.herokuapp.com/api/openzh/v1/country/CH]           |
| GET   | /api/openzh/v1/country/\<country>/area/\<area>          | read all data for the given country and area. Area is one of this [Swiss-cantons](https://en.wikipedia.org/wiki/Cantons_of_Switzerland#List), column 'code'. <br> Not supported for country FL   | [https://covid19-rest.herokuapp.com/api/openzh/v1/country/CH/area/BE]   |

#### Query parameters
On all calls listed above, you can add optionally the following query-parameters.

|Parameter              | Remark                                             | Example call                                                                             | 
|-----------------------|----------------------------------------------------|------------------------------------------------------------------------------------------|
| date=\<yyyy-mm-dd>    | only data for the given date. Format: yyyy-mm-dd   | [https://covid19-rest.herokuapp.com/api/openzh/v1/country/CH?date=2020-03-23]            |
| output=csv            | output in csv instead of json                      | [https://covid19-rest.herokuapp.com/api/openzh/v1/country/CH?date=2020-03-23&output=csv] |

#### Output json
```json
{"totals": {
    "ncumul_tested_fwd": 8219,
    "ncumul_conf_fwd": 6561,
    "ncumul_hosp_fwd": 906,
    "ncumul_ICU_fwd": 140,
    "ncumul_vent_fwd": 87,
    "ncumul_released_fwd": 177,
    "ncumul_deceased_fwd": 96
  },
  "records": [
    {
      "date": "2020-03-22",
      "time": "12:00",
      "abbreviation_canton_and_fl": "AG",
      "ncumul_tested": "",
      "ncumul_conf": 232,
      "ncumul_hosp": "",
      "ncumul_ICU": "",
      "ncumul_vent": "",
      "ncumul_released": "",
      "ncumul_deceased": 1,
      "source": "https://www.ag.ch/de/aktuelles/medienportal/medienmitteilung/medienmitteilungen/mediendetails_139237.jsp",
      "ncumul_tested_fwd": 0,
      "ncumul_conf_fwd": 232,
      "ncumul_hosp_fwd": 25,
      "ncumul_ICU_fwd": 4,
      "ncumul_vent_fwd": 2,
      "ncumul_released_fwd": 4,
      "ncumul_deceased_fwd": 1
    },
    {
      "date": "2020-03-22",
      "time": "",
      "abbreviation_canton_and_fl": "BL",
      "ncumul_tested": "",
      "ncumul_conf": 289,
      "ncumul_hosp": 40,
      "ncumul_ICU": 7,
      "ncumul_vent": "",
      "ncumul_released": 21,
      "ncumul_deceased": 3,
      "source": "https://www.baselland.ch/politik-und-behorden/direktionen/volkswirtschafts-und-gesundheitsdirektion/medienmitteilungen/update-289-bestaetigte-faelle-in-basel-landschaft",
      "ncumul_tested_fwd": 0,
      "ncumul_conf_fwd": 289,
      "ncumul_hosp_fwd": 40,
      "ncumul_ICU_fwd": 7,
      "ncumul_vent_fwd": 0,
      "ncumul_released_fwd": 21,
      "ncumul_deceased_fwd": 3
    },
    ....
  ]
}
```
**Remark:** 'totals' are available by /all and /country. It's the sum over all countries/areas, hence you can get the totals for Switzerland with /country/CH.
If no date-query-parameter is set, the last day per area is taken to build the sum.

**Forwarded values:** Field-names ending with "_fwd" are never empty.
Instead the value from the previous date is taken. For many usecases (e.
g. aggregate totals), the fwd-fields are the preferred choice. The field
without _fwd is empty, if no value was reported by a canton for that
date.

#### Ouptut csv
```
date","time","abbreviation_canton_and_fl","ncumul_tested","ncumul_conf","ncumul_hosp","ncumul_ICU","ncumul_vent","ncumul_released","ncumul_deceased","source","ncumul_tested_fwd","ncumul_conf_fwd","ncumul_hosp_fwd","ncumul_ICU_fwd","ncumul_vent_fwd","ncumul_released_fwd","ncumul_deceased_fwd","ncumul_confirmed_non_resident","ninst_hosp_non_resident","ncumul_ICF","ninst_ICU_intub","ncumul_deceased_suspect","TotalPosTests1"
"2020-03-22","12:00","AG","",232,"","","","",1,"https://www.ag.ch/de/aktuelles/medienportal/medienmitteilung/medienmitteilungen/mediendetails_139237.jsp",0,232,25,4,2,4,1,,,,,,
"2020-03-22","","BL","",289,40,7,"",21,3,"https://www.baselland.ch/politik-und-behorden/direktionen/volkswirtschafts-und-gesundheitsdirektion/medienmitteilungen/update-289-bestaetigte-faelle-in-basel-landschaft",0,289,40,7,0,21,3,,,,,,
"2020-03-22","10:30","BS","",358,50,"","",73,5,"https://www.coronavirus.bs.ch/nm/2020-tagesbulletin-coronavirus-358-bestaetigte-faelle-im-kanton-basel-stadt-gd.html",235,358,50,2,0,73,5,265,"",,,,
```
**Remark:** There is no 'totals' available in csv-output.

### API for Johns Hopkins University (JHU) (data for world)
| Method | API                                                       | Remark                                                                                                                                                                                                                                                                    | Example call                                                                               |
|:-------|:----------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------|
| GET    | /api/doc                                                  | currently a redirect to this github-readme                                                                                                                                                                                                                                | [https://covid19-rest.herokuapp.com/api/doc]                                               |
| GET    | /api/jhu/v1/all                                           | read all data                                                                                                                                                                                                                                                             | [https://covid19-rest.herokuapp.com/api/jhu/v1/all]                                        |
| GET    | /api/jhu/v1/country/\<country>                            | read all data for the given country. <br> <li> **Alpha-3-Code** from [ISO-3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) <li>[Mapping JHU-country-name to Alpha-3-code](https://github.com/apfeuti/covid19-rest/blob/master/api/countryMapping.js)   | [https://covid19-rest.herokuapp.com/api/jhu/v1/country/CHE]                                |
| GET    | /api/jhu/v1/country/\<country>/area/\<area>               | read all data for the given country and area. <br> <li>Area is as listed by [JHU Province/State](https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_daily_reports/04-01-2020.csv) <li>**But remove all WHITESPACES!**                | [https://covid19-rest.herokuapp.com/api/jhu/v1/country/USA/area/NewYork]                   |
| GET    | /api/jhu/v1/country/\<country>/area/\<area>/admin\<admin> | read all data for the given country, area and admin (city) <br> <li> Admin is as listed by [JHU Admin2](https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_daily_reports/04-01-2020.csv) <li>**But remove all WHITESPACES in name!** | [https://covid19-rest.herokuapp.com/api/jhu/v1/country/USA/area/NewYork/admin/St.Lawrence] |

#### Query parameters
On all calls listed above, you can add optionally the following query-parameters.

|Parameter              | Remark                                             | Example call                                                                                         |
|-----------------------|----------------------------------------------------|------------------------------------------------------------------------------------------------------|
| date=\<yyyy-mm-dd>    | only data for the given date. Format: yyyy-mm-dd   | [https://covid19-rest.herokuapp.com/api/jhu/v1/country/ITA?date=2020-03-31]                          |
| output=csv            | output in csv instead of json                      | [https://covid19-rest.herokuapp.com/api/jhu/v1/country/CHN/area/hubei?date=2020-03-23&output=csv]    |

#### Output json
```json
{
  "totals": {
    "ncumul_conf": 213372,
    "ncumul_released": 8474,
    "ncumul_deceased": 4757
  },
  "records": [
    {
      "date": "2020-04-01",
      "country": "US",
      "countryISO": "USA",
      "area": "Washington",
      "admin": "King",
      "fips": 53033,
      "lastUpdate": "2020-04-01 21:58:49",
      "latitude": 47.49137892,
      "longitude": -121.8346131,
      "ncumul_conf": 2330,
      "ncumul_released": 0,
      "ncumul_deceased": 150
    },
    {
      "date": "2020-04-01",
      "country": "US",
      "countryISO": "USA",
      "area": "Washington",
      "admin": "Snohomish",
      "fips": 53061,
      "lastUpdate": "2020-04-01 21:58:49",
      "latitude": 48.04615983,
      "longitude": -121.7170703,
      "ncumul_conf": 1304,
      "ncumul_released": 0,
      "ncumul_deceased": 40
    }
    ....
  ]
}
```
**Remark:** 'totals' is the sum over your selection-criteria, hence you
can get the totals for Korea with /country/KOR or for New York with
/country/USA/area/NewYork. If no date-query-parameter is set, the last
day is taken to build the sum.

#### Ouptut csv
```
"date","country","countryISO","area","admin","fips","lastUpdate","latitude","longitude","ncumul_conf","ncumul_released","ncumul_deceased"
"2020-04-01","US","USA","Washington","King",53033,"2020-04-01 21:58:49",47.49137892,-121.8346131,2330,0,150
"2020-04-01","US","USA","Washington","Snohomish",53061,"2020-04-01 21:58:49",48.04615983,-121.7170703,1304,0,40
"2020-04-01","US","USA","Washington","Unassigned","","2020-04-01 21:58:49",0,0,303,0,0
```
**Remark:** There is no 'totals' available in csv-output.

## Developers
To enhance / adapt this REST-API follow this steps.

**Precondition**

Install [Node.js](https://nodejs.org) on your system. Developed with 12.16.1 LTS, but any not too old version should be fine.

**Clone this repo**

`git clone https://github.com/apfeuti/covid19-rest.git`

`cd covid19-rest`

**Install**

`npm install`

**Start**

`npm run start`

**Open in browser**

[http://localhost:3000/api/openzh/v1/all](http://localhost:3000/api/openzh/v1/all)

## Contribution
Feel free to raise an issue for bugs, feature-requests, improvements,
etc. or provide your own pull-request. <br> Do you like the API? Have
critism or something else to say? <br> <a 
href="https://twitter.com/intent/tweet?screen_name=APfeuti&ref_src=twsrc%5Etfw"
class="twitter-mention-button" data-show-count="false">Tweet to
@APfeuti</a>

## Change-Log

| Date       | Topic                                       |
|------------|---------------------------------------------|
| 2020-04-07 | Added forward-fields, which are never empty |
   

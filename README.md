# COVID19 REST-API
This is a REST-API to get data about COVID19 (new corona-virus) cases.
Data sources are
[openZH](https://github.com/openZH/covid_19/tree/master/fallzahlen_kanton_total_csv)
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
{
  "totals": {
    "ncumul_tested": 0,
    "ncumul_conf": 11755,
    "ncumul_hosp": 1316,
    "ncumul_ICU": 199,
    "ncumul_vent": 50,
    "ncumul_released": 443,
    "ncumul_deceased": 193
  },
  "records": [
    {
      "date": "2020-02-28",
      "time": "15:00",
      "abbreviation_canton_and_fl": "AG",
      "ncumul_tested": "",
      "ncumul_conf": 1,
      "ncumul_hosp": "",
      "ncumul_ICU": "",
      "ncumul_vent": "",
      "ncumul_released": "",
      "ncumul_deceased": "",
      "source": "https://www.ag.ch/media/kanton_aargau/themen_1/coronavirus_1/20200228_KFS_20200106_Coronavirus_Lagebulletin_AG_Unterschrieben.pdf"
    },
    {
      "date": "2020-03-02",
      "time": "18:00",
      "abbreviation_canton_and_fl": "AG",
      "ncumul_tested": "",
      "ncumul_conf": 2,
      "ncumul_hosp": "",
      "ncumul_ICU": "",
      "ncumul_vent": "",
      "ncumul_released": "",
      "ncumul_deceased": "",
      "source": "https://www.ag.ch/media/kanton_aargau/themen_1/coronavirus_1/200302_KFS_Coronavirus_Lagebulletin_2.pdf"
    },
    ....
  ]
}
```
**Remark:** 'totals' are available by /all and /country. It's the sum over all countries/areas, hence you can get the totals for Switzerland with /country/CH.
If no date-query-parameter is set, the last day per area is taken to build the sum.

#### Ouptut csv
```
"date","time","abbreviation_canton_and_fl","ncumul_tested","ncumul_conf","ncumul_hosp","ncumul_ICU","ncumul_vent","ncumul_released","ncumul_deceased","source","ncumul_confirmed_non_resident","ninst_hosp_non_resident","ncumul_ICF","ninst_ICU_intub","ncumul_deceased_suspect","TotalPosTests1","TotalCured"
"2020-04-01","15:00","AG","",549,94,27,27,"",11,"https://www.ag.ch/media/kanton_aargau/themen_1/coronavirus_1/lagebulletins/200401_KFS_Coronavirus_Lagebulletin_24.pdf",,,,,,,
"2020-04-01","17:00","AR","",61,"","","","",3,"https://www.ar.ch/verwaltung/departement-gesundheit-und-soziales/amt-fuer-gesundheit/informationsseite-coronavirus/",,,,,,,
"2020-04-01","08:00","BE","",909,115,26,21,"",20,"https://www.besondere-lage.sites.be.ch/besondere-lage_sites/de/index/corona/index.html",,,,,,,
```
**Remark:** There is no 'totals' available in csv-output.

### API for Johns Hopkins University (JHU) (data for world)
| Method | API                                                       | Remark                                                                                                                                                                                                                                                                    | Example call                                                                               |                                                             |
|:-------|:----------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------|:------------------------------------------------------------|
| GET    | /api/doc                                                  | currently a redirect to this github-readme                                                                                                                                                                                                                                | [https://covid19-rest.herokuapp.com/api/doc]                                               |                                                             |
| GET    | /api/jhu/v1/all                                           | read all data                                                                                                                                                                                                                                                             | [https://covid19-rest.herokuapp.com/api/jhu/v1/all]                                        |                                                             |
| GET    | /api/jhu/v1/country/\<country>                            | read all data for the given country. <br> <li> **Alpha-3-Code** from [ISO-3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) <li>[Mapping JHU-country-name to Alpha-3-code](TODO)                                                                        | [https://covid19-rest.herokuapp.com/api/openzh/v1/country/CH]                              | [https://covid19-rest.herokuapp.com/api/jhu/v1/country/CHE] |
| GET    | /api/jhu/v1/country/\<country>/area/\<area>               | read all data for the given country and area. <br> <li>Area is as listed by [JHU Province/State](https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_daily_reports/04-01-2020.csv) <li>**But remove all WHITESPACES!**                | [https://covid19-rest.herokuapp.com/api/jhu/v1/country/USA/area/NewYork]                   |                                                             |
| GET    | /api/jhu/v1/country/\<country>/area/\<area>/admin\<admin> | read all data for the given country, area and admin (city) <br> <li> Admin is as listed by [JHU Admin2](https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_daily_reports/04-01-2020.csv) <li>**But remove all WHITESPACES in name!** | [https://covid19-rest.herokuapp.com/api/jhu/v1/country/USA/area/NewYork/admin/St.Lawrence] |                                                             |

#### Query parameters
On all calls listed above, you can add optionally the following query-parameters.

|Parameter              | Remark                                             | Example call                                                                                         |
|-----------------------|----------------------------------------------------|------------------------------------------------------------------------------------------------------|
| date=\<yyyy-mm-dd>    | only data for the given date. Format: yyyy-mm-dd   | [https://covid19-rest.herokuapp.com/api/jhu/v1/country/ITA?date=2020-03-31]                          |
| output=csv            | output in csv instead of json                      | [https://covid19-rest.herokuapp.com/api/openzh/v1/country/CHN/area/hubei?date=2020-03-23&output=csv] |

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
critism or something else to say?
[Give me a tweet!](https://twitter.com/apfeuti) <br> <a
href="https://twitter.com/intent/tweet?screen_name=APfeuti&ref_src=twsrc%5Etfw"
class="twitter-mention-button" data-show-count="false">Tweet to
@APfeuti</a><script async src="https://platform.twitter.com/widgets.js"
charset="utf-8"></script>
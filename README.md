# COVID19 REST-API
This is a REST-API to get data about COVID19 (new corona-virus) cases.
Data sources are
[Open Data Kanton Zürich (openZH)](https://github.com/openZH/covid_19/tree/master/fallzahlen_kanton_total_csv_v2)
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
| skipRecords=true      | returns only "totals" and NO "records"             | [https://covid19-rest.herokuapp.com/api/openzh/v1/all?skipRecords=true]                  |
| output=csv            | output in csv instead of json                      | [https://covid19-rest.herokuapp.com/api/openzh/v1/country/CH?date=2020-03-23&output=csv] |

#### Deprecated fields
Please upgrade your client to the renamed fields (renamed by openzh).
**The deprecated fields will be removed on May 14, 2020** This concerns
fields in "totals" and "records".

| Deprecated field | new field-name     |
|------------------|--------------------|
| ncumul_hosp      | current_hosp       |
| ncumul_ICU       | current_icu        |
| ncumul_vent      | current_vent       |
| ncumul_hosp_fwd  | current_hosp_fwd   |
| ncumul_ICU _fwd  | current_icu_fwd    |
| ncumul_vent_fwd  | current_vent_fwd   |


#### Output json
```json
{
  "totals": {
    "ncumul_tested_fwd": 21469,
    "ncumul_conf_fwd": 26467,
    "ncumul_hosp_fwd": 1769,
    "ncumul_ICU_fwd": 330,
    "ncumul_vent_fwd": 208,
    "current_hosp_fwd": 1769,
    "current_icu_fwd": 330,
    "current_vent_fwd": 208,
    "ncumul_released_fwd": 3720,
    "ncumul_deceased_fwd": 1262
  },
  "records": [
    {
      "date": "2020-04-15",
      "time": "14:45",
      "abbreviation_canton_and_fl": "AG",
      "ncumul_tested": "",
      "ncumul_conf": 929,
      "new_hosp": "",
      "current_hosp": 69,
      "current_icu": 20,
      "current_vent": 20,
      "ncumul_released": 450,
      "ncumul_deceased": 22,
      "source": "https://www.ag.ch/media/kanton_aargau/themen_1/coronavirus_1/lagebulletins/200415_KFS_Coronavirus_Lagebulletin_33.pdf",
      "ncumul_tested_fwd": 0,
      "ncumul_conf_fwd": 929,
      "ncumul_hosp": 69,
      "ncumul_ICU": 20,
      "ncumul_vent": 20,
      "ncumul_hosp_fwd": 69,
      "ncumul_ICU_fwd": 20,
      "ncumul_vent_fwd": 20,
      "current_hosp_fwd": 69,
      "current_icu_fwd": 20,
      "current_vent_fwd": 20,
      "ncumul_released_fwd": 450,
      "ncumul_deceased_fwd": 22
    },
    {
      "date": "2020-04-15",
      "time": "11:00",
      "abbreviation_canton_and_fl": "AI",
      "ncumul_tested": "",
      "ncumul_conf": 24,
      "new_hosp": "",
      "current_hosp": "",
      "current_icu": "",
      "current_vent": "",
      "ncumul_released": "",
      "ncumul_deceased": "",
      "source": "https://www.ai.ch/themen/gesundheit-alter-und-soziales/gesundheitsfoerderung-und-praevention/uebertragbare-krankheiten/coronavirus",
      "ncumul_tested_fwd": 0,
      "ncumul_conf_fwd": 24,
      "ncumul_hosp": "",
      "ncumul_ICU": "",
      "ncumul_vent": "",
      "ncumul_hosp_fwd": 1,
      "ncumul_ICU_fwd": 0,
      "ncumul_vent_fwd": 0,
      "current_hosp_fwd": 1,
      "current_icu_fwd": 0,
      "current_vent_fwd": 0,
      "ncumul_released_fwd": 0,
      "ncumul_deceased_fwd": 0
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
"date","time","abbreviation_canton_and_fl","ncumul_tested","ncumul_conf","new_hosp","current_hosp","current_icu","current_vent","ncumul_released","ncumul_deceased","source","ncumul_tested_fwd","ncumul_conf_fwd","ncumul_hosp","ncumul_ICU","ncumul_vent","ncumul_hosp_fwd","ncumul_ICU_fwd","ncumul_vent_fwd","current_hosp_fwd","current_icu_fwd","current_vent_fwd","ncumul_released_fwd","ncumul_deceased_fwd","ncumul_confirmed_non_resident","current_hosp_non_resident","ncumul_ICF","ncumul_deceased_suspect","TotalPosTests1","ninst_ICU_intub"
"2020-04-15","14:45","AG","",929,"",69,20,20,450,22,"https://www.ag.ch/media/kanton_aargau/themen_1/coronavirus_1/lagebulletins/200415_KFS_Coronavirus_Lagebulletin_33.pdf",0,929,69,20,20,69,20,20,69,20,20,450,22,,,,,,
"2020-04-15","11:00","AI","",24,"","","","","","","https://www.ai.ch/themen/gesundheit-alter-und-soziales/gesundheitsfoerderung-und-praevention/uebertragbare-krankheiten/coronavirus",0,24,"","","",1,0,0,1,0,0,0,0,,,,,,
"2020-04-15","08:00","AR","",79,"","","","","",3,"https://www.ar.ch/verwaltung/departement-gesundheit-und-soziales/amt-fuer-gesundheit/informationsseite-coronavirus/",0,79,"","","",6,0,0,6,0,0,0,3,,,,,,
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
| skipRecords=true      | returns only "totals" and NO "records"             | [https://covid19-rest.herokuapp.com/api/jhu/v1/all?skipRecords=true]                                 |
| output=csv            | output in csv instead of json                      |[https://covid19-rest.herokuapp.com/api/jhu/v1/country/CHN/area/hubei?date=2020-03-23&output=csv]     |

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

| Date       | Topic                                                                 |
|------------|-----------------------------------------------------------------------|
| 2020-04-16 | Using v2-data of openZH. See [Deprecated fields](#Deprecated-fields)  |
| 2020-04-16 | Added query-parameter skipRecords=true                                | 
| 2020-04-07 | Added forward-fields, which are never empty                           |
   

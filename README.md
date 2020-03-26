# COVID19 REST-API
This is a REST-API to get data about COVID19 (new corona-virus) cases. Data sources are [openZH](https://github.com/openZH/covid_19/tree/master/fallzahlen_kanton_total_csv) (for detailed figures about Switzerland) and [Johns Hopkins University](https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series) (for figures about the world - *not yet implemented*).

The data can be filtered by country, area and date.


## Usage
### Server
[https://covid19-rest.herokuapp.com]

### API
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
date,time,abbreviation_canton_and_fl,ncumul_tested,ncumul_conf,ncumul_hosp,ncumul_ICU,ncumul_vent,ncumul_released,ncumul_deceased,source,ncumul_ICF,ncumul_ICU_intub,ncumul_deceased_suspect,TotalPosTests1,TotalCured
2020-03-23,15:00,AG,,241,10,3,2,,1,https://www.ag.ch/media/kanton_aargau/themen_1/coronavirus_1/lagebulletins/200323_KFS_Coronavirus_Lagebulletin_17.pdf,,,,,
2020-03-23,10:00,AR,,30,7,,,,1,https://www.ar.ch/verwaltung/departement-gesundheit-und-soziales/amt-fuer-gesundheit/informationsseite-coronavirus/,,,,,
2020-03-23,,BE,,470,,,,,5,https://www.besondere-lage.sites.be.ch/besondere-lage_sites/de/index/corona/index.html,,,,,
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

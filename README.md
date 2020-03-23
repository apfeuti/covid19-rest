# COVID19 REST-API
This is a REST-API to get data about COVID19 (new corona-virus) cases. Data sources are [openZH](https://github.com/openZH/covid_19/tree/master/fallzahlen_kanton_total_csv) (for detailed figures about Switzerland) and [Johns Hopkins University](https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series) (for figures about the world - not yet implemented).


The data can be filtered by date and/or area (canton).


## Usage
|Method | API                                                     | Remark                                         | Example call                                                                                                                                                         |
|-------|---------------------------------------------------------|------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET   | /api/doc                                                | currently a redirect to this github-readme     | [https://www.lightware-solutions.ch/covid19/api/doc](https://www.lightware-solutions.ch/covid19/api/doc)                                                              |
| GET   | /api/openzh/v1                                          | read all data                                  | [https://www.lightware-solutions.ch/covid19/api/openzh/v1](https://www.lightware-solutions.ch/covid19/api/openzh/v1)                                                 |
| GET   | /api/openzh/v1/date/\<yyyy-mm-dd>                       | read data (all areas) by the given date        | [https://www.lightware-solutions.ch/covid19/api/openzh/v1/date/2020-03-10](https://www.lightware-solutions.ch/covid19/api/openzh/v1/date/2020-03-10)                 |
| GET   | /api/openzh/v1/area/\<canton (short)>                   | read data (all dates) by the given area        | [https://www.lightware-solutions.ch/covid19/api/openzh/v1/area/BE](https://www.lightware-solutions.ch/covid19/api/openzh/v1/area/BE)                                 |
| GET   | /api/openzh/v1/date/\<yyyy-mm-dd>/area\<canton (short)> | read data by the given date and the given area | [https://www.lightware-solutions.ch/covid19/api/openzh/v1/date/2020-03-17/area/BS](https://www.lightware-solutions.ch/covid19/api/openzh/v1/date/2020-03-17/area/BS) | 

Per default the output is in json-format. If you wish csv-format, just add the query-parameter **?output=csv**

This works on all GET calls listed above.

Examples:

[https://www.lightware-solutions.ch/covid19/api/openzh/v1/?output=csv](https://www.lightware-solutions.ch/covid19/api/openzh/v1?output=csv)

[https://www.lightware-solutions.ch/covid19/api/openzh/v1/area/BE?output=csv](https://www.lightware-solutions.ch/covid19/api/openzh/v1/area/BE?output=csv)



Remark: The domain in the example-call is a temporary solution until we find a final hosting.

## Developers
To enhance / adapt this REST-API follow this steps.

**Precondition**

Install [Node.js](https://nodejs.org) on your system. Developed with 12.16.1 LTS, but any not too old version should be fine.

**Clone this repo**

`git clone https://github.com/openZH/covid_19.git`

`cd covid_19/rest`

**Install**

`npm install`

**Start**

`npm run start`

**Open in browser**

[http://localhost:3000/api](http://localhost:3000/api)

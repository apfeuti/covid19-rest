# COVID19 REST-API
This is a REST-API to get data about COVID19 (new corona-virus) cases. Data sources are [openZH](https://github.com/openZH/covid_19/tree/master/fallzahlen_kanton_total_csv) (for detailed figures about Switzerland) and [Johns Hopkins University](https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series) (for figures about the world - not yet implemented).

The data can be filtered by date and/or area.


## Usage
### Server
https://covid19-rest.herokuapp.com

### API
|Method | API                                                     | Remark                                         | Example call                                                                                                                                                         |
|-------|---------------------------------------------------------|------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET   | /api/doc                                                | currently a redirect to this github-readme     | [https://covid19-rest.herokuapp.com/api/doc](https://covid19-rest.herokuapp.com/api/doc)                                                               |
| GET   | /api/openzh/v1                                          | read all data                                  | [https://covid19-rest.herokuapp.com/api/openzh/v1](https://covid19-rest.herokuapp.com/api/openzh/v1)                                                   |
| GET   | /api/openzh/v1/date/\<yyyy-mm-dd>                       | read data (all areas) by the given date        | [https://covid19-rest.herokuapp.com/api/openzh/v1/date/2020-03-10](https://covid19-rest.herokuapp.com/api/openzh/v1/date/2020-03-10)                   |
| GET   | /api/openzh/v1/area/\<canton (short)>                   | read data (all dates) by the given area        | [https://covid19-rest.herokuapp.com/api/openzh/v1/area/BE](https://covid19-rest.herokuapp.com/api/openzh/v1/area/BE)                                   |
| GET   | /api/openzh/v1/date/\<yyyy-mm-dd>/area\<canton (short)> | read data by the given date and the given area | [https://covid19-rest.herokuapp.com/api/openzh/v1/date/2020-03-17/area/BS](https://covid19-rest.herokuapp.com/api/openzh/v1/date/2020-03-17/area/BS)   | 

Per default the output is in json-format. If you wish csv-format, just add the query-parameter **?output=csv**

This works on all GET calls listed above.

Examples:

[https://covid19-rest.herokuapp.com/api/openzh/v1/?output=csv](https://covid19-rest.herokuapp.com/api/openzh/v1?output=csv)

[https://covid19-rest.herokuapp.com/api/openzh/v1/area/BE?output=csv](https://covid19-rest.herokuapp.com/api/openzh/v1/area/BE?output=csv)



Remark: The domain in the example-call is a temporary solution until we find a final hosting.

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

[http://localhost:3000/api](http://localhost:3000/api)

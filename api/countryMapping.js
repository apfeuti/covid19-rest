'use strict';

exports.getAlpha3 = function (countryName) {
    return countryMapping.get(countryName.trim());

};

var countryMapping = new Map(

// thanks goes to https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes
[
    [
         "Afghanistan",
         "AFG",
        
    ],
    [
         "Åland Islands",
         "ALA",
        
    ],
    [
         "Albania",
         "ALB",
        
    ],
    [
         "Algeria",
         "DZA",
        
    ],
    [
         "American Samoa",
         "ASM",
        
    ],
    [
         "Andorra",
         "AND",
        
    ],
    [
         "Angola",
         "AGO",
        
    ],
    [
         "Anguilla",
         "AIA",
        
    ],
    [
         "Antarctica",
         "ATA",
        
    ],
    [
         "Antigua and Barbuda",
         "ATG",
        
    ],
    [
         "Argentina",
         "ARG",
        
    ],
    [
         "Armenia",
         "ARM",
        
    ],
    [
         "Aruba",
         "ABW",
        
    ],
    [
         "Australia",
         "AUS",
        
    ],
    [
         "Austria",
         "AUT",
        
    ],
    [
         "Azerbaijan",
         "AZE",
        
    ],
    [
         "Bahamas",
         "BHS",
        
    ],
    [
        "The Bahamas",
        "BHS",

    ],
    [
        "Bahamas, The",
        "BHS",

    ],
    [
         "Bahrain",
         "BHR",
        
    ],
    [
         "Bangladesh",
         "BGD",
        
    ],
    [
         "Barbados",
         "BRB",
        
    ],
    [
         "Belarus",
         "BLR",
        
    ],
    [
         "Belgium",
         "BEL",
        
    ],
    [
         "Belize",
         "BLZ",
        
    ],
    [
         "Benin",
         "BEN",
        
    ],
    [
         "Bermuda",
         "BMU",
        
    ],
    [
         "Bhutan",
         "BTN",
        
    ],
    [
         "Bolivia",
         "BOL",
        
    ],
    [
         "Bonaire, Sint Eustatius and Saba",
         "BES",
        
    ],
    [
         "Bosnia and Herzegovina",
         "BIH",
        
    ],
    [
         "Botswana",
         "BWA",
        
    ],
    [
         "Bouvet Island",
         "BVT",
        
    ],
    [
         "Brazil",
         "BRA",
        
    ],
    [
         "British Indian Ocean Territory",
         "IOT",
        
    ],
    [
         "Brunei",
         "BRN",
        
    ],
    [
         "Bulgaria",
         "BGR",
        
    ],
    [
         "Burkina Faso",
         "BFA",
        
    ],
    [
        "Burma",
        "MMR",
    ],
    [
         "Burundi",
         "BDI",
        
    ],
    [
         "Cabo Verde",
         "CPV",
        
    ],
    [
        "Cape Verde",
        "CPV",

    ],
    [
         "Cambodia",
         "KHM",
        
    ],
    [
         "Cameroon",
         "CMR",
        
    ],
    [
         "Canada",
         "CAN",
        
    ],
    [
         "Cayman Islands",
         "CYM",
        
    ],
    [
         "Central African Republic",
         "CAF",
        
    ],
    [
         "Chad",
         "TCD",
        
    ],
    [
        "Channel Islands",
        "GSY",
    ],
    [
         "Chile",
         "CHL",
        
    ],
    [
         "China",
         "CHN",
        
    ],
    [
        "Mainland China",
        "CHN",

    ],
    [
         "Christmas Island",
         "CXR",
        
    ],
    [
         "Cocos (Keeling) Islands",
         "CCK",
        
    ],
    [
         "Colombia",
         "COL",
        
    ],
    [
         "Comoros",
         "COM",
        
    ],
    [
         "Congo (Brazzaville)",
         "COG",
        
    ],
    [
        "Republic of the Congo",
        "COG",

    ],
    [
         "Congo (Kinshasa)",
         "COD",
        
    ],
    [
         "Cook Islands",
         "COK",
        
    ],
    [
         "Costa Rica",
         "CRI",
        
    ],
    [
         "Cote d'Ivoire",
         "CIV",
        
    ],
    [
        "Ivory Coast",
        "CIV",

    ],
    [
         "Croatia",
         "HRV",
        
    ],
    [
         "Cuba",
         "CUB",
        
    ],
    [
         "Curacao",
         "CUW",
        
    ],
    [
         "Cyprus",
         "CYP",
        
    ],
    [
         "Czechia",
         "CZE",
        
    ],
    [
        "Czech Republic",
        "CZE",

    ],
    [
         "Denmark",
         "DNK",
        
    ],
    [
        "Diamond Princess",
        "DIP",
    ],
    [
        "Cruise Ship",
        "DIP",
    ],
    [
         "Djibouti",
         "DJI",
        
    ],
    [
         "Dominica",
         "DMA",
        
    ],
    [
         "Dominican Republic",
         "DOM",
        
    ],
    [
         "Ecuador",
         "ECU",
        
    ],
    [
         "Egypt",
         "EGY",
        
    ],
    [
         "El Salvador",
         "SLV",
        
    ],
    [
         "Equatorial Guinea",
         "GNQ",
        
    ],
    [
         "Eritrea",
         "ERI",
        
    ],
    [
         "Estonia",
         "EST",
        
    ],
    [
         "Eswatini",
         "SWZ",
        
    ],
    [
         "Ethiopia",
         "ETH",
        
    ],
    [
         "Falkland Islands (Malvinas)",
         "FLK",
        
    ],
    [
         "Faroe Islands",
         "FRO",
        
    ],
    [
         "Fiji",
         "FJI",
        
    ],
    [
         "Finland",
         "FIN",
        
    ],
    [
         "France",
         "FRA",
        
    ],
    [
         "French Guiana",
         "GUF",
        
    ],
    [
         "French Polynesia",
         "PYF",
        
    ],
    [
         "French Southern Territories",
         "ATF",
        
    ],
    [
         "Gabon",
         "GAB",
        
    ],
    [
         "Gambia",
         "GMB",
        
    ],
    [
        "The Gambia",
        "GMB",

    ],
    [
        "Gambia, The",
        "GMB",

    ],
    [
         "Georgia",
         "GEO",
        
    ],
    [
         "Germany",
         "DEU",
        
    ],
    [
         "Ghana",
         "GHA",
        
    ],
    [
         "Gibraltar",
         "GIB",
        
    ],
    [
         "Greece",
         "GRC",
        
    ],
    [
         "Greenland",
         "GRL",
        
    ],
    [
         "Grenada",
         "GRD",
        
    ],
    [
         "Guadeloupe",
         "GLP",
        
    ],
    [
         "Guam",
         "GUM",
        
    ],
    [
         "Guatemala",
         "GTM",
        
    ],
    [
         "Guernsey",
         "GGY",
        
    ],
    [
         "Guinea",
         "GIN",
        
    ],
    [
         "Guinea-Bissau",
         "GNB",
        
    ],
    [
         "Guyana",
         "GUY",
        
    ],
    [
         "Haiti",
         "HTI",
        
    ],
    [
         "Heard Island and McDonald Islands",
         "HMD",
        
    ],
    [
         "Holy See",
         "VAT",
        
    ],
    [
        "Vatican City",
        "VAT",

    ],
    [
         "Honduras",
         "HND",
        
    ],
    [
         "Hong Kong",
         "HKG",
        
    ],
    [
        "Hong Kong SAR",
        "HKG",

    ],
    [
         "Hungary",
         "HUN",
        
    ],
    [
         "Iceland",
         "ISL",
        
    ],
    [
         "India",
         "IND",
        
    ],
    [
         "Indonesia",
         "IDN",
        
    ],
    [
         "Iran",
         "IRN",
        
    ],
    [
        "Iran (Islamic Republic of)",
        "IRN",

    ],
    [
         "Iraq",
         "IRQ",
        
    ],
    [
         "Ireland",
         "IRL",
        
    ],
    [
        "Republic of Ireland",
        "IRL",

    ],
    [
        "North Ireland",
        "BFS",

    ],
    [
         "Isle of Man",
         "IMN",
        
    ],
    [
         "Israel",
         "ISR",
        
    ],
    [
         "Italy",
         "ITA",
        
    ],
    [
         "Jamaica",
         "JAM",
        
    ],
    [
         "Japan",
         "JPN",
        
    ],
    [
         "Jersey",
         "JEY",
        
    ],
    [
         "Jordan",
         "JOR",
        
    ],
    [
         "Kazakhstan",
         "KAZ",
        
    ],
    [
         "Kenya",
         "KEN",
        
    ],
    [
         "Kiribati",
         "KIR",
        
    ],
    [
         "Korea (Democratic People's Republic of)",
         "PRK",
        
    ],
    [
         "Korea, South",
         "KOR",
        
    ],
    [
        "South Korea",
        "KOR",

    ],
    [
        "Republic of Korea",
        "KOR",

    ],
    [
        "Kosovo",
        "RKS",

    ],
    [
         "Kuwait",
         "KWT",
        
    ],
    [
         "Kyrgyzstan",
         "KGZ",
        
    ],
    [
         "Laos",
         "LAO",
        
    ],
    [
         "Latvia",
         "LVA",
        
    ],
    [
         "Lebanon",
         "LBN",
        
    ],
    [
         "Lesotho",
         "LSO",
        
    ],
    [
         "Liberia",
         "LBR",
        
    ],
    [
         "Libya",
         "LBY",
        
    ],
    [
         "Liechtenstein",
         "LIE",
        
    ],
    [
         "Lithuania",
         "LTU",
        
    ],
    [
         "Luxembourg",
         "LUX",
        
    ],
    [
         "Macao",
         "MAC",
        
    ],
    [
        "Macao SAR",
        "MAC",

    ],
    [
        "Macau",
        "MAC",

    ],
    [
         "Madagascar",
         "MDG",
        
    ],
    [
         "Malawi",
         "MWI",
        
    ],
    [
         "Malaysia",
         "MYS",
        
    ],
    [
         "Maldives",
         "MDV",
        
    ],
    [
         "Mali",
         "MLI",
        
    ],
    [
         "Malta",
         "MLT",
        
    ],
    [
         "Marshall Islands",
         "MHL",
        
    ],
    [
         "Martinique",
         "MTQ",
        
    ],
    [
         "Mauritania",
         "MRT",
        
    ],
    [
         "Mauritius",
         "MUS",
        
    ],
    [
         "Mayotte",
         "MYT",
        
    ],
    [
         "Mexico",
         "MEX",
        
    ],
    [
         "Micronesia (Federated States of)",
         "FSM",
        
    ],
    [
         "Moldova",
         "MDA",
        
    ],
    [
        "Republic of Moldova",
        "MDA",

    ],
    [
         "Monaco",
         "MCO",
        
    ],
    [
         "Mongolia",
         "MNG",
        
    ],
    [
         "Montenegro",
         "MNE",
        
    ],
    [
         "Montserrat",
         "MSR",
        
    ],
    [
         "Morocco",
         "MAR",
        
    ],
    [
         "Mozambique",
         "MOZ",
        
    ],
    [
        "MS Zaandam",
        "MSZ",
    ],
    [
         "Myanmar",
         "MMR",
        
    ],
    [
         "Namibia",
         "NAM",
        
    ],
    [
         "Nauru",
         "NRU",
        
    ],
    [
         "Nepal",
         "NPL",
        
    ],
    [
         "Netherlands",
         "NLD",
        
    ],
    [
         "New Caledonia",
         "NCL",
        
    ],
    [
         "New Zealand",
         "NZL",
        
    ],
    [
         "Nicaragua",
         "NIC",
        
    ],
    [
         "Niger",
         "NER",
        
    ],
    [
         "Nigeria",
         "NGA",
        
    ],
    [
         "Niue",
         "NIU",
        
    ],
    [
         "Norfolk Island",
         "NFK",
        
    ],
    [
         "North Macedonia",
         "MKD",
        
    ],
    [
         "Northern Mariana Islands",
         "MNP",
        
    ],
    [
         "Norway",
         "NOR",
        
    ],
    [
         "Oman",
         "OMN",
        
    ],
    [
        "Others",
        "OTH",
    ],
    [
         "Pakistan",
         "PAK",
        
    ],
    [
         "Palau",
         "PLW",
        
    ],
    [
        "Palestine",
        "PSE",

    ],
    [
         "occupied Palestinian territory",
         "PSE",
        
    ],
    [
         "Panama",
         "PAN",
        
    ],
    [
         "Papua New Guinea",
         "PNG",
        
    ],
    [
         "Paraguay",
         "PRY",
        
    ],
    [
         "Peru",
         "PER",
        
    ],
    [
         "Philippines",
         "PHL",
        
    ],
    [
         "Pitcairn",
         "PCN",
        
    ],
    [
         "Poland",
         "POL",
        
    ],
    [
         "Portugal",
         "PRT",
        
    ],
    [
         "Puerto Rico",
         "PRI",
        
    ],
    [
         "Qatar",
         "QAT",
        
    ],
    [
         "Reunion",
         "REU",
        
    ],
    [
         "Romania",
         "ROU",
        
    ],
    [
         "Russia",
         "RUS",
        
    ],
    [
        "Russian Federation",
        "RUS",

    ],
    [
         "Rwanda",
         "RWA",
        
    ],
    [
         "Saint Barthelemy",
         "BLM",
        
    ],
    [
         "Saint Helena, Ascension and Tristan da Cunha",
         "SHN",
        
    ],
    [
         "Saint Kitts and Nevis",
         "KNA",
        
    ],
    [
         "Saint Lucia",
         "LCA",
        
    ],
    [
         "Saint Martin",
         "MAF",
        
    ],
    [
        "St. Martin",
        "MAF",

    ],
    [
         "Saint Pierre and Miquelon",
         "SPM",
        
    ],
    [
         "Saint Vincent and the Grenadines",
         "VCT",
        
    ],
    [
         "Samoa",
         "WSM",
        
    ],
    [
         "San Marino",
         "SMR",
        
    ],
    [
         "Sao Tome and Principe",
         "STP",
        
    ],
    [
         "Saudi Arabia",
         "SAU",
        
    ],
    [
         "Senegal",
         "SEN",
        
    ],
    [
         "Serbia",
         "SRB",
        
    ],
    [
         "Seychelles",
         "SYC",
        
    ],
    [
         "Sierra Leone",
         "SLE",
        
    ],
    [
         "Singapore",
         "SGP",
        
    ],
    [
         "Sint Maarten (Dutch part)",
         "SXM",
        
    ],
    [
         "Slovakia",
         "SVK",
        
    ],
    [
         "Slovenia",
         "SVN",
        
    ],
    [
         "Solomon Islands",
         "SLB",
        
    ],
    [
         "Somalia",
         "SOM",
        
    ],
    [
         "South Africa",
         "ZAF",
        
    ],
    [
         "South Georgia and the South Sandwich Islands",
         "SGS",
        
    ],
    [
         "South Sudan",
         "SSD",
        
    ],
    [
         "Spain",
         "ESP",
        
    ],
    [
         "Sri Lanka",
         "LKA",
        
    ],
    [
         "Sudan",
         "SDN",
        
    ],
    [
         "Suriname",
         "SUR",
        
    ],
    [
         "Svalbard and Jan Mayen",
         "SJM",
        
    ],
    [
         "Sweden",
         "SWE",
        
    ],
    [
         "Switzerland",
         "CHE",
        
    ],
    [
         "Syria",
         "SYR",
        
    ],
    [
        "Taiwan",
        "TWN",

    ],
    [
         "Taiwan*",
         "TWN",
        
    ],
    [
        "Taipei and environs",
        "TWN",

    ],
    [
         "Tajikistan",
         "TJK",
        
    ],
    [
         "Tanzania",
         "TZA",
        
    ],
    [
         "Thailand",
         "THA",
        
    ],
    [
         "Timor-Leste",
         "TLS",
        
    ],
    [
        "East Timor",
        "TLS",

    ],
    [
         "Togo",
         "TGO",
        
    ],
    [
         "Tokelau",
         "TKL",
        
    ],
    [
         "Tonga",
         "TON",
        
    ],
    [
         "Trinidad and Tobago",
         "TTO",
        
    ],
    [
         "Tunisia",
         "TUN",
        
    ],
    [
         "Turkey",
         "TUR",
        
    ],
    [
         "Turkmenistan",
         "TKM",
        
    ],
    [
         "Turks and Caicos Islands",
         "TCA",
        
    ],
    [
         "Tuvalu",
         "TUV",
        
    ],
    [
         "Uganda",
         "UGA",
        
    ],
    [
         "Ukraine",
         "UKR",
        
    ],
    [
         "United Arab Emirates",
         "ARE",
        
    ],
    [
         "United Kingdom",
         "GBR",
        
    ],
    [
        "UK",
        "GBR",

    ],
    [
         "United States of America",
         "USA",
        
    ],
    [
        "US",
        "USA",

    ],
    [
         "United States Minor Outlying Islands",
         "UMI",
        
    ],
    [
         "Uruguay",
         "URY",
        
    ],
    [
         "Uzbekistan",
         "UZB",
        
    ],
    [
         "Vanuatu",
         "VUT",
        
    ],
    [
         "Venezuela",
         "VEN",
        
    ],
    [
         "Vietnam",
         "VNM",
        
    ],
    [
        "Viet Nam",
        "VNM",

    ],
    [
         "Virgin Islands (British)",
         "VGB",
        
    ],
    [
         "Virgin Islands (U.S.)",
         "VIR",
        
    ],
    [
         "Wallis and Futuna",
         "WLF",
        
    ],
    [
        "West Bank and Gaza",
        "GZA",
    ],
    [
         "Western Sahara",
         "ESH",
        
    ],
    [
         "Yemen",
         "YEM",
        
    ],
    [
         "Zambia",
         "ZMB",
        
    ],
    [
         "Zimbabwe",
         "ZWE",
        
    ]
]);
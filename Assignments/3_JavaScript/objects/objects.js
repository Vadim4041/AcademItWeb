(function () {
    const countries = [
        {
            name: "Russia",
            cities: [
                {
                    name: "Moscow",
                    population: 13010112
                },
                {
                    name: "Saint-Petersburg",
                    population: 5601911
                },
                {
                    name: "Novosibirsk",
                    population: 1633595
                },
                {
                    name: "Yekaterinburg",
                    population: 1544376
                },
                {
                    name: "Kazan",
                    population: 1308660
                }
            ]
        },
        {
            name: "USA",
            cities: [
                {
                    name: "New York",
                    population: 8467513
                },
                {
                    name: "Los Angeles",
                    population: 3849297
                },
                {
                    name: "Chicago",
                    population: 2696555
                },
                {
                    name: "Houston",
                    population: 2288250
                },
                {
                    name: "Phoenix",
                    population: 1624569
                }
            ]
        },
        {
            name: "UK",
            cities: [
                {
                    name: "London",
                    population: 8799800
                },
                {
                    name: "Glasgow",
                    population: 593245
                },
                {
                    name: "Birmingham",
                    population: 1092330
                },
                {
                    name: "Leeds",
                    population: 751485
                }
            ]
        },
        {
            name: "China",
            cities: [
                {
                    name: "Shanghai",
                    population: 21909814
                },
                {
                    name: "Beijing",
                    population: 18960744
                },
                {
                    name: "Shenzhen",
                    population: 17444609
                }
            ]
        },
    ];

    function getMaxCitiesCount(countries) {
        return countries.reduce((maxCitiesCount, country) => {
            return Math.max(country.cities.length, maxCitiesCount);
        }, 0);
    }

    console.log("Maximum cities count in all countries: " + getMaxCitiesCount(countries));

    // Get countries array with maximum cities count
    function getCountriesWithMaxCitiesCount(countries) {
        const maxCitiesCount = getMaxCitiesCount(countries);

        return countries.filter((country) => {
            return country.cities.length === maxCitiesCount;
        });
    }

    const countriesWithMaxCitiesCount = getCountriesWithMaxCitiesCount(countries);
    console.log("Countries with maximum cities count:");

    // Printing countries with cities and their population
    countriesWithMaxCitiesCount.forEach((country) => {
        console.log(country.name);
        country.cities.forEach((city) => {
            console.log(city.name + ", " + city.population + " citizens");
        });
    });

    // Get object where keys are countries and values are total population
    function getCountriesWithPopulation(countries) {
        const countriesWithPopulation = {};

        countries.forEach((country) => {
            countriesWithPopulation[country.name] = country.cities.reduce((countryPopulation, city) => {
                return countryPopulation + city.population;
            }, 0);
        });

        return countriesWithPopulation;
    }

    const countriesWithPopulation = getCountriesWithPopulation(countries);
    console.log(countriesWithPopulation);
})();
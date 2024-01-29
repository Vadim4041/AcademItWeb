(function () {
    const _ = require("lodash");

    const people = [
        {
            age: 20,
            name: "Ivan"
        },
        {
            age: 40,
            name: "Anton"
        },
        {
            age: 48,
            name: "Sergey"
        },
        {
            age: 25,
            name: "Irina"
        },
        {
            age: 18,
            name: "Oleg"
        },
        {
            age: 36,
            name: "Oleg"
        },
        {
            age: 23,
            name: "Lubov"
        },
        {
            age: 68,
            name: "Mikhail"
        },
        {
            age: 36,
            name: "Mark"
        },
        {
            age: 52,
            name: "Konstantin"
        }
    ];

    //Task 1
    function getAverageAge(people) {
        if (people.length === 0) {
            return 0;
        }

        return _.meanBy(people, person => person.age);
    }

    console.log("Task 1. Average age of people: " + getAverageAge(people));

    //Task 2
    function getSortedAndFilteredPeopleArray(people, ageFrom, ageTo) {
        return _.chain(people)
            .filter(person => person.age >= ageFrom && person.age <= ageTo)
            .sortBy("age")
            .value();
    }

    const ageFrom = 20;
    const ageTo = 30;

    console.log("Task 2. List of people aged from " + ageFrom + " to " + ageTo + " sorted by age in ascending order:");
    console.log(getSortedAndFilteredPeopleArray(people, ageFrom, ageTo));

    //Task 3
    function getUniqueSortedNamesArray(people, ageFrom, ageTo) {
        return _.chain(people)
            .filter(person => person.age >= ageFrom && person.age <= ageTo)
            .map("name")
            .uniq()
            .value()
            .sort()
            .reverse();
    }

    console.log("Task 3. List of people's names aged from " + ageFrom + " to " + ageTo + " sorted by name in descending order:");
    console.log(getUniqueSortedNamesArray(people, ageFrom, ageTo));

    //Task 4
    function getPeopleCountByName(people) {
        return _.countBy(people, "name");
    }

    console.log("Task 4. Quantity of people having names:");
    console.log(getPeopleCountByName(people));
})();
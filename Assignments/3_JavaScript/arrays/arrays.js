(function () {
    const array1 = [43, 36, 39, 45, 47, 47, 25, 3, 42, 14, 25, 29, 30, 0, 27];
    console.log("Array: " + array1.join(", "));

    array1.sort(function (e1, e2) {
        return e2 - e1;
    });

    console.log("Array sorted in descending order: " + array1.join(", "));

    const elementsCount = 5;

    const firstFiveElements = array1.slice(0, elementsCount);
    console.log("First five elements of array: " + firstFiveElements.join(", "));

    const lastFiveElements = array1.slice(array1.length >= elementsCount ? array1.length - elementsCount : 0);
    console.log("Last five elements of array: " + lastFiveElements.join(", "));

    const evenElementsSum = array1.reduce(function (accumulator, element) {
        return element % 2 === 0 ? accumulator + element : accumulator;
    }, 0);

    console.log("Sum of array elements that have even value: " + evenElementsSum);

    const array2Length = 100;
    const array2 = [];

    for (let i = 1; i <= array2Length; ++i) {
        array2.push(i);
    }

    console.log("New array: " + array2.join(", "));

    const evenElementsSquared = array2
        .filter(function (element) {
            return element % 2 === 0;
        })
        .map(function (element) {
            return Math.pow(element, 2);
        });

    console.log("Squared Even elements of new array: " + evenElementsSquared.join(", "));
})();
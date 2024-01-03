(function () {
    const array1 = [43, 36, 39, 45, 47, 47, 25, 3, 42, 14, 25, 29, 30, 0, 27];
    console.log("Array: " + array1.join(", "));

    function sortArray(array) {
        array.sort(function (e1, e2) {
            return e2 - e1;
        });

        return array
    }

    console.log("Array sorted in descending order: " + sortArray(array1).join(", "));

    function firstFiveElements(array) {
        const elementsCount = 5;

        return array.slice(0, elementsCount);
    }

    console.log("First five elements of array: " + firstFiveElements(array1).join(", "));

    function lastFiveElements(array) {
        const elementsCount = 5;

        return array.slice(-elementsCount);
    }

    console.log("Last five elements of array: " + lastFiveElements(array1).join(", "));

    function evenNumbersSum(array) {
        return array.reduce(function (evenNumbersSum, number) {
            return number % 2 === 0 ? evenNumbersSum + number : evenNumbersSum;
        }, 0);
    }

    console.log("Sum of array elements that have even value: " + evenNumbersSum(array1));

    const array2Length = 100;
    const array2 = [];

    for (let i = 1; i <= array2Length; ++i) {
        array2.push(i);
    }

    console.log("New array: " + array2.join(", "));

    function evenNumbersSquares(array) {
        return array
            .filter((number) => {
                return number % 2 === 0;
            })
            .map((number) => {
                return Math.pow(number, 2);
            });
    }

    console.log("Squared even numbers of new array: " + evenNumbersSquares(array2).join(", "));
})();
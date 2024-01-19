(() => {
    const array1 = [43, 36, 39, 45, 47, 47, 25, 3, 42, 14, 25, 29, 30, 0, 27];
    console.log("Array: " + array1.join(", "));

    function sortArrayInDescendingOrder(numbers) {
        return numbers.sort((number1, number2) => number2 - number1);
    }

    console.log("Array sorted in descending order: " + sortArrayInDescendingOrder(array1).join(", "));

    function getFirstElements(array, elementsCount) {
        return array.slice(0, elementsCount);
    }

    console.log("First five elements of array: " + getFirstElements(array1, 5).join(", "));

    function getlastElements(array, elementsCount) {
        return array.slice(-elementsCount);
    }

    console.log("Last five elements of array: " + getlastElements(array1, 5).join(", "));

    function getEvenNumbersSum(numbers) {
        return numbers.reduce((evenNumbersSum, number) => number % 2 === 0 ? evenNumbersSum + number : evenNumbersSum, 0);
    }

    console.log("Sum of even numbers of array: " + getEvenNumbersSum(array1));

    const array2Length = 100;
    const array2 = [];

    for (let i = 1; i <= array2Length; ++i) {
        array2.push(i);
    }

    console.log("New array: " + array2.join(", "));

    function getEvenNumbersSquares(numbers) {
        return numbers
            .filter(number => number % 2 === 0)
            .map(number => number * number);
    }

    console.log("Squared even numbers of new array: " + getEvenNumbersSquares(array2).join(", "));
})();
(() => {
    const array1 = [43, 36, 39, 45, 47, 47, 25, 3, 42, 14, 25, 29, 30, 0, 27];
    console.log("Array: " + array1.join(", "));

    function sortArray(numbers) {
        return numbers.sort((number1, number2) => number2 - number1);
    }

    console.log("Array sorted in descending order: " + sortArray(array1).join(", "));

    function returnFirstNElements(array, elementsCount) {
        return array.slice(0, elementsCount);
    }

    console.log("First five elements of array: " + returnFirstNElements(array1, 5).join(", "));

    function lastNElements(array, elementsCount) {
        return array.slice(-elementsCount);
    }

    console.log("Last five elements of array: " + lastNElements(array1, 5).join(", "));

    function sumUpEvenNumbers(numbers) {
        return numbers.reduce((evenNumbersSum, number) => number % 2 === 0 ? evenNumbersSum + number : evenNumbersSum, 0);
    }

    console.log("Sum of array even numbers: " + sumUpEvenNumbers(array1));

    const array2Length = 100;
    const array2 = [];

    for (let i = 1; i <= array2Length; ++i) {
        array2.push(i);
    }

    console.log("New array: " + array2.join(", "));

    function squareEvenNumbers(numbers) {
        return numbers
            .filter(number => number % 2 === 0)
            .map((number) => number * number);
    }

    console.log("Squared even numbers of new array: " + squareEvenNumbers(array2).join(", "));
})();
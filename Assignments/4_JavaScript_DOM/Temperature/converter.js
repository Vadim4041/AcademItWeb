document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("input-Celsius");
    const outputFieldKelvin = document.getElementById("output-Kelvin");
    const outputFieldFahrenheit = document.getElementById("output-Fahrenheit");
    const button = document.getElementById("button1");

    button.addEventListener("click", function () {
        const inputTemperature = inputField.value.trim();
        outputFieldKelvin.value = "";
        outputFieldFahrenheit.value = "";

        inputField.value = inputTemperature;

        function convertCelsiusToKelvin(degreesCelsius) {
            return Number(degreesCelsius) + 273.15;
        }

        outputFieldKelvin.value = convertCelsiusToKelvin(inputTemperature).toFixed(2);

        function convertCelsiusToFahrenheit(degreesCelsius) {
            return degreesCelsius * 9 / 5 + 32;
        }

        outputFieldFahrenheit.value = convertCelsiusToFahrenheit(inputTemperature).toFixed(2);
    })
});
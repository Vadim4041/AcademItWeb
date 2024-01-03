document.addEventListener("DOMContentLoaded", function () {
    const inputFieldCelsius = document.getElementById("input-celsius");
    const outputFieldKelvin = document.getElementById("output-kelvin");
    const outputFieldFahrenheit = document.getElementById("output-fahrenheit");
    const button = document.getElementById("button");

    button.addEventListener("focus", function () {
        document.querySelector("span.error_message").style.display = "none";
    });

    function convertCelsiusToKelvin(degreesCelsius) {
        return Number(degreesCelsius) + 273.15;
    }

    function convertCelsiusToFahrenheit(degreesCelsius) {
        return degreesCelsius * 9 / 5 + 32;
    }

    button.addEventListener("click", function () {
        const inputTemperature = inputFieldCelsius.value.trim();

        outputFieldKelvin.value = "";
        outputFieldFahrenheit.value = "";

        if (inputTemperature.length === 0 || isNaN(Number(inputTemperature))) {
            document.querySelector("span.error_message").style.display = "inline";
            return;
        }

        inputFieldCelsius.value = inputTemperature;

        outputFieldKelvin.value = convertCelsiusToKelvin(inputTemperature).toFixed(2);

        outputFieldFahrenheit.value = convertCelsiusToFahrenheit(inputTemperature).toFixed(2);
    });
});
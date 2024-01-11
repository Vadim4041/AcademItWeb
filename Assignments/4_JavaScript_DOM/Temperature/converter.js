document.addEventListener("DOMContentLoaded", function () {
    const celsiusInputField = document.getElementById("input-celsius");
    const kelvinOutputField = document.getElementById("output-kelvin");
    const fahrenheitOutputField = document.getElementById("output-fahrenheit");
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
        const celsiusTemperature = Number(celsiusInputField.value);
        const errorMessage = document.querySelector("span.error_message");

        kelvinOutputField.value = "";
        fahrenheitOutputField.value = "";

        if (celsiusTemperature.length === 0 || isNaN(celsiusTemperature)) {
            errorMessage.style.display = "inline";
            return;
        }

        celsiusInputField.value = celsiusTemperature;

        kelvinOutputField.value = convertCelsiusToKelvin(celsiusTemperature).toFixed(2);
        fahrenheitOutputField.value = convertCelsiusToFahrenheit(celsiusTemperature).toFixed(2);
    });
});
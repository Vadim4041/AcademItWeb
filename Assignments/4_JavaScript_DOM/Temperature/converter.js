document.addEventListener("DOMContentLoaded", function () {
    const celsiusInputField = document.getElementById("input-celsius");
    const kelvinOutputField = document.getElementById("output-kelvin");
    const fahrenheitOutputField = document.getElementById("output-fahrenheit");
    const convertTemperatureButton = document.getElementById("convert-temperature-button");
    const errorMessageEmptyInput = document.getElementById("error_message_empty_value");
    const errorMessageNotANumber = document.getElementById("error_message_not_a_number");

    celsiusInputField.addEventListener("focus", function () {
        errorMessageEmptyInput.style.display = "none";
        errorMessageNotANumber.style.display = "none";
    });

    function convertCelsiusToKelvin(degreesCelsius) {
        return degreesCelsius + 273.15;
    }

    function convertCelsiusToFahrenheit(degreesCelsius) {
        return degreesCelsius * 9 / 5 + 32;
    }

    convertTemperatureButton.addEventListener("click", function () {
        const celsiusTemperatureString = celsiusInputField.value;
        const celsiusTemperatureNumber = Number(celsiusTemperatureString);

        kelvinOutputField.value = "";
        fahrenheitOutputField.value = "";

        if (celsiusTemperatureString.length === 0) {
            errorMessageEmptyInput.style.display = "inline";
            return;
        }

        if (isNaN(celsiusTemperatureNumber)) {
            errorMessageNotANumber.style.display = "inline";
            return;
        }

        celsiusInputField.value = celsiusTemperatureNumber;

        kelvinOutputField.value = convertCelsiusToKelvin(celsiusTemperatureNumber).toFixed(2);
        fahrenheitOutputField.value = convertCelsiusToFahrenheit(celsiusTemperatureNumber).toFixed(2);
    });
});
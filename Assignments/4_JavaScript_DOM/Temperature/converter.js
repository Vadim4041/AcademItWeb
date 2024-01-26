document.addEventListener("DOMContentLoaded", function () {
    const celsiusInputField = document.getElementById("input-celsius");
    const kelvinOutputField = document.getElementById("output-kelvin");
    const fahrenheitOutputField = document.getElementById("output-fahrenheit");
    const convertTemperatureButton = document.getElementById("convert-temperature-button");
    const emptyInputErrorMessageElement = document.getElementById("error-message-empty-value");
    const notNumberErrorMessageElement = document.getElementById("error-message-not-a-number");

    function convertCelsiusToKelvin(degreesCelsius) {
        return degreesCelsius + 273.15;
    }

    function convertCelsiusToFahrenheit(degreesCelsius) {
        return degreesCelsius * 9 / 5 + 32;
    }

    convertTemperatureButton.addEventListener("click", function () {
        kelvinOutputField.value = "";
        fahrenheitOutputField.value = "";

        const celsiusTemperatureString = celsiusInputField.value;

        if (celsiusTemperatureString.trim().length === 0) {
            emptyInputErrorMessageElement.style.display = "inline";
            return;
        }

        emptyInputErrorMessageElement.style.display = "none";

        const celsiusTemperatureNumber = Number(celsiusTemperatureString);

        if (isNaN(celsiusTemperatureNumber)) {
            notNumberErrorMessageElement.style.display = "inline";
            return;
        }

        notNumberErrorMessageElement.style.display = "none";

        celsiusInputField.value = celsiusTemperatureNumber;

        kelvinOutputField.value = convertCelsiusToKelvin(celsiusTemperatureNumber).toFixed(2);
        fahrenheitOutputField.value = convertCelsiusToFahrenheit(celsiusTemperatureNumber).toFixed(2);
    });
});
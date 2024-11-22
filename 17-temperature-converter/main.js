const fromUnits = document.querySelector(".from-units");
const toUnits = document.querySelector(".to-units");
const valueInput = document.querySelector(".value-input");
const submit = document.querySelector(".submit");
const result = document.querySelector(".result");

checkFilled();

function checkFilled() {
  if (!fromUnits.value || !toUnits.value || !valueInput.value || !Number(valueInput.value)) {
    submit.disabled = true;
    submit.style.opacity = 0.2;
    submit.style.cursor = "initial";
  } else {
    submit.disabled = false;
    submit.style.opacity = 1;
    submit.style.cursor = "pointer";
  }
}
fromUnits.addEventListener("input", checkFilled);
toUnits.addEventListener("input", checkFilled);
valueInput.addEventListener("input", checkFilled);

submit.addEventListener("click", () => {
  const value = Number(valueInput.value);
  if (toUnits.value === "celsius") {
    result.textContent = toCelsius(value) + "°C";
  } else if (toUnits.value === "fahrenheit") {
    result.textContent = toFahrenheit(value) + "°F";
  } else {
    result.textContent = toKelvin(value) + "K";
  }
});

function toCelsius(valueInput) {
  if (fromUnits.value === "fahrenheit") {
    return ((valueInput - 32) * 5) / 9;
  } else if (fromUnits.value === "kelvin") {
    return valueInput - 273.15;
  } else {
    return valueInput;
  }
}
function toFahrenheit(valueInput) {
  if (fromUnits.value === "celsius") {
    return (valueInput * 9) / 5 + 32;
  } else if (fromUnits.value === "kelvin") {
    return (valueInput * 9) / 5 - 459.67;
  } else {
    return valueInput;
  }
}

function toKelvin(valueInput) {
  if (fromUnits.value === "celsius") {
    return valueInput + 273.15;
  } else if (fromUnits.value === "fahrenheit") {
    return ((valueInput + 459.67) * 5) / 9;
  } else {
    return valueInput;
  }
}

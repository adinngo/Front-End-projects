const dateInput = document.querySelector(".date-input");

const today = new Date().toISOString().split("T")[0];

dateInput.setAttribute("max", today);

const submit = document.querySelector(".submit");

const userAge = document.querySelector(".result");

submit.addEventListener("click", () => {

  //from local time
  const [year, month, days] = today.split("-");

  //input from user
  const dateValue = dateInput.value;
  if (dateValue) {

    userAge.classList.remove("error");

    const [yearInput, monthInput, daysInput] = dateValue.split("-");

    userAge.innerHTML = `
    You are <b>${year - yearInput} years ${Math.abs(month - monthInput)} months ${Math.abs(days - daysInput)} days</b> old`;
    
  } else {

    userAge.classList.add("error");

    userAge.innerHTML = `Please input your birth date!`;
  }
  
});

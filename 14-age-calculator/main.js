const dateInput = document.querySelector(".date-input");
const today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("max", today);
const submit = document.querySelector(".submit");

const userAge = document.querySelector(".result");

submit.addEventListener("click", () => {
  //from local time
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const days = new Date().getDate();

  //input from user
  const dateValue = dateInput.value;
  if (dateValue) {
    const [yearInput, monthInput, daysInput] = dateValue.split("-");
    console.log(monthInput);
    console.log(daysInput);
    console.log(yearInput);
    userAge.innerHTML = `
    You are <b>${year - yearInput} years ${Math.abs(month - monthInput)} months ${Math.abs(days - daysInput)} days</b> old`;
  } else {
    userAge.classList.add("error");
    userAge.innerHTML = `Please input your birth date!`;
  }
  
});

const userInput = document.getElementById("user-input");
const outputNum = document.getElementById("user-output");
const spinnerBtn = document.getElementById("results-spinner");
const tooLargeAlert = document.getElementById("alert");
const resultsList = document.getElementById("results-list");
const checkBox = document.getElementById("save-calc");
const calcBtn = document.getElementById("isbutton");

calcBtn.addEventListener("click", (e) => {
  e.preventDefault();
  checkBoxStatus();
});

function checkBoxStatus() {
  if (checkBox.checked) {
    spinnerBtn.classList.remove("visually-hidden");
    callFibServer();
  } else {
    fibNumCalc(userInput.value);
  }
}

function refreshScreen() {
  outputNum.innerText = "";
  outputNum.classList.remove("server-error");
  tooLargeAlert.classList.add("visually-hidden");
  tooLargeAlert.classList.remove("text-danger");
}

function fibNumCalc(x) {
  refreshScreen();
  let yAntecedent = 0;
  let y = 1;
  if (x <= 0 || x > 50) return invalidInput(x);
  else if (x === 1) return (outputNum.innerText = yAntecedent);
  else
    for (let i = 1; i < x; i++) {
      let preCedingNums = y + yAntecedent;
      yAntecedent = y;
      y = preCedingNums;
    }
  outputNum.innerHTML += `<strong><u>${y}</u></strong>`;
}

function invalidInput(x) {
  if (x > 50) {
    tooLargeAlert.classList.remove("visually-hidden");
    tooLargeAlert.classList.add("text-danger");
    return 0;
  } else {
    const invalidStr = "Index number can't be 0 or negative";
    return (outputNum.innerHTML = `<p style="color:red; margin-top:12px">${invalidStr}</p>`);
  }
}

function callFibServer() {
  const SERVER_URL = `http://localhost:5050/fibonacci/${userInput.value}`;
  fetch(SERVER_URL).then((response) => {
    if (!response.ok) {
      response
        .text()
        .then((errorText) => {
          refreshScreen();
          outputNum.innerText = "Server Error: " + errorText;
          outputNum.classList.add("text-danger");
          throw new Error(errorText);
        })
        .catch((err) => {
          console.log("we found ", err);
        });
    } else if (userInput.value > 50) {
      tooLargeAlert.classList.remove("visually-hidden");
      tooLargeAlert.classList.add("text-danger");
    } else {
      return response.json().then(function (data) {
        let fibNum = data.result;
        presentOutput(fibNum);
      });
    }
  });
}

function presentOutput(result) {
  refreshScreen();
  spinnerBtn.classList.add("visually-hidden");
  outputNum.innerHTML += `<strong><u>${result}</u></strong>`;
  resultsServer();
}

function resultsServer() {
  const SERVER_URL = "http://localhost:5050/getFibonacciResults";
  fetch(SERVER_URL).then((response) => {
    if (!response.ok) {
      response
        .text((errorText) => {
          throw new Error(errorText);
        })
        .catch(err);
    } else {
      response.json().then((dataObjects) => {
        dataObjects.results.sort((a, b) => {
          return b.createdDate - a.createdDate;
        });
        let i = 0;
        let dateString = new Date(dataObjects.results[i].createdDate);
        let resultStr = `<li> The Fibonacci Of <b>${dataObjects.results[i].number}</b> is <b>${dataObjects.results[i].result}</b> Calculated at: ${dateString}</li>`;
        resultsList.innerHTML += resultStr;
      });
    }
  });
}

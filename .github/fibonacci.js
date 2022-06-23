const calcBtn = document.getElementById('isbutton');
const outputNum = document.getElementById('user-output');
const userInput = document.getElementById('user-input');
const spinnerBtn = document.getElementById('spinner');
const alert = document.getElementById('alert');

calcBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let fibNumIndex = userInput.value;
    if (fibNumIndex > 50) {
        alert.classList.remove('visually-hidden');
        return 0;
    } else {
        spinnerBtn.classList.remove('visually-hidden');
        return callFibServer(fibNumIndex);
    }
})

function callFibServer(fibNumIndex) {
const SERVER_URL = `http://localhost:5050/fibonacci/${fibNumIndex}`;
fetch(SERVER_URL)
.then((response) => {
    if (!response.ok) {
        response.text().then((errorText) => {
            outputNum.innerText = "Server Error: " + errorText;
            outputNum.classList.add('text-danger');
            outputNum.classList.add('fs-6');
        });
    } else {

        return response.json();
    }
    
  })
.then(function(data) {
    spinnerBtn.classList.add('visually-hidden');
    outputNum.innerHTML = data.result;
  });
}

// spinnerBtn.classList.add('d-none');
// spinnerBtn.classList.remove('.d-none');
// function displaySpinner() {
//     spinnerBtn.classList.remove('visually-hidden');
// }

// function loadFibNum() {
//     displaySpinner();
//     const SERVER_URL = `http://localhost:5050/fibonacci/${fibNumIndex}`;
// fetch(SERVER_URL)
// .then(function(response) {
//     return response.json(); 
//   })
// .then(function(data) {
//     outputNum.innerHTML = data.result;
//   });


const calcBtn = document.getElementById('isbutton');
const outputNum = document.getElementById('user-output');
const userInput = document.getElementById('user-input');

calcBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let fibNumIndex = userInput.value;
    return callFibServer(fibNumIndex);
})

function callFibServer(fibNumIndex) {
const SERVER_URL = `http://localhost:5050/fibonacci/${fibNumIndex}`;
fetch(SERVER_URL)
.then(function(response) {
    console.log(response);
    return response.json(); 
  })
.then(function(data) {
    outputNum.innerHTML = data.result;
  });
}
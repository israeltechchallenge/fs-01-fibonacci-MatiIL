const calcBtn = document.getElementById('isbutton');
const outputNum = document.getElementById('user-output');
const userInput = document.getElementById('user-input');
const spinnerBtn = document.getElementById('spinner');
const alert = document.getElementById('alert');
const resultsList = document.getElementById('results-list');

calcBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let fibNumIndex = userInput.value;
    if (fibNumIndex > 50) {
        alert.classList.remove('visually-hidden');
    } else {
        spinnerBtn.classList.remove('visually-hidden');
        callFibServer(fibNumIndex);  
    }
})

function callFibServer(fibNumIndex) {
  alert.classList.add("visually-hidden");
  const SERVER_URL = `http://localhost:5050/fibonacci/${fibNumIndex}`;
  fetch(SERVER_URL).then((response) => {
    if (!response.ok) {
      response.text().then((errorText) => {
        outputNum.innerText = "Server Error: " + errorText;
        outputNum.classList.add("text-danger");
        throw new Error(errorText)
      }).catch(err => {console.log("we found ", err)});
    } else {
      return response.json().then(function (data) {
        spinnerBtn.classList.add("visually-hidden");
        outputNum.innerText = '';
        numberString = data.result;
        outputNum.innerHTML += `<strong><u>${numberString}</u></strong>`;
        outputNum.classList.remove("server-error");
        outputNum.classList.remove("text-danger");
        resultsServer();
      });
    }
  });
}

function resultsServer() {
    const SERVER_URL = 'http://localhost:5050/getFibonacciResults';
        fetch(SERVER_URL).then(response => {
            if(!response.ok){
                response.text((errorText)=>{ throw new Error (errorText)} ) .catch((err))
            } else {
        response.json().then(dataObjects => {
        dataObjects.results.sort((a, b) => {
        return b.createdDate - a.createdDate;
        });
        let i = 0;
        let dateString = new Date(dataObjects.results[i].createdDate);
        let resultStr = `<li> The Fibonacci Of <b>${dataObjects.results[i].number}</b> is <b>${dataObjects.results[i].result}</b> Calculated at: ${dateString}</li>`;
        resultsList.innerHTML += resultStr;
      });
      
     }})
     }
    
    
   
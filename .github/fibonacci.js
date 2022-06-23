const calcBtn = document.getElementById('isbutton');
const outputNum = document.getElementById('user-output');
const userInput = document.getElementById('user-input');

calcBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let fibNumIndex = userInput.value;
    return fibNumCalc(fibNumIndex);
})

function fibNumCalc(fibNumIndex) {
    let fibAntecedent = 0;
    let fibNum = 1;
    if (fibNumIndex <= 1) {
        fibNum = 0;
    } 
    else for(let i = 2; i < fibNumIndex; i++) {
            let preCedingNums = fibNum + fibAntecedent;
            fibAntecedent = fibNum;
            fibNum = preCedingNums;
            }
      return appendFibNum(fibNum);
}

function appendFibNum(fibNum) {
    const outputNum = document.getElementById('user-output');
    outputNum.innerHTML = fibNum;
}












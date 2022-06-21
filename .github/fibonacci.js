let fibNumIndex = document.querySelector("span");
let fibNum = document.querySelector("p");

function fibNumCalc(x) {
    let yAntecedent = 0;
    let y = 1;
    if (x <= 0)
    return null;
    else if (x === 1)
    return yAntecedent;
         else for(let i = 2; i < x; i++) {
            let preCedingNums = y + yAntecedent;
            yAntecedent = y;
            y = preCedingNums;
    }
    return y;   
}

let x = 8;
fibNumIndex.innerText += x;
fibNum.innerText += fibNumCalc(x);








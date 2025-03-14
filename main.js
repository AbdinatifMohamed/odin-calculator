const numbtns = document.querySelectorAll(".num");
const operatorbtns = document.querySelectorAll(".operator");
const display = document.querySelector(".displaynum");
const clear = document.querySelector(".clear");
let firstnum;
let secondnum;
let operator;
let result;

/*
User selects num;
User selects operator;
User select secondnum;
User selects equal;
User receives result;
firstnum still has the result and secondnum is now empty and operator is now empty;




*/

function operate(){
    if (firstnum === undefined || secondnum === undefined || operator === undefined) return;
    switch (operator) {
        case "add":
            result = firstnum + secondnum;
            break;
        case "minus":
            result = firstnum - secondnum;
            break;
        case "multiply":
            result = firstnum/secondnum;
            break;
        case "equal":
            if (result !== undefined) {
                displayContent(`${result}`) 
                firstnum = result;
                secondnum = undefined;
                result = undefined;
            }
            break;
        default:
            break;
    }
}

function displayContent(text) {
    display.textContent = text;
} 

function clearCalc(){
    firstnum = undefined;
    secondnum = undefined;
    result = undefined;
    displayContent("0");
}

numbtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (firstnum !== undefined && operator === undefined) return;
        if (firstnum === undefined) {
            firstnum = Number(btn.dataset.number);
            displayContent(`${firstnum}`);
        } else if (secondnum === undefined){
            secondnum = Number(btn.dataset.number);
            displayContent(`${secondnum}`);
            operate();
        }
    })
})




operatorbtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        operator = btn.dataset.type;
        operate();
    })
})



clear.addEventListener("click", clearCalc);
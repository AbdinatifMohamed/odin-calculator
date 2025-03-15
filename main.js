const numbtns = document.querySelectorAll(".num");
const operatorbtns = document.querySelectorAll(".operator");
const display = document.querySelector(".displaynum");
const clear = document.querySelector(".clear");
const equal = document.querySelector(".equal");
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


function getCalc(type) {
    if (type === "divide" && secondnum === 0) {
        return undefined;
    }
    switch (type) {
        case "add": return firstnum + secondnum;
        case "minus": return firstnum - secondnum;
        case "multiply": return firstnum * secondnum;
        case "divide": 
            let tresult = firstnum / secondnum;
            return parseFloat(tresult.toFixed(5));;
        default: return undefined;
    }
}
function operate(type){
    if (firstnum === undefined || secondnum === undefined || operator === undefined) return;
    switch (type) {
        case "equal":
            result = getCalc(operator);
            if (result !== undefined) {
                displayContent(`${result}`) 
                firstnum = result;
                secondnum = undefined;
                result = undefined;
                operator = undefined;
            } else {
                clearCalc();
            }
            break;
        default:
            result = getCalc(operator);
            if (result !== undefined) {
                displayContent(`${result}`) 
                firstnum = result;
                operator = type;
                secondnum = undefined;
                result = undefined;
            }
            
            break;
    }
}

function displayContent(text) {
    display.textContent = "0";
    display.textContent = text;
} 

function clearCalc(){
    firstnum = undefined;
    secondnum = undefined;
    result = undefined;
    operator = undefined;
    displayContent("0");
}

numbtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (firstnum === undefined) {
            firstnum = Number(btn.dataset.number);
            displayContent(`${firstnum}`);
        } else if (firstnum !== undefined && operator === undefined) {
            firstnum = Number(`${firstnum}${btn.dataset.number}`);
            displayContent(`${firstnum}`);
        }
        else if (secondnum === undefined && operator !== undefined){
            secondnum = Number(btn.dataset.number);
            displayContent(`${secondnum}`);
        } else if (secondnum !== undefined  && operator !== undefined) {
            secondnum = Number(`${secondnum}${btn.dataset.number}`);
            displayContent(`${secondnum}`);
        }
    })
})




operatorbtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (firstnum !== undefined && secondnum === undefined && operator === undefined){
            operator = btn.dataset.type;
        } else if (firstnum !== undefined && secondnum !== undefined && operator !== btn.dataset.type){
            operate(btn.dataset.type);
        }
        

    })
})



clear.addEventListener("click", clearCalc);
equal.addEventListener("click",  () => operate("equal"));

/*
User selects firstnum and we allow that to be the firstnum until the operator selected. 
Then User selects the secondnum and we allow that to be the secondnum until equal or another operator is selected.



Gotchas: watch out for and fix these bugs if they show up in your code:
Your calculator should not evaluate more than a single pair of numbers at a time. Example: you enter a number (12), followed by an operator button (+), a second number button (7), and a second operator button (-). Your calculator should then do the following: first, evaluate the initial pair of numbers (12 + 7), then display the result of that calculation (19). Finally, use that result (19) as the first number in a new calculation, along with the next operator (-). An example of the behavior we’re looking for can be seen in this student’s calculator live preview.
You should round answers with long decimals so that they don’t overflow the display.
Pressing = before entering all of the numbers or an operator could cause problems!
Pressing “clear” should wipe out any existing data. Make sure the user is really starting fresh after pressing “clear”.
Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!
Make sure that your calculator only runs an operation when supplied with two numbers and an operator by the user. Example: you enter a number (2), followed by an operator button (+). You press the operator button (+) a second consecutive time. Your calculator should not evaluate this as (2 + 2) and should not display the result (4). If consecutive operator buttons are pressed, your calculator should not run any evaluations, it should only take the last operator entered to be used for the next operation.
When a result is displayed, pressing a new digit should clear the result and start a new calculation instead of appending the digit to the existing result. Check whether this is the case on your calculator!


*/
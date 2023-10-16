"use strict";

function getId(id){
    return document.getElementById(id);
}

let currentNumber = "";
let currentEquation = "";

let equalPressed = false;

const equation = getId("equation-input");
const current = getId("current-input");

const clearEverything = getId("clear-everything");
const clearAll = getId("clear-all");
const backspace = getId("delete");

const percent = getId("percentage");
const inverse = getId("inverse");
const square = getId("square");
const squareRoot = getId("square-root");
const divide = getId("divide");
const multiply = getId("multiply");
const add = getId("add");
const subtract = getId("subtract");
const invert = getId("invert-sign");
const decimalPoint = getId("decimal-point");
const equal = getId("equal");


const zero = getId("zero");
const one = getId("one");
const two = getId("two");
const three = getId("three");
const four = getId("four");
const five = getId("five");
const six = getId("six");
const seven = getId("seven");
const eight = getId("eight");
const nine = getId("nine");

const numbers = new Map([
    [zero, "0"], 
    [one, "1"], 
    [two, "2"], 
    [three, "3"], 
    [four, "4"], 
    [five, "5"], 
    [six, "6"], 
    [seven, "7"], 
    [eight, "8"], 
    [nine, "9"], 
]);

const basicMath = new Map([
    [divide, "/"],
    [multiply, "*"],
    [add, "+"],
    [subtract, "-"]
]);

const displayNumber = function(){
    if(equalPressed)
    currentNumber = "";
    equalPressed = false;
    currentNumber = Number(currentNumber + numbers.get(this))+"";
    current.textContent = currentNumber;
}

const basicOp = function(){
    if(currentNumber === ""){
        currentEquation = currentEquation.substring(0, currentEquation.length-2) + basicMath.get(this) + " ";
    }
    else{
        currentEquation += `${currentNumber}  ${basicMath.get(this)} `;
    }
    equation.textContent = currentEquation;
    currentNumber = "";
    current.textContent = currentNumber;
}

const decimalPointEvent = function(){
    if(!currentNumber.includes(".")){
        currentNumber += ".";
        current.textContent = currentNumber;
    }
}

const invertEvent = function(){
    if(currentNumber.includes("-")){
        currentNumber = currentNumber.substring(1);
        current.textContent = currentNumber;
    }
    else{
        currentNumber = "-" + currentNumber; 
        current.textContent = currentNumber;
    }
}

const backspaceEvent = function(){
    currentNumber = currentNumber.slice(0,-1);
    current.textContent = currentNumber;
}

const percentEvent = function(){
    currentNumber = (Number(currentNumber) / 100) + "";
    current.textContent = currentNumber;
}

const inverseEvent = function(){
    currentNumber = (1 / Number(currentNumber)) + "";
    current.textContent = currentNumber;
}

const squareEvent = function(){
    currentNumber = (Number(currentNumber) * Number(currentNumber)) + "";
    current.textContent = currentNumber;
}

const squareRootEvent = function(){
    currentNumber = Math.sqrt(Number(currentNumber)) + "";
    current.textContent = currentNumber;
}

const equalsEvent = function(){
    equalPressed = true;
    try {
        const answer = eval(`${currentEquation} ${currentNumber}`);
        currentNumber = answer + "";
    } catch (error) {
        currentNumber = "";
    }
    currentEquation = "";
    current.textContent = currentNumber;
    equation.textContent = "";
}

const clearEverythingEvent = function(){
    currentNumber = "";
    current.textContent = currentNumber;
}

const clearAllEvent = function(){
    currentEquation = "";
    currentNumber = "";
    current.textContent = "";
    equation.textContent = "";
}

for (const num of numbers.keys()) {
    num.addEventListener('click', displayNumber);
}

for (const sym of basicMath.keys()) {
    sym.addEventListener('click', basicOp);
}



decimalPoint.addEventListener('click', decimalPointEvent);

invert.addEventListener('click', invertEvent);

inverse.addEventListener('click', inverseEvent);

square.addEventListener('click', squareEvent);

squareRoot.addEventListener('click', squareRootEvent);

percent.addEventListener('click', percentEvent);

backspace.addEventListener('click', backspaceEvent);

equal.addEventListener('click', equalsEvent);

clearEverything.addEventListener('click', clearEverythingEvent);

clearAll.addEventListener('click', clearAllEvent);
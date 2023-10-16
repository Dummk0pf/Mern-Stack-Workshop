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
const squareroot = getId("square-root");
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
])

const symbols = new Map([
    [percent, "%"],
    [inverse, "1/"],
    [square, "sq"],
    [squareroot, "sqr"],
    [invert, "-"],
    [decimalPoint, "."],
    [equal, "="]
]);

const displayNumber = function(){
    if(equalPressed)
    currentNumber = "";
    equalPressed = false;
    currentNumber += numbers.get(this);
    current.textContent = currentNumber;
}

const basicOp = function(){
    console.log(currentEquation.substring(-2));
    if("/*-+".includes(currentEquation[currentEquation.length-2])){
        currentEquation = currentEquation.substring(-3) + basicMath.get(this) + " ";
    }
    else{
        currentEquation += `${currentNumber}  ${basicMath.get(this)} `;
    }
    equation.textContent = currentEquation;
    currentNumber = "";
    current.textContent = "";
}

const decimalPointEvent = function(){
    if(!currentNumber.includes(".")){
        currentNumber += ".";
        current.textContent = currentNumber;
    }
};

const invertEvent = function(){
    if(currentNumber.includes("-")){
        currentNumber = currentNumber.substring(1);
        current.textContent = currentNumber;
    }
    else{
        currentNumber = "-" + currentNumber; 
        current.textContent = currentNumber;
    }
};

const backspaceEvent = function(){
    currentNumber = currentNumber.slice(0,-1);
    current.textContent = currentNumber;
}

const clearEverythingEvent = function(){
    currentNumber = "";
    current.textContent = currentNumber;
};

const equalsEvent = function(){
    equalPressed = true;
    const answer = eval(`${currentEquation} ${currentNumber}`);
    console.log(answer);
    currentEquation = "";
    currentNumber = answer + "";
    current.textContent = currentNumber;
    equation.textContent = "";
}


for (const num of numbers.keys()) {
    num.addEventListener('click',displayNumber);
}

for (const sym of basicMath.keys()) {
    sym.addEventListener('click', basicOp);
}



decimalPoint.addEventListener('click', decimalPointEvent);

invert.addEventListener('click', invertEvent);

clearEverything.addEventListener('click', clearEverythingEvent);

backspace.addEventListener('click', backspaceEvent);

equal.addEventListener('click', equalsEvent);
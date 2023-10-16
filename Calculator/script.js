"use strict";

function getId(id){
    return document.getElementById(id);
}

let currentNumber = "";
let currentEquation = "";

let equalPressed = false;

const keyboard = document.querySelector("body");

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


const displayNumber = function(e, obj = this){
    if(equalPressed)
    currentNumber = "";
    equalPressed = false;
    currentNumber = Number(currentNumber + numbers.get(obj))+"";
    current.textContent = currentNumber;
}

const basicOp = function(e, obj = this){
    if(currentNumber === ""){
        currentEquation = currentEquation.substring(0, currentEquation.length-2) + basicMath.get(obj) + " ";
    }
    else{
        currentEquation += `${currentNumber}  ${basicMath.get(obj)} `;
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

// Mouse Events

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

// Keyboard Events

const methodMap = new Map([
    ["0", {element: zero, method: displayNumber}],
    ["1", {element: one, method: displayNumber}],
    ["2", {element: two, method: displayNumber}],
    ["3", {element: three, method: displayNumber}],
    ["4", {element: four, method: displayNumber}],
    ["5", {element: five, method: displayNumber}],
    ["6", {element: six, method: displayNumber}],
    ["7", {element: seven, method: displayNumber}],
    ["8", {element: eight, method: displayNumber}],
    ["9", {element: nine, method: displayNumber}],
    ["+", {element: add, method: basicOp}],
    ["-", {element: subtract, method: basicOp}],
    ["/", {element: divide, method: basicOp}],
    ["*", {element: multiply, method: basicOp}],
    [".", {element: decimalPoint, method: decimalPointEvent}],
    ["%", {element: percent, method: percentEvent}],
    ["Backspace", {element: backspace, method: backspaceEvent}],
    ["=", {element: equal, method: equalsEvent}],
    ["Enter", {element: equal, method: equalsEvent}]
]);

keyboard.addEventListener('keydown', function(event){
    const Event = methodMap.get(event.key);
    if(Event !== undefined){
        Event.method(null, Event.element);
        if(Event.element === equal){
            Event.element.classList.add("equalpress");
            Event.element.classList.remove("equals");
            setTimeout(() => {
                Event.element.classList.add("equals");
                Event.element.classList.remove("equalpress");
            }, 100);
        }
        else if([add, subtract, divide, multiply].includes(Event.element)){
            Event.element.classList.add("press");
            setTimeout(() => {
                Event.element.classList.remove("press");
            }, 100);
        }
        else{
            Event.element.classList.add("press");
            Event.element.classList.remove("darker");
            setTimeout(() => {
                Event.element.classList.add("darker");
                Event.element.classList.remove("press");
            }, 100);
        }
    }
})
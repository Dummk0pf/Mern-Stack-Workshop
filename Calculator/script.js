"use strict";

function getId(id){
    return document.getElementById(id);
}

let currentNumber = "";
let currentEquation = "";

const equation = getId("equation-input");
const current = getId("current-input");

const percent = getId("percentage");
const clearEverything = getId("clear-everything");
const clearAll = getId("clear-all");
const backspace = getId("delete");
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
    [zero, 0], 
    [one, 1], 
    [two, 2], 
    [three, 3], 
    [four, 4], 
    [five, 5], 
    [six, 6], 
    [seven, 7], 
    [eight, 8], 
    [nine, 9], 
]);

const displayNumber = function(){
    currentNumber += numbers.get(this);
    current.textContent = currentNumber;
    console.log(currentNumber);
}

for (const num of numbers.keys()) {
    num.addEventListener('click',displayNumber);
}

decimalPoint.addEventListener('click',function(){
    if(!currentNumber.includes(".")){
        currentNumber += ".";
        current.textContent = currentNumber;
    }
});
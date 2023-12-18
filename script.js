let firstNumber = '';
let secondNumber = '';
let Operator = null;

function add(num1, num2) {
    return parseInt(num1) + parseInt(num2);
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiple(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operation(num1, num2, operator) {
    return operator(num1, num2);
}

const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const pointBtn = document.querySelector('.pointer');
const equalsBtn = document.querySelector('.equals');
const topScreen = document.querySelector('.workings');
const bottomScreen = document.querySelector('.current');

clearBtn.addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    Operator = null;
    updateScreen();
});
deleteBtn.addEventListener('click', () => { 
    secondNumber = '';
    updateScreen();
});
pointBtn.addEventListener('click', () => {
    secondNumber += '.';
    updateScreen();
});
equalsBtn.addEventListener('click', () => {
    let temp = secondNumber;
    if (Operator != null) {      
        secondNumber = evaluate();
        if (secondNumber === 0) {
            secondNumber = '';
        }
        firstNumber += Operator
        Operator = null;
        firstNumber += temp;
        updateScreen();
    }
});

operatorBtn.forEach(op => {
    op.addEventListener('click', () => {
        Operator = op.textContent;
        if (firstNumber != '' && secondNumber != '' && Operator != null && Number.isInteger(firstNumber)) {
            console.log('run');
            firstNumber = evaluate();
            secondNumber = '';
        } else {
            if (secondNumber == '') {
                firstNumber = 0;
            } else {
                firstNumber = secondNumber;
                secondNumber = '';
            }
        }
        
        updateScreen();
    });
});
numberBtn.forEach(num => {
    num.addEventListener('click', () => {
        
        secondNumber +=  num.textContent;
        updateScreen();
    });
});

function updateScreen() {

    if (Operator === null) {
        topScreen.textContent = firstNumber;
    }else {
        topScreen.textContent = firstNumber + Operator;

    }
    if (secondNumber === '') {
        bottomScreen.textContent = 0;
    } else {
        bottomScreen.textContent = secondNumber;
    }
}

function evaluate() {
    switch (Operator) {
        case '+':
            return Math.round(add(firstNumber, secondNumber)* 100) / 100;
        case '-':
            return Math.round(subtract(firstNumber, secondNumber)* 100) / 100;
        case 'X':
            return Math.round(multiple(firstNumber, secondNumber)* 100) / 100;
        case '/':
            return Math.round(divide(firstNumber, secondNumber)* 100) / 100;
        default:
            return 0;
      }
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOperation(convertOperator(e.key))
}

updateScreen();
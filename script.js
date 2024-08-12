const calculator = document.querySelector('.calculator');
const displayCalculation = document.querySelector('#display-calculation');
const displayAnswer = document.querySelector('#display-answer');
const keys = document.querySelector('#calculator__keys');

keys.addEventListener('click', (e) => {
    if (!e.target.matches('button')) return;

    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = displayCalculation.value;
    const previousKeyType = calculator.dataset.previousKeyType;

    if (!action) {
        handleNumber(keyContent, displayedNum);
    } else if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
        handleOperator(action, displayedNum);
    } else if (action === 'decimal') {
        handleDecimal(displayedNum, previousKeyType);
    } else if (action === 'clear') {
        handleClear();
    } else if (action === 'calculate') {
        handleCalculate(displayedNum);
    }
    });

function handleNumber(keyContent, displayedNum) {
    if (displayedNum === '0') {
        displayCalculation.value = keyContent;
    } else {
        displayCalculation.value = displayedNum + keyContent;
    }
    calculator.dataset.previousKey = 'number';
}

function handleOperator(action, displayedNum) {
    if (['+', '-', '*', '/'].includes(displayedNum.slice(-1)) || displayedNum == "") {
        return;
    } else {
        displayCalculation.value = displayedNum + getOperatorSymbol(action);
        calculator.dataset.firstValue = displayedNum;
        calculator.dataset.operator = action;
    }
    calculator.dataset.previousKey = 'operator';
}

function handleDecimal(displayedNum, previousKeyType) {
    if (!['+', '-', '*', '/', '.'].includes(displayedNum.slice(-1))) {
        displayCalculation.value = displayedNum + '.';
    } else if (previousKeyType === 'operator') {
        displayCalculation.value = '0.';
        calculator.dataset.previousKey = 'decimal';
    }
}

function handleClear() {
    displayCalculation.value = '';
    displayAnswer.value = '';
    calculator.dataset.previousKey = 'clear';
}

function handleCalculate(displayedNum) {
    try {
        displayAnswer.value = Function('"use strict";return (' + displayedNum + ')')();
        calculator.dataset.previousKey = 'calculate';
    } catch (error) {
        displayAnswer.value = 'Error';
    }
}

function getOperatorSymbol(action) {
    switch (action) {
        case 'add':
            return '+';
        case 'subtract':
            return '-';
        case 'multiply':
            return '*';
        case 'divide':
            return '/';
    }
}



    VanillaTilt.init(document.querySelector(".calculator"), {
      max: 18,
      speed: 200,
      glare:true,
      "max-glare":0.05,
    });

window.onload = function () {
    loadHistory();
};

let display = document.getElementById('display');
let historyList = document.getElementById('history');

function appendNumber(number) {
    display.value += number;
}

function appendOperator(operator) {
    display.value += " " + operator + " ";
}

function appendDot() {
    if (!display.value.includes('.')) {
        display.value += '.';
    }
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let result = eval(display.value);
        let operation = `${display.value} = ${result}`;
        updateHistory(operation);
        display.value = result;
    } catch (e) {
        display.value = 'Error';
    }
}

function updateHistory(operation) {
    let history = getHistory();
    history.push(operation);
    localStorage.setItem('calcHistory', JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    let history = getHistory();
    historyList.innerHTML = '';
    history.forEach(op => {
        let li = document.createElement('li');
        li.textContent = op;
        historyList.appendChild(li);
    });
}

function getHistory() {
    let history = localStorage.getItem('calcHistory');
    return history ? JSON.parse(history) : [];
}

function clearHistory() {
    localStorage.removeItem('calcHistory');
    loadHistory();
}

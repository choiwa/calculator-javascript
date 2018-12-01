let runningTotal = 0;
// buffer handles continuous clicks
let buffer = "0";
let previousOperator = null;
let cases = {
    'C': function() {
        buffer = "0";
        runningTotal = 0;
        previousOperator = null;
    },
    '=': function() {
        if (previousOperator === null) {
            return;
        }
        flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = "" + runningTotal;
        runningTotal = 0;
    },
    "←": function() {
        if (buffer.length === 1) {
            buffer = 0;
        } else {
            buffer = buffer.substring(0, buffer.length - 1);
        }
    }
}

document.querySelector('.calc-buttons').addEventListener('click', function(event){
    buttonClick(event.target.innerText);
})

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    displayOnScreen();
}

function handleSymbol(value) {
    if (value !== "✕" && value !== "÷" && value !== "-" && value !== "+") {
        cases[value]();
    } else {
        handleMath(value);
    }

}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if(runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = value;
    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "÷") {
        runningTotal /= intBuffer;
    } else if (previousOperator === "✕") {
        runningTotal *= intBuffer;
    }
}

function displayOnScreen() {
    document.querySelector('.screen').innerText = buffer;
}
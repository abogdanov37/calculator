var calc = document.getElementById("calc");
function isDigit(value) {
    return value != " " && !isNaN(Number(value));
}
function isOperator(ch) {
    switch (ch) {
        case "+": return true;
        case "-": return true;
        case "/": return true;
        case "*": return true;
        default: return false;
    }
}
function processHighPriorityOperators(operands, operators) {
    if (operands && operators) {
        for (var i = 0; i < operators.length; i++) {
            var operator = operators[i];
            var value = void 0;
            switch (operator) {
                case "*": {
                    value = operands[i] * operands[i + 1];
                    operators.splice(i, 1);
                    operands.splice(i, 1);
                    operands[i] = value;
                    i = -1;
                    break;
                }
                case "/": {
                    value = operands[i] / operands[i + 1];
                    operators.splice(i, 1);
                    operands.splice(i, 1);
                    operands[i] = value;
                    i = -1;
                    break;
                }
            }
        }
    }
}
function processLowPriorityOperators(operands, operators) {
    if (operands && operators) {
        for (var i = 0; i < operators.length; i++) {
            var operator = operators[i];
            var value = void 0;
            switch (operator) {
                case "+": {
                    value = operands[i] + operands[i + 1];
                    operators.splice(i, 1);
                    operands.splice(i, 1);
                    operands[i] = value;
                    i = -1;
                    break;
                }
                case "-": {
                    value = operands[i] - operands[i + 1];
                    operators.splice(i, 1);
                    operands.splice(i, 1);
                    operands[i] = value;
                    i = -1;
                    break;
                }
            }
        }
    }
}
// 1 + 2 * 3 - 6
// 1, 2, 3, 6
// +, *, -
calc.onclick = function (evt) {
    var expressionField = document.getElementById("expression");
    if (expressionField) {
        var expression = expressionField.value + " "; //need to exclude last operand loosing 
        var operand = "";
        var operands = [];
        var operators = [];
        for (var i = 0; i < expression.length; i++) {
            if (isDigit(expression[i])) {
                operand += expression[i];
            }
            else {
                if (operand) {
                    operands.push(Number(operand));
                    operand = "";
                }
                if (isOperator(expression[i])) {
                    operators.push(expression[i]);
                }
            }
        }
        if (operands.length == operators.length + 1) {
            processHighPriorityOperators(operands, operators);
            processLowPriorityOperators(operands, operators);
        }
        else {
            alert("Wrong expression.");
        }
        var resultContainer = document.getElementById("result");
        resultContainer.innerHTML = operands[0].toString();
    }
    else
        alert("Can't find expression text box.");
};

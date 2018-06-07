let calc = document.getElementById("calc");

function isDigit(value: string): boolean {
   return value != " " && !isNaN(Number(value));
}

function isOperator(ch: string): boolean {
	switch (ch) {
		case "+": return true;
		case "-": return true;
		case "/": return true;
		case "*": return true;
		default: return false;
	}
}

function processHighPriorityOperators(operands:number[], operators:string[]):void {
	if (operands && operators) {
		for (let i:number = 0; i < operators.length; i++) {
			let operator:string = operators[i];
			let value:number;
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

function processLowPriorityOperators(operands:number[], operators:string[]):void {
	if (operands && operators) {
		for (let i:number = 0; i < operators.length; i++) {
			let operator:string = operators[i];
			let value:number;
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

calc.onclick = function (evt) {
	let expressionField = document.getElementById("expression");
	if (expressionField) {
		let expression:string = (<HTMLInputElement>expressionField).value + " "; //need to exclude last operand loosing 
		let operand:string = "";
		let operands:number[] = [];
		let operators:string[] = [];
		for (let i:number = 0; i < expression.length; i++) {
			if (isDigit(expression[i])) {
				operand += expression[i];
			} else {
				if (operand) {
					operands.push(Number(operand));
					operand = "";
				}
				if (isOperator(expression[i])) {
					operators.push(expression[i])
				}
			}
		}

		if (operands.length == operators.length + 1) {
			processHighPriorityOperators(operands, operators);
			processLowPriorityOperators(operands, operators);
		} else {
			alert("Wrong expression.");
		}
		let resultContainer = document.getElementById("result");
		resultContainer.innerHTML = operands[0].toString();
	} else alert("Can't find expression text box.");
};
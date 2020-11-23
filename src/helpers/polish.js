const _ = require('lodash');
const operationPrior = operation => {

    if (_.isNumber(operation)) {
        return -1;
    }
    switch (operation) {
        case "(":
        case "[":
            return 0
        case ":=":
        case ")":
        case "]":
            return 1
        case "+":
        case "-":
            return 7
        case "#-":
        case "*":
        case "\\":
            return 8
        case "^":
            return 9
    }
}

const getAllBefore = (stack, keySymbol) => {
    let result = []
    while (_.size(stack) !== 0) {
        const item = stack.pop()

        if (_.isNumber(item)) {
            if (keySymbol === 'number') {
                stack.push(item + 1)
            } else {
                if (_.last(stack) === 'Fn') {
                    result.push(item)
                    result.push(stack.pop())
                    return result;
                }
                if (_.last(stack) === '[') {
                    result.push(item)
                    return result;
                }
            }
            return result;
        }

        if (item !== keySymbol) {
            result.push(item)
        } else {
            return result;
        }
    }
    return result;
}


const getAllLess = (stack, op) => {
    let result = []
    while (stack && operationPrior(_.last(stack)) >= operationPrior(op)) {
        result.push(stack.pop());
    }
    return result;
}

const transform = (expression) => {
    const splitedExpression = expression.split(":=")

    let steps = [];
    let output = [];
    let stack = [];
    expression = splitedExpression[1]
    steps.push({item: splitedExpression[0], stack: [...stack], output: [splitedExpression[0], ...output]})
    while (expression) {
        let symbol = _.head(expression)
        expression = expression.substring(1);

        if (symbol.match(/^\d+$/gi)) {
            let lexem = symbol;
            if (expression) {
                while (_.head(expression).match(/^\d+$/gi)) {
                    lexem += _.head(expression)
                    expression = expression.substring(1);
                }
            }

            output.push(lexem);
            steps.push({item: lexem, stack: [":=", ...stack], output: [splitedExpression[0], ...output]})

        } else if (symbol.match(/^\w+$/gi)) {
            let lexem = symbol;
            if (expression) {
                while (_.head(expression).match(/^\w+$/gi)) {
                    lexem += _.head(expression)
                    expression = expression.substring(1);
                }
            }

            output.push(lexem);
            steps.push({item: lexem, stack: [":=", ...stack], output: [splitedExpression[0], ...output]})

        } else if (symbol.match(/^[\(\),\[\]\*\+\-\\\^]$/gi)) {

            const operation = symbol;
            const previousOperation = _.last(stack) || ":=";

            if (operation === '(') {
                const previousSign = _.last(output);

                if (previousSign) {
                    if (previousSign.match(/^[0-9a-zA-Z]+$/g) && previousSign !== 'Fn') {
                        stack.push('Fn')
                        stack.push(2)
                    } else {
                        stack.push('(')
                    }
                }
                steps.push({item: operation, stack: [":=", ...stack], output: [splitedExpression[0], ...output]})
                continue;
            }

            if (operation === '[') {
                const previousSign = _.last(output);
                if (previousSign) {
                    if (previousSign.match(/^[\da-zA-Z]+$/gi)) {
                        stack.push(operation)
                        stack.push(2)
                    } else {
                        stack.push(operation)
                    }
                } else {
                    stack.push(operation)
                }
                steps.push({item: operation, stack: [":=", ...stack], output: [splitedExpression[0], ...output]})
                continue;
            }

            if (operation === ')') {
                getAllBefore(stack, '(').forEach(item => {
                    output.push(item);
                })
                steps.push({item: operation, stack: [":=", ...stack], output: [splitedExpression[0], ...output]})
                continue;
            }

            if (operation === ',') {
                getAllBefore(stack, 'number').forEach(item => {
                    output.push(item);
                })
                steps.push({item: operation, stack: [":=", ...stack], output: [splitedExpression[0], ...output]})
                continue;
            }

            if (operation === ']') {
                getAllBefore(stack, '(').forEach(item => {
                    output.push(item);
                })
                stack.pop() //removing '['
                output.push(']')
                steps.push({item: operation, stack: [":=", ...stack], output: [splitedExpression[0], ...output]})
                continue;
            }

            if (operationPrior(operation) > operationPrior(previousOperation)) {
                stack.push(operation);
                steps.push({item: operation, stack: [":=", ...stack], output: [splitedExpression[0], ...output]})
            } else {
                output = [...output, ...getAllLess(stack, operation)]
                stack.push(operation);
                steps.push({item: operation, stack: [":=", ...stack], output: [splitedExpression[0], ...output]})
            }

        }

    }
    steps.push({item: 'end of expression', stack: [":=", ...stack], output: [splitedExpression[0], ...output]})

    if (!_.isEmpty(stack)) {
        const stackSize = stack.length;
        for (let i = 0; i < stackSize; i++) {
            const operation = stack.pop();
            output.push(operation);
            steps.push({item: operation, stack: [":=", ...stack], output: [splitedExpression[0], ...output]})
        }
    }

    output.unshift(splitedExpression[0])
    output.push(":=")
    steps.push({item: ":=", stack: [...stack], output: [...output]})
    console.log(output)
    return ({transResult: output, transSteps: steps})
}
const perform = (stack,steps, op) => {
    switch (op) {
        case "+":
            const a = parseFloat(stack.pop());
            const b =  parseFloat(stack.pop());
            stack.push(b + a);
            steps.push({item: "+", stack: [...stack], output: `${a} + ${b}`})
            return;
        case "-":
            const c =  parseFloat(stack.pop());
            const d =  parseFloat(stack.pop());
            stack.push(d - c);
            steps.push({item: "-", stack: [...stack], output: `${d} - ${c}`})
            return;
        case "/":
            const e =  parseFloat(stack.pop());
            const f =  parseFloat(stack.pop());
            stack.push(f / e);
            steps.push({item: "/", stack: [...stack], output: `${f} / ${e}`})
            return;
        case "*":
            const i =  parseFloat(stack.pop());
            const j =  parseFloat(stack.pop());
            stack.push(i * j);
            steps.push({item: "*", stack: [...stack], output: `${i} * ${j}`})
            return;
        case "Fn":
            stack.pop()
            steps.pop()
            const x =  parseFloat(stack.pop());
            stack.push(Math.sin(x));
            steps.push({item: "sin", stack: [...stack], output: `sin(${x})`})
            return;
    }
}

const compute = (poliz) => {
    let stack = [];
    let steps = [];
    poliz = poliz.slice(1, poliz.length - 1)
    poliz.forEach(elem => {
        if ((""+elem).match(/^\d+$/gi)) {
            stack.push(elem)
            steps.push({item: elem, stack: [...stack], operation: ""})
        } else {
            perform(stack,steps, elem)
        }
    })
    console.log(stack,steps)
    return ({compResult: stack[0], compSteps: steps})
}
export {transform, compute}

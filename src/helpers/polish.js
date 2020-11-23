import {toast} from "react-toastify";

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

const transform = (expression) => {
    const splitedExpression = expression.split(":=")

    let steps = [];
    let output = [];
    let stack = [];
    expression = splitedExpression[1]
    steps.push({item: splitedExpression[0], stack: [...stack], output: [splitedExpression[0], ...output]})
    for (let i = 0; i < expression.length; i++) {
        if (expression[i].match(/^\d+$/gi)) {
            output.push(expression[i]);
            steps.push({item: expression[i], stack: [":=", ...stack], output: [splitedExpression[0], ...output]})

        } else if (expression[i].match(/^[\(\),\[\]\*\+\-\\\^]+$/gi)) {
            const operation = expression[i];
            const previousOperation = _.last(stack) || ":=";

            if (operation === '(') {
                const previousSign = _.last(output);

                if (previousSign) {
                    if (previousSign.match(/^[0-9a-zA-Z]+$/gi) && previousSign !== 'Fn') {
                        stack.push('Fn')
                        stack.push(2)
                    } else {
                        stack.push('(')
                    }
                } else {
                    stack.push('(')
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
                steps.push({item: expression[i], stack: [":=", ...stack], output: [splitedExpression[0], ...output]})
            } else {
                output.push(stack.pop());
                stack.push(operation);
                steps.push({item: expression[i], stack: [":=", ...stack], output: [splitedExpression[0], ...output]})
            }

        } else if (expression[i].match(/^\w+$/gi)) {
            output.push(expression[i]);
            steps.push({item: expression[i], stack: [":=", ...stack], output: [splitedExpression[0], ...output]})
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
    console.log(({transResult: output, transSteps: steps}))
    return ({transResult: output, transSteps: steps})
}

const compute = (poliz) => {
    return ({compResult: 'mock compute', compSteps: []})
}
export {transform, compute}

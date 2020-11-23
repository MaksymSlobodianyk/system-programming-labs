export const SET_EXPRESSION = 'SET_EXPRESSION'
export const TOGGLE_POLISH_MODAL = 'TOGGLE_POLISH_MODAL'
export const SET_EXPRESSION_IS_CORRECT = 'SET_EXPRESSION_IS_CORRECT'
export const SET_POLISH_NOTATION_RESULT = 'SET_POLISH_NOTATION_RESULT'
export const SET_COMPUTED_RESULT = 'SET_COMPUTED_RESULT'
export const SET_POLISH_NOTATION_STEPS = 'SET_POLISH_NOTATION_STEPS'
export const SET_COMPUTING_STEPS = 'SET_COMPUTING_STEPS'

export const setExpression = expression => ({
    type: 'SET_EXPRESSION',
    expression
})

export const togglePolishModal = () => ({
    type: 'TOGGLE_POLISH_MODAL'
})

export const setExpressionIsCorrect = isCorrect => ({
    type: 'SET_EXPRESSION_IS_CORRECT',
    isCorrect
})

export const setPolishNotationResult = polishNotationResult => ({
    type: 'SET_POLISH_NOTATION_RESULT',
    polishNotationResult
})


export const setComputedResult = computingResult => ({
    type: 'SET_COMPUTED_RESULT',
    computingResult
})

export const setComputingSteps= steps => ({
    type: 'SET_COMPUTED_RESULT',
    steps
})

export const setPolishNotationSteps = steps => ({
    type: 'SET_POLISH_NOTATION_STEPS',
    steps
})


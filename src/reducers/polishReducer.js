import {
    SET_COMPUTED_RESULT,
    SET_EXPRESSION,
    SET_EXPRESSION_IS_CORRECT,
    SET_POLISH_NOTATION_RESULT,
    SET_POLISH_NOTATION_STEPS,
    SET_COMPUTING_STEPS,
    TOGGLE_POLISH_MODAL
} from "../actions/polishActions";

const initialState = {
    showPolishModal: true,
    isCorrect: true,
    expression: '',
    polishNotationResult: '',
    computingResult: '',
    polishNotationSteps: [],
    computingSteps:[]
}

const polishReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EXPRESSION:
            return {
                ...state,
                expression: action.expression
            }
        case SET_EXPRESSION_IS_CORRECT:
            return {
                ...state,
                isCorrect: action.isCorrect
            }
        case TOGGLE_POLISH_MODAL:
            return {
                ...state,
                showPolishModal: !state.showPolishModal
            }
        case SET_POLISH_NOTATION_RESULT:
            return {
                ...state,
                polishNotationResult: action.polishNotationResult
            }
        case SET_COMPUTED_RESULT:
            return {
                ...state,
                computingResult: action.computingResult
            }
        case SET_POLISH_NOTATION_STEPS:
            return {
                ...state,
                polishNotationSteps: action.steps
            }
        case SET_COMPUTING_STEPS:
            return {
                ...state,
                computingSteps: action.steps
            }
        default:
            return state
    }
}

export default polishReducer

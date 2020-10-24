import {SET_IS_PROCESSING, SET_TEXT, SET_TOKENS} from "../actions";

const initialState = {
    isProcessing: false,
    tokens: [],
    text: '',
    sortBy: undefined,
}

const analyzerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEXT:
            return {
                ...state,
            text: action.text}
        case SET_IS_PROCESSING:
            return {
                ...state,
                isProcessing: action.isProcessing}
        case SET_TOKENS:
            return {
                ...state,
                tokens: action.tokens}
        default:
            return state
    }
}

export default analyzerReducer

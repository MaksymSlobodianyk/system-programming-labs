import {SET_IS_PROCESSING, SET_SORT_BY, SET_TEXT, SET_TOKENS} from "../actions";

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
                isProcessing: false,
                tokens: action.tokens
            }
        case SET_SORT_BY:
            return {
                ...state,
                sortBy: action.sortBy
            }
        default:
            return state
    }
}

export default analyzerReducer

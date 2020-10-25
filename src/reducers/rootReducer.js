import {TOGGLE_SHOW_INFO, SET_SORT_BY, SET_TEXT, SET_TOKENS} from "../actions";

const initialState = {
    showInfo: true,
    tokens: [],
    text: '',
    sortBy: undefined,
}

const analyzerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEXT:
            return {
                ...state,
                text: action.text
            }
        case TOGGLE_SHOW_INFO:
            return {
                ...state,
                showInfo: !state.showInfo
            }
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

const initialState = {}

const analyzerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return state
        default:
            return state
    }
}

export default analyzerReducer

import { combineReducers } from 'redux'
import analyzerReducer from "./analyzerReducer";
import polishReducer from "./polishReducer";

export default combineReducers({
    analyzerReducer,
    polishReducer
})

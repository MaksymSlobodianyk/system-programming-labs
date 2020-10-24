import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import {createStore} from "redux";
import rootReducer from './reducers'
import Analizator from "./components/Analizator";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    rootReducer,
    composeWithDevTools()
    // other store enhancers if any
);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Analizator />
      </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

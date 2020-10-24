import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import {createStore} from "redux";
import rootReducer from './reducers'
import Analizator from "./components/Analizator";
import { composeWithDevTools } from 'redux-devtools-extension';
import 'semantic-ui-css/semantic.min.css'

const store = createStore(
    rootReducer,
    composeWithDevTools()
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

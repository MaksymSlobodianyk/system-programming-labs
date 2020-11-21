import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import {createStore} from "redux";
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import 'semantic-ui-css/semantic.min.css'
import Container from "./components/Container";

const store = createStore(
    rootReducer,
    composeWithDevTools()
);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Container />
      </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

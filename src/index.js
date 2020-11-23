import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import {createStore} from "redux";
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css'
import Container from "./components/Container";
import {ToastContainer} from "react-toastify";

const store = createStore(
    rootReducer,
    composeWithDevTools()
);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Container />
      </Provider>,
      <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import { Provider } from 'react-redux';

import App from './App';
import reducers from "./Reducers"

import './index.css';
// let store;
// if (process.env.NODE_ENV == 'development') store = createStore(reducers, applyMiddleware(logger))
let store = createStore(reducers);
store.dispatch({
  type: 'INIT_GAME',
  brickNumberPerRow: 4
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

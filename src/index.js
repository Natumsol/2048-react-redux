import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import reducers from "./Reducers"
import './index.css';

let  store = createStore(reducers);

store.dispatch({
  type: 'INIT_GAME',
  brickNumberPerRow: 4
}); // 初始化游戏

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

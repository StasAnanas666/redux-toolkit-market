import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './features/store';
// import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom'
import './assets/css/index.css'
import { Provider } from 'react-redux'
import store from './redux/store'

// import './test/socketio_test'
// import './test/socketioTest'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);



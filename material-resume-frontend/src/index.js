import React from 'react';
import ReactDOM from 'react-dom';
import './material-components.scss';
import './index.scss';
import './stylesheets/main.scss';
import './stylesheets/components/drag-and-drop-grid.scss';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as serviceWorker from './serviceWorker';
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { BrowserRouter as Router, Route} from 'react-router-dom';

import reducer from './reducers/index.js';

const store = createStore(
  reducer,
  applyMiddleware(logger, thunkMiddleware)
)

ReactDOM.render(
  <Provider store={store}>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
    <Router>
      <Route path='/' component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

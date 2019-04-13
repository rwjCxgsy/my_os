import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers/index'
import {createStore, applyMiddleware} from "redux"
import logger from 'redux-logger'
import {Provider} from 'react-redux';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

const Store = createStore(reducers, {}, applyMiddleware(logger))

import vconsole from 'vconsole'

// new vconsole()

ReactDOM.render(<Provider store={Store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

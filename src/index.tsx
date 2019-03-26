import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers'
import {createStore, applyMiddleware} from "redux"
import logger from 'redux-logger'
import {Provider} from 'react-redux';

const Store = createStore(reducers, {}, applyMiddleware(logger))

ReactDOM.render(<Provider store={Store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

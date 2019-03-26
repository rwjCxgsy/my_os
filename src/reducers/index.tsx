import {combineReducers } from 'redux';
import launcherList from './launcher'
import menu from './menu'
export default combineReducers ({
    launcherList,
    menu
})
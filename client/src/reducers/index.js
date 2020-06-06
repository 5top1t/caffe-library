import { combineReducers } from 'redux';
import books from './bookReducer';


export const rootReducer = combineReducers({
    books
});
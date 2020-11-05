import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {authReducer} from './reducers/auth';
import {doorsReducer} from './reducers/doors';

const rootReducer = combineReducers({
  auth: authReducer,
  doors: doorsReducer,
});
export default createStore(rootReducer, applyMiddleware(thunk));

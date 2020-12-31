import { combineReducers } from 'redux';
import { wsReducer } from './ws/wsReducer';
import { apiReducer } from './api/apiReducer';

export const rootReducer = combineReducers({
    ws: wsReducer,
    api: apiReducer,
});

import actions from './apiActions';

const defaultState = {};
export function apiReducer(state = defaultState, action: any) {
    switch (action.type) {
        case actions.ACTION_1:
            return Object.assign({}, state, action);
        default:
            return state;
    }
}

import actions from './wsActions';

const defaultState = {
    blocks: [],
    profitability: [],
};
export function wsReducer(state = defaultState, action: any) {
    switch (action.type) {
        case actions.ACTION_1:
            return Object.assign({}, state, action);

        default:
            return state;
    }
}

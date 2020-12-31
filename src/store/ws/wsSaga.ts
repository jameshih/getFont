import { takeLatest } from 'redux-saga/effects';
import actions from './wsActions';

function* testFunc() {
    yield console.log('test function');
}

export function* wsSaga() {
    yield takeLatest(actions.ACTION_1, testFunc);
}

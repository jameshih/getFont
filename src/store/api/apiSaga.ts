import { takeLatest } from 'redux-saga/effects';
import actions from './apiActions';
// import { SUCCESS, FAILED, ERROR } from './constant';

function* testFunc() {
    yield console.log('api saga test');
}

export function* apiSaga() {
    yield takeLatest(actions.ACTION_1, testFunc);
}

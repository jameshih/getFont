import { all } from 'redux-saga/effects';
import { wsSaga } from './ws/wsSaga';
import { apiSaga } from './api/apiSaga';

export default function* rootSaga() {
    yield all([wsSaga(), apiSaga()]);
}

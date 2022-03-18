import { call, put, takeLatest } from "redux-saga/effects";
import { SYMBOLS_REQUEST, SYMBOLS_SUCCESS, SYMBOLS_ERROR } from "../constants";
import { getSymbols } from "../../services/exchangerate";

function* fetchSymbols(action) {
    try {
        const symbolsData = yield call(getSymbols);
        if (
            symbolsData &&
            symbolsData.status === 200 &&
            symbolsData.data &&
            symbolsData.data.success &&
            symbolsData.data.symbols
        ) {
            const { data } = symbolsData;
            const payload = [];
            for (const item in data.symbols) {
                payload.push({
                    value: item,
                    label: item,
                });
            }
            yield put({ type: SYMBOLS_SUCCESS, payload });
        } else {
            yield put({
                type: SYMBOLS_ERROR,
                payload: "Error retrieving data.",
            });
        }
    } catch (error) {
        yield put({ type: SYMBOLS_ERROR, payload: error.message });
    }
}

function* symbolsSaga() {
    yield takeLatest(SYMBOLS_REQUEST, fetchSymbols);
}

export default symbolsSaga;

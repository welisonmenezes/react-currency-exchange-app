import { call, put, takeLatest } from "redux-saga/effects";
import {
    EXCHANGES_REQUEST,
    EXCHANGES_SUCCESS,
    EXCHANGES_ERROR,
} from "../constants";
import { getHistory } from "../../services/exchangerate";

function* fetchExchanges(action) {
    try {
        const exchangesData = yield call(
            getHistory,
            action.payload.start_date,
            action.payload.end_date,
            action.payload.from,
            action.payload.to
        );
        if (
            exchangesData &&
            exchangesData.status === 200 &&
            exchangesData.data &&
            exchangesData.data.rates &&
            exchangesData.data.success
        ) {
            const { data } = exchangesData;
            const payload = [];
            for (const item in data.rates) {
                payload.unshift({
                    date: item,
                    rate: data.rates[item][action.payload.to],
                });
            }
            yield put({
                type: EXCHANGES_SUCCESS,
                payload,
            });
        } else {
            yield put({
                type: EXCHANGES_ERROR,
                payload: "Error retrieving data.",
            });
        }
    } catch (error) {
        yield put({ type: EXCHANGES_ERROR, payload: error.message });
    }
}

function* exchangesSaga() {
    yield takeLatest(EXCHANGES_REQUEST, fetchExchanges);
}

export default exchangesSaga;

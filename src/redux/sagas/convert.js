import { call, put, takeLatest, all } from "redux-saga/effects";
import { v4 as uuid } from "uuid";

import {
    CONVERT_REQUEST,
    CONVERT_SUCCESS,
    CONVERT_ERROR,
    HISTORY_ADD,
    EXCHANGES_REQUEST,
} from "../constants";
import { getConvertion } from "../../services/exchangerate";
import { getSubtractedDate } from "../../services/dateFormatter";

function* fetchConvert(action) {
    try {
        const convertData = yield call(
            getConvertion,
            action.payload.to,
            action.payload.from,
            action.payload.amount,
            action.payload.date
        );
        if (
            convertData &&
            convertData.status === 200 &&
            convertData.data &&
            convertData.data.success
        ) {
            const { data } = convertData;
            const sagaEvents = [
                put({
                    type: CONVERT_SUCCESS,
                    payload: {
                        result: data.result,
                        date: data.date,
                        time: action.payload.time,
                        rate: data.info.rate,
                        from: data.query.from,
                        to: data.query.to,
                        amount: data.query.amount,
                        fromHistory: !action.payload.saveOnHistory,
                    },
                }),
                put({
                    type: EXCHANGES_REQUEST,
                    payload: {
                        start_date: getSubtractedDate(29, data.date),
                        end_date: data.date,
                        from: data.query.from,
                        to: `${data.query.to}`,
                    },
                }),
            ];
            if (action.payload.saveOnHistory) {
                sagaEvents.push(
                    put({
                        type: HISTORY_ADD,
                        payload: {
                            id: uuid(),
                            table: {
                                date: `${data.date} @ ${action.payload.time}`,
                                description: `Converted an amount of ${data.query.amount} from ${data.query.from} to ${data.query.to}`,
                            },
                            from: data.query.from,
                            to: data.query.to,
                            amount: data.query.amount,
                            date: data.date,
                            time: action.payload.time,
                        },
                    })
                );
            }
            yield all(sagaEvents);
        } else {
            yield put({
                type: CONVERT_ERROR,
                payload: "Error retrieving data.",
            });
        }
    } catch (error) {
        yield put({ type: CONVERT_ERROR, payload: error.message });
    }
}

function* convertSaga() {
    yield takeLatest(CONVERT_REQUEST, fetchConvert);
}

export default convertSaga;

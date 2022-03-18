import { all } from "redux-saga/effects";
import convertSaga from "./convert";
import symbolsSaga from "./symbols";
import exchangesSaga from "./exchanges";

export default function* rootSagas() {
    yield all([convertSaga(), symbolsSaga(), exchangesSaga()]);
}

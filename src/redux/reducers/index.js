import { combineReducers } from "redux";
import convert from "./convert";
import symbols from "./symbols";
import exchanges from "./exchanges";
import history from "./history";

const reducers = combineReducers({
    convert,
    symbols,
    exchanges,
    history,
});

export default reducers;

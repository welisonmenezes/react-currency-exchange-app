import { SYMBOLS_REQUEST, SYMBOLS_SUCCESS, SYMBOLS_ERROR } from "../constants";

export const symbolsRequest = () => ({
    type: SYMBOLS_REQUEST,
});

export const symbolsSuccess = (data) => ({
    type: SYMBOLS_SUCCESS,
    payload: data,
});

export const symbolsError = (message) => ({
    type: SYMBOLS_ERROR,
    payload: message,
});

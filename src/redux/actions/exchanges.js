import {
    EXCHANGES_REQUEST,
    EXCHANGES_SUCCESS,
    EXCHANGES_ERROR,
} from "../constants";

export const exchangesRequest = (params) => ({
    type: EXCHANGES_REQUEST,
    payload: params,
});

export const exchangesSuccess = (data) => ({
    type: EXCHANGES_SUCCESS,
    payload: data,
});

export const exchangesError = (message) => ({
    type: EXCHANGES_ERROR,
    payload: message,
});

import { CONVERT_REQUEST, CONVERT_SUCCESS, CONVERT_ERROR } from "../constants";

export const convertRequest = (params) => ({
    type: CONVERT_REQUEST,
    payload: params,
});

export const convertSuccess = (data) => ({
    type: CONVERT_SUCCESS,
    payload: data,
});

export const convertError = (message) => ({
    type: CONVERT_ERROR,
    payload: message,
});

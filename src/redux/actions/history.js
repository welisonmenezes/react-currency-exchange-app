import { HISTORY_ADD, HISTORY_DELETE, HISTORY_GET_ALL } from "../constants";

export const historyAdd = (newHistory) => ({
    type: HISTORY_ADD,
    payload: newHistory,
});

export const historyDelete = (history) => ({
    type: HISTORY_DELETE,
    payload: history,
});

export const historyGetAll = () => ({
    type: HISTORY_GET_ALL,
});

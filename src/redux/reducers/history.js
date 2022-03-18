import { HISTORY_ADD, HISTORY_DELETE, HISTORY_GET_ALL } from "../constants";

const initialState = {
    data: [],
};

const history = (state = initialState, action) => {
    switch (action.type) {
        case HISTORY_ADD:
            return {
                ...state,
                data: [action.payload, ...state.data],
            };
        case HISTORY_DELETE:
            const newData = state.data.filter(
                (element) => element.id !== action.payload.id
            );
            return {
                ...state,
                data: newData,
            };
        case HISTORY_GET_ALL:
            return state;
        default:
            return state;
    }
};

export default history;

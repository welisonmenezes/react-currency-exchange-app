import {
    EXCHANGES_REQUEST,
    EXCHANGES_SUCCESS,
    EXCHANGES_ERROR,
} from "../constants";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const exchanges = (state = initialState, action) => {
    switch (action.type) {
        case EXCHANGES_REQUEST:
            return {
                ...state,
                data: [...state.data],
                loading: true,
                error: null,
            };
        case EXCHANGES_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
            };
        case EXCHANGES_ERROR:
            return {
                ...state,
                data: [...state.data],
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default exchanges;

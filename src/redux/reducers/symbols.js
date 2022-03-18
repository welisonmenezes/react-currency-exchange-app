import { SYMBOLS_REQUEST, SYMBOLS_SUCCESS, SYMBOLS_ERROR } from "../constants";

const initialState = {
    symbols: {},
    loading: false,
    error: null,
};

const symbols = (state = initialState, action) => {
    switch (action.type) {
        case SYMBOLS_REQUEST:
            return {
                ...state,
                symbols: { ...state.symbols },
                loading: true,
                error: null,
            };
        case SYMBOLS_SUCCESS:
            return {
                ...state,
                symbols: action.payload,
                loading: false,
                error: null,
            };
        case SYMBOLS_ERROR:
            return {
                ...state,
                symbols: { ...state.symbols },
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default symbols;

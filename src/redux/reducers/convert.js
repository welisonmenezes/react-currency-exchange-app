import { CONVERT_REQUEST, CONVERT_SUCCESS, CONVERT_ERROR } from "../constants";

const initialState = {
    data: {},
    loading: false,
    error: null,
};

const convert = (state = initialState, action) => {
    switch (action.type) {
        case CONVERT_REQUEST:
            return {
                ...state,
                data: { ...state.data },
                loading: true,
                error: null,
            };
        case CONVERT_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
            };
        case CONVERT_ERROR:
            return {
                ...state,
                data: { ...state.data },
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default convert;

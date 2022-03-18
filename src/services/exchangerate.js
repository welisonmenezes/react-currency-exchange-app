import api from "./api";

export const getConvertion = async (to, from, amount, date) => {
    return api
        .get(`/convert?to=${to}&from=${from}&amount=${amount}&date=${date}`)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const getHistory = async (start_date, end_date, from, to) => {
    return api
        .get(
            `/timeseries?start_date=${start_date}&end_date=${end_date}&symbols=${to}&base=${from}`
        )
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const getSymbols = async () => {
    return api
        .get(`/symbols`)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

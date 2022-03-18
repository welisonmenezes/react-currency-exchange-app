export const getMinExchangeRate = (exchanges) => {
    return exchanges.reduce(function (a, b) {
        return Math.min(a, b.rate);
    }, Infinity);
};

export const getMaxExchangeRate = (exchanges) => {
    return exchanges.reduce(function (a, b) {
        return Math.max(a, b.rate);
    }, 0);
};

export const getAverageExchangeRate = (exchanges) => {
    const total = exchanges.length;
    const sum = exchanges.reduce(function (a, b) {
        return a + b.rate;
    }, 0);
    return +(sum / total).toFixed(6);
};

export const getStatisticsCollection = (exchanges) => {
    return [
        {
            label: "Lowest",
            value: getMinExchangeRate(exchanges),
        },
        {
            label: "Highest",
            value: getMaxExchangeRate(exchanges),
        },
        {
            label: "Average",
            value: getAverageExchangeRate(exchanges),
        },
    ];
};

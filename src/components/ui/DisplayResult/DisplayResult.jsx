import React, { useCallback } from "react";
import PropTypes from "prop-types";

import {
    checkIfDateIsBeforeToday,
    formatDateForHumans,
} from "../../../services/dateFormatter";

import "./DisplayResult.scss";

function DisplayResult({ convertData }) {
    const calculateInvertedRate = useCallback((rate) => {
        return (1 / rate).toFixed(6);
    }, []);

    return (
        <div className="DisplayResult">
            <div>
                {convertData.amount} {convertData.from} ={" "}
                <b>
                    {convertData.result} {convertData.to}
                </b>
            </div>
            <div>
                1 {convertData.from} = {convertData.rate} {convertData.to}
            </div>
            <div>
                1 {convertData.to} = {calculateInvertedRate(convertData.rate)}{" "}
                {convertData.from}
            </div>
            {(checkIfDateIsBeforeToday(convertData.date) ||
                convertData.fromHistory) && (
                <div className="text-warning">
                    <small>
                        Conversion done on{" "}
                        {formatDateForHumans(convertData.date)}
                        {convertData.time && <span> @ {convertData.time}</span>}
                    </small>
                </div>
            )}
        </div>
    );
}

DisplayResult.propTypes = {
    convertData: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        result: PropTypes.number.isRequired,
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired,
        fromHistory: PropTypes.bool.isRequired,
        date: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
    }),
};

export default DisplayResult;

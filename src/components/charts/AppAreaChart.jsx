import React from "react";
import { Spinner } from "reactstrap";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import PropTypes from "prop-types";

import { getMaxExchangeRate, getMinExchangeRate } from "../../services/utils";
import Error from "../ui/Error/Error";

function AppAreaChart({ data, loading = false, error = null }) {
    return (
        <div style={{ width: "100%", height: 200 }}>
            {loading && <Spinner />}
            {error && <Error message={error} />}
            {!loading && !error && (
                <ResponsiveContainer>
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                        <YAxis
                            dataKey="rate"
                            tick={{ fontSize: 10 }}
                            domain={[
                                getMinExchangeRate(data),
                                getMaxExchangeRate(data),
                            ]}
                        />
                        <Tooltip
                            itemStyle={{
                                fontSize: 12,
                            }}
                        />
                        <Area
                            isAnimationActive={false}
                            type="montone"
                            dataKey="rate"
                            stroke="#009688"
                            fill="#009688"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

AppAreaChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            rate: PropTypes.number.isRequired,
        })
    ),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default AppAreaChart;

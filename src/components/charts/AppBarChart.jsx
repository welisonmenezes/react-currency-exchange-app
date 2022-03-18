import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import PropTypes from "prop-types";

import Error from "../ui/Error/Error";

function AppBarChart({ data, loading = false, error = null }) {
    const [min, setMin] = useState();
    const [max, setMax] = useState();

    useEffect(() => {
        if (data !== undefined && data) {
            setMin(parseFloat(data[0].value - data[0].value / 100));
            setMax(data[1].value);
        }
    }, [data]);

    return (
        <div style={{ width: "100%", height: 200 }}>
            {loading && <Spinner />}
            {error && <Error message={error} />}
            {!loading && !error && (
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                        <YAxis
                            dataKey="value"
                            tick={{ fontSize: 10 }}
                            domain={[min, max]}
                        />
                        <Tooltip
                            itemStyle={{
                                fontSize: 12,
                            }}
                        />
                        <Bar
                            isAnimationActive={false}
                            type="montone"
                            dataKey="value"
                            stroke="#8d8d8d"
                            fill="#8d8d8d"
                        />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

AppBarChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })
    ),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default AppBarChart;

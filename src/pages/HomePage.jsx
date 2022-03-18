import React, { useCallback, useState, useEffect } from "react";
import { Col, Row, Spinner } from "reactstrap";
import { useSelector } from "react-redux";

import DisplayResult from "../components/ui/DisplayResult/DisplayResult";
import Grid from "../components/ui/Grid/Grid";
import Error from "../components/ui/Error/Error";
import ConvertForm from "../components/forms/ConvertForm/ConvertForm";
import FilterForm from "../components/forms/FilterForm/FilterForm";
import AppAreaChart from "../components/charts/AppAreaChart";
import AppBarChart from "../components/charts/AppBarChart";
import { useFilter } from "../contexts/FilterContext";
import { formatDateForHumans } from "../services/dateFormatter";
import { getStatisticsCollection } from "../services/utils";

import "./HomePage.scss";

function HomePage() {
    const convertData = useSelector((state) => state.convert.data);
    const convertLoading = useSelector((state) => state.convert.loading);
    const convertError = useSelector((state) => state.convert.error);
    const exchangesData = useSelector((state) => state.exchanges.data);
    const exchangesLoading = useSelector((state) => state.exchanges.loading);
    const exchangesError = useSelector((state) => state.exchanges.error);
    const [statisticsData, setStatisticsData] = useState();
    const { filterConfig } = useFilter();

    const getFilteredExchangesData = useCallback(() => {
        return exchangesData
            .filter(
                (item, index) =>
                    index < parseInt(filterConfig.daysQuantity.value)
            )
            .map((item) => {
                const newItem = {
                    ...item,
                    date: formatDateForHumans(item.date),
                };
                return newItem;
            });
    }, [filterConfig, exchangesData]);

    useEffect(() => {
        setStatisticsData(getStatisticsCollection(getFilteredExchangesData()));
    }, [getFilteredExchangesData]);

    return (
        <div className="HomePage">
            <h1>I want to convert</h1>

            <ConvertForm />

            {convertLoading && <Spinner />}

            {convertError && <Error message={convertError} />}

            {!convertLoading &&
                !convertError &&
                Object.keys(convertData).length > 0 && (
                    <>
                        <DisplayResult convertData={convertData} />

                        <h2>Exchange History</h2>

                        <FilterForm />

                        <Row>
                            <Col md="7">
                                {filterConfig.viewType === "table" && (
                                    <Grid
                                        header={["Date", "Exchange rate"]}
                                        data={getFilteredExchangesData()}
                                        loading={exchangesLoading}
                                        error={exchangesError}
                                    />
                                )}
                                {filterConfig.viewType === "chart" && (
                                    <AppAreaChart
                                        data={getFilteredExchangesData()}
                                        loading={exchangesLoading}
                                        error={exchangesError}
                                    />
                                )}
                            </Col>
                            <Col md="5">
                                {filterConfig.viewType === "table" && (
                                    <Grid
                                        header={["Statistics", ""]}
                                        data={statisticsData}
                                        loading={exchangesLoading}
                                        error={exchangesError}
                                    />
                                )}
                                {filterConfig.viewType === "chart" && (
                                    <AppBarChart
                                        data={statisticsData}
                                        loading={exchangesLoading}
                                        error={exchangesError}
                                    />
                                )}
                            </Col>
                        </Row>
                    </>
                )}
        </div>
    );
}

export default HomePage;

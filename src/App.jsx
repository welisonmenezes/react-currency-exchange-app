import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

import Header from "./components/ui/Header/Header";
import AppLoading from "./components/ui/AppLoading/AppLoading";
import AppRoutes from "./routes/AppRoutes";
import FilterProvider from "./contexts/FilterContext";
import { symbolsRequest } from "./redux/actions";

import "./App.scss";

function App() {
    const dispatch = useDispatch();
    const loadingSymbols = useSelector((state) => state.symbols.loading);

    useEffect(() => {
        dispatch(symbolsRequest());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <div className="App">
                {loadingSymbols && <AppLoading />}
                {!loadingSymbols && (
                    <>
                        <Header />
                        <Container tag="main">
                            <Row>
                                <FilterProvider tag={Col}>
                                    <AppRoutes />
                                </FilterProvider>
                            </Row>
                        </Container>
                    </>
                )}
            </div>
        </BrowserRouter>
    );
}

export default App;

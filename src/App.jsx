import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

import Header from "./components/ui/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import FilterProvider from "./contexts/FilterContext";
import { symbolsRequest } from "./redux/actions";

import "./App.scss";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(symbolsRequest());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Container tag="main">
                    <Row>
                        <FilterProvider tag={Col}>
                            <AppRoutes />
                        </FilterProvider>
                    </Row>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;

import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HistoryPage, HomePage, NotFoundPage } from "../pages";

const AppRoutes = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/history" element={<HistoryPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;

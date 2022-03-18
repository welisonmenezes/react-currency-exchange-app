import React from "react";
import { Routes, Route } from "react-router-dom";
import { HistoryPage, HomePage, NotFoundPage } from "../pages";

const AppRoutes = () => {
    return (
        <Routes basename={`${process.env.PUBLIC_URL}/`}>
            <Route
                exact
                path={`${process.env.PUBLIC_URL}`}
                element={<HomePage />}
            />
            <Route
                exact
                path={`${process.env.PUBLIC_URL}/history`}
                element={<HistoryPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;

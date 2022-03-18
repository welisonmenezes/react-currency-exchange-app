import React from "react";
import { Routes, Route } from "react-router-dom";
import { HistoryPage, HomePage, NotFoundPage } from "../pages";

const AppRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/history" element={<HistoryPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;

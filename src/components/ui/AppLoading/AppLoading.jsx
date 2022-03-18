import React from "react";
import { Spinner } from "reactstrap";

import "./AppLoading.scss";

function AppLoading() {
    return (
        <div className="AppLoading d-flex justify-content-center align-items-center">
            <Spinner />
        </div>
    );
}

export default AppLoading;

import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import Icon from "../Icon/Icon";

import "./BackHome.scss";

function BackHome({ message }) {
    return (
        <div className="BackHome">
            <p>{message}</p>
            <NavLink to="/">
                <Icon icon="keyboard_backspace" />
                Back To Home
            </NavLink>
        </div>
    );
}

BackHome.propTypes = {
    message: PropTypes.string,
};

export default BackHome;

import React from "react";
import PropTypes from "prop-types";

function Icon({ icon }) {
    return (
        <>
            <i className="material-icons mdc-icon-button__icon">{icon}</i>
        </>
    );
}

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
};

export default Icon;

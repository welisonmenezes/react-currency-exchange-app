import React from "react";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";

function Error({ message }) {
    return <Alert color="danger">{message}</Alert>;
}

Error.propTypes = {
    message: PropTypes.string.isRequired,
};

export default Error;

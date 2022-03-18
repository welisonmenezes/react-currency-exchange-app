import React from "react";
import { Button, Spinner, Table } from "reactstrap";
import PropTypes from "prop-types";

import Error from "../Error/Error";
import Icon from "../Icon/Icon";

import "./Grid.scss";

function Grid({ header, data, loading = false, error = null, actions = [] }) {
    const [viewAction, deleteAction] = actions;

    return (
        <>
            <Table responsive className="Grid" bordered hover>
                {header && (
                    <thead>
                        <tr>
                            {header.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                            {actions.length > 0 && (
                                <th className="col-actions">Actions</th>
                            )}
                        </tr>
                    </thead>
                )}
                {data && (
                    <tbody>
                        {loading && (
                            <tr>
                                <td
                                    colSpan={
                                        actions.length > 0
                                            ? header.length + 1
                                            : header.length
                                    }
                                    className="text-center"
                                >
                                    <Spinner />
                                </td>
                            </tr>
                        )}
                        {error && (
                            <tr>
                                <td
                                    colSpan={
                                        actions.length > 0
                                            ? header.length + 1
                                            : header.length
                                    }
                                    className="text-center"
                                >
                                    <Error message={error} />
                                </td>
                            </tr>
                        )}
                        {!loading &&
                            !error &&
                            data.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {Object.keys(row).map((item, index) => {
                                        if (item.startsWith("_")) return null;
                                        return <td key={index}>{row[item].toString()}</td>;
                                    })}
                                    {actions.length > 0 && (
                                        <td className="col-actions">
                                            <Button
                                                size="sm"
                                                color="primary"
                                                onClick={() => {
                                                    if (viewAction) {
                                                        viewAction(row);
                                                    }
                                                }}
                                            >
                                                <Icon icon="remove_red_eye" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                color="danger"
                                                onClick={() => {
                                                    if (deleteAction) {
                                                        deleteAction(row);
                                                    }
                                                }}
                                            >
                                                <Icon icon="delete_forever" />
                                            </Button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                    </tbody>
                )}
            </Table>
        </>
    );
}

Grid.propTypes = {
    header: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    error: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.func),
};

export default Grid;

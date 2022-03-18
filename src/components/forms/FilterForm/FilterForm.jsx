import React, { useCallback } from "react";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Select from "react-select";

import { useFilter } from "../../../contexts/FilterContext";

import "./FilterForm.scss";

function FilterForm() {
    const { filterConfig, setFilterDaysQuantity, setFilterViewType } =
        useFilter();

    const isChecked = useCallback(
        (value) => {
            return filterConfig.viewType === value;
        },
        [filterConfig.viewType]
    );

    return (
        <Form tag={Row} className="FilterForm">
            <Col md="6">
                <Row>
                    <Col tag={FormGroup} md="12" lg="6">
                        <Label>
                            Duration
                            <Select
                                options={filterConfig.allDaysQuantity}
                                value={filterConfig.daysQuantity}
                                onChange={setFilterDaysQuantity}
                            />
                        </Label>
                    </Col>
                    <Col tag={FormGroup} className="col-radio" lg="3">
                        <Label>
                            <Input
                                type="radio"
                                name="type"
                                value="table"
                                onChange={(event) => {
                                    setFilterViewType(event.target.value);
                                }}
                                defaultChecked={isChecked("table")}
                            />
                            Table
                        </Label>
                    </Col>
                    <Col tag={FormGroup} className="col-radio" lg="3">
                        <Label>
                            <Input
                                type="radio"
                                name="type"
                                value="chart"
                                onChange={(event) => {
                                    setFilterViewType(event.target.value);
                                }}
                                defaultChecked={isChecked("chart")}
                            />
                            Chart
                        </Label>
                    </Col>
                </Row>
            </Col>
        </Form>
    );
}

export default FilterForm;

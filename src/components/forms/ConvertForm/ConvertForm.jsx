import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Spinner,
} from "reactstrap";
import Select from "react-select";

import Icon from "../../ui/Icon/Icon";
import { convertRequest } from "../../../redux/actions";
import {
    getCurrentDate,
    getCurrentTime,
} from "../../../services/dateFormatter";
import { useFilter } from "../../../contexts/FilterContext";
import Error from "../../ui/Error/Error";

import "./ConvertForm.scss";

function ConvertForm() {
    const dispatch = useDispatch();
    const symbolsData = useSelector((state) => state.symbols.symbols);
    const symbolsLoading = useSelector((state) => state.symbols.loading);
    const symbolsError = useSelector((state) => state.symbols.error);
    const [amount, setAmount] = useState("");
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const { resetFilter } = useFilter();

    const canSwap = useCallback(() => {
        return to === null || from === null;
    }, [from, to]);

    const canConvert = useCallback(() => {
        return canSwap() || amount === "";
    }, [amount, canSwap]);

    const handleAmountChange = (event) => {
        let value = event.target.value.toString();
        value = value.replace("e", "");
        setAmount(value);
    };

    const handleSwapCurrencies = useCallback(() => {
        const oldTo = { ...to };
        const oldFrom = { ...from };
        setTo(oldFrom);
        setFrom(oldTo);
    }, [from, to]);

    const handleOnConvert = useCallback(() => {
        dispatch(
            convertRequest({
                to: to.value,
                from: from.value,
                amount: amount,
                date: getCurrentDate(),
                time: getCurrentTime(),
                saveOnHistory: true,
            })
        );
        setAmount("");
        setFrom(null);
        setTo(null);
        resetFilter();
    }, [amount, from, to, dispatch, resetFilter]);

    return (
        <>
            {symbolsLoading && <Spinner />}
            {symbolsError && <Error message={symbolsError} />}
            {!symbolsLoading && symbolsData && !symbolsError && (
                <Form tag={Row} className="ConvertForm">
                    <Col tag={FormGroup}>
                        <Label>
                            Amount
                            <Input
                                type="number"
                                min="0"
                                value={amount}
                                onChange={handleAmountChange}
                            />
                        </Label>
                    </Col>
                    <Col tag={FormGroup}>
                        <Label>
                            From
                            <Select
                                value={from}
                                options={symbolsData}
                                className="select"
                                onChange={setFrom}
                            />
                        </Label>
                    </Col>
                    <Col tag={FormGroup} className="col-converter">
                        <Button
                            color="primary"
                            size="md"
                            className="btn-converter"
                            disabled={canSwap()}
                            onClick={handleSwapCurrencies}
                        >
                            <Icon icon="compare_arrows" />
                        </Button>
                    </Col>
                    <Col tag={FormGroup}>
                        <Label>
                            To
                            <Select
                                value={to}
                                options={symbolsData}
                                className="select"
                                onChange={setTo}
                            />
                        </Label>
                    </Col>
                    <Col tag={FormGroup} className="col-submit">
                        <Button
                            size="md"
                            className="btn-submit"
                            block={true}
                            color="primary"
                            disabled={canConvert()}
                            onClick={handleOnConvert}
                        >
                            Convert
                        </Button>
                    </Col>
                </Form>
            )}
        </>
    );
}

export default ConvertForm;

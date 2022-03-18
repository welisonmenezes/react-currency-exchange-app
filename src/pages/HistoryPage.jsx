import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Grid from "../components/ui/Grid/Grid";
import BackHome from "../components/ui/BackHome/BackHome";
import { formatDateForHumans } from "../services/dateFormatter";
import { historyDelete } from "../redux/actions/history";
import { convertRequest } from "../redux/actions";
import ConfirmModal from "../components/ui/ConfirmModal/ConfirmModal";
import { useFilter } from "../contexts/FilterContext";

function HistoryPage() {
    const dispatch = useDispatch();
    const historyData = useSelector((state) => state.history.data);
    const historyLoading = useSelector((state) => state.history.loading);
    const historyError = useSelector((state) => state.history.error);
    const [tableData, setTableData] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(false);
    const navigate = useNavigate();
    const { resetFilter } = useFilter();

    useEffect(() => {
        const table = historyData.map((item) => {
            return {
                _id: item.id,
                ...item.table,
                date: formatDateForHumans(item.table.date),
            };
        });
        setTableData(table);
    }, [historyData]);

    const getHistoryItemById = useCallback(
        (id) => {
            return historyData.find((item) => {
                return item.id === id;
            });
        },
        [historyData]
    );

    const viewItem = useCallback(
        (row) => {
            const historyItem = getHistoryItemById(row._id);
            if (historyItem) {
                dispatch(
                    convertRequest({
                        to: historyItem.to,
                        from: historyItem.from,
                        amount: historyItem.amount,
                        date: historyItem.date,
                        time: historyItem.time,
                        saveOnHistory: false,
                    })
                );
                resetFilter();
                navigate("/");
            }
        },
        [dispatch, getHistoryItemById, navigate, resetFilter]
    );

    const cancelDeleteItem = useCallback(() => {
        setSelectedRow(null);
        setIsOpen(false);
    }, []);

    const confirmDelete = useCallback(
        (row) => {
            const historyItem = getHistoryItemById(row._id);
            if (historyItem) {
                setSelectedRow(historyItem);
                setIsOpen(true);
            }
        },
        [getHistoryItemById]
    );

    const deleteItem = useCallback(() => {
        dispatch(historyDelete(selectedRow));
        setIsOpen(false);
        setSelectedRow(null);
    }, [dispatch, selectedRow]);

    const renderModal = useCallback(() => {
        return (
            <ConfirmModal cancelAction={cancelDeleteItem} okAction={deleteItem}>
                <Grid
                    header={["Amount", "From", "To", "Date"]}
                    data={[
                        {
                            amount: selectedRow.amount,
                            from: selectedRow.from,
                            to: selectedRow.to,
                            date: selectedRow.date,
                        },
                    ]}
                />
            </ConfirmModal>
        );
    }, [selectedRow, deleteItem, cancelDeleteItem]);

    return (
        <div className="HistoryPage">
            <h1>Conversion history</h1>
            {historyData && historyData.length > 0 && (
                <Grid
                    header={["Date", "Event"]}
                    data={tableData}
                    loading={historyLoading}
                    error={historyError}
                    actions={[
                        (row) => {
                            viewItem(row);
                        },
                        (row) => {
                            confirmDelete(row);
                        },
                    ]}
                />
            )}
            {(!historyData || historyData.length <= 0) && (
                <BackHome message="There is no data to show." />
            )}
            {isOpen && renderModal()}
        </div>
    );
}

export default HistoryPage;

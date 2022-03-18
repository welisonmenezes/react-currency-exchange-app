import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types";

function ConfirmModal({ children, cancelAction, okAction }) {
    return (
        <Modal toggle={cancelAction} isOpen={true}>
            <ModalHeader toggle={cancelAction}>
                Are you sure you want to delete this item?
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={okAction}>
                    Delete
                </Button>
                <Button onClick={cancelAction}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

ConfirmModal.propTypes = {
    children: PropTypes.node.isRequired,
    cancelAction: PropTypes.func.isRequired,
    okAction: PropTypes.func.isRequired,
};

export default ConfirmModal;

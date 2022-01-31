import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const GameModal = ({ toggleModal, showModal }) => {

    const handleClick = e => {
        e.preventDefault();
        if (!showModal) { toggleModal(true) }
        else { toggleModal(false) };
    };

    return (
        <>
            <Button variant="primary" onClick={e => handleClick(e)}>
                Launch static backdrop modal
            </Button>
            <Modal
                show={showModal}
                // onHide={toggleModal(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={e => handleClick(e)}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default GameModal;

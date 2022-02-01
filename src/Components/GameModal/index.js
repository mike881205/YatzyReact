import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const GameModal = ({ toggleModal, showModal, selectedHand, selectHand, noValid }) => {

    const { name, score } = selectedHand;

    const handleClose = e => {
        e.preventDefault();
        toggleModal({ toggle: false, hand: null });
    };

    const handleSelect = e => {
        e.preventDefault();
        toggleModal({ toggle: false, hand: selectedHand });
        selectHand(selectedHand);
    };

    return (
        <>
            <Modal
                show={showModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                {
                    !noValid ?
                        <Modal.Body>
                            Select "{name}" for {score} {score > 1 ? "Points" : "Point"}?
                        </Modal.Body>
                        :
                        <Modal.Body>
                            Remove "{name}"?
                        </Modal.Body>
                }
                <Modal.Footer>
                    <Button variant="secondary" onClick={e => handleClose(e)}>
                        Nope!
                    </Button>
                    <Button variant="primary" onClick={e => handleSelect(e)}>Yep!</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default GameModal;

import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HandRow = ({ id, hand, roundOver, gameOver, roll, showModal, selectHand, toggleModal, selectionMade }) => {

    const { name, score, valid, used, remove, removed } = hand;

    const handleClick = e => {
        e.preventDefault();
        if (!e.currentTarget.className.includes('disabled')) toggleModal({ toggle: true, hand: hand });
    };

    return (
        <Row
            className={
                valid === 'total' ? 'btn-dark disabled' :
                    removed ? "btn-secondary disabled" :
                        used ? "btn-info disabled" :
                            remove ? "btn-danger" :
                                valid ? "btn-success" :
                                    'disabled'
            }
            id={id}
            style={{ 'margin': '1%' }}
            onClick={e => handleClick(e)}
        >
            <Col>
                <p><strong>{name}</strong></p>
            </Col>
            <Col>
                <p><strong>{valid || used ? score : 0}</strong></p>
            </Col>
        </Row>
    );
};

export default HandRow;

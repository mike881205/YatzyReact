import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HandRow = ({ classType, id, hand, name, score, toggleModal }) => {

    const handleClick = e => {
        e.preventDefault();
        if (!e.currentTarget.className.includes('disabled')) toggleModal({ toggle: true, hand: hand });
    };

    return (
        <Row
            className={classType}
            id={id}
            style={{ 'margin': '1%' }}
            onClick={e => handleClick(e)}
        >
            <Col>
                <p><strong>{name}</strong></p>
            </Col>
            <Col>
                <p><strong>{score}</strong></p>
            </Col>
        </Row>
    );
};

export default HandRow;

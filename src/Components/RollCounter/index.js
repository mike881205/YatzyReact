import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RollCounter = ({ roll }) => {
    return (
        <Row className="rollCounter" style={{'margin': '1%'}}>
            <Col>
            <h5>{`Roll: ${roll}`}</h5>
            </Col>
        </Row>
    )
};

export default RollCounter;

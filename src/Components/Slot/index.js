import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Image from '../Image';

const Slot = ({ roll, image, held, holdSlot, id, roundOver, number }) => {

    const handleClick = e => {
        e.preventDefault();
        holdSlot(e);
    };

    return (
        <Col className="slot" style={{ 'margin': '1%' }}>
            {/* <Row style={{ 'margin': '1%' }}>
                <Col>
                <h1>{number}</h1>
                </Col>
            </Row> */}
            <Image image={image} roll={roll} />
            <Row style={{ 'margin': '5%' }}>
                <Col>
                    <Button
                        id={id}
                        variant={!held ? "outline-warning" : "danger"}
                        onClick={e => handleClick(e)}
                        disabled={roll === 0 || roundOver ? true : ''}
                    >
                        {!held ? "Hold" : "Held"}
                    </Button>{' '}
                </Col>
            </Row>
        </Col>
    );
};

export default Slot;

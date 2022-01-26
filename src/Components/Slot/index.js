import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Image from '../Image';

const Slot = ({ roll, image, held, click, id, roundOver }) => {
    return (
        <Col className="slot" style={{ 'margin': '1%' }}>
            <Image image={image} roll={roll} />
            <Row style={{ 'margin': '1%' }}>
                <Col>
                    <Button
                        id={id}
                        variant={!held ? "outline-warning" : "danger"}
                        onClick={e => click(e)}
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
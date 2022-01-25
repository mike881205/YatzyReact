import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

const Slot = ({ number, image, held, click }) => {
    return (
        <Col className="slot">
            <Row>
                <Col>
                    {image}
                </Col>
            </Row>
            <Row>
                <Col>
                    {number}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        variant={!held ? "outline-warning" : "success"}
                        onClick={e => click(e)}
                    >
                        {!held ? "Hold" : "Held"}
                    </Button>{' '}
                </Col>
            </Row>
        </Col>
    )
};

export default Slot;

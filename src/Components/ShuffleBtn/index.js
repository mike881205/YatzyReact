import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

const ShuffleBtn = ({ click, roundOver }) => {
    return (
        <Row className="shuffleBtn" style={{'margin': '1%'}}>
            <Col>
                <Button
                    variant={"primary"}
                    onClick={e => click(e)}
                    disabled={!roundOver ? '' : true}
                >
                    Shuffle
                </Button>{' '}
            </Col>
        </Row>
    )
};

export default ShuffleBtn;

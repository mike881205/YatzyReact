import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

const ShuffleBtn = ({ shuffle, roundOver }) => {
    
    const handleClick = e => {
        e.preventDefault();
        shuffle();
    };

    return (
        <Row className="shuffleBtn" style={{'margin': '1%'}}>
            <Col>
                <Button
                    variant={"primary"}
                    onClick={e => handleClick(e)}
                    disabled={!roundOver ? '' : true}
                >
                    Shuffle
                </Button>{' '}
            </Col>
        </Row>
    )
};

export default ShuffleBtn;

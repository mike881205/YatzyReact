import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Image = ({ image, roll }) => {
    const { dice, letter } = image;
    return (
        <Row style={{ 'margin': '1%' }}>
            <Col>
                {
                    roll === 0 ?
                        <img src={letter} alt={letter}></img>
                        :
                        <img src={dice} alt={dice}></img>
                }
            </Col>
        </Row>
    )
};

export default Image;

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
                        <h1>{letter}</h1>
                        :
                        <img 
                        style={{
                            'height': '100%', 
                            'width': '100%',
                            'borderRadius': '15%',
                            'boxShadow': '2px 2px 4px #000000'
                        }} 
                        src={dice} 
                        alt={dice}
                        >

                        </img>
                }
            </Col>
        </Row>
    )
};

export default Image;

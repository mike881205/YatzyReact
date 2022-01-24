import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const SlotContainer = ({slots}) => {
    return (
        <Container>
            <Row>
                {
                    slots.map(slot => {
                        return slot
                    })
                }
            </Row>
        </Container>
    )
};

export default SlotContainer;

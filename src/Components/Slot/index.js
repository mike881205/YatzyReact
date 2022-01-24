import React from 'react';
import Col from 'react-bootstrap/Col';

const Slot = ({num}) => {
    return (
        <Col>
            <div className="slot">
                {`Slot ${num}`}
            </div>
        </Col>
    )
};

export default Slot;

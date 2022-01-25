import React from 'react';
import Row from 'react-bootstrap/Row';
import Slot from '../Slot';

const imgArr = [
    {
        dice: "img1",
        letter: "Y"
    },
    {
        dice: "img2",
        letter: "A"
    },
    {
        dice: "img3",
        letter: "T"
    },
    {
        dice: "img4",
        letter: "Z"
    },
    {
        dice: "img5",
        letter: "Y"
    },
    {
        dice: "img6",
        letter: "!"
    },
]

const Slots = ({ roll, slots, roundOver, holdSlot }) => {

    return (
        <Row className="slots" style={{ 'margin': '1%' }}>
            {
                slots.map((slot, i) => {
                    const slotChild =
                        <Slot
                            key={i}
                            id={i}
                            image={roll === 0 ? imgArr[i]: imgArr[slot.number - 1]}
                            held={slot.held}
                            roundOver={roundOver}
                            roll={roll}
                            click={holdSlot}
                        />;
                    return slotChild;
                })
            }
        </Row>
    );
};

export default Slots;

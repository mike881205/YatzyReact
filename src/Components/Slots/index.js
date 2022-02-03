import React from 'react';
import Row from 'react-bootstrap/Row';
import Slot from '../Slot';

const importAll = r => { return r.keys().map(r);};

const images = importAll(require.context('../../images', false, /\.(png|jpe?g|svg)$/));

const imgArr = [
    {
        dice: images[0],
        letter: "Y"
    },
    {
        dice: images[1],
        letter: "A"
    },
    {
        dice: images[2],
        letter: "T"
    },
    {
        dice: images[3],
        letter: "Z"
    },
    {
        dice: images[4],
        letter: "Y"
    },
    {
        dice: images[5],
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
                            number={slot.number}
                            image={roll === 0 ? imgArr[i] : imgArr[slot.number - 1]}
                            held={slot.held}
                            roundOver={roundOver}
                            roll={roll}
                            holdSlot={holdSlot}
                        />;
                    return slotChild;
                })
            }
        </Row>
    );
};

export default Slots;

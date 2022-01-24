import React from 'react';
import SlotContainer from '../SlotContainer';

const Stage = ({slots}) => {
    return (
        <div className="stage">
            <SlotContainer slots={slots}/>
        </div>
    )
};

export default Stage;

import React from 'react';
import Container from 'react-bootstrap/Container';
import RollCounter from '../RollCounter';
import RoundBtn from '../RoundBtn';
import ShuffleBtn from '../ShuffleBtn';
import Slots from '../Slots';

const Stage = ({ state, shuffle, holdSlot, startGame, startRound, endRound }) => {
    const { slots, roll, roundOver, gameOver } = state;
    return (
        <Container className="stage">
            <Slots slots={slots} roll={roll} roundOver={roundOver} holdSlot={holdSlot} />
            <RollCounter roll={roll} />
            <ShuffleBtn click={shuffle} roundOver={roundOver} />
            <RoundBtn
                startGame={startGame}
                startRound={startRound}
                endRound={endRound}
                roll={roll}
                roundOver={roundOver}
                gameOver={gameOver}
            />
        </Container>
    );
};

export default Stage;

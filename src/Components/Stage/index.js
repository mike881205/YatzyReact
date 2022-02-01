import React from 'react';
import Container from 'react-bootstrap/Container';
import ScoreBoard from '../ScoreBoard';
import Game from '../Game';

const Stage = ({ state, shuffle, holdSlot, startGame, startRound, endRound, selectHand, toggleModal }) => {
    const { roll, roundOver, gameOver, scoreBoard, showModal } = state;
    return (
        <Container className="stage">
            <Game
                state={state}
                shuffle={shuffle}
                holdSlot={holdSlot}
                startGame={startGame}
                startRound={startRound}
                endRound={endRound}
            />
            <ScoreBoard
                roll={roll}
                scoreBoard={scoreBoard}
                roundOver={roundOver}
                gameOver={gameOver}
                showModal={showModal}
                selectHand={selectHand}
                toggleModal={toggleModal}
            />
        </Container >
    );
};

export default Stage;

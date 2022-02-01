import React from 'react';
import Container from 'react-bootstrap/Container';
import RollCounter from '../RollCounter';
import RoundBtn from '../RoundBtn';
import ShuffleBtn from '../ShuffleBtn';
import Slots from '../Slots';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ScoreBoard from '../ScoreBoard';

const Stage = ({ state, shuffle, holdSlot, startGame, startRound, endRound, selectHand, toggleModal }) => {
    const { slots, roll, roundOver, gameOver, scoreBoard, selectionMade, showModal } = state;
    return (
        <Container className="stage">
            <Row style={{ 'margin': '1%' }}>
                <Col>
                    <Slots
                        slots={slots}
                        roll={roll}
                        roundOver={roundOver}
                        holdSlot={holdSlot}
                    />
                    <RollCounter roll={roll} />

                    {
                        !roundOver && !gameOver ?
                            < Row style={{ 'margin': '1%' }}>
                                <Col>
                                    <ShuffleBtn shuffle={shuffle} roundOver={roundOver} />
                                </Col>
                                <Col>
                                    <RoundBtn
                                        startGame={startGame}
                                        startRound={startRound}
                                        endRound={endRound}
                                        roll={roll}
                                        roundOver={roundOver}
                                        gameOver={gameOver}
                                        selectionMade={selectionMade}
                                    />
                                </Col>
                            </Row>
                            :
                            <RoundBtn
                                startGame={startGame}
                                startRound={startRound}
                                endRound={endRound}
                                roll={roll}
                                roundOver={roundOver}
                                gameOver={gameOver}
                                selectionMade={selectionMade}
                            />
                    }
                </Col>
            </Row >
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

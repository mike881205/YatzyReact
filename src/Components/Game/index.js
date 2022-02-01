import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RollCounter from '../RollCounter';
import RoundBtn from '../RoundBtn';
import ShuffleBtn from '../ShuffleBtn';
import Slots from '../Slots';

const Game = ({ state, shuffle, holdSlot, startGame, startRound, endRound }) => {

    const { slots, roll, roundOver, gameOver, selectionMade } = state;

    return (
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
    )
};

export default Game;

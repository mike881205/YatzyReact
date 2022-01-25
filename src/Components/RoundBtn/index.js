import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

const RoundBtn = ({roll, startGame, startRound, endRound, roundOver, gameOver }) => {
    return (
        <Row className="roundBtn" style={{ 'margin': '1%' }}>
            <Col>
                <Button
                    variant={gameOver ? "success" : !roundOver ? "danger" : "warning"}
                    onClick={gameOver ? e => startGame(e) : !roundOver ? e => endRound(e) : e => startRound(e)}
                    disabled={!roundOver && roll === 0 ? true : ''}
                >
                    {gameOver ? "New Game" : !roundOver ? "End Round" : "Next Round"}
                </Button>{' '}
            </Col>
        </Row>
    )
};

export default RoundBtn;

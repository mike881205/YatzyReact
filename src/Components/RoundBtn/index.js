import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

const RoundBtn = ({ roll, startGame, startRound, endRound, roundOver, gameOver, selectionMade }) => {

    const handleClick = e => {
        e.preventDefault();
        gameOver ? startGame() : roundOver ? startRound() : endRound()
    };

    return (
        <Row className="roundBtn" style={{ 'margin': '1%' }}>
            <Col>
                <Button
                    variant={gameOver ? "success" : !roundOver ? "danger" : "warning"}
                    onClick={e => handleClick(e)}
                    disabled={(!roundOver && roll === 0) || (!gameOver && roundOver && !selectionMade) ? true : ''}
                >
                    {gameOver ? "New Game" : !roundOver ? "End Round" : "Next Round"}
                </Button>{' '}
            </Col>
        </Row>
    )
};

export default RoundBtn;

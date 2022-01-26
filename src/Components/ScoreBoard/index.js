import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HandRow from '../HandRow';

const ScoreBoard = ({ scoreBoard, roll, roundOver, gameOver, selectHand }) => {
    const topHands = [...scoreBoard[0].hands]
    const bottomHands = [...scoreBoard[1].hands]
    return (
        <Row style={{ 'margin': '1%' }}>
            <Col style={{ 'margin': '1%' }}>
                {
                    topHands.map((hand, i) => {
                        const rowChild = 
                        <HandRow 
                            key={`top ${i+1}`}
                            id={hand.name}
                            hand={hand}
                            roll={roll}
                            roundOver={roundOver}
                            gameOver={gameOver}
                            selectHand={selectHand}
                        />;
                        return rowChild;
                    })
                }
            </Col>
            <Col style={{ 'margin': '1%' }}>
            {
                    bottomHands.map((hand, i) => {
                        const rowChild = 
                        <HandRow 
                            key={`bottom ${i+1}`}
                            id={hand.name}
                            hand={hand}
                            roll={roll}
                            roundOver={roundOver}
                            gameOver={gameOver}
                            selectHand={selectHand}
                        />;
                        return rowChild;
                    })
                }
            </Col>
        </Row>
    );
};

export default ScoreBoard;

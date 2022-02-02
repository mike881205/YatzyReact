import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HandRow from '../HandRow';

const ScoreBoard = ({ scoreBoard, roll, roundOver, gameOver, showModal, toggleModal, selectionMade, selectHand }) => {

    const topHands = [...scoreBoard[0].hands];
    const bottomHands = [...scoreBoard[1].hands];
    const topScore = scoreBoard[0].handsTotal;
    const bottomScore = scoreBoard[1].handsTotal;

    return (
        <>
            <Row style={{ 'margin': '1%' }}>
                <Col style={{ 'margin': '1%' }}>
                    {
                        topHands.map((hand, i) => {
                            const rowChild =
                                <HandRow
                                    key={`top ${i + 1}`}
                                    id={hand.name}
                                    hand={hand}
                                    roll={roll}
                                    roundOver={roundOver}
                                    gameOver={gameOver}
                                    toggleModal={toggleModal}
                                    showModal={showModal}
                                    selectionMade={selectionMade}
                                />;
                            return rowChild;
                        })
                    }
                    <HandRow
                        key={'top total'}
                        id={'top total'}
                        hand={{ name: 'Top Total', score: topScore, valid: 'total' }}
                    />
                </Col>
                <Col style={{ 'margin': '1%' }}>
                    {
                        bottomHands.map((hand, i) => {
                            const rowChild =
                                <HandRow
                                    key={`bottom ${i + 1}`}
                                    id={hand.name}
                                    hand={hand}
                                    roll={roll}
                                    roundOver={roundOver}
                                    gameOver={gameOver}
                                    toggleModal={toggleModal}
                                    showModal={showModal}
                                    selectionMade={selectionMade}
                                />;
                            return rowChild;
                        })
                    }
                    <HandRow
                        key={'bottom total'}
                        id={'bottom total'}
                        hand={{ name: 'Bottom Total', score: bottomScore, valid: 'total' }}
                    />
                </Col>
            </Row>
            <HandRow
                key={'grand total'}
                id={'grand total'}
                hand={{ name: 'Grand Total', score: topScore + bottomScore, valid: 'total' }}
            />
        </>
    );
};

export default ScoreBoard;

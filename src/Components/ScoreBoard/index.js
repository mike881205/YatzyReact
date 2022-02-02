import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HandRow from '../HandRow';

const ScoreBoard = ({ scoreBoard, roll, roundOver, gameOver, showModal, toggleModal, selectionMade, selectHand }) => {

    const topHands = [...scoreBoard[0].hands];
    const bottomHands = [...scoreBoard[1].hands];
    const topTotal = scoreBoard[0].handsTotal
    const bottomTotal = scoreBoard[1].handsTotal
    const topBonus = scoreBoard[0].bonus(topTotal);
    const yatzyBonus = scoreBoard[1].yatzyBonus.total(scoreBoard[1].yatzyBonus.count, scoreBoard[1].yatzyBonus.score);
    const topScore = scoreBoard[0].total(topTotal, topBonus);
    const bottomScore = scoreBoard[1].total(bottomTotal, yatzyBonus);
    const grandTotal = topScore + bottomScore;

    console.log(yatzyBonus)

    return (
        <>
            <Row style={{ 'margin': '1%' }}>
                <Col style={{ 'margin': '1%' }}>
                    {
                        topHands.map((hand, i) => {
                            const { name, valid, used, score, remove, removed } = hand
                            const rowChild =
                                <HandRow
                                    key={`top ${i + 1}`}
                                    id={name}
                                    classType={
                                        removed ? "btn-secondary disabled" :
                                            used ? "btn-info disabled" :
                                                remove ? "btn-danger" :
                                                    valid ? "btn-success" :
                                                        'disabled'
                                    }
                                    hand={hand}
                                    name={name}
                                    score={valid || used ? score : 0}
                                    toggleModal={toggleModal}
                                />;
                            return rowChild;
                        })
                    }
                    <HandRow
                        key={"top bonus"}
                        id={"top bonus"}
                        classType={topBonus > 0 ? "btn-info disabled" : "btn-dark disabled"}
                        name={"Top Bonus"}
                        score={topBonus}
                    />
                    <HandRow
                        key={"top total"}
                        id={"top total"}
                        classType={"btn-dark disabled"}
                        name={"Top Total"}
                        score={topScore}
                    />
                </Col>
                <Col style={{ 'margin': '1%' }}>
                    {
                        bottomHands.map((hand, i) => {
                            const { name, valid, used, score, remove, removed } = hand
                            const rowChild =
                                <HandRow
                                    key={`bottom ${i + 1}`}
                                    id={name}
                                    classType={
                                        removed ? "btn-secondary disabled" :
                                            used ? "btn-info disabled" :
                                                remove ? "btn-danger" :
                                                    valid ? "btn-success" :
                                                        'disabled'
                                    }
                                    hand={hand}
                                    name={name}
                                    score={valid || used ? score : 0}
                                    toggleModal={toggleModal}
                                />;
                            return rowChild;
                        })
                    }
                    <HandRow
                        key={"yatzy bonus"}
                        id={"yatzy bonus"}
                        classType={scoreBoard[1].yatzyBonus.removed ? "btn-secondary disabled" : scoreBoard[1].yatzyBonus.valid ? "btn-success" : yatzyBonus > 0 ? "btn-info disabled" : "disabled"}
                        toggleModal={toggleModal}
                        hand={{name: "Yatzy Bonus", score: scoreBoard[1].yatzyBonus.score, valid: scoreBoard[1].yatzyBonus.valid, removed: scoreBoard[1].yatzyBonus.removed}}
                        name={`Yatzy Bonus x${scoreBoard[1].yatzyBonus.count}`}
                        score={scoreBoard[1].yatzyBonus.valid ? 100 : yatzyBonus}
                    />
                    <HandRow
                        key={"bottom total"}
                        id={"bottom total"}
                        classType={"btn-dark disabled"}
                        name={"Bottom Total"}
                        score={bottomScore}
                    />
                </Col>
            </Row>
            <HandRow
                key={"grand total"}
                id={"grand total"}
                classType={"btn-dark disabled"}
                name={"Grand Total"}
                score={grandTotal}
            />
        </>
    );
};

export default ScoreBoard;

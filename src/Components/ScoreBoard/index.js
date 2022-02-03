import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HandRow from '../HandRow';

const ScoreBoard = ({ scoreBoard, roundOver, toggleModal, selectionMade, noValid }) => {

    const topTotal = scoreBoard[0].handsTotal
    const bottomTotal = scoreBoard[1].handsTotal
    const topBonus = scoreBoard[0].bonus(topTotal);
    const yatzyBonus = scoreBoard[1].yatzyBonus.total(scoreBoard[1].yatzyBonus.count, scoreBoard[1].yatzyBonus.score);
    const topScore = scoreBoard[0].total(topTotal, topBonus);
    const bottomScore = scoreBoard[1].total(bottomTotal, yatzyBonus);
    const grandTotal = topScore + bottomScore;

    const setClass = hand => {
        const { valid, used, remove, removed } = hand;
        let classType;

        switch (true) {
            case roundOver && !selectionMade && remove:
                classType = "btn-danger";
                break;
            case roundOver && !selectionMade && valid:
                classType = "btn-success";
                break;
            case (!roundOver || selectionMade) && removed:
                classType = "btn-secondary disabled";
                break;
            case (!roundOver || selectionMade) && used:
                classType = "btn-info disabled";
                break;
            default:
                classType = "disabled";
                break;
        };

        return classType;
    };

    const createHandArray = arr => {
        const handsArr = arr.map((hand, i) => {
            const { name, valid, used, score } = hand;
            const rowChild =
                <HandRow
                    key={`top ${i + 1}`}
                    id={name}
                    classType={setClass(hand)}
                    hand={hand}
                    name={name}
                    score={valid || used ? score : 0}
                    toggleModal={toggleModal}
                />;
            return rowChild;
        });
        return handsArr;
    };

    const topHands = createHandArray(scoreBoard[0].hands);
    const bottomHands = createHandArray(scoreBoard[1].hands);

    return (
        <>
            {
                roundOver && !selectionMade ?
                    <Row style={{ 'margin': '1%' }}>
                        <Col style={{ 'margin': '1%' }}>
                            <h5>{!noValid ? "Select a Hand" : "Select a Hand to Remove"}</h5>
                        </Col>
                    </Row>
                    :
                    ''
            }
            <Row style={{ 'margin': '1%' }}>
                <Col style={{ 'margin': '1%' }}>
                    {/* ==== Top Hands ==== */}
                    {topHands}
                    {/* ==== Top Hands ==== */}
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
                    {/* ==== Bottom Hands ==== */}
                    {bottomHands}
                    {/* ==== Bottom Hands ==== */}
                    <HandRow
                        key={"yatzy bonus"}
                        id={"yatzy bonus"}
                        classType={scoreBoard[1].yatzyBonus.valid ? "btn-success" : !roundOver || selectionMade ? "btn-secondary disabled" : "disabled"}
                        toggleModal={toggleModal}
                        hand={{ name: "Yatzy Bonus", score: scoreBoard[1].yatzyBonus.score, valid: scoreBoard[1].yatzyBonus.valid, removed: scoreBoard[1].yatzyBonus.removed }}
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

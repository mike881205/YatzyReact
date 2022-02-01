import React, { Component } from "react";
import Stage from "./Components/Stage";
import 'bootstrap/dist/css/bootstrap.min.css';
import GameModal from "./Components/GameModal";
import Button from 'react-bootstrap/Button';


const blankScoreBoard = [
  {
    section: 'top',
    hands: [
      {
        name: 'Aces',
        valid: false,
        remove: false,
        used: false,
        removed: false,
        value: 1,
        score: 0
      },
      {
        name: 'Twos',
        valid: false,
        remove: false,
        used: false,
        removed: false,
        value: 2,
        score: 0
      },
      {
        name: 'Threes',
        valid: false,
        remove: false,
        used: false,
        removed: false,
        value: 3,
        score: 0
      },
      {
        name: 'Fours',
        valid: false,
        remove: false,
        used: false,
        removed: false,
        value: 4,
        score: 0
      },
      {
        name: 'Fives',
        valid: false,
        remove: false,
        used: false,
        removed: false,
        value: 5,
        score: 0
      },
      {
        name: 'Sixes',
        valid: false,
        remove: false,
        used: false,
        removed: false,
        value: 6,
        score: 0
      }
    ],
    handsTotal: 0,
    bonus: () => { return this.handsTotal < 63 ? 0 : 35 },
    total: () => { return this.handsTotal + this.bonus() }
  },
  {
    section: 'bottom',
    hands: [
      {
        name: '3 Of A Kind',
        valid: false,
        remove: false,
        used: false,
        removed: false,
        score: 0
      },
      {
        name: '4 Of A Kind',
        valid: false,
        remove: false,
        used: false,
        removed: false,
        score: 0
      },
      {
        name: 'Full House',
        valid: false,
        remove: false,
        used: false,
        removed: false,
        score: 25
      },
      {
        name: 'Small Straight',
        valid: false,
        remove: false,
        used: false,
        removed: false,
        score: 30
      },
      {
        name: 'Large Straight',
        valid: false,
        remove: false,
        used: false,
        removed: false,
        score: 40
      },
      {
        name: 'Yatzy',
        valid: false,
        remove: false,
        used: false,
        removed: false,
        score: 50
      },
      {
        name: 'Chance',
        valid: false,
        remove: false,
        used: false,
        removed: false,
        score: 0
      },
      {
        name: 'Yatzy Bonus',
        valid: false,
        remove: false,
        total: 0,
        score: 100
      }
    ],
    handsTotal: 0
  },
  {
    grandTotal: 0
  }
]

const letters = Array.from('YATZY');

// const blankSlotArr = letters.map((letter) => { return { number: letter, held: false } });

const totalValues = handArr => {
  return handArr.reduce((a, b) => a + b);
};

const getRandNum = () => {
  const min = Math.ceil(1);
  const max = Math.floor(6);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const removeDuplicates = arr => {
  let seen;
  const uniqueArr = arr.filter(val => {
    return seen === val ? '' : seen = val;
  });
  return uniqueArr;
};

const checkTopHands = (objArray, scoreBoard) => {

  let validHand = false;
  let obj = {};

  objArray.forEach(obj => {
    scoreBoard[0].hands.forEach(hand => {
      if (obj.value === hand.value && !hand.used && !hand.removed) {
        validHand = true;
        hand.valid = true;
        hand.score = hand.value * obj.count;
      };
    });
  });

  obj.validHand = validHand;
  obj.scoreBoard = scoreBoard;

  return obj;
};

const checkStraights = (unqObjArray, scoreBoard) => {

  let count = 1;
  let validHand = false;
  let obj = {};

  for (let i = 1; i < unqObjArray.length; i++) {
    if (unqObjArray[i] - unqObjArray[i - 1] === 1) { count++ }
    else {
      if (count < 4) { count = 1 };
    }
  };

  if (count >= 4) {
    switch (count) {
      case 4:
        if (!scoreBoard[1].hands[3].used && !scoreBoard[1].hands[3].removed) {
          validHand = true
          scoreBoard[1].hands[3].valid = true
        };
        break;
      default:
        if (!scoreBoard[1].hands[3].used && !scoreBoard[1].hands[3].removed) {
          validHand = true
          scoreBoard[1].hands[3].valid = true
        };
        if (!scoreBoard[1].hands[4].used && !scoreBoard[1].hands[4].removed) {
          validHand = true
          scoreBoard[1].hands[4].valid = true
        };
        break;
    };
  };

  obj.validHand = validHand;
  obj.scoreBoard = scoreBoard;

  return obj;
};

const checkKinds = (sortedArr, objArray, scoreBoard) => {

  let FHdouble = false;
  let FHtriple = false;
  let validHand = false;
  let obj = {};

  objArray.forEach(obj => {
    if (obj.count >= 2) {
      switch (obj.count) {
        case 2:
          FHdouble = true
          break;
        case 3:
          FHtriple = true
          if (!scoreBoard[1].hands[0].used && !scoreBoard[1].hands[0].removed) {
            validHand = true
            scoreBoard[1].hands[0].valid = true;
            scoreBoard[1].hands[0].score = totalValues(sortedArr);
          };
          break;
        case 4:
          if (!scoreBoard[1].hands[0].used && !scoreBoard[1].hands[0].removed) {
            validHand = true
            scoreBoard[1].hands[0].valid = true;
            scoreBoard[1].hands[0].score = totalValues(sortedArr);
          };
          if (!scoreBoard[1].hands[1].used && !scoreBoard[1].hands[1].removed) {
            validHand = true
            scoreBoard[1].hands[1].valid = true;
            scoreBoard[1].hands[1].score = totalValues(sortedArr);
          };
          break;
        default:
          if (!scoreBoard[1].hands[0].used && !scoreBoard[1].hands[0].removed) {
            validHand = true
            scoreBoard[1].hands[0].valid = true;
            scoreBoard[1].hands[0].score = totalValues(sortedArr);
          };
          if (!scoreBoard[1].hands[1].used && !scoreBoard[1].hands[1].removed) {
            validHand = true
            scoreBoard[1].hands[1].valid = true;
            scoreBoard[1].hands[1].score = totalValues(sortedArr);
          };
          if (!scoreBoard[1].hands[5].used && !scoreBoard[1].hands[5].removed) {
            validHand = true
            scoreBoard[1].hands[5].valid = true;
          }
          else if (!scoreBoard[1].hands[5].removed) {
            validHand = true
            scoreBoard[1].hands[7].valid = true;
          };
          break;
      };
    };
  });

  // Check Full House
  if (FHdouble && FHtriple && !scoreBoard[1].hands[2].used) {
    validHand = true
    scoreBoard[1].hands[2].valid = true
  };

  obj.validHand = validHand;
  obj.scoreBoard = scoreBoard;

  return obj;
};

const findHands = (sortedArr, scoreBoard) => {

  const uniqueVals = removeDuplicates(sortedArr);

  let validHands = false;
  let obj = {};

  const unqObjArray = uniqueVals.map(unqVal => {
    let unqObj = { value: unqVal, count: 0 };
    sortedArr.forEach(srtdVal => {
      if (unqVal === srtdVal) unqObj.count++;
    });
    return unqObj;
  });

  const topHandObj = checkTopHands(unqObjArray, scoreBoard);
  const straightObj = checkStraights(uniqueVals, topHandObj.scoreBoard);
  let kindObj = checkKinds(sortedArr, unqObjArray, straightObj.scoreBoard);

  if (topHandObj.validHand || straightObj.validHand || kindObj.validHand) validHands = true;

  // Check chance && update scoreboard
  if (!scoreBoard[1].hands[6].used) {
    validHands = true;
    scoreBoard[1].hands[6].valid = true;
    scoreBoard[1].hands[6].score = totalValues(sortedArr);
  };

  if (!validHands) {
    kindObj.scoreBoard[0].hands.forEach(hand => {
      if (!hand.used) hand.remove = true;
    });
    kindObj.scoreBoard[0].hands.forEach(hand => {
      if (!hand.used) hand.remove = true;
    });
  };

  obj.scoreBoard = kindObj.scoreBoard;
  obj.validHands = validHands;

  return obj;
};








class App extends Component {

  state = {
    scoreBoard: null,
    slots: null,
    roll: 0,
    selectionMade: false,
    selectedHand: { toggle: false, hand: null },
    roundOver: true,
    gameOver: true,
    showModal: false,
    noValid: false,
    loaded: false
  };

  componentDidMount() {
    this.resetGame();
  };

  toggleModal = obj => {
    const { toggle, hand } = obj
    this.setState({
      showModal: toggle,
      selectedHand: hand
    });
  };

  resetGame = () => {
    this.setState({
      scoreBoard: [
        {
          section: 'top',
          hands: [
            {
              name: 'Aces',
              valid: false,
              remove: false,
              used: false,
              removed: false,
              value: 1,
              score: 0
            },
            {
              name: 'Twos',
              valid: false,
              remove: false,
              used: false,
              removed: false,
              value: 2,
              score: 0
            },
            {
              name: 'Threes',
              valid: false,
              remove: false,
              used: false,
              removed: false,
              value: 3,
              score: 0
            },
            {
              name: 'Fours',
              valid: false,
              remove: false,
              used: false,
              removed: false,
              value: 4,
              score: 0
            },
            {
              name: 'Fives',
              valid: false,
              remove: false,
              used: false,
              removed: false,
              value: 5,
              score: 0
            },
            {
              name: 'Sixes',
              valid: false,
              remove: false,
              used: false,
              removed: false,
              value: 6,
              score: 0
            }
          ],
          handsTotal: 0,
          bonus: () => { return this.handsTotal < 63 ? 0 : 35 },
          total: () => { return this.handsTotal + this.bonus() }
        },
        {
          section: 'bottom',
          hands: [
            {
              name: '3 Of A Kind',
              valid: false,
              remove: false,
              used: false,
              removed: false,
              score: 0
            },
            {
              name: '4 Of A Kind',
              valid: false,
              remove: false,
              used: false,
              removed: false,
              score: 0
            },
            {
              name: 'Full House',
              valid: false,
              remove: false,
              used: false,
              removed: false,
              score: 25
            },
            {
              name: 'Small Straight',
              valid: false,
              remove: false,
              used: false,
              removed: false,
              score: 30
            },
            {
              name: 'Large Straight',
              valid: false,
              remove: false,
              used: false,
              removed: false,
              score: 40
            },
            {
              name: 'Yatzy',
              valid: false,
              remove: false,
              used: false,
              removed: false,
              score: 50
            },
            {
              name: 'Chance',
              valid: false,
              remove: false,
              used: false,
              removed: false,
              score: 0
            },
            {
              name: 'Yatzy Bonus',
              valid: false,
              remove: false,
              total: 0,
              score: 100
            }
          ],
          handsTotal: 0
        },
        {
          grandTotal: 0
        }
      ],
      slots: letters.map((letter) => { return { number: letter, held: false } }),
      roundOver: true,
      gameOver: true,
      roll: 0,
      selectionMade: false,
      selectedHand: { toggle: false, hand: null },
      showModal: false,
      noValid: false,
      loaded: true
    });
  };

  startGame = () => {
    this.setState({ gameOver: false });
    this.startRound();
  };

  startRound = () => {
    this.setState({
      slots: letters.map((letter) => {return {number: letter, held: false}}),
      roll: 0,
      roundOver: false,
      selectionMade: false,
      selectedHand: { toggle: false, hand: null },
      noValid: false
    });
  };

  selectHand = hand => {
    const { name, score, valid, used, remove, removed } = hand;
    let scoreBoard = [...this.state.scoreBoard]
    let match = false

    scoreBoard[0].hands.forEach(topHand => {
      if (topHand.name === name) {
        match = true;
        if (!this.state.noValid) {
          topHand.used = true;
          console.log(`Valid: ${topHand.name}`)
        }
        else {
          topHand.removed = true;
          console.log(`removed: ${topHand.name}`)
        }
      };

      !this.state.noValid ? topHand.valid = false : topHand.remove = false
    });

    if (!match) {
      scoreBoard[1].hands.forEach(btmHand => {
        if (btmHand.name === name) {
          // match = true;
          if (!this.state.noValid) {
            btmHand.used = true;
            console.log(`Valid: ${btmHand.name}`)
          }
          else {
            btmHand.removed = true;
            console.log(`removed: ${btmHand.name}`)
          };
        };

        !this.state.noValid ? btmHand.valid = false : btmHand.remove = false;
      });
    };

    this.setState({
      scoreBoard: [...scoreBoard],
      selectionMade: true
    })
  };

  endRound = () => {
    const scoreBoard = [...this.state.scoreBoard];
    const slots = [...this.state.slots];
    const finalVals = slots.map(slot => { return slot.number });
    const sortedVals = finalVals.sort((a, b) => { return a - b });
    console.log(sortedVals)
    const boardObj = findHands(sortedVals, scoreBoard);

    if (!boardObj.validHands) this.setState({ noValid: true });

    this.setState({
      roundOver: true,
      scoreBoard: [...boardObj.scoreBoard]
    });
  };

  holdSlot = e => {
    const id = e.target.id;
    let slots = [...this.state.slots];
    slots[id].held ? slots[id].held = false : slots[id].held = true;
    this.setState({ slots: [...slots] });
  };

  shuffle = () => {
    let slots = [...this.state.slots];
    let roll = this.state.roll;

    slots.forEach(slot => { if (!slot.held) slot.number = getRandNum(); });

    roll++;

    if (roll === 3) this.endRound(slots);
    else this.setState({ roll: roll, slots: [...slots] });
  };

  render() {
    return (
      <div className="App" align="center">
        {
          this.state.loaded ?
            <Stage
              state={this.state}
              shuffle={this.shuffle}
              holdSlot={this.holdSlot}
              startGame={this.startGame}
              startRound={this.startRound}
              endRound={this.endRound}
              selectHand={this.selectHand}
              toggleModal={this.toggleModal}
            />
            :
            ''
        }
        <GameModal
          selectedHand={this.state.selectedHand !== null ? this.state.selectedHand : ''}
          noValid={this.state.noValid}
          showModal={this.state.showModal}
          selectHand={this.selectHand}
          toggleModal={this.toggleModal}
        />
      </div>
    );
  };
};

export default App;

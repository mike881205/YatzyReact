import React, { Component } from "react";
import Stage from "./Components/Stage";
import 'bootstrap/dist/css/bootstrap.min.css';
import GameModal from "./Components/GameModal";
import Button from 'react-bootstrap/Button';


const blankScoreBoard = () => {
  const board = [
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
      bonus: total => { return total < 63 ? 0 : 35 },
      total: (total, bonus) => { return total + bonus }
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
          name: 'Chance',
          valid: false,
          remove: false,
          used: false,
          removed: false,
          score: 0
        },
        {
          name: 'Yatzy',
          valid: false,
          remove: false,
          used: false,
          removed: false,
          score: 50
        }
      ],
      yatzyBonus: {
        valid: false,
        removed: false,
        count: 0,
        score: 100,
        total: (count, score) => { return count * score }
      },
      handsTotal: 0,
      total: (total, bonus) => { return total + bonus }
    },
    {
      grandTotal: 0
    }
  ];

  return board;
};

const blankSlotArr = () => {
  const letters = Array.from('YATZY');
  const array = letters.map((letter) => { return { number: letter, held: false } });
  return array;
};

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
  const uniqueArr = arr.filter(val => { return seen === val ? '' : seen = val; });
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
  obj.scoreBoard = [...scoreBoard];

  return obj;
};

const checkStraights = (unqObjArray, scoreBoard) => {

  let count = 1;
  let validHand = false;
  let obj = {};

  for (let i = 1; i < unqObjArray.length; i++) {
    if (unqObjArray[i] - unqObjArray[i - 1] === 1) { count++ }
    else { if (count < 4) { count = 1 }; };
  };

  if (count > 3) {
    switch (count) {
      case 4:
        if (!scoreBoard[1].hands[3].used && !scoreBoard[1].hands[3].removed) {
          validHand = true;
          scoreBoard[1].hands[3].valid = true;
        };
        break;
      default:
        if (!scoreBoard[1].hands[3].used && !scoreBoard[1].hands[3].removed) {
          validHand = true;
          scoreBoard[1].hands[3].valid = true;
        };
        if (!scoreBoard[1].hands[4].used && !scoreBoard[1].hands[4].removed) {
          validHand = true;
          scoreBoard[1].hands[4].valid = true;
        };
        break;
    };
  }

  obj.validHand = validHand;
  obj.scoreBoard = [...scoreBoard];

  return obj;
};

const checkKinds = (sortedArr, objArray, scoreBoard) => {

  let FHdouble = false;
  let FHtriple = false;
  let validHand = false;
  let newObj = {};

  objArray.forEach(obj => {
    if (obj.count > 1) {
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
          if (!scoreBoard[1].hands[6].used && !scoreBoard[1].hands[6].removed) {
            validHand = true
            scoreBoard[1].hands[6].valid = true;
          }
          else if (scoreBoard[1].hands[6].used) {
            validHand = true
            scoreBoard[1].yatzyBonus.valid = true;
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

  newObj.validHand = validHand;
  newObj.scoreBoard = [...scoreBoard];

  return newObj;
};

const findHands = (sortedArr, scoreBoard) => {

  const uniqueVals = removeDuplicates(sortedArr);

  let validHands = false;
  let obj = {};

  const unqObjArray = uniqueVals.map(unqVal => {
    let unqObj = { value: unqVal, count: 0 };
    sortedArr.forEach(srtdVal => { if (unqVal === srtdVal) unqObj.count++; });
    return unqObj;
  });

  // Check chance && update scoreboard
  if (!scoreBoard[1].hands[5].used && !scoreBoard[1].hands[5].removed) {
    validHands = true;
    scoreBoard[1].hands[5].valid = true;
    scoreBoard[1].hands[5].score = totalValues(sortedArr);
  };

  const topHandObj = checkTopHands(unqObjArray, scoreBoard);
  const straightObj = checkStraights(uniqueVals, topHandObj.scoreBoard);
  let kindObj = checkKinds(sortedArr, unqObjArray, straightObj.scoreBoard);

  if (topHandObj.validHand || straightObj.validHand || kindObj.validHand) validHands = true;

  if (!validHands) {
    kindObj.scoreBoard[0].hands.forEach(hand => {
      if (!hand.used && !hand.removed) hand.remove = true;
    });
    kindObj.scoreBoard[1].hands.forEach(hand => {
      if (!hand.used && !hand.removed) hand.remove = true;
    });
  };

  obj.scoreBoard = kindObj.scoreBoard;
  obj.validHands = validHands;

  return obj;
};

const getHandChoices = scoreBoard => {
  const hands = [...scoreBoard[0].hands, ...scoreBoard[1].hands];
  const choices = hands.filter(hand => { return hand.valid || hand.remove ? hand : ''; });
  return choices;
};






class App extends Component {

  state = {
    scoreBoard: blankScoreBoard(),
    slots: blankSlotArr(),
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
    this.setState({ loaded: true })
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
      scoreBoard: blankScoreBoard(),
      slots: blankSlotArr(),
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
    this.resetGame();
    this.startRound();
  };

  startRound = () => {
    this.setState({
      slots: blankSlotArr(),
      roll: 0,
      roundOver: false,
      selectionMade: false,
      selectedHand: { toggle: false, hand: null },
      showModal: false,
      noValid: false
    });
  };

  endRound = () => {
    const scoreBoard = [...this.state.scoreBoard];
    const finalVals = this.state.slots.map(slot => { return slot.number });
    // [1,2,4,4,6]
    const sortedVals = finalVals.sort((a, b) => { return a - b });
    const boardObj = findHands(sortedVals, scoreBoard);
    const handChoices = getHandChoices(boardObj.scoreBoard);
    // console.log(sortedVals)
    // console.log(handChoices)

    if (!boardObj.validHands) this.setState({ noValid: true });

    this.setState({
      roundOver: true,
      scoreBoard: boardObj.scoreBoard
    });
  };

  holdSlot = e => {
    const id = e.target.id;
    let slots = [...this.state.slots];
    slots[id].held ? slots[id].held = false : slots[id].held = true;
    this.setState({ slots: slots });
  };

  shuffle = () => {
    let slots = [...this.state.slots];
    let roll = this.state.roll;

    slots.forEach(slot => { if (!slot.held) slot.number = getRandNum(); });

    roll++;

    if (roll === 3) this.endRound();
    else this.setState({ roll: roll, slots: slots });
  };

  selectHand = hand => {
    const { name, score } = hand;
    let scoreBoard = [...this.state.scoreBoard]
    let match = false
    let count = 0
    let hands;

    // Check the top hands for the selection
    scoreBoard[0].hands.forEach(topHand => {
      if (topHand.name === name) {
        match = true;
        if (topHand.valid) {
          topHand.used = true;
          scoreBoard[0].handsTotal = scoreBoard[0].handsTotal + score;
        }
        else if (topHand.remove) {
          topHand.removed = true;
          topHand.score = 0;
        };
      };
      topHand.valid = false;
      topHand.remove = false;
    });

    // if not top match, check the bottom hands
    if (!match) {
      scoreBoard[1].hands.forEach(bottomHand => {
        if (bottomHand.name === name) {
          match = true
          if (bottomHand.valid) {
            bottomHand.used = true;
            scoreBoard[1].handsTotal = scoreBoard[1].handsTotal + score;
          }
          else if (bottomHand.remove) {
            bottomHand.removed = true;
            bottomHand.score = 0;
            if (name === "Yatzy") scoreBoard[1].yatzyBonus.removed = true;
          };
        };
        bottomHand.valid = false;
        bottomHand.remove = false;
      });
    };

    // if no bottom match, check yatzy bonus
    if (!match && name === "Yatzy Bonus") {
      scoreBoard[1].yatzyBonus.count++;
      scoreBoard[1].yatzyBonus.valid = false;
    };

    hands = [...scoreBoard[0].hands, ...scoreBoard[1].hands];

    hands.forEach(hand => { if (!hand.used && !hand.removed) count++; });

    switch (count) {
      case 0:
        // this.endGame();
        this.setState({
          gameOver: true,
          scoreBoard: scoreBoard,
          selectionMade: true,
          noValid: false
        });
        alert("Game Over")
        break;
      default:
        this.setState({
          scoreBoard: scoreBoard,
          selectionMade: true,
          noValid: false
        });
        break;
    };
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
            <></>
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

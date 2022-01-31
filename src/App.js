import React, { Component } from "react";
import Stage from "./Components/Stage";
import 'bootstrap/dist/css/bootstrap.min.css';
import GameModal from "./Components/Modal";
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

const totalValues = handArr => {
  return handArr.reduce((a, b) => a + b);
};

const letters = Array.from("YATZY");

const blankArr = letters.map(slot => {
  return {
    number: slot,
    held: false
  };
});

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
  objArray.forEach(obj => {
    scoreBoard[0].hands.forEach(hand => {
      if (obj.value === hand.value && !hand.used) {
        hand.valid = true;
        hand.score = hand.value * obj.count;
      };
    });
  });
  return scoreBoard;
};

const checkStraights = (unqObjArray, scoreBoard) => {
  let count = 1;

  for (let i = 1; i < unqObjArray.length; i++) {
    if (unqObjArray[i] - unqObjArray[i - 1] === 1) { count++ }
    else {
      if (count < 4) { count = 1 };
    }
  };

  if (count >= 4) {
    switch (count) {
      case 4:
        if (!scoreBoard[1].hands[3].used) scoreBoard[1].hands[3].valid = true;
        break;
      default:
        if (!scoreBoard[1].hands[3].used) scoreBoard[1].hands[3].valid = true;
        if (!scoreBoard[1].hands[4].used) scoreBoard[1].hands[4].valid = true;
        break;
    };
  };

  return scoreBoard;
};

const checkKinds = (sortedArr, objArray, scoreBoard) => {
  let FHdouble = false;
  let FHtriple = false;

  objArray.forEach(obj => {
    if (obj.count >= 2) {
      switch (obj.count) {
        case 2:
          FHdouble = true
          break;
        case 3:
          FHtriple = true
          if (!scoreBoard[1].hands[0].used) {
            scoreBoard[1].hands[0].valid = true;
            scoreBoard[1].hands[0].score = totalValues(sortedArr);
          };
          break;
        case 4:
          if (!scoreBoard[1].hands[0].used) {
            scoreBoard[1].hands[0].valid = true;
            scoreBoard[1].hands[0].score = totalValues(sortedArr);
          };
          if (!scoreBoard[1].hands[1].used) {
            scoreBoard[1].hands[1].valid = true;
            scoreBoard[1].hands[1].score = totalValues(sortedArr);
          };
          break;
        default:
          if (!scoreBoard[1].hands[0].used) {
            scoreBoard[1].hands[0].valid = true;
            scoreBoard[1].hands[0].score = totalValues(sortedArr);
          };
          if (!scoreBoard[1].hands[1].used) {
            scoreBoard[1].hands[1].valid = true;
            scoreBoard[1].hands[1].score = totalValues(sortedArr);
          };
          if (!scoreBoard[1].hands[5].used) {
            scoreBoard[1].hands[5].valid = true;
          }
          else {
            scoreBoard[1].hands[7].valid = true;
          };
          break;
      };
    };
  });

  // Check Full House
  if (FHdouble && FHtriple && !scoreBoard[1].hands[2].used) scoreBoard[1].hands[2].valid = true

  return scoreBoard;
};

const checkHands = (sortedArr, scoreBoard) => {

  const uniqueVals = removeDuplicates(sortedArr);

  const unqObjArray = uniqueVals.map(unqVal => {
    let unqObj = { value: unqVal, count: 0 };
    sortedArr.forEach(srtdVal => {
      if (unqVal === srtdVal) unqObj.count++;
    });
    return unqObj;
  });

  // Check chance && update scoreboard
  if (!scoreBoard[1].hands[6].used) {
    scoreBoard[1].hands[6].valid = true;
    scoreBoard[1].hands[6].score = totalValues(sortedArr);
  };

  const newBoard1 = checkTopHands(unqObjArray, scoreBoard)
  const newBoard2 = checkStraights(uniqueVals, newBoard1)
  const newBoard3 = checkKinds(sortedArr, unqObjArray, newBoard2)

  return newBoard3;
};








class App extends Component {

  state = {
    scoreBoard: null,
    slots: null,
    roll: 0,
    selectionMade: false,
    roundOver: true,
    gameOver: true,
    showModal: false
  };

  componentDidMount() {
    this.resetGame();
  };

  toggleModal = bool => {
    this.setState({ showModal: bool });
  };

  resetGame = () => {
    this.setState({
      scoreBoard: blankScoreBoard,
      slots: blankArr,
      roundOver: true,
      gameOver: true
    });
  };

  startGame = e => {
    this.setState({
      gameOver: false,
      roundOver: false
    });
  };

  handleEndRound = e => {
    this.endRound(this.state.slots);
  };

  selectHand = hand => {
    const { name, score, valid, used, remove, removed } = hand;
    let scoreBoard = [...this.state.scoreBoard]
    let match = false

    scoreBoard[0].hands.forEach(hand => {
      if (hand.name === name) {
        match = true
        console.log(hand)
      }
    })

    if (!match) {
      scoreBoard[1].hands.forEach(hand => {
        if (hand.name === name) {
          console.log(hand)
        }
      })
    }

  };

  endRound = slots => {

    const scoreBoard = [...this.state.scoreBoard];

    const finalVals = slots.map(slot => { return slot.number });
    // let finalVals = [1,1,1,6,6]

    const sortedVals = finalVals.sort((a, b) => { return a - b });
    console.log(sortedVals)

    const newBoard = checkHands(sortedVals, scoreBoard);

    // newBoard[0].hands.forEach(hand => {
    //   if (hand.valid) console.log(hand)
    // })
    // newBoard[1].hands.forEach(hand => {
    //   if (hand.valid) console.log(hand)
    // })

    this.setState({
      roundOver: true,
      scoreBoard: newBoard
    });
  };

  startRound = e => {
    this.setState({
      slots: blankArr,
      roll: 0,
      roundOver: false
    });
  };

  holdSlot = e => {
    const id = e.target.id;
    const slots = this.state.slots;
    slots[id].held ? slots[id].held = false : slots[id].held = true;
    this.setState({ slots: slots });
  };

  handleShuffle = e => {
    e.preventDefault();
    this.shuffle(this.state.slots);
  };

  shuffle = slots => {
    let roll = this.state.roll
    const newSlots = slots.map(slot => {
      let newSlot = {};
      !slot.held ? newSlot.number = getRandNum() : newSlot.number = slot.number;
      newSlot.held = slot.held;
      return newSlot;
    });

    roll++

    if (roll === 3) {
      this.endRound(newSlots);
    };

    this.setState({ roll: roll, slots: newSlots });
  };

  render() {
    return (
      <div className="App" align="center">
        {
          this.state.slots ?
            <Stage
              state={this.state}
              shuffle={this.handleShuffle}
              holdSlot={this.holdSlot}
              startGame={this.startGame}
              startRound={this.startRound}
              endRound={this.handleEndRound}
              selectHand={this.selectHand}
            />
            :
            ''
        }
        <GameModal
          showModal={this.state.showModal}
          toggleModal={this.toggleModal}
        />
      </div>
    );
  };
};

export default App;

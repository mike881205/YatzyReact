import React, { Component } from "react";
import Stage from "./Components/Stage";
import 'bootstrap/dist/css/bootstrap.min.css';

const scoreBoard = [
  {
    section: 'top',
    hands: [
      {
        name: 'Aces',
        valid: false,
        used: false,
        getScore: count => { return count * 1 },
        score: 0
      },
      {
        name: 'Twos',
        valid: false,
        used: false,
        getScore: count => { return count * 2 },
        score: 0
      },
      {
        name: 'Threes',
        valid: false,
        used: false,
        getScore: count => { return count * 3 },
        score: 0
      },
      {
        name: 'Fours',
        valid: false,
        used: false,
        getScore: count => { return count * 4 },
        score: 0
      },
      {
        name: 'Fives',
        valid: false,
        used: false,
        getScore: count => { return count * 5 },
        score: 0
      },
      {
        name: 'Sixes',
        valid: false,
        used: false,
        getScore: count => { return count * 6 },
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
        used: false,
        getScore: arr => { return arr.reduce((a, b) => a + b) },
        score: 0
      },
      {
        name: '4 Of A Kind',
        valid: false,
        used: false,
        getScore: arr => { return arr.reduce((a, b) => a + b) },
        score: 0
      },
      {
        name: 'Full House',
        valid: false,
        used: false,
        getScore: null,
        score: 25
      },
      {
        name: 'Small Straight',
        valid: false,
        used: false,
        getScore: null,
        score: 30
      },
      {
        name: 'Large Straight',
        valid: false,
        used: false,
        getScore: null,
        score: 40
      },
      {
        name: 'Yatzy',
        valid: false,
        used: false,
        getScore: null,
        score: 50
      },
      {
        name: 'Chance',
        valid: false,
        used: false,
        getScore: arr => { return arr.reduce((a, b) => a + b) },
        score: 0
      },
      {
        name: 'Yatzy Bonus',
        valid: false,
        used: false,
        total: 0,
        getScore: () => {return this.total * 100},
        score: 0
      },
    ],
    handsTotal: 0
  },
  {
    grandTotal: 0
  }
]

const getHandsTotal = handArr => {
  const scoresArr = handArr.map(hand => { return hand.score });
  console.log(scoresArr)
  return scoresArr.reduce((a, b) => a + b);
}

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
}

const removeDuplicates = arr => {
  let seen;
  const uniqueArr = arr.filter(val => {
    return seen === val ? '' : seen = val;
  });
  return uniqueArr;
}

const removeUniques = arr => {
  var map = new Map();
  arr.forEach(a => map.set(a, (map.get(a) || 0) + 1));
  return arr.filter(a => map.get(a) > 1);
};

class App extends Component {

  state = {
    scoreBoard: null,
    slots: null,
    roll: 0,
    roundOver: true,
    gameOver: true
  };

  componentDidMount() {
    this.resetGame();
  }

  resetGame = () => {
    this.setState({
      scoreBoard: scoreBoard,
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

  endRound = slots => {

    const finalVals = slots.map(slot => { return slot.number });

    const sortedVals = finalVals.sort((a, b) => { return a - b });
    console.log(`Sorted Vals: \n${sortedVals}`)

    const uniqueArr = removeDuplicates(sortedVals);
    console.log(`No Duplicates: \n${uniqueArr}`)

    const duplicateArr = removeUniques(sortedVals);
    console.log(`No Uniques: \n${duplicateArr}`)

    this.setState({ roundOver: true });
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
            />
            :
            ''
        }
      </div>
    );
  };
};

export default App;

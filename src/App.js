import React, { Component } from "react";
import Stage from "./Components/Stage";
import Slot from '../src/Components/Slot';
import 'bootstrap/dist/css/bootstrap.min.css';

const images = ["img1", "img2", "img3", "img4", "img5", "img6"]

const blankArr = Array.from(Array(5).fill(
  {
    number: null,
    held: false,
  }
));

const getRandNum = () => {
  const min = Math.ceil(1);
  const max = Math.floor(6);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class App extends Component {

  state = {
    slots: null
  };

  componentDidMount() {

    this.setState({ slots: this.shuffle(blankArr) })
  }



  shuffle = slots => {
    const newSlots = slots.map(slot => {
      let newSlot = {};
      if (!slot.held) {
        newSlot.number = getRandNum();
      };
      newSlot.held = slot.held;
      return newSlot;
    });

    return this.buildSlots(newSlots);
  };

  buildSlots = slots => {
    const newSlots = slots.map((slot, i) => {
      const newSlot =
        <Slot
          key={i}
          number={slot.number}
          image={images[slot.number - 1]}
          held={slot.held}
          click={null}
        // click={this.holdSlot}
        />;

      return newSlot;
    });
    return newSlots;
  };

  render() {
    return (
      <div className="App" align="center">
        {
          this.state.slots ?
            <Stage slots={this.state.slots} />
            :
            ''
        }
      </div>
    );
  };
};

export default App;

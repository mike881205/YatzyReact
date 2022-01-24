import React, { Component } from "react";
import Stage from "./Components/Stage";
import Slot from '../src/Components/Slot';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  state = {
    slots: null
  };

  componentDidMount() {
    const numArr = Array.from(Array(5).fill(''))

    const slotsArr = numArr.map((slot, i) => {
      slot =
        <Slot
          key={i}
          num={i + 1}
        />

      return slot;
    });

    this.setState({ slots: slotsArr })
  }

  render() {
    return (
      <div className="App">
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
